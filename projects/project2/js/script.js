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
let y = 0;
let time = 1;
let counter = 0;

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

  //Instantiate array of rectangles
  for (var i = 0; i < numSquares; i++) {
    squares[i] = new Square(windowWidth / 2 - 105, windowHeight / 2 - 150);
  }

  // create audio input
  mic = new p5.AudioIn();
  // start adc~
  mic.start();

  // fuck with this some more dan
  angleMode(DEGREES);
}

function draw() {
  background(0);
  //retrieve mic in to vol
  vol = mic.getLevel();

  //white rectangles
  push();
  for (var i = 0; i < numSquares; i++) {
    squares[i].update();
    squares[i].display();
    translate(10, 15);
  }
  pop();

  //black circles highlight -ve space
  push()
  noFill();
  stroke(0);
  strokeWeight(8);
  for (var i = 0; i < 100; i++) {
    ellipse(pmouseX, pmouseY, sin(time) + 50 * i, sin(time) + 50 * i);
  }
  pop();
  time += 10;

  //text
  textFont("Futura");
  textSize(72);
  textStyle('italic');
  textAlign(CENTER, CENTER);
  noStroke();
  fill('#990033');
  text("uchh", width / 2, height / 2);
}

//counter for different states
function mouseReleased() {
  counter++;
  counter = constrain(counter, 1, 5);
  if (counter >= 5) {
    counter = 1;
  }
  console.log('counter', counter);
}

function windowResized() {
  // resize our canvas to the new window dimensions
  resizeCanvas(windowWidth, windowHeight);
}