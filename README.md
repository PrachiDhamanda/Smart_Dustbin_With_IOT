🌍 Smart Dustbin Project

## Overview 🚀
This project is a Smart Dustbin Manager using ESP32 to monitor the fill level of a dustbin and manage the lid status. The system is controlled via a web-based dashboard. 

### Key Features 🛠️:
- Real-time monitoring of bin fill levels.
- Control lid status (open/close) remotely.
- User authentication (Sign Up / Sign In).
- Alerts for high fill levels (80% and 100%).

## Hardware
- ESP32 Board
- Fill Level Sensor (e.g., ultrasonic or IR)
- Servo Motor (for lid control)

## Software 🖥️
- Arduino IDE for ESP32
- HTML/CSS/JavaScript for the frontend

## 🚀 Installation Guide

### Prerequisites:
- Arduino IDE
- ESP32 Board Support
- Wi-Fi Network (Your ESP32 needs an internet connection)

### Steps:

📦 Steps:
Prepare the Arduino Code:

Download the smart_dustbin.ino file.

Open it in Arduino IDE and configure your Wi-Fi credentials:
```
const char* ssid = "YourNetworkName"; 
const char* password = "YourNetworkPassword";
```
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
```
The ESP32 will display its assigned IP address (e.g., 192.168.1.100).
```
Frontend Dashboard Setup:

Launch the HTML/CSS/JS frontend in any modern browser.

Enter the ESP32’s IP address in the browser to access the dashboard. Example: http://192.168.1.100.

Test the System:

The system will start monitoring the bin's fill level.

Control the lid via the web dashboard or automatically with proximity or button press.



## Arduino Code
The Arduino code is saved as `smart_dustbin.ino`. This code runs on an ESP32 to interact with the sensors and handle HTTP requests for the web dashboard.

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
