🌍 Smart Dustbin Project
Overview 🚀
Welcome to the Smart Dustbin Manager project! This system uses the ESP32 to monitor the fill level of a dustbin and manage the lid status, all through a sleek, web-based dashboard. Say goodbye to overflowing bins with automated alerts and control!

Key Features 🛠️:
Real-time Monitoring: Keep track of the bin’s fill level with precision.

Remote Lid Control: Open/close the lid from anywhere.# Smart Dustbin Project

## Overview
This project is a Smart Dustbin Manager using ESP32 to monitor the fill level of a dustbin and manage the lid status. The system is controlled via a web-based dashboard. 

### Features:
- Real-time monitoring of bin fill levels.
- Control lid status (open/close) remotely.
- User authentication (Sign Up / Sign In).
- Alerts for high fill levels (80% and 100%).

## Hardware
- ESP32 Board
- Fill Level Sensor (e.g., ultrasonic or IR)
- Servo Motor (for lid control)
- Buzzer (for alerts)

Proximity Sensor (for automatic lid opening)

Button (for manual lid control)

## Software
- Arduino IDE for ESP32
- HTML/CSS/JavaScript for the frontend

## Installation

### Prerequisites:
- Arduino IDE
- ESP32 Board Support
- Wi-Fi network

### Steps:
1. Upload the `smart_dustbin.ino` file to your ESP32 board using Arduino IDE.
2. Modify the Wi-Fi credentials in the Arduino code.
3. Run the frontend (HTML/CSS/JS) in any modern browser.

## Arduino Code
The Arduino code is saved as `smart_dustbin.ino`. This code runs on an ESP32 to interact with the sensors and handle HTTP requests for the web dashboard.
Steps to Install:
Install Libraries:

Go to Sketch > Include Library > Manage Libraries.

Search for and install the following libraries:

WiFi (for ESP32 Wi-Fi functionality)

WebServer (for serving web pages)

ESP32Servo (for controlling the servo motor)

Upload the Arduino Code:

Open the smart_dustbin.ino file in Arduino IDE.

Modify the Wi-Fi credentials (ssid and password) in the code to match your network.

Upload the code to your ESP32 board via USB.

Run the Web Dashboard:

The ESP32 will create a Wi-Fi hotspot once connected to your network. You can access the dashboard by opening a browser and typing the ESP32's IP address.

You can also set up a local server for your web dashboard (HTML/CSS/JS).

Test the System:

Open the browser and go to the IP address of your ESP32.

The system will begin monitoring the bin's fill level, and the lid will automatically open based on proximity or button press.
### Smart Dustbin Images

| <img src="https://via.placeholder.com/300?text=Smart+Dustbin+Front" width="300"><br><b>Smart Dustbin - Front View</b> | <img src="https://via.placeholder.com/300?text=Bin+Monitoring+Top" width="300"><br><b>Bin Monitoring - Top View</b> | <img src="https://via.placeholder.com/300?text=Smart+Dustbin+Side" width="300"><br><b>Smart Dustbin - Side View</b> |
|:----------------------------------------------------------------------------------:|:------------------------------------------------------------------------------:|:--------------------------------------------------------------:|
| <img src="https://via.placeholder.com/300?text=Bin+Sensor+Tech" width="300"><br><b>Bin Sensor Technology</b> | <img src="https://via.placeholder.com/300?text=Servo+Motor+Control" width="300"><br><b>Servo Motor Control</b> | <img src="https://via.placeholder.com/300?text=Dustbin+Overview" width="300"><br><b>Smart Dustbin Overview</b> |




### Frontend Dashboard Screenshots

| <img src="Images/addbin.png" width="300"><br><b>Add Bin</b> | <img src="Images/dashboard.png" width="300"><br><b>Dashboard</b> |
|:------------------------------------------------------------:|:----------------------------------------------------------------:|
| <img src="Images/profile.png" width="300"><br><b>Profile</b> | <img src="Images/signinsignup.png" width="300"><br><b>Sign In / Sign Up</b> |


## License
This project is licensed under the MIT License.


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
