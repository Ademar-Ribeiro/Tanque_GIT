/*
  Rui Santos
  Complete project details at our blog.
    - ESP32: https://RandomNerdTutorials.com/esp32-firebase-realtime-database/
    - ESP8266: https://RandomNerdTutorials.com/esp8266-nodemcu-firebase-realtime-database/
  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files.
  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
  Based in the RTDB Basic Example by Firebase-ESP-Client library by mobizt
  https://github.com/mobizt/Firebase-ESP-Client/blob/main/examples/RTDB/Basic/Basic.ino
*/

#include <Arduino.h>
#if defined(ESP32)
  #include <WiFi.h>
#elif defined(ESP8266)
  #include <ESP8266WiFi.h>
#endif
#include <Firebase_ESP_Client.h>

//Provide the token generation process info.
#include "addons/TokenHelper.h"
//Provide the RTDB payload printing info and other helper functions.
#include "addons/RTDBHelper.h"

// Insert your network credentials
#define WIFI_SSID "Desktop_F3426606"
#define WIFI_PASSWORD "01483211"

// Insert Firebase project API Key
#define API_KEY "AIzaSyBfe8voKhkZX2sEratzomMX1JnfZDmqySA" /*"AIzaSyAmGo0erkvDRUflLCcQvyIgLvPnGlFO2gA"*/

// Insert RTDB URLefine the RTDB URL */
#define DATABASE_URL "https://tanque-unisal-default-rtdb.firebaseio.com/" /*"https://esp32-firebase-demo-8e068-default-rtdb.firebaseio.com/" */

//Define Firebase Data object
FirebaseData fbdo;
#include <SoftwareSerial.h>
//SoftwareSerial Myserial(1,2);
FirebaseAuth auth;
FirebaseConfig config;

unsigned long sendDataPrevMillis = 0;
int count = 0, SP = 10,OV = 5,KP =1,KD,KI,TI,PT,TD,PV,FBSP,FBOV,FBKP,FBKD,FBKI,FBTI,FBPT,FBTD,FBPV;
bool signupOK = false;
int intValue;
float floatValue;
String FBNew_Value = "lido";

void setup(){
  Serial.begin(115200);
  //Myserial.begin(1200);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED){
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();

  /* Assign the api key (required) */
  config.api_key = API_KEY;

  /* Assign the RTDB URL (required) */
  config.database_url = DATABASE_URL;

  /* Sign up */
  if (Firebase.signUp(&config, &auth, "", "")){
    Serial.println("ok");
    signupOK = true;
  }
  else{
    Serial.printf("%s\n", config.signer.signupError.message.c_str());
  }

  /* Assign the callback function for the long running token generation task */
  config.token_status_callback = tokenStatusCallback; //see addons/TokenHelper.h
  
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
}

void loop(){
  if (Firebase.ready() && signupOK && (millis() - sendDataPrevMillis > 15000 || sendDataPrevMillis == 0)){
    sendDataPrevMillis = millis();
    // Write an Int number on the database path test/int
    if (Firebase.RTDB.setInt(&fbdo, "test/int", count)){
      Serial.println("PASSED");
      Serial.println("PATH: " + fbdo.dataPath());
      Serial.println("TYPE: " + fbdo.dataType());
    }
    else {
      Serial.println("FAILED");
      Serial.println("REASON: " + fbdo.errorReason());
    }
    count++;
    
    // Write an Float number on the database path test/float
    if (Firebase.RTDB.setFloat(&fbdo, "test/float", 0.01 + random(0,100))){
      Serial.println("PASSED");
      Serial.println("PATH: " + fbdo.dataPath());
      Serial.println("TYPE: " + fbdo.dataType());
    }
    else {
      Serial.println("FAILED");
      Serial.println("REASON: " + fbdo.errorReason());
    }
    if (Firebase.RTDB.getInt(&fbdo, "/test/int")) {
      if (fbdo.dataType() == "int") {
        intValue = fbdo.intData();
        Serial.println(intValue);
      }
    }
    else {
      Serial.println(fbdo.errorReason());
    }
    
    if (Firebase.RTDB.getFloat(&fbdo, "/test/float")) {
      if (fbdo.dataType() == "float") {
        floatValue = fbdo.floatData();
        Serial.println(floatValue);
      }
    }
    else {
      Serial.println(fbdo.errorReason());
    }
  /////////////////////////////////////////////////////////////////////////
  ////////INICIO DE ROTINA VERIFICA SE DADO NOVO VINDO DO FIREBASE/////////
  ////////////////////////////////////////////////////////////////////////
  if (Firebase.RTDB.getString(&fbdo, "send/New_Value")) {
      if (fbdo.dataType() == "string") {
        FBNew_Value = fbdo.stringData();
        Serial.println(FBNew_Value);
        if (FBNew_Value !="lido")
        {
         if (FBNew_Value =="KP")
         {
           Firebase.RTDB.getInt(&fbdo, "/send/KP");
           FBKP=fbdo.intData();
           Firebase.RTDB.setString(&fbdo, "send/New_Value", "lido");
           KP=FBKP;
           Serial.println(FBKP);
         }
         //Serial.print(FBNew_Value);
        }
        
      }
    }
    else {
      Serial.println(fbdo.errorReason());
    }
  
  if (!Firebase.RTDB.setInt(&fbdo, "read/SP", SP) || //SP = 10,OV = 5,KP =1,KD,KI,TI,PT,TD;
  !Firebase.RTDB.setInt(&fbdo, "read/PV", PV) ||
  !Firebase.RTDB.setInt(&fbdo, "read/OV", OV) || 
  !Firebase.RTDB.setInt(&fbdo, "read/KP", KP) ||
  !Firebase.RTDB.setInt(&fbdo, "read/KD", KD) ||
  !Firebase.RTDB.setInt(&fbdo, "read/KI", KI) ||
  !Firebase.RTDB.setInt(&fbdo, "read/TI", TI) ||
  !Firebase.RTDB.setInt(&fbdo, "read/TD", TD) ||
  !Firebase.RTDB.setInt(&fbdo, "read/PT", PT)){
     Serial.println("FAILED");
     Serial.println("REASON: " + fbdo.errorReason());
    }
    
  } 
}