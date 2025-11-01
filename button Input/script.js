/*
 * IDB Programming: key logger
 *
 */

import * as Util from "./util.js";

// State variables are the parts of your program that change over time.
let Input = [];
let mines = [];

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
function reset ( ){
  // window.location.reload(true); 
  console.log ("reset");
 }

 function lineX (){
/*   if (newX < 0){
  newX = 0 
  }  */
  return newX - currX; 

}

function lineY (){ 
/*   if (newY < 0 || newY > 1){
 newY = 0 
  } */
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

function isColliding(el1, el2) { // !
  const rect1 = el1.getBoundingClientRect();
  const rect2 = el2.getBoundingClientRect();

  return !(
    rect1.top > rect2.bottom ||
    rect1.bottom < rect2.top ||
    rect1.left > rect2.right ||
    rect1.right < rect2.left
  );
}

Util.setSize(size,width);

function layMines (m){
  for (let i= 0; i < m; i++){
   let mine = Util.createThing();
   mines.push ({
    element: mine, 
    x: Math.random(),
    y: Math.random(),
    width: 50, hight: 50, 
    r: 1, 
    h: 200, s: 20, l: 35, a:1 
   })
  }
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
 if (Input.includes("KeyH")){ // does this break the game 
  newX = currX; 
  newY = currY;
 }
  currX = move(currX,lineX(), momentom);
  currY = move(currY,lineY(), momentom);
 Util.setPosition(currX,currY);

console.log(`x: ${currX} , y: ${currY}`)
  if (deg === 360 || deg === -360) {
    deg = 0; 
  }
 Util.setRotation(deg);
   // Collision detection //!
  const player = document.querySelector(".thing"); // main player element

  for (let i = mines.length - 1; i >= 0; i--) {
    const mine = mines[i];
    if (isColliding(player, mine.element)) {
      console.log("Hit mine!");
      mine.element.remove();      // remove from DOM
      mines.splice(i, 1);         // remove from array
    }
  }

if (currX > 1){
  reset();
} 
 //updateWindow() 
  window.requestAnimationFrame(loop);
}

// Setup is run once, at the start of the program. It sets everything up for us!
function setup() {

  layMines(6);
  for (const mine of mines){
  const {element,x,y,width, hight, r, h, s, l, a } = mine
  Util.setPosition(x,y,element);
  Util.setSize(hight, width, element);
  Util.setColour(h, s, l, a, element);
  Util.setRoundedness(r)

  if (newX*innerWidth === (x*innerWidth)+ width/2){
  console.log( "Hit!" )
  }
  }
 

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
