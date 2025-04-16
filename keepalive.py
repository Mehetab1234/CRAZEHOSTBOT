from keepalive import keep_alive
import os

# Function to run Flask app
def run():
    os.system("python app.py")  # Run the main Flask app

# Keep the server alive
keep_alive(run)
