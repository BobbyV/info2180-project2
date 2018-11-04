//The animation and transition Extra Feature was implemented
//id: 620044870
var space=15; //Empty tile
var move="none";// direction
var boxes1;//Array of tiles
var counter=0;
var adder=0;
var str;
var inProgress= false;//Is tile still moving..

//Loads tiles when webpage loads
window.onload = function(){
	var boxes = document.getElementById('puzzlearea').getElementsByTagName('div');
	boxes1=boxes;
	var btn = document.getElementById('shufflebutton');
	btn.onclick=shuffle;
	for(var i=0; i<boxes.length;i++){
		boxes[i].className = 'puzzlepiece';
		boxes[i].onmouseover = canMove;
		boxes[i].onmouseout = clear;
		boxes[i].onclick = moveTile;

		if(i>=0 && i<=3){
			boxes[i].style.left+=i*100+'px';
			boxes[i].style.top=0+'px';
			boxes[i].style.backgroundPosition = -i*100+'px '+'0px';
		}else if(i>=4 && i<=7){
			boxes[i].style.left+=(i-4)*100+'px';
			boxes[i].style.top=100+'px';
			boxes[i].style.backgroundPosition = -(i-4)*100+'px '+'-100px';
		}else if(i>=8 && i<=11){
			boxes[i].style.left+=(i-8)*100+'px';
			boxes[i].style.top=200+'px';
			boxes[i].style.backgroundPosition = -(i-8)*100+'px '+'-200px';
		}else{
			boxes[i].style.left+=(i-12)*100+'px';
			boxes[i].style.top=300+'px';
			boxes[i].style.backgroundPosition = -(i-12)*100+'px '+'-300px';
		}
		
	}
};

//Check if tile can move
function canMove(){
	if(!inProgress){
		if((parseInt(this.style.left)+parseInt(this.offsetWidth)) === parseInt(getX()) && this.style.top===getY()){
		this.className = this.className + " movablepiece";
		move="right";
		}else if(parseInt(this.style.left) === (parseInt(getX())+parseInt(this.offsetWidth)) && this.style.top===getY()){
			this.className = this.className + " movablepiece";
			move= "left";
		}else if((parseInt(this.style.top)+parseInt(this.offsetHeight)) === parseInt(getY()) && this.style.left===getX()){
			this.className = this.className + " movablepiece";
			move= "down";
		}else if(parseInt(this.style.top) === (parseInt(getY())+parseInt(this.offsetHeight)) && this.style.left===getX()){
			this.className = this.className + " movablepiece";
			move= "up";
		}else{
			move= "none";
		}
	}
	

}

//remove .moveablepiece class when mouse exits tile
function clear(){
	this.className = 'puzzlepiece';
}

//Check method for shuffle
function canMove1(elmt){
	if((parseInt(elmt.style.left)+parseInt(elmt.offsetWidth)) === parseInt(getX()) && elmt.style.top===getY()){
		move="right";
		return "right";
	}else if(parseInt(elmt.style.left) === (parseInt(getX())+parseInt(elmt.offsetWidth)) && elmt.style.top===getY()){
		move= "left";
		return "left";
	}else if((parseInt(elmt.style.top)+parseInt(elmt.offsetHeight)) === parseInt(getY()) && elmt.style.left===getX()){
		move= "down";
		return "down";
	}else if(parseInt(elmt.style.top) === (parseInt(getY())+parseInt(elmt.offsetHeight)) && elmt.style.left===getX()){
		move= "up";
		return "up";
	}else{
		move= "none";
		return "none";
	}

}

//Animates tile movement
function shift(){
	var indx = 0;
	for(var i=0; i<boxes1.length;i++){
		if(boxes1[i].textContent===str){
			indx=i;	
		}
	}
	
	if(adder!=100){
		if(move==="left" || move==="right"){
			boxes1[indx].style.left=parseInt(boxes1[indx].style.left)+counter+'px';
		}else{
			boxes1[indx].style.top=parseInt(boxes1[indx].style.top)+counter+'px';
		}
		adder+=1;
		inProgress=true;
		setTimeout("shift()", "1 * 1000");
	}else{
		adder=0;
		inProgress=false;
		move="none";
	}	
	
}

//Gets direction and then calls shift() to move tile
function moveTile(){
	if(!inProgress){
		switch(move){
		case "right":
		counter=1;
		space-=1;
		str=this.textContent;
		shift();
		break;
		case "left":
		counter=-1;
		space+=1;
		str=this.textContent;
		shift();
		break;
		case "down":
		counter=1;
		space-=4;
		str=this.textContent;
		shift();
		break;
		case "up":
		counter=-1;
		space+=4;
		str=this.textContent;
		shift();
		break;

	}
	}
}

//Move method for shuffle
function moveTile1(elmt){
	
	switch(move){
		case "right":
		elmt.style.left=parseInt(elmt.style.left)+100+'px';
		space-=1;
		break;
		case "left":
		elmt.style.left=parseInt(elmt.style.left)-100+'px';
		space+=1;
		break;
		case "down":
		elmt.style.top=parseInt(elmt.style.top)+100+'px';
		space-=4;
		break;
		case "up":
		elmt.style.top=parseInt(elmt.style.top)-100+'px';
		space+=4;
		break;

		default:


	}
}

//shuffles tiles
function shuffle(){
	var num=100;
	for(var i =0; i<num; i++){
		var lst = [];
		for(var i1 =0; i1<boxes1.length; i1++){
			if(canMove1(boxes1[i1])!="none"){
				lst.push(i1);
			}

		}
		if(lst.length!=0){
			var n = lst[Math.floor((Math.random()*lst.length)+0)];
			canMove1(boxes1[n]);
			moveTile1(boxes1[n]);
		}
	}
	move="none";
}

//Returns the corresponding X for the empty tile
function getX(){
		if(space>=0 && space<=3){
			return space*100+'px';
		}else if(space>=4 && space<=7){
			return (space-4)*100+'px';
			
		}else if(space>=8 && space<=11){
			return (space-8)*100+'px';
			
		}else{
			return (space-12)*100+'px';
			
		}
		//return 0;
}

//Returns the corresponding Y for the empty tile
function getY(){
	if(space>=0 && space<=3){
			return '0px';
		}else if(space>=4 && space<=7){
			return '100px';
			
		}else if(space>=8 && space<=11){
			return '200px';
			
		}else{
			return '300px';
			
		}
}