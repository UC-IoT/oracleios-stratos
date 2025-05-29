import os, json
with open("input.txt", 'r') as f: data = json.load(f)

keys = list(data.keys())
values = list(data.values())
length = len(data)
for i in range(1, 40):
    
    template = f"""
    pragma circom 2.0.0;
    template lr_{i}()
    """

    constant = """
    {
        signal input intercept; // The input features
        signal output y;
    """

    signal_weight = f"""
        signal input {keys[1]}"""

    if(i > 1): 
        for j in keys[2:1 + i]: signal_weight += f',{j}'

    signal_weight += ";"

    signal_x = f"""
        signal input {keys[40]}"""

    if(40 + i > 41): 
        for j in keys[41:40+i]: signal_x += f',{j}'

    signal_x += ";"

    signal_aux = """
        signal aux1"""

    if(i > 1):
        for j in range(2,i + 1): signal_aux += f',aux{j}'

    signal_aux += ";\n"

    aux = ""
    for j in range(1, i+1):
        aux += f"""
        aux{j} <== x{j} * weight{j};"""

    formula = f"""
        
        y <== {keys[0]} """
    
    if(i > 1):
        for j in range(1, i+1): formula += f"""+ aux{j} """

    formula += ";"

    closing = """
    }
    """

    component = f"""

    component main = lr_{i}();
    """
    compose = template + constant + signal_x + signal_weight + signal_aux + aux + formula + closing + component
    with open(f"lr_{i}.circom", "w") as file: file.write(compose)
    new_dict = {key: data[key] for key in keys[:i+1]}
    x_dict = {key: data[key] for key in keys[40:i+40]}
    new_dict.update(x_dict)
    with open(f"input_{i}.json", "w") as file: 
        json.dump(new_dict, file)