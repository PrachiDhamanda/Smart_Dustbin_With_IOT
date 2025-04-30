#include <WiFi.h>
#include <WebServer.h>
#include <ESP32Servo.h>

// Pin Definitions
#define TRIG_PIN 5
#define ECHO_PIN 18
#define TRIG_FILL_PIN 21
#define ECHO_FILL_PIN 22
#define SERVO_PIN 13
#define BUZZER_PIN 4
#define BUTTON_PIN 15

// Calibration Constants
const float BIN_HEIGHT = 17.75; // Distance when empty (in cm)
const float FULL_DISTANCE = 5.3; // Distance when full (in cm)

const char* ssid = "Prachi";
const char* password = "YourPassword";

WebServer server(80);
Servo dustbinLid;

float fillLevel = 0;
bool lidOpen = false;
unsigned long lidOpenTime = 0;
const unsigned long lidDelay = 3000; // milliseconds

bool isFullAlertPrinted = false;
bool isLidOpenedAlertPrinted = false;

// CORS setup
void addCORS() {
  server.sendHeader("Access-Control-Allow-Origin", "*");
  server.sendHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  server.sendHeader("Access-Control-Allow-Headers", "Content-Type");
}

void handleOptions() {
  addCORS();
  server.send(204);
}

void setup() {
  Serial.begin(115200);

  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  pinMode(TRIG_FILL_PIN, OUTPUT);
  pinMode(ECHO_FILL_PIN, INPUT);
  pinMode(BUZZER_PIN, OUTPUT);
  pinMode(BUTTON_PIN, INPUT_PULLUP);
  digitalWrite(BUZZER_PIN, LOW);

  dustbinLid.attach(SERVO_PIN);
  dustbinLid.write(0);  // Start with lid closed

  // Connect to WiFi
  WiFi.begin(ssid, password);
  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    if (++attempts > 20) {
      ESP.restart();
    }
  }

  // REST API Endpoints
  server.on("/fill", HTTP_GET, []() {
    addCORS();
    server.send(200, "text/plain", String((int)fillLevel));
  });

  server.on("/lid/open", HTTP_POST, []() {
    addCORS();
    if (fillLevel < 80) {
      openLid();
      server.send(200, "text/plain", "Lid opened (manual)");
    } else {
      server.send(403, "text/plain", "Bin is full. Cannot open lid.");
    }
  });

  server.on("/lid/close", HTTP_POST, []() {
    addCORS();
    closeLid();
    server.send(200, "text/plain", "Lid closed");
  });

  // CORS Preflight
  server.on("/fill", HTTP_OPTIONS, handleOptions);
  server.on("/lid/open", HTTP_OPTIONS, handleOptions);
  server.on("/lid/close", HTTP_OPTIONS, handleOptions);

  server.begin();
}

void loop() {
  server.handleClient();

  // Read Fill Level
  float fillDistance = getDistance(TRIG_FILL_PIN, ECHO_FILL_PIN);
  if (fillDistance > 0 && fillDistance <= BIN_HEIGHT) {
    float range = BIN_HEIGHT - FULL_DISTANCE;
    float rawFill = ((BIN_HEIGHT - fillDistance) / range) * 100.0;
    fillLevel = constrain(rawFill, 0.0, 100.0);
  } else {
    fillLevel = 0;
  }

  // Print Distance and Fill Level
  Serial.print("📏 Distance: ");
  Serial.print(fillDistance);
  Serial.print(" cm | Fill Level: ");
  Serial.print(fillLevel);
  Serial.println(" %");

  // Full bin alert
  if (fillLevel >= 80 && !isFullAlertPrinted) {
    digitalWrite(BUZZER_PIN, HIGH);
    closeLid();
    Serial.println("🚨 Alert: Dustbin is full!");
    isFullAlertPrinted = true;
  } else if (fillLevel < 80) {
    digitalWrite(BUZZER_PIN, LOW);
    isFullAlertPrinted = false;
  }

  // Proximity sensor open
  float objectDistance = getDistance(TRIG_PIN, ECHO_PIN);
  if (objectDistance > 0 && objectDistance < 20 && !lidOpen && fillLevel < 80 && !isLidOpenedAlertPrinted) {
    openLid();
    Serial.println("🟢 Lid opened: proximity sensor triggered");
    isLidOpenedAlertPrinted = true;
  }

  // Button press open
  if (digitalRead(BUTTON_PIN) == LOW && !lidOpen && fillLevel < 80 && !isLidOpenedAlertPrinted) {
    openLid();
    Serial.println("🟢 Lid opened: manual button");
    delay(300); // Debounce
    isLidOpenedAlertPrinted = true;
  }

  // Auto-close lid
  if (lidOpen && millis() - lidOpenTime > lidDelay) {
    closeLid();
  }

  if (!lidOpen) {
    isLidOpenedAlertPrinted = false;
  }

  delay(100);
}

float getDistance(int trigPin, int echoPin) {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  long duration = pulseIn(echoPin, HIGH, 30000); // 30 ms timeout
  if (duration == 0) return -1;
  float distance = (duration * 0.0343) / 2;
  return distance > 0 ? distance : -1;
}

void openLid() {
  dustbinLid.write(180);
  lidOpen = true;
  lidOpenTime = millis();
}

void closeLid() {
  dustbinLid.write(0);
  lidOpen = false;
}