import subprocess, time, os, signal
num = 1
process_name = "test1"

# Execute test2.py as a separate process
cols = "process_name, timestamp, cpu(%), memory(%), weight(s)\n"

with open("output.csv", "w") as csvfile: 
    csvfile.writelines(cols)

# Execute test2.py as a separate process
process = subprocess.Popen(["python3", "cpu.py", process_name, str(num)])

# Rest of the code in test1.py
print("Continuing with other tasks...")

# Optionally, wait for the subprocess to finish:
time.sleep(10)
print("Subprocess completed.")

# Send SIGTERM to the subprocess
process.send_signal(signal.SIGTERM)