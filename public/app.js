// Complete Project Details at: https://RandomNerdTutorials.com/

// Database Paths //SP = 10,OV = 5,KP =1,KD,KI,TI,PT,TD;
var dataPathSend = 'send/';
var dataSystemPath = 'read/Data_sistema';
var dataPathRead = 'read/';



// Get a database reference 
const databaseSystem = database.ref(dataSystemPath);

const databaseSend = database.ref(dataPathSend);
const databaseRead = database.ref(dataPathRead);


// Variables to save database current values
var floatReading;
var intReading;
var PV,OV,SP,New_Value, SystemAtualData,SystemParameter;
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
  Atualiza_dados();

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
  // ctxtitulo.textBaseline = "middle";
  // ctxtitulo.fillStyle = "yellow";
	// ctxtitulo.fillText("SP", 300, 15);
  // ctxtitulo.fillStyle = "white";
	// ctxtitulo.fillText("PV", 450, 15);
  // ctxtitulo.fillStyle = "red";
	// ctxtitulo.fillText("OV", 600, 15);
function desenharGrafico() {
	//define o avanço horizontal
	x+=1;
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
  ctxtitulo.fillStyle = "black";
	ctxtitulo.fillRect(0, 0, largura, 40);
  ctxtitulo.textBaseline = "middle";
  ctxtitulo.fillStyle = "yellow";
	ctxtitulo.fillText('SP'+ SP, 200, 15);
  ctxtitulo.fillStyle = "white";
	ctxtitulo.fillText('PV'+ PV, 400, 15);
  ctxtitulo.fillStyle = "red";
	ctxtitulo.fillText('OV'+OV, 600, 15);
  
  

	

if(x >= largura) {
  x = 0;
ctx.clearRect(0, 0, largura, altura);
sp_anterior = 0 , pv_anterior = 0, ov_anterior = 0, x_anterior =0;
//ctx.fillStyle = "black";
//	ctx.fillRect(0, 0, largura, 30);
//ctx.fillStyle = "yellow";
//	ctx.fillText("SP", 100, 20);
//  ctx.fillStyle = "white";
//	ctx.fillText("PV", 200, 20);
//  ctx.fillStyle = "red";
//	ctx.fillText("OV", 300, 20);
ctx.fillStyle = "black";
ctx.fillRect(0, 0, largura, altura);
//ctx.font = "30px Courier";
}	

};
  
setInterval(desenharGrafico, 100);

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
setInterval(Atualiza_dados,200);

  var b_envia_SP = document.getElementById("envia-SP")
  var b_envia_KP = document.getElementById("envia-KP")
  var b_envia_KD = document.getElementById("envia-KD")
  var b_envia_KI = document.getElementById("envia-KI")
  var b_envia_TI = document.getElementById("envia-TI")
  var b_envia_TD = document.getElementById("envia-TD")
  var b_envia_OV = document.getElementById("envia-OV")
  var b_envia_PT = document.getElementById("envia-PT")
  var b_liga = document.getElementById("liga")
  var b_desliga = document.getElementById("desliga")

 //if(New_Value =='lido'){
  b_envia_SP.addEventListener("click", function() {
    var dado_lido =('000' + String(window.document.querySelector('input#setpoint').value)).slice(-3)
    databaseSend.update({
      //SP:dado_lido,
      New_Value :'S'+dado_lido+'P'
    }); 
  })

 b_envia_KP.addEventListener("click", function() {
  //document.getElementById("read-KP").innerHTML = '17';
    var dado_lido =('000' + String(window.document.querySelector('input#kp').value)).slice(-3)
      databaseSend.update({
     // KP:dado_lido,
      New_Value : 'K'+dado_lido+'P'
    });  
 })

 b_envia_KD.addEventListener("click", function() {
  var dado_lido =('000' + String(window.document.querySelector('input#kd').value)).slice(-3)
  databaseSend.update({
    //SP:dado_lido,
    New_Value :'K'+dado_lido+'D'
  });
})

b_envia_KI.addEventListener("click", function() {
  var dado_lido =('000' + String(window.document.querySelector('input#ki').value)).slice(-3)
  databaseSend.update({
    //SP:dado_lido,
    New_Value :'K'+dado_lido+'I'
  });
})

b_envia_TI.addEventListener("click", function() {
  var dado_lido =('000' + String(window.document.querySelector('input#ti').value)).slice(-3)
  databaseSend.update({
    //SP:dado_lido,
    New_Value :'T'+dado_lido+'I'
  });
})

b_envia_TD.addEventListener("click", function() {
  var dado_lido =('000' + String(window.document.querySelector('input#td').value)).slice(-3)
  databaseSend.update({
    //SP:dado_lido,
    New_Value :'T'+dado_lido+'D'
  });
})

// b_envia_OV.addEventListener("click", function() {
//   var dado_lido =('000' + String(window.document.querySelector('input#v').value)).slice(-3)
//   databaseSend.update({
//     //SP:dado_lido,
//     New_Value :'O'+dado_lido+'V'
//   });
// })

b_envia_PT.addEventListener("click", function() {
  var dado_lido =('000' + String(window.document.querySelector('input#pt').value)).slice(-3)
  databaseSend.update({
    //SP:dado_lido,
    New_Value :'P'+dado_lido+'T'
  });
})

b_liga.addEventListener("click", function() {
  databaseSend.update({
    New_Value: 'L000C'
  });
})

b_desliga.addEventListener("click", function() {
  databaseSend.update({
    New_Value: 'D000C'
  });
})