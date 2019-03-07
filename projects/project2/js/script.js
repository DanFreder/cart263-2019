/*****************

Project 2
Dan Freder
audio-reactive lines on a black background
******************/
'use strict';

let numSquares = 21;
let squares = [];
let mic;
let vol;
let time = 1;
let counter = 0;
let moveX;
let moveY;
let noiseY;
let xOff1 = 0;
let yOff1 = 0;
let zOff1 = 0;
let inc = 0.02;
let flowInc = .0005;
let start = 0;
let scl = 20;
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
  cols = floor(width / scl);
  rows = floor(height / scl);

  //Instantiate array of rectangles
  for (var i = 0; i < numSquares; i++) {
    squares[i] = new Square(windowWidth / 2 - 105, windowHeight / 2 - 150);
  }

  // create audio input
  mic = new p5.AudioIn();
  // start adc~
  mic.start();

}

function draw() {
  background(0);
  //retrieve mic in to vol
  vol = mic.getLevel();

  //white rectangles
  if (counter === 4) {
    angleMode(DEGREES);
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
      ellipse(width / 2, height / 2, sin(time * vol) + 50 * i, sin(time * vol) + 50 * i);
    }
    pop();
    time += 10;
  }

  //triangle curve
  if (counter === 2) {
    angleMode(DEGREES);
    push();
    noFill();
    stroke(255);
    strokeWeight(2);
    moveX = map(mouseX, 0, width, width / 2.05, width - width / 2.05);
    moveY = map(mouseY, 0, height, height / 2.01, height - height / 2.01);
    for (var i = 0; i < 250; i++) {
      translate(moveX - width / 2, moveY - height / 2);
      rotate(radians(45));
      triangle(width / 2 - 25 * i, height / 2 + 25 * i, width / 2, height / 2 - 25 * i, width / 2 + 25 * i, height / 2 + 25 * i);
    }
    pop();
  }

  //noisy bars
  if (counter === 3) {
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
        vertex(i, (noiseY * 5 * vol) + height / 5);
        xOff1 += inc;
      }
      endShape();
      start += inc;
    }
    pop();
  }

  //flowy lines
  if (counter === 1) {
    angleMode(RADIANS);
    var yOff1 = 0;
    for (var y = 0; y < rows; y++) {
      xOff1 = 0;
      for (var x = 0; x < cols; x++) {
        var index = (x + y * width) * 4;
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
  //text
  // textFont("Futura");
  // textSize(72);
  // textStyle('italic');
  // textAlign(CENTER, CENTER);
  // noStroke();
  // fill('#990033');
  // text("uchh", width / 2, height / 2);
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

// resize canvas to new window dimensions - presently not working
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}