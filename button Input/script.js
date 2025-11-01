/*
 * IDB Programming: key logger
 *
 */

import * as Util from "./util.js";

// State variables are the parts of your program that change over time.
let Input = [];

let obj = {
  x : Math.random(), y : 0.5, width: 50, hight: 50, r: 1, h: 200, s: 20, l: 35, a:1    
}

let size = 100;
let width = 50;
let deg = 0;
let currX = 0; 
let currY = 0;
let newX = 0; 
let newY = 0; 
let momentom = 0.01; 
// Settings variables should contain all of the "fixed" parts of your programs
const fullAhead = 0.005;
const astern = 0.0025;
//Functions 
 function lineX (){
 return newX - currX; 
}

function lineY (){ 
 return newY - currY; 

/* if (Input.includes("KeyY") && deg === 15 || deg === -345){ 
  return (lineX () * (2-Math.sqrt(3)));
  }
  */
}



function move (start, line, M){
 return start + line * M;
}

function forward (){
 if ( deg === 0){
 newX += fullAhead; 
 }

 if ( deg === -90 || deg === 270){
 newY -= fullAhead;
 }

 if ( deg === 90 || deg === -270){
 newY += fullAhead;
 }
 if ( deg === -45 || deg === 315){
  newX += fullAhead;
  newY -= fullAhead;
 }
 if ( deg === 45 || deg === -315){
  newX += fullAhead;
  newY += fullAhead;
 } 
 if ( deg === 135 || deg === -225){
  newX -= fullAhead;
  newY += fullAhead;
 }
 if ( deg === -135 || deg === 225){
  newX -= fullAhead;
  newY -= fullAhead;
 }
 if ( Math.abs(deg) === 180){
 newX -= fullAhead;
 }

}

function backward (){
 if (deg === 0) {
  newX -= astern;
 }
 if ( deg === -90 || deg === 270){
 newY += astern;
 }

 if ( deg === 90 || deg === -270){
 newY -= astern;
 }
 if ( deg === -45 || deg === 315){
  newX -= astern;
  newY += astern;
 }
 if ( deg === 45 || deg === -315){
  newX -= astern;
  newY -= astern;
 } 
 if ( deg === 135 || deg === -225){
  newX += astern;
  newY -= astern;
 }
 if ( deg === -135 || deg === 225){
  newX += astern;
  newY += astern;
 }
 if ( Math.abs(deg) === 180){
 newX += astern;
 }
}

Util.setSize(size,width);

const mine1 = Util.createThing("mine1", "thing");
function layMines (obj , name ){
  const {x,y,width, hight, r, h, s, l, a } = obj
  Util.setPosition(x,y,name);
  Util.setSize(hight, width, name);
  Util.setColour(h, s, l, a, name);
  Util.setRoundedness(r)
 
}

// Code that runs over and over again
function loop() {
 if (Input.includes("KeyY")){
 forward();
 console.log("go");
 }
  if (Input.includes("KeyB")){
 backward();
 console.log("back");
 }
 console.log(deg);
 if (Input.includes("KeyH")){
  momentom = 0;
 } else {
  momentom = 0.01;
 }
  currX = move(currX,lineX(), momentom);
  currY = move(currY,lineY(), momentom);
 Util.setPosition(currX,currY);

console.log(`x: ${currX*innerWidth} , y: ${currY*innerHeight}`)
  if (deg === 360 || deg === -360) {
    deg = 0; 
  }
 Util.setRotation(deg);
 /* 


  if (Input[0] === "KeyB" && Input[1] === "KeyN"){
   backwards();
  }
 */
 //updateWindow() 
  window.requestAnimationFrame(loop);
}

// Setup is run once, at the start of the program. It sets everything up for us!
function setup() {

 layMines(obj, mine1 );

 

  // Put your event listener code here
document.addEventListener("keydown",(event) => {
  if (!event.repeat){ //? still invanitly spins 
 Input.push (event.code); 
  }
  if (Input.includes("KeyT")) {//here so that it only runs once per button press
   deg -= 45;  
  }
  if (Input.includes("KeyU")) {//here so that it only runs once per button press
   deg += 45;  
  }
});
document.addEventListener("keyup",(event) => {
  Input.splice (Input.indexOf(event.code), 1 );
  
});

  window.requestAnimationFrame(loop);
}


setup(); // Always remember to call setup()!
