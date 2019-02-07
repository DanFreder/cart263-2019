"use strict";

/*****************
Project 1
Dan Freder
Wow I hate jQuery
******************/
let x1 = 0;
let y1 = 0;
let x2 = 0;
let y2 = 0;
let canvas;
let $punct;
let $glitch;
let $glitch2;
let numCircles = 50;

$(document).ready(setup);

function setup() {
  $punct = $('.punctuation');
  $punct.draggable();
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.style("display:block");
  canvas.style("position:fixed");
  canvas.style("top:0");
  canvas.style("left:0");
  canvas.style("z-index:-100");
  background(0);
}

function draw() {
  background(0,0,0,0);
  stroke(random(100)+100,0,0);
  strokeWeight(3);
   if (mouseIsPressed === true) {
     line(width/2,height/2, mouseX,mouseY);
   }
}

//
//   $glitch = $('.glitch1');
//   $glitch2 = $('.glitch2');
// }
//
// function draw() {
//   background(0);
//
//   for (var i = 0; i < numCircles; i++) {
//     push();
//     fill(255, 255, 255, 255);
//     stroke(0);
//     strokeWeight(3);
//     ellipse(random(width), height / 2,circleGrowth);
//     pop();
//   }
//   circleGrowth += 1;
// }
//
// function mouseClicked() {
//   console.log("clicked");
// }

function windowResized() {
  // resize our canvas to the new window dimensions
  resizeCanvas(windowWidth, windowHeight);
}
