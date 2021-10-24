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
/*var dataPvPathSend ='send/PV';
var dataSpPathSend ='send/SP';
var dataOvPathSend ='send/OV';
var dataKpPathSend ='send/KP';
var dataKiPathSend ='send/KI';
var dataKdPathSend ='send/KD';
var dataTiPathSend ='send/TI';
var dataTdPathSend ='send/TD';
var dataPtPathSend ='send/PT';*/
var dataPathSend = 'send/';



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
/*const databaseSPsend = database.ref(dataSpPathSend);
const databaseOVsend = database.ref(dataOvPathSend);
const databaseKPsend = database.ref(dataKpPathSend);
const databaseKIsend = database.ref(dataKiPathSend);
const databaseKDsend = database.ref(dataKdPathSend);
const databaseTIsend = database.ref(dataTiPathSend);
const databaseTDsend = database.ref(dataTdPathSend);
const databasePTsend = database.ref(dataPtPathSend);
const databasePVsend = database.ref(dataPvPathSend);*/
const databaseSend = database.ref(dataPathSend);


// Variables to save database current values
var floatReading;
var intReading;
var PV,OV,KP,KI,KD,TI,TD,PT,SP,New_Value;

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

databaseKP.on('value', (snapshot) => {
  KP = snapshot.val()
   document.getElementById("read-KP").innerHTML = KP;
})

databaseKI.on('value', (snapshot) => {
  KI = snapshot.val()
  document.getElementById("read-KI").innerHTML = KI;
})

databaseKD.on('value', (snapshot) => {
  KD = snapshot.val()
  document.getElementById("read-KD").innerHTML = KD;
})

databaseTI.on('value', (snapshot) => {
  TI = snapshot.val()
  document.getElementById("read-TI").innerHTML = TI;
})

databaseTD.on('value', (snapshot) => {
  TD = snapshot.val()
  document.getElementById("read-TD").innerHTML = TD;
})

databasePT.on('value', (snapshot) => {
   PT = snapshot.val()
   document.getElementById("read-PT").innerHTML = PT;
 })
 //document.getElementById("read-KP").innerHTML = '10';
 var b_envia_KP = document.getElementById("envia-KP")
 var b_envia_SP = document.getElementById("envia-SP")
//if(New_Value =='lido'){
 b_envia_KP.addEventListener("click", function() {
  //document.getElementById("read-KP").innerHTML = '17';
    var dado_lido = Number(window.document.querySelector('input#kp').value)
    databaseSend.update({
      KP:dado_lido,
      New_Value : 'KP'
    });
    
 })

 b_envia_SP.addEventListener("click", function() {
  var dado_lido =Number(window.document.querySelector('input#level').value)
  databaseSend.update({
    SP:dado_lido,
    New_Value :'SP'
  });
  
})//}
