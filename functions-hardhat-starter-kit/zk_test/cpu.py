import psutil, time, signal, datetime, sys, os

process_name = sys.argv[1]
num = sys.argv[2]
path = sys.argv[3]
print("reading CPU...")

def signal_handler(signum, frame):
    print("Received SIGTERM. Exiting.")
    exit()

signal.signal(signal.SIGTERM, signal_handler)

while True:
    now = datetime.datetime.now()
    cpu = psutil.cpu_percent()
    memory = psutil.virtual_memory().percent
    out = f"{process_name}, {now}, {cpu}, {memory}, {num}\n"
    with open(f"{path}/output.csv", "a") as writer:
        writer.write(out)
    time.sleep(0.125)
