import os

def get_file_size(file_path, filename):
    
        # Get the size of the specified file in bytes
        full_file_path = os.path.join(file_path, filename)
        size = os.path.getsize(full_file_path)
        return size
    


# Get the current working directory
path = os.getcwd()

# List all files in the directory ending with '_js'
file_list = [file for file in os.listdir(path) if file.endswith('_js')]
file_list.sort(key=lambda x: int(x.split('_')[1]))

# Create a dictionary to store file sizes
file_sizes = {}

# Specify the filenames to check
proof_json_filename = "proof.json"
verification_key_filename = "verification_key.json"

with open("file.csv", "w") as csvfile:
    # Write the header row
    csvfile.write("File,Size of proof,Size of verification_key\n")
# Populate the dictionary with sizes
for file in file_list:
    file_path = os.path.join(path, file)
    proof_json_size = get_file_size(file_path, proof_json_filename)
    verification_key_size = get_file_size(file_path, verification_key_filename)
    file_sizes[file] = {
        proof_json_filename: proof_json_size,
        verification_key_filename: verification_key_size
    }

# Print the dictionary
    
for file, sizes in file_sizes.items():
    print(f"File: {file}")
    print(f"Size of {proof_json_filename}: {sizes[proof_json_filename]} bytes")
    print(f"Size of {verification_key_filename}: {sizes[verification_key_filename]} bytes")
    print()
    out=f"{file},{proof_json_size},{verification_key_size}\n"
    with open(f"{path}/file.csv","a") as writer:
        writer.write(out)