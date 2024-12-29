#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include "DHTesp.h"
#include "config.h"

// Server URLs
String serverUrl = String(baseURL) + "/temperature";
String animalIdUrl = String(baseURL) + "/animalId";

const int DHT_PIN = 15;
DHTesp dhtSensor;

String animalId;

void setup_wifi() {
  Serial.println("Connecting to WiFi...");
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\nWiFi connected");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
}

void getAnimalId() {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;

    Serial.print("Getting animalId from: ");
    Serial.println(animalIdUrl + "?secret=" + deviceSecret);

    http.begin(animalIdUrl + "?secret=" + deviceSecret);
    http.addHeader("Content-Type", "application/json");

    int httpCode = http.GET();

    if (httpCode == HTTP_CODE_OK) {
      String response = http.getString();
      Serial.print("AnimalId response: ");
      Serial.println(response);

      DynamicJsonDocument doc(1024);
      deserializeJson(doc, response);
      animalId = doc["animalId"].as<String>();
      Serial.print("AnimalId: ");
      Serial.println(animalId);
    } else {
      Serial.print("Error on getting animalId: ");
      Serial.println(httpCode);
    }

    http.end();
    Serial.println("--------------------");
  }
}

void sendData(float temperature) {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;

    Serial.print("Sending data to: ");
    Serial.println(serverUrl);

    http.begin(serverUrl);
    http.addHeader("Content-Type", "application/json");

    DynamicJsonDocument doc(1024);
    doc["temperature"] = temperature;
    doc["animalId"] = animalId;
    doc["secret"] = deviceSecret;

    String requestBody;
    serializeJson(doc, requestBody);

    int httpCode = http.POST(requestBody);
    Serial.print("Data HTTP Response code: ");
    Serial.println(httpCode);

    String response = http.getString();
    Serial.print("Data response: ");
    Serial.println(response);
    Serial.println(httpCode);

    http.end();
    Serial.println("--------------------");
  }
}

void setup() {
  Serial.begin(115200);
  dhtSensor.setup(DHT_PIN, DHTesp::DHT22);
  setup_wifi();
  getAnimalId();
}

void loop() {
  TempAndHumidity data = dhtSensor.getTempAndHumidity();
  Serial.println("Temp: " + String(data.temperature, 2) + "°C");
  Serial.println("---");

  sendData(data.temperature);

  delay(10000); // Wait for a new reading from the sensor (DHT22 has ~0.5Hz sample rate)
}