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
#include <SoftwareSerial.h>


// Insert your network credentials
//#define WIFI_SSID "Galaxy A51D070"
//#define WIFI_PASSWORD "mwal1973"
#define WIFI_SSID "Desktop_F3426606"
#define WIFI_PASSWORD "01483211"
#define D6 12
#define D5 14
SoftwareSerial SSSerial(D6, D5); // RX, TX

// Insert Firebase project API Key
#define API_KEY "AIzaSyBfe8voKhkZX2sEratzomMX1JnfZDmqySA" /*"AIzaSyAmGo0erkvDRUflLCcQvyIgLvPnGlFO2gA"*/

// Insert RTDB URLefine the RTDB URL */
#define DATABASE_URL "https://tanque-unisal-default-rtdb.firebaseio.com/" /*"https://esp32-firebase-demo-8e068-default-rtdb.firebaseio.com/" */



//Define Firebase Data object
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

unsigned long sendDataPrevMillis = 0;
int count = 0, SP = 10,OV = 5,KP =1,KD,KI,TI,PT,TD,PV;
bool signupOK = false;
int intValue;
float floatValue;
String FBNew_Parameter = "lido";
String FBKP, FBSP ,FBOV,FBKD,FBKI,FBTI,FBPT,FBTD,FBPV,FBNew_Data;


void setup(){
  Serial.begin(115200);
  SSSerial.begin(2400);
  pinMode(D6,INPUT); //d7 is RX, receiver, so define it as input
  pinMode(D5,OUTPUT); //d8 is TX, transmitter, so define it as output 
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
  if (SSSerial.available() > 0)
   {
     Serial.write(SSSerial.read());
     
   }
  if (Firebase.ready() && signupOK && (millis() - sendDataPrevMillis > 15000 || sendDataPrevMillis == 0)){
    sendDataPrevMillis = millis();
    /* Write an Int number on the database path test/int
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
    ///
    /////
    Write an Float number on the database path test/float
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
    }*/
  /////////////////////////////////////////////////////////////////////////
  ////////INICIO DE ROTINA VERIFICA SE DADO NOVO VINDO DO FIREBASE/////////
  ////////////////////////////////////////////////////////////////////////
          if (Firebase.RTDB.getString(&fbdo, "send/New_Value")) {
              if (fbdo.dataType() == "string") {
                FBNew_Parameter = fbdo.stringData();
                Serial.println(".");
                if (FBNew_Parameter !="lido")
                {
                  Firebase.RTDB.getString(&fbdo, "/send/"+FBNew_Parameter);
                  FBNew_Data=fbdo.stringData();             
                if (FBNew_Parameter =="KP")FBKP=FBNew_Data;
                if (FBNew_Parameter =="SP")FBSP=FBNew_Data;
                if (FBNew_Parameter =="KD")FBKD=FBNew_Data;
                if (FBNew_Parameter =="KI")FBKI=FBNew_Data;
                if (FBNew_Parameter =="TI")FBTI=FBNew_Data;
                if (FBNew_Parameter =="TD")FBTD=FBNew_Data;
                if (FBNew_Parameter =="PT")FBPT=FBNew_Data;
/*
                Serial.print(FBNew_Parameter[0]);
                Serial.print(FBNew_Data[0]);
                Serial.print(FBNew_Data[1]);
                Serial.print(FBNew_Data[2]);
                Serial.println(FBNew_Parameter[1]);*/
                //if (FBNew_Value =="KD")FBKD=fbdo.intData();
                // Serial.println(fbdo.stringData());
                
                }
                
                }
                Firebase.RTDB.setString(&fbdo, "send/New_Value", "lido");
                SSSerial.write(FBNew_Parameter[0]);
                SSSerial.write(FBNew_Data[0]);
                SSSerial.write(FBNew_Data[1]);
                SSSerial.write(FBNew_Data[2]);
                SSSerial.write(FBNew_Parameter[1]);
              }
              
              else {
                Serial.println(fbdo.errorReason());
              }
  //grava os dados do sistema no Firebase
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