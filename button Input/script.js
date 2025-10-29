/*
 * IDB Programming: key logger
 *
 */

import * as Util from "./util.js";

// State variables are the parts of your program that change over time.
let Input = [];
let size = 50;
let width = 100;
let oriantation = 0;
let startX = window.innerWidth / 2 - size / 2;
let startY = window.innerHeight / 2- size / 2;
// Settings variables should contain all of the "fixed" parts of your programs
const fullAhead = 5;
const astern = 1;
//other things 
function forward() {//would it be better to only run this only when KeyY is present thus removing checking it evey if statment
 //Forward (default)
  if (Input.includes("KeyY") && oriantation === 0){
   startY -= fullAhead;
  }
 // forward in bottom diagonal
  if (Input.includes("KeyY") && (oriantation === 135 || oriantation === -225)){
   startY += fullAhead;
   startX += fullAhead;
  }  
  if (Input.includes("KeyY") && (oriantation === -135 || oriantation === 225)){
   startY += fullAhead;
   startX -= fullAhead;
  }  
 // forward left and right
  if (Input.includes("KeyY") && (oriantation === 90 || oriantation === -270)){
   startX += fullAhead;
  }  
  if (Input.includes("KeyY") && (oriantation === -90 || oriantation === 270)){
   startX -= fullAhead;
  }
 // forward in top diagonal
  if (Input.includes("KeyY") && (oriantation === -45 || oriantation === 315)){
   startY -= fullAhead;
   startX -= fullAhead;
  }
  if (Input.includes("KeyY") && (oriantation === 45 || oriantation === -315)){
   startY -= fullAhead;
   startX += fullAhead;
  }
  //Forward (default fliped)
  if (Input.includes("KeyY") && (oriantation === 180 || oriantation === -180)){
   startY += fullAhead;
  }
}

function backwards () {// should forward be like this 
 //reverse (default)
  if (oriantation === 0){
   startY += astern;
  }
 //reverse in bottom diagonal
  if (oriantation === 135 || oriantation === -225){
   startY -= astern;
   startX -= astern;
  }
    if (oriantation === -135 || oriantation === 225){
   startY -= astern;
   startX += astern;
  }
 //reverse left and right
  if (oriantation === -90 || oriantation === 270){
   startX += astern;
  }
  if (oriantation === 90 || oriantation === -270){
   startX -= astern;
  }
 //reverse in top diagonal
  if (oriantation === 45 || oriantation === -315){
   startY += astern;
   startX -= astern;
  }
    if (oriantation === -45 || oriantation === 315){
   startY += astern;
   startX += astern;
  }
 //reverse (default fliped)
  if (oriantation === 180 || oriantation === -180){
   startY -= astern;
  }
}
/* 
function updateWindow() {
  return window.innerHeight,window.innerWidth;
}
 */
Util.setSize(size,width);
// Code that runs over and over again
function loop() {
 //updateWindow() 
 Util.setPositionPixels(startX,startY);
  console.log(`x: ${startX} y: ${startY}`);
 Util.setRotation(oriantation);
  console.log(Input);
  if (oriantation === 360 || oriantation === -360) {
    oriantation = 0; 
  }
  console.log(oriantation);
  forward();
  if (Input[0] === "KeyB" && Input[1] === "KeyN"){
   backwards();
  }

  window.requestAnimationFrame(loop);
}

// Setup is run once, at the start of the program. It sets everything up for us!
function setup() {
  
  // Put your event listener code here
document.addEventListener("keydown",(event) => {
  if (!event.repeat){
 Input.push (event.code); 
  }
  if (Input.includes("KeyT")) {//here so that it only runs once per button press
   oriantation -= 45;  
  }
  if (Input.includes("KeyU")) {//here so that it only runs once per button press
   oriantation += 45;  
  }
});
document.addEventListener("keyup",(event) => {
  Input.splice (Input.indexOf(event.code), 1 );
});
  window.requestAnimationFrame(loop);
}


setup(); // Always remember to call setup()!
