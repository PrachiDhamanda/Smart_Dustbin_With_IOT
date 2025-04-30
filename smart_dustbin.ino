#include <WiFi.h>
#include <ESPAsyncWebServer.h>
#include <ArduinoJson.h>

// Wi-Fi credentials
const char *ssid = "Your_SSID";
const char *password = "Your_PASSWORD";

// Web server on port 80
AsyncWebServer server(80);

// Fill level sensor (example)
int fillLevelPin = A0;  // Adjust this for your specific sensor

// Initialize the fill level variable
int fillLevel = 0;

void setup() {
  // Start serial communication
  Serial.begin(115200);

  // Connect to Wi-Fi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");

  // Serve the fill level data on the web
  server.on("/fill", HTTP_GET, [](AsyncWebServerRequest *request){
    fillLevel = analogRead(fillLevelPin);  // Get sensor reading
    int percentageFill = map(fillLevel, 0, 1023, 0, 100);  // Convert to percentage
    String response = String(percentageFill);
    request->send(200, "text/plain", response);
  });

  // Start server
  server.begin();
}

void loop() {
  // Nothing to do in loop
}
