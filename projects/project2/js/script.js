/*****************

Project 2
Dan Freder

******************/
'use strict';

let numSquares = 80;
let squares = [];
let mic;
let vol;
let curveAmp;

function setup() {
  // Create a canvas the size of the window
  canvas = createCanvas(windowWidth, windowHeight);
  // Style it so it sits fixed behind HTML & ignores scrolling
  canvas.style("display:block");
  canvas.style("position:fixed");
  canvas.style("top:0");
  canvas.style("left:0");
  canvas.style("z-index:-100");
  background(0);

  //instantiate array of rectangles
  for (var i = 0; i < numSquares; i++) {
    squares[i] = new Square(windowWidth / 2-200, windowHeight / 2 - 300);
  }

  // create audio input
  mic = new p5.AudioIn();
  // start adc~
  mic.start();

 // create waveform to visualize amplitude of mic input

  angleMode(DEGREES);
}

function draw() {
  background(0);

  vol = mic.getLevel();

  push();
  noFill();
  stroke(255);
  strokeWeight(2);
  curveAmp = map(vol,0,1,0,width);
bezier(0, height/2, width/2-curveAmp, curveAmp, width/2+curveAmp,curveAmp, width, height/2)
  pop();

  for (var i = 0; i < numSquares; i++) {
    squares[i].update();
    squares[i].display();
    translate(10, 15);
  }
}

function windowResized() {
  // resize our canvas to the new window dimensions
  resizeCanvas(windowWidth, windowHeight);
}
