import os, subprocess, shutil, time, signal, csv

cols = "process_name, timestamp, cpu(%), memory(%), weight(s)\n"

# with open("output.csv", "w") as csvfile: 
#     csvfile.writelines(cols)

path = os.getcwd()

l_f = os.listdir(path=path)
list_json = [j for j in l_f if j.endswith('.json')]
list_cir = [j for j in l_f if j.endswith('.circom')]
prefix="lr_"
suffixes=["circom","r1cs","sym","json"]

for i in range(1,40):
    df = {}
    folder_name = f"lr_{i}_js"
    filename = f"lr_{i}"
    cir_f=f"lr_{i}.r1cs"
    in_f=f"input_{i}.json"
    wa_f=f"lr_{i}.wasm"

    process_name = "compile"
    process = subprocess.Popen(["python3", "cpu.py", process_name, str(i), path])
    os.system(f"circom {filename}.circom --r1cs --wasm --sym --c")    
    process.send_signal(signal.SIGTERM)

    for suffix in suffixes:
        source_file = f"{filename}.{suffix}"
        destination_file = os.path.join(folder_name, source_file)

        # # Only move the file if it doesn't already exist in the destination directory
        if os.path.isfile(source_file) and not os.path.isfile(destination_file):
            shutil.move(source_file, folder_name)

    source_file = f"input_{i}.json"
    destination_file = os.path.join(folder_name, source_file)

    if os.path.isfile(source_file) and not os.path.isfile(destination_file):
        shutil.move(source_file, folder_name)

    
    os.chdir(folder_name)  # Change to the subfolder
    
    process_name = "witness"
    process = subprocess.Popen(["python3", f"{path}/cpu.py", process_name, str(i), path])
    os.system(f"node generate_witness.js {wa_f} {in_f} witness.wtns")
    process.send_signal(signal.SIGTERM)
    
    process_name = "power_of_tau"
    process = subprocess.Popen(["python3", f"{path}/cpu.py", process_name, str(i), path])
    os.system("snarkjs powersoftau new bn128 12 pot12_0000.ptau -v")
    process.send_signal(signal.SIGTERM)

    process_name = "pot_ceremony"
    process = subprocess.Popen(["python3", f"{path}/cpu.py", process_name, str(i), path])
    command = ["snarkjs", "powersoftau", "contribute", "pot12_0000.ptau", "pot12_0001.ptau", "--name=\"First contribution\"", "-v"]
    user_input = "iohnwnq\n" \
    # Run the command
    process1 = subprocess.Popen(command, stdin=subprocess.PIPE, stdout=subprocess.PIPE)
    stdout, stderr = process1.communicate(input=user_input.encode())
    process.send_signal(signal.SIGTERM)

    process_name = "phase_two_initiation"
    process = subprocess.Popen(["python3", f"{path}/cpu.py", process_name, str(i), path])
    os.system("snarkjs powersoftau prepare phase2 pot12_0001.ptau pot12_final.ptau -v")
    process.send_signal(signal.SIGTERM)

    process_name = "z_key"
    process = subprocess.Popen(["python3", f"{path}/cpu.py", process_name, str(i), path])
    os.system(f"snarkjs groth16 setup {cir_f} pot12_final.ptau {filename}_0000.zkey")
    process.send_signal(signal.SIGTERM)

    process_name = "phase_two_ceremony"
    process = subprocess.Popen(["python3", f"{path}/cpu.py", process_name, str(i), path])
    command = ["snarkjs", "zkey", "contribute", f"{filename}_0000.zkey", f"{filename}_0001.zkey", "--name=\"1st Contributor Name\"", "-v"]
    user_input = "wiio-0-3u inow\n"  # replace with your actual input
    # Run the command
    process1 = subprocess.Popen(command, stdin=subprocess.PIPE, stdout=subprocess.PIPE)
    stdout, stderr = process1.communicate(input=user_input.encode())
    process.send_signal(signal.SIGTERM)

    process_name = "verification_key"
    process = subprocess.Popen(["python3", f"{path}/cpu.py", process_name, str(i), path])
    os.system(f"snarkjs zkey export verificationkey {filename}_0001.zkey verification_key.json")
    process.send_signal(signal.SIGTERM)

    process_name = "proof"
    process = subprocess.Popen(["python3", f"{path}/cpu.py", process_name, str(i), path])
    os.system(f"snarkjs groth16 prove {filename}_0001.zkey witness.wtns proof.json public.json")
    process.send_signal(signal.SIGTERM)

    process_name = "verify_proof"
    process = subprocess.Popen(["python3", f"{path}/cpu.py", process_name, str(i), path])
    os.system(f"snarkjs groth16 verify verification_key.json public.json proof.json")
    process.send_signal(signal.SIGTERM)

    process_name = "solidity_verifier"
    process = subprocess.Popen(["python3", f"{path}/cpu.py", process_name, str(i), path])
    os.system(f"snarkjs zkey export solidityverifier {filename}_0001.zkey verifier_{filename}.sol")
    process.send_signal(signal.SIGTERM)

    os.chdir(path)  # Return to the main directory
