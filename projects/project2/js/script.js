/*****************

Project 2
Dan Freder

******************/
'use strict';

let numSquares = 38;
let squares = [];

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

  for (var i = 0; i < numSquares; i++) {
  squares[i] = new Square(windowWidth/2,windowHeight/2-300,0);
}

angleMode(DEGREES);
}

function draw() {
  background(0);
      for (var i = 0; i < numSquares; i++) {
      squares[i].update();
      squares[i].display();
translate(0,20);
    }
  }
function windowResized() {
  // resize our canvas to the new window dimensions
  resizeCanvas(windowWidth, windowHeight);
}
