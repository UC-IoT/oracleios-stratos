import time, signal

def signal_handler(signum, frame):
    print("Received SIGTERM. Exiting.")
    exit()

signal.signal(signal.SIGTERM, signal_handler)

while True:
    # Your existing code for recording CPU and memory usage
    # ...
    print("test2")
    # Sleep for some time (adjust as needed)
    time.sleep(1)