// Complete Project Details at: https://RandomNerdTutorials.com/

// Database Paths //SP = 10,OV = 5,KP =1,KD,KI,TI,PT,TD;
var dataFloatPath = 'test/float';
var dataIntPath = 'test/int';
var dataPvPath ='read/PV';
var dataSpPath ='read/SP';
var dataOvPath ='read/OV';
var dataKpPath ='read/KP';
var dataKiPath ='read/KI';
var dataKdPath ='read/KD';
var dataTiPath ='read/TI';
var dataTdPath ='read/TD';
var dataPtPath ='read/PT';

// Get a database reference 
const databaseFloat = database.ref(dataFloatPath);
const databaseInt = database.ref(dataIntPath);
const databaseSP = database.ref(dataSpPath);
const databaseOV = database.ref(dataOvPath);
const databaseKP = database.ref(dataKpPath);
const databaseKI = database.ref(dataKiPath);
const databaseKD = database.ref(dataKdPath);
const databaseTI = database.ref(dataTiPath);
const databaseTD = database.ref(dataTdPath);
const databasePT = database.ref(dataPtPath);
const databasePV = database.ref(dataPvPath);


// Variables to save database current values
var floatReading;
var intReading;
var PV,OV,KP,KI,KD,TI,TD,PT,SP;

// Attach an asynchronous callback to read the data
databaseInt.on('value', (snapshot) => {
  intReading = snapshot.val();
  console.log(intReading);
  document.getElementById("reading-int").innerHTML = intReading;
}, (errorObject) => {
  console.log('The read failed: ' + errorObject.name);
});

databaseSP.on('value', (snapshot) => {
  SP = snapshot.val()
  document.getElementById("read-SP").innerHTML = SP;
})

databaseOV.on('value', (snapshot) => {
  OV = snapshot.val()
  document.getElementById("read-OV").innerHTML = OV;
})

databasePV.on('value', (snapshot) => {
  PV = snapshot.val()
  document.getElementById("read-PV").innerHTML = PV;
})
 