/*****************
3D terrain
Dan Freder
based on Dan Shiffman's Processing tutorial
******************/

'use strict';

let x = 0;
let y = 0;
let cols, rows;
let scl = 20;
let terrain = [];
let xOff;
let yOff;

function setup() {
  // Create a canvas the size of the window
  canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  // Style it so it sits fixed behind HTML & ignores scrolling
  canvas.style("display:block");
  canvas.style("position:fixed");
  canvas.style("top:0");
  canvas.style("left:0");
  canvas.style("z-index:-100");
  background(0);

  cols = windowWidth / scl;
  rows = windowHeight / scl;
  terrain = new float[cols][rows];
  yOff = 0;
  for (y = 0; y < rows; y++) {
    xOff = 0;
    for (x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xOff, yOff), 0, 1, -150, 150);
      xOff += .1;
    }
    yOff += .1;
  }
}

function draw() {
  background(0);
  stroke(255);
  strokeWeight(1);
  noFill();
  rotateX(PI / 3);
  translate(-windowWidth / 2, -windowHeight / 2);

  for (y = 0; y < rows - 1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (x = 0; x < cols; x++) {
      vertex(x * scl, y * scl, terrain[x][y]);
      vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
    }
    endShape();
  }
}

function windowResized() {
  // resize our canvas to the new window dimensions
  resizeCanvas(windowWidth, windowHeight);
}