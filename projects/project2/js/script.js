/*****************

Project 2
Dan Freder

******************/
'use strict';

let numSquares = 10;
let squares = [];
let spacing = 100;
let maxDistance;

function setup() {
  // Create a canvas the size of the window
  canvas = createCanvas(windowWidth, windowHeight);
  // Style it so it sits fixed behind HTML & ignores scrolling
  canvas.style("display:block");
  canvas.style("position:fixed");
  canvas.style("top:0");
  canvas.style("left:0");
  canvas.style("z-index:-100");

  // // Calculate max distance based on window size
  // maxDistance = dist(windowWidth/2,windowHeight/2,windowWidth,windowHeight);
  //
  // // //Calculate X + Y coordinates for array
  // // for (let x = 0; x < width; x++) {
  // //  distances[x] = []; // create nested array
  // // for (let y = 0; y < height; y++) {
  // //   let distance = dist(width / 2, height / 2, x, y);
  // //   distances[x][y] = (distance / maxDistance) * 255;
  // // }

  // Create array of squares
  for (let i = 0; i < numSquares; i++) {
    squares[i] = new square(windowWidth/2,windowHeight/2,'#104547');
  }
}

function draw() {
background('#af929d');
// translate(windowWidth/2,windowHeight/2);
for (var i = 0; i < numSquares; i++) {
squares[i].update();
squares[i].display();
}
}

function windowResized() {
  // resize our canvas to the new window dimensions
  resizeCanvas(windowWidth, windowHeight);
}
