/*****************

Project 2
Dan Freder
white lines on black canvas
completely ignoring the project prompt
classic self-detrimental behaviour we can expect from dan
******************/
'use strict';

let numSquares = 20;
let angle = 35;
let mic;
let vol;
let counter = 0;
let moveX;
let moveY;
let noiseY;
let xOff1 = 0;
let yOff1 = 0;
let zOff1 = 0;
let inc = 0.02;
let start = 0;
let scl = 40;
let cols, rows;

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
  // create audio input
  mic = new p5.AudioIn();
  // start adc~
  mic.start();
}

function draw() {
  background(0);
  //retrieve mic in to vol
  vol = mic.getLevel();

  if (counter === 0) {
    introText();
  }
  if (counter === 1) {
    whiteRectangles();
  }
  if (counter === 2) {
    noiseBars();
  }
  if (counter === 3) {
    whiteRectangles();
  }
  if (counter === 4) {
    triangleCurve();
  }
  if (counter === 5) {
    vectorField();
  }
}

function introText() {
  textFont("Futura");
  textSize(72);
  textStyle('italic');
  textAlign(CENTER, CENTER);
  noStroke();
  fill(255);
  text('click', width / 2, height / 2 + 10);
}

function noiseBars() {
  angleMode(DEGREES);
  push();
  stroke(255);
  strokeWeight(2);
  noFill();
  for (var lines = 0; lines < 3; lines++) {
    translate(0, 15);
    beginShape();
    xOff1 = start;
    for (var i = 0; i < width; i++) {
      noiseY = noise(xOff1) * height;
      stroke(255);
      vertex(i, (noiseY * 5 * vol) + pmouseY - 35);
      xOff1 += inc;
    }
    endShape();
    start += inc;
  }
  pop();
}

function whiteRectangles() {
  angleMode(DEGREES);
  noFill();
  strokeWeight(2);
  stroke(255);
  rectMode(CENTER);
  var angleAmp = map(vol, 0, 1, 0, 10);
  angle += angleAmp;
  var rectWidth = (sin(angle) * (width / 2 + mouseX));
  var rectHeight = (sin(angle) * (height / 2 + mouseY));
  push();
  //center to lower left
  for (var i = 0; i < numSquares; i++) {
    rect(width / 2, height / 2, rectWidth, rectHeight);
    translate(20, 20);
  }
  pop();
  push();
  //center to upper right
  for (var i = 0; i < numSquares; i++) {
    rect(width / 2, height / 2, rectWidth, rectHeight);
    translate(-20, -20);
  }
  pop();
  //black circles highlight -ve space
  push();
  noFill();
  stroke(0);
  strokeWeight(6);
  for (var i = 0; i < 100; i++) {
    ellipse(width / 2, height / 2, 1000 * vol + 50 * i, 1000 * vol + 50 * i);
  }
  pop();
}

function triangleCurve() {
  angleMode(DEGREES);
  push();
  noFill();
  stroke(255);
  strokeWeight(2);
  moveX = map(mouseX, 0, width, width / 2.07, width - width / 2.07);
  moveY = map(mouseY, 0, height, height / 2.06, height - height / 2.06);
  for (var i = 0; i < 200; i++) {
    translate(moveX - width / 2, moveY - height / 2);
    rotate(radians(45));
    var triVolScale = vol * 5000;
    triangle(width / 2 - 30 * i - triVolScale, height / 2 + 30 * i + triVolScale, width / 2, height / 2 - 30 * i - triVolScale, width / 2 + 30 * i + triVolScale, height / 2 + 30 * i + triVolScale);
  }
  pop();
}

function vectorField() {
  cols = floor(windowWidth / scl) + 1;
  rows = floor(windowHeight / scl) + 1;
  angleMode(RADIANS);
  var yOff1 = 0;
  for (var y = 0; y < rows; y++) {
    xOff1 = 0;
    for (var x = 0; x < cols; x++) {
      //calculate angle for every vector from perlin noise
      var angle = noise(xOff1, yOff1, zOff1) * TWO_PI;
      var v = p5.Vector.fromAngle(angle);
      xOff1 += -mouseX / 5000;
      stroke(255);
      strokeWeight(2);
      push();
      translate(x * scl, y * scl);
      rotate(v.heading());
      line(0, 0, scl, 0);
      pop();
    }
    yOff1 += mouseY / 5000;
    zOff1 += vol * .1;
  }
}

//counter for different states
function mouseReleased() {
  counter++;
  counter = constrain(counter, 1, 6);
  if (counter >= 6) {
    counter = 1;
  }
  console.log('counter', counter);
}

// resize canvas to new window dimensions
function windowResized() {
  console.log('RESIZED');
  resizeCanvas(windowWidth, windowHeight);
}