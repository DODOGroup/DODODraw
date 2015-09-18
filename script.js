var imgDB, intSelected;
var canvas, ctx
var boolDraw;
var functionList;
var inUseFunction;
var extractImg;

function init(){
	var div = document.getElementById("img");
	intSelected=0;
	functionList= loadFunction();
	imgDB = loadPhoto();
	extractImg = defaultImg;
	if(imgDB==undefined || imgDB.length==0){
		console.error("Error occurred in init. Operation aborted");
		return;
	}
	inUseFunction = function() {};
	canvas=document.getElementById("canvas");
	canvas.addEventListener("click",click);
	document.addEventListener("mousedown",function(){boolDraw=true;});
	document.addEventListener("mouseup",function(){boolDraw=false;});
	canvas.addEventListener("mousemove", mousemove);
	ctx=canvas.getContext('2d');
	ctx.canvas.width = window.innerWidth;
	ctx.canvas.height = window.innerHeight;
	menu();
	boolDraw=false;	
}
function mousemove(e){
	if( boolDraw && e.clientY>80 && e.clientX >80 )
	{ 
		inUseFunction(); 
		console.log(extractImg);
		ctx.drawImage(imgDB[extractImg(intSelected, imgDB.length)],e.clientX-20,e.clientY-20,40,40);
	}
}

function defaultImg(i){ return i; }

function click(e){
	var spaceB = canvas.width/imgDB.length;
	//menu superiore
	if(e.clientY<60) {
		for(var i = 0; i< imgDB.length;i++){
			if(e.clientX>=imgDB[i].xPos && e.clientX <=imgDB[i].xPos+40){
				intSelected=i;
				inUseFunction = function() { }
				extractImg = defaultImg;
				return;
			}
		}
	}else if(e.clientX < 60){
		for(var i = 0; i<functionList.length; i++){
			if(e.clientX >= functionList[i].xPos && e.clientX <=functionList[i].xPos+40){
				inUseFunction = window[functionList[i].dataset.todo];
				return;
			}
		}
	}
}
function loadFunction(){
	var toR = new Array();
	var id = 0;
	var output = document.getElementById("functions" + id);
	
	while(output != undefined){
		toR.push(output);
		id++;
		output=document.getElementById("functions" + id);
	}
	
	return toR;
}
function loadPhoto(){
	var toR= new Array();
	var id=0;
	var output = document.getElementById("foto" + id);

	while(output!=undefined){
		toR.push(output);
		id++;
		output=document.getElementById("foto" + id);
	}
	return toR;
}
function menu(){
	supMen();
	rightMen();
}
function supMen(){
	var spaceB = (canvas.width-40)/(imgDB.length-1);
	ctx.beginPath();
    ctx.rect(0, 0, canvas.width, 60);
    ctx.fillStyle = 'red';
	ctx.fill();
	for(var i = 0; i<imgDB.length; i++){
		imgDB[i].xPos=i*spaceB;
		ctx.drawImage(imgDB[i],i*spaceB + 3,10,40,40);
	}
}
function rightMen(){
	var spaceR = (canvas.height - 40) / functionList.length;
	ctx.beginPath();
	ctx.rect(0,60,60,canvas.height);
	ctx.fillStyle = 'blue';
	ctx.fill();
	for(var i = 0; i<functionList.length; i++){
		functionList[i].xPos = spaceR * i;
		ctx.drawImage(functionList[i],10,70 + (i*spaceR + 3),40,40);
	}
	//10 70
}