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
var dataPathSend = 'send/';
var dataSystemPath = 'read/Data_sistema';
var dataPathRead = 'read/';



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
const databaseSystem = database.ref(dataSystemPath);
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
const databaseRead = database.ref(dataPathRead);


// Variables to save database current values
var floatReading;
var intReading;
var PV,OV,KP,KI,KD,TI,TD,PT,SP,New_Value, SystemAtualData,SystemParameter,SystemData;
var SystemAtualDataArray = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
// Attach an asynchronous callback to read the data
databaseSystem.on('value', (snapshot) => {
SystemAtualData = snapshot.val();
//var  tamanho = String.length(SystemData);
SystemAtualDataArray = SystemAtualData.split(",");
databaseRead.update({
  SystemParameter:SystemAtualDataArray,
    //New_Value : SystemData
  })
  
     
})


window.onload = function(){
  
  var canvas = document.getElementById("canvasGrafico");
  var canvastitulo = document.getElementById("tituloGrafico");

	if (canvas) {
		//altura da canvas
var altura = 200;
//largura da canvas
var largura = 1000;
//posição horizontal inicial do gráfico
var x = 0;
//valor dos pontos do gráfico, que será alterado aleatoriamente
var valor;

//formatando a canvas
canvas.setAttribute("width", largura);
canvas.setAttribute("height", altura);
canvastitulo.setAttribute("width", largura);
canvastitulo.setAttribute("height", 40);

//obtendo o contexto 2d
var ctx = canvas.getContext("2d");
var ctxtitulo = canvastitulo.getContext("2d");
var sp_anterior = 0 , pv_anterior = 0, ov_anterior = 0, x_anterior =0;
ctx.fillStyle = "black";
ctx.fillRect(0, 0, largura, altura);
ctxtitulo.font = "30px Courier";
//desenha um retangulo onde está sendo escrito o valor do gráfico
	ctxtitulo.fillStyle = "black";
	ctxtitulo.fillRect(0, 0, largura, 40);
	//desenha o texto indicando o valor do gráfico, na posição x atual
  ctxtitulo.textBaseline = "middle";
  ctxtitulo.fillStyle = "yellow";
	ctxtitulo.fillText("SP", 300, 15);
  ctxtitulo.fillStyle = "white";
	ctxtitulo.fillText("PV", 450, 15);
  ctxtitulo.fillStyle = "red";
	ctxtitulo.fillText("OV", 600, 15);
function desenharGrafico() {
	//define o avanço horizontal
	x+=3;
	//gera um valor aleatório entre 0 e 100
	SP = Number (SystemAtualDataArray[2]);
  PV = Number (SystemAtualDataArray[4]);
  OV = Number (SystemAtualDataArray[6]);
	//desenha uma linha até a posição gerada
  ctx.beginPath();
  ctx.strokeStyle = "yellow";
  ctx.lineWidth = 3;
  ctx.moveTo(x_anterior,sp_anterior);
  ctx.lineTo(x, altura-SP-10);
  ctx.stroke();

  ctx.beginPath();
  ctx.strokeStyle = "white";
  ctx.lineWidth = 3;
  ctx.moveTo(x_anterior,pv_anterior);
  ctx.lineTo(x, altura-PV-10);
  ctx.stroke();

  ctx.beginPath();
  ctx.strokeStyle = "red";
  ctx.lineWidth = 3;
  ctx.moveTo(x_anterior,ov_anterior);
  ctx.lineTo(x, altura-OV-10);
  ctx.stroke();
  //ctx.strokeStyle = "white";
  x_anterior = x;
  sp_anterior = (altura - SP-10);
  pv_anterior = (altura - PV-10);
  ov_anterior = (altura - OV-10);
  
  
  
  

	

if(x >= largura) {
  x = 0;
ctx.clearRect(0, 0, largura, altura);
sp_anterior = 0 , pv_anterior = 0, ov_anterior = 0, x_anterior =0;
ctx.fillStyle = "black";
	ctx.fillRect(0, 0, largura, 30);
ctx.fillStyle = "yellow";
	ctx.fillText("SP", 100, 20);
  ctx.fillStyle = "white";
	ctx.fillText("PV", 200, 20);
  ctx.fillStyle = "red";
	ctx.fillText("OV", 300, 20);
ctx.fillStyle = "black";
ctx.fillRect(0, 0, largura, altura);
//ctx.font = "30px Courier";
}	

};
  
setInterval(desenharGrafico, 50);

}
};


 


function Atualiza_dados(){

  document.getElementById("read-SP").innerHTML = SystemAtualDataArray[2];
  document.getElementById("read-PV").innerHTML = SystemAtualDataArray[4];
  document.getElementById("read-OV").innerHTML = SystemAtualDataArray[6];
  document.getElementById("read-KP").innerHTML = SystemAtualDataArray[8];
  document.getElementById("read-KI").innerHTML = SystemAtualDataArray[10];
  document.getElementById("read-KD").innerHTML = SystemAtualDataArray[12];
  document.getElementById("read-TI").innerHTML = SystemAtualDataArray[14];
  document.getElementById("read-TD").innerHTML = SystemAtualDataArray[16];
}
setInterval(Atualiza_dados,500);
//databaseInt.on('value', (snapshot) => {
//  intReading = snapshot.val();
//  console.log(intReading);
//  document.getElementById("reading-int").innerHTML = intReading;
//}, (errorObject) => {
//  console.log('The read failed: ' + errorObject.name);
//});

// databaseSP.on('value', (snapshot) => {
//   SP = snapshot.val()
//   document.getElementById("read-SP").innerHTML = SP;
// })

// databaseOV.on('value', (snapshot) => {
//   OV = snapshot.val()
//   document.getElementById("read-OV").innerHTML = OV;
// })
/*
databasePV.on('value', (snapshot) => {
  PV = snapshot.val()
  document.getElementById("read-PV").innerHTML = PV;
})

// databaseKP.on('value', (snapshot) => {
//   KP = snapshot.val()
//    document.getElementById("read-KP").innerHTML = KP;
// })

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
 //document.getElementById("read-KP").innerHTML = '10';*/
 var b_envia_KP = document.getElementById("envia-KP")
 var b_envia_SP = document.getElementById("envia-SP")
//if(New_Value =='lido'){
 b_envia_KP.addEventListener("click", function() {
  //document.getElementById("read-KP").innerHTML = '17';
    var dado_lido =('000' + String(window.document.querySelector('input#kp').value)).slice(-3)
      databaseSend.update({
      KP:dado_lido,
      New_Value : 'KP'
    });
    
 })


 b_envia_SP.addEventListener("click", function() {
  var dado_lido =('000' + String(window.document.querySelector('input#level').value)).slice(-3)
  databaseSend.update({
    SP:dado_lido,
    New_Value :'SP'
  });
  
})//}
