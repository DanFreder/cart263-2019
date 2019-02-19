/*****************

Project 2
Dan Freder

******************/
'use strict';

let numSquares = 21;
let squares = [];
let mic;
let vol;
let curveAmp;
let volHistory = [];
let y = 0;

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
    squares[i] = new Square(windowWidth / 2 - 105, windowHeight / 2 - 150);
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

  //retrieve mic in to vol
  vol = mic.getLevel();

  // //push amplitude values to array
  // volHistory.push(vol);
  // //graph values
  // push();
  // rectMode(CENTER);
  // // translate(width/2,-height/2);
  // for (var i = 0; i < volHistory.length; i ++) {
  // y = map(volHistory[i],0,1,height/2,0);
  // noFill();
  // strokeWeight(1);
  // stroke(255,0,0,255);
  // line(width/2,height/2+200,i,y);
  // }
  // pop();

  // if (volHistory.length > width) {
  //   volHistory.splice(0,1);
  // }
  push();
  for (var i = 0; i < numSquares; i++) {
    squares[i].update();
    squares[i].display();
    translate(10, 15);
  }
  pop();
  push()
  noFill();
  stroke(0);
  strokeWeight(8);
  for (var i = 0; i < 30; i++) {
    ellipse(windowWidth / 2, windowHeight / 2, 100 * i, 100 * i);
  }
  pop();
}

function windowResized() {
  // resize our canvas to the new window dimensions
  resizeCanvas(windowWidth, windowHeight);
}
