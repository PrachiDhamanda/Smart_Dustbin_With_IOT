🌍 Smart Dustbin Project
Overview 🚀
Welcome to the Smart Dustbin Manager project! This system uses the ESP32 to monitor the fill level of a dustbin and manage the lid status, all through a sleek, web-based dashboard. Say goodbye to overflowing bins with automated alerts and control!

Key Features 🛠️:
Real-time Monitoring: Keep track of the bin’s fill level with precision.

Remote Lid Control: Open/close the lid from anywhere.

User Authentication: Secure Sign Up and Sign In functionalities.

Fill Level Alerts: Get notified when the bin reaches 80% or 100% capacity.

Hardware Components 💡
ESP32 Board – The brain of the project.

Fill Level Sensor (Ultrasonic/IR) – Measures the bin’s fill level.

Servo Motor – Controls the lid's open/close mechanism.

Buzzer – Provides audible alerts for high fill levels.

Proximity Sensor – Automatically opens the lid when you approach.

Button – For manual lid control.

Software 🖥️
Arduino IDE – For programming the ESP32.

HTML/CSS/JavaScript – For the interactive web dashboard.

🚀 Installation Guide
Prerequisites:
Arduino IDE (Ensure the ESP32 board is supported)

Wi-Fi Network (Your ESP32 needs an internet connection)

📦 Steps:
Prepare the Arduino Code:

Download the smart_dustbin.ino file.

Open it in Arduino IDE and configure your Wi-Fi credentials:

cpp
Copy
Edit
const char* ssid = "YourNetworkName";  // Replace with your Wi-Fi name
const char* password = "YourNetworkPassword";  // Replace with your Wi-Fi password
Install Required Libraries:

In Arduino IDE, go to Sketch > Include Library > Manage Libraries.

Install the following libraries:

WiFi (For ESP32 Wi-Fi connectivity)

WebServer (For hosting web pages)

ESP32Servo (To control the servo motor)

Upload the Arduino Code:

Select the correct ESP32 Board and Port in Arduino IDE.

Upload the modified smart_dustbin.ino file to your ESP32.

Get the IP Address:

Open the Serial Monitor in Arduino IDE.

The ESP32 will display its assigned IP address (e.g., 192.168.1.100).

Frontend Dashboard Setup:

Launch the HTML/CSS/JS frontend in any modern browser.

Enter the ESP32’s IP address in the browser to access the dashboard. Example: http://192.168.1.100.

Test the System:

The system will start monitoring the bin's fill level.

Control the lid via the web dashboard or automatically with proximity or button press.

📸 Smart Dustbin Images

		
Smart Dustbin - Front View	Bin Monitoring - Top View	Smart Dustbin - Side View
		
Bin Sensor Technology	Servo Motor Control	Smart Dustbin Overview
🖥️ Frontend Dashboard Screenshots

	
Add Bin	Dashboard
	
Profile	Sign In / Sign Up
🛡️ License
This project is licensed under the MIT License.
