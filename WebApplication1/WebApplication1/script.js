var imgDB, intSelected;
var canvas, ctx
var boolDraw;
var functionList;
var inUseFunction;
var extractImg;
var offset;

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
	offset  = getOffset(canvas);
	ctx.canvas.width = window.innerWidth;
	ctx.canvas.height = window.innerHeight;
	boolDraw=false;	
}
function mousemove(e){
	if( boolDraw && e.clientY>80 && e.clientX >80 )
	{ 
		inUseFunction(); 
		console.log(extractImg);
		ctx.drawImage(imgDB[extractImg(intSelected, imgDB.length)],(e.clientX-offset.left)-20,(e.clientY-offset.top)-20,40,40);
	}
}

function defaultImg(i) { return i; }
function setSelected(i) { intSelected = i; }

function click(e){
	var spaceB = canvas.width/imgDB.length;
	//menu superiore
	if(e.clientX < 60){
		for(var i = 0; i<functionList.length; i++){
			if(e.clientX >= functionList[i].xPos-offset.left && e.clientX <=(functionList[i].xPos-offset.top)+40){
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

function getOffset(obj) {
          var offsetLeft = 0;
          var offsetTop = 0;
          do {
            if (!isNaN(obj.offsetLeft)) {
                offsetLeft += obj.offsetLeft;
            }
            if (!isNaN(obj.offsetTop)) {
                offsetTop += obj.offsetTop;
            }   
          } while(obj = obj.offsetParent );
          return {left: offsetLeft, top: offsetTop};
      } 
