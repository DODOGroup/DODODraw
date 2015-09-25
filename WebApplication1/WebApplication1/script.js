var imgDB, intSelected;
var canvas, ctx
var boolDraw;
var functionList;
var inUseFunction;
var extractImg;
var singleImgH, singleImgW;
var defImgH = 40;
var defImgW = 40;

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
	canvas = document.getElementById("canvas");
    //eventi
	attatchEvents();
    //end enventi
	ctx=canvas.getContext('2d');
	ctx.canvas.width = window.innerWidth;
	ctx.canvas.height = window.innerHeight;
	menu();
	boolDraw = false;
	singleImgH = defImgH;
	singleImgW = defImgW;
}
function attatchEvents() {
    window.addEventListener("resize", init);
    canvas.addEventListener("click", click);
    document.addEventListener("mousedown", function () { boolDraw = true; });
    document.addEventListener("mouseup", function () { boolDraw = false; });
    canvas.addEventListener("mousemove", mousemove);
    canvas.addEventListener("mousedown" ,function(){document.getElementById("menu").style.display = "none"; });
    canvas.addEventListener("contextmenu", spawnDiv);
    canvas.addEventListener("touchstart", function (e) { console.log("click"); click(e); });
    document.addEventListener("touchstart", function () { console.log("startTuch"); boolDraw = true; });
    document.addEventListener("touchend", function () { console.log("endTuch"); boolDraw = false; });
    canvas.addEventListener("touchmove", function (w) { console.log("moving"); mousemove(w); });
}
function spawnDiv(e) {
    var k = document.getElementById("menu");
    k.style.display = "";
    k.style.top = e.clientY;
    k.style.left = e.clientX;
    document.getElementById("newH").value = singleImgH;
    document.getElementById("newW").value = singleImgW;
    document.body.appendChild(k);
    e.preventDefault(); //same   vvv
    return false; //dont spawn default one
}
function mousemove(e) {
    if (boolDraw && e.clientY > 80 && e.clientX > 80 && e.which != 3)
    {
		inUseFunction(); 
		ctx.drawImage(imgDB[extractImg(intSelected, imgDB.length)], e.clientX - singleImgW / 2, e.clientY - singleImgH / 2, singleImgW, singleImgH);
	}
}
function defaultImg(i){ return i; }
function click(e) {
    var spaceB = canvas.width / imgDB.length;
    document.getElementById("menu").style.display = "none"//nomenu on draw
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
	    for (var i = 0; i < functionList.length; i++) {
			if(e.clientY >= functionList[i].yPos && e.clientY <=functionList[i].yPos+40){
			    inUseFunction = window[functionList[i].dataset.todo];
			    inUseFunction();
				return;
			}
		}
	} else {
	    boolDraw = true;
	    mousemove(e); //click ora disegna
	    boolDraw = false;
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
	var spaceR = (canvas.height - 70) / functionList.length;
	ctx.beginPath();
	ctx.rect(0,60,60,canvas.height);
	ctx.fillStyle = 'blue';
	ctx.fill();
	for(var i = 0; i<functionList.length; i++){
	    functionList[i].yPos = 70 + (i * spaceR + 3);
		ctx.drawImage(functionList[i],10,70 + (i*spaceR + 3),40,40);
	}
	//10 70
}