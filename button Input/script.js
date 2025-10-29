/*
 * IDB Programming: key logger
 *
 */

import * as Util from "./util.js";

// State variables are the parts of your program that change over time.
let size = 50;
let width = 100;
let oriantation = 0;
let startX = window.innerWidth / 2 - size / 2;
let startY = window.innerHeight / 2- size / 2;
// Settings variables should contain all of the "fixed" parts of your programs

//other things 
function CircleH(event) {// steering
  console.log(event.code);
  if (event.code === "KeyY"){
    startY -= 10;
  }
  if (event.code === "KeyB" && "KeyN"){
    startY += 10;
  }
  if (event.code === "KeyT") {
    oriantation -= 45;
  }
  if (event.code === "KeyU") {
    oriantation += 45;
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
 Util.setRotation(oriantation);
  window.requestAnimationFrame(loop);
}

// Setup is run once, at the start of the program. It sets everything up for us!
function setup() {
  
  // Put your event listener code here
document.addEventListener("keydown",CircleH);
  window.requestAnimationFrame(loop);
}

setup(); // Always remember to call setup()!
