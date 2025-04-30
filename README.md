Smart Dustbin Project
Overview
This project is a Smart Dustbin Manager using ESP32 to monitor the fill level of a dustbin and manage the lid status. The system is controlled via a web-based dashboard.

Features:
Real-time monitoring of bin fill levels.

Control lid status (open/close) remotely.

User authentication (Sign Up / Sign In).

Alerts for high fill levels (80% and 100%).# Smart Dustbin Project

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


Hardware
ESP32 Board

Fill Level Sensor (e.g., ultrasonic or IR)

Servo Motor (for lid control)

Buzzer (for alerts)

Proximity Sensor (for automatic lid opening)

Button (for manual lid control)

Software
Arduino IDE for ESP32

HTML/CSS/JavaScript for the frontend

Installation
Prerequisites:
Arduino IDE

ESP32 Board Support

Wi-Fi network

Steps:
Modify Wi-Fi Credentials in Arduino Code: Open the smart_dustbin.ino file in Arduino IDE. Modify the Wi-Fi credentials with your network’s SSID and password:

cpp
Copy
Edit
const char* ssid = "YourNetworkName";  // Your Wi-Fi network name
const char* password = "YourNetworkPassword";  // Your Wi-Fi password
Install Required Libraries: Go to Sketch > Include Library > Manage Libraries in Arduino IDE, and install the following libraries:

WiFi (for ESP32 Wi-Fi functionality)

WebServer (for serving web pages)

ESP32Servo (for controlling the servo motor)

Upload Arduino Code to ESP32:

Connect your ESP32 board to your computer.

Select the appropriate board and port in the Tools menu of Arduino IDE.

Upload the modified smart_dustbin.ino file to the ESP32.

Obtain ESP32 IP Address:

Once the code is uploaded and the ESP32 is connected to your Wi-Fi network, open the Serial Monitor in Arduino IDE.

The ESP32 will print its IP address. Make a note of this IP address (e.g., 192.168.1.100).

Set Up Frontend:

Run the frontend dashboard (HTML/CSS/JS) in any modern browser.

Use the ESP32 IP address obtained earlier in the web app. For example, if the IP is 192.168.1.100, access the web dashboard by typing http://192.168.1.100 in your browser.

Test the System:

The system will begin monitoring the bin’s fill level and control the lid based on the proximity sensor or button press.

You can control the lid remotely via the web dashboard.

Smart Dustbin Images

<img src="https://via.placeholder.com/300?text=Smart+Dustbin+Front" width="300"><br><b>Smart Dustbin - Front View</b>	<img src="https://via.placeholder.com/300?text=Bin+Monitoring+Top" width="300"><br><b>Bin Monitoring - Top View</b>	<img src="https://via.placeholder.com/300?text=Smart+Dustbin+Side" width="300"><br><b>Smart Dustbin - Side View</b>
<img src="https://via.placeholder.com/300?text=Bin+Sensor+Tech" width="300">
<b>Bin Sensor Technology</b>	<img src="https://via.placeholder.com/300?text=Servo+Motor+Control" width="300">
<b>Servo Motor Control</b>	<img src="https://via.placeholder.com/300?text=Dustbin+Overview" width="300">
<b>Smart Dustbin Overview</b>
Frontend Dashboard Screenshots

<img src="Images/addbin.png" width="300"><br><b>Add Bin</b>	<img src="Images/dashboard.png" width="300"><br><b>Dashboard</b>
<img src="Images/profile.png" width="300">
<b>Profile</b>	<img src="Images/signinsignup.png" width="300">
<b>Sign In / Sign Up</b>
License
This project is licensed under the MIT License.

