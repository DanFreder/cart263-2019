/*****************
project 3 - interactive music video
dan freder
******************/
"use strict";

let o1x = 0.0001;
let o1y = 0.0002;
let o1z = 0.0003;
let song;
let loaded = 0;
let currentTime = 0;
let graphics2d;
let amplitude;
let amp = 0;

//second values for different song sections
let triggerStart = 0;
let part1 = 1;
let part2 = 100;
let part3 = 100;
let part4 = 100;
let part5 = 100;
let part6 = 100;
let part7 = 100;
let part8 = 100;
let part9 = 100;
let part10 = 100;
let part11 = 100;
let part12 = 100;
let part13 = 100;

//colour pallete
let clr1 = '#ff1d00'
let clr2 = '#9f9aa4'
let clr3 = '#6edba1'
let clr4 = '#eff1ed'


function setup() {
  // Create a canvas the size of the window
  canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  graphics2d = createGraphics(windowWidth, windowHeight);
  // Style it so it sits fixed behind HTML & ignores scrolling
  canvas.style("display:block");
  canvas.style("position:fixed");
  canvas.style("top:0");
  canvas.style("left:0");
  canvas.style("z-index:-100");
  background(0);
  amplitude = new p5.Amplitude();
  //load audio file and trigger songLoaded function once it's loaded
  song = loadSound('assets/sounds/slowBurnUnmixed2.mp3', songLoaded);
}

function draw() {
  //display loading screen if song hasn't loaded
  if (triggerStart === 0) {
    loadingScreen();
  } else {
    //start music video
    background(0);
    amp = amplitude.volume * 10;
    amp = constrain(amp, 0., 1);
    console.log(amp);
    currentTime = song.currentTime();
    // change graphics based on currentTime
    if (currentTime >= part1 && currentTime <= part2) {
      twoPlanes();
    } else if (currentTime >= part2 && currentTime <= part3) {
      planar();
      spheres();
    } else if (currentTime >= part3 && currentTime <= part4) {
      dunshire();
      planar();
    } else if (currentTime >= part4 && currentTime <= part5) {
      cylindrive();
      dunshire();
    } else if (currentTime >= part5 && currentTime <= part6) {
      twoPlanes();
    } else if (currentTime >= part6 && currentTime <= part7) {
      spheres();
    } else if (currentTime >= part7 && currentTime <= part8) {
      spheres();
    } else if (currentTime >= part8 && currentTime <= part9) {
      spheres();
    } else if (currentTime >= part9 && currentTime <= part10) {
      spheres();
    } else if (currentTime >= part10 && currentTime <= part11) {
      spheres();
    } else if (currentTime >= part11 && currentTime <= part12) {
      spheres();
    } else if (currentTime >= part12 && currentTime <= part13) {
      spheres();
    }
  }
}

function twoPlanes() {
  push();
  translate(0, 0, 0);
  var scalar = map(amp, 0, 1, 10, 100);
  var scaleY = map(mouseY, 0, height, -5, 5);
  var scaleX = map(mouseX, 0, width, 15, -15);
  angleMode(DEGREES);
  noFill();
  strokeWeight(2);
  rotateZ(30);
  for (var i = 0; i < 20; i++) {
    stroke(clr1);
    plane(width / 8, height / 5);
    rotateZ(90);
    stroke(clr2);
    plane(width / 8, height / 5);
    if (amp >= .01) {
      translate(0, 0, scalar);
      rotateZ(i * amp);
    } else {
      translate(0, 0, 10);
      rotateZ(0);
    }
    rotateX(scaleY);
    rotateY(scaleX);
  }
  pop();
}

function dunshire() {
  var xScale = mouseX;
  xScale = map(xScale, 0, width, -width / 2, width / 2);
  var yScale = mouseY;
  yScale = map(yScale, height, 0, height / 2, 3 * height);
  var scaledAmp = map(amp, 0., 1., 0, 45.);
  angleMode(DEGREES);
  push();
  translate(0, 0, 0);
  strokeWeight(1);
  stroke(clr1);
  rotateX(90);
  rotateY(o1y);
  rotateZ(o1z);
  noFill();
  let polyAmp = map(amp, .1, 1, 1, 16);
  let polyAmp2 = map(amp, .1, 1, 3, 24);
  cone(yScale, xScale, floor(polyAmp2), floor(polyAmp));
  translate(0, 0, -10);
  stroke(clr2);
  cone(yScale, xScale, floor(polyAmp2), floor(polyAmp));
  pop();
  o1z += 2 * amp;
  o1y += amp;
}

function planar() {
  var scaleX = map(mouseX, 0, width, -45, 45);
  var scaleY = map(mouseY, 0, height, 45, -45);
  var ampy = map(amp, 0., 1., 0, 30);
  push();
  angleMode(DEGREES);
  translate(0, 0, 200);
  noFill();
  strokeWeight(1);
  stroke(clr3);
  rotateY(scaleX);
  rotateZ(scaleY);
  for (var i = 0; i < 20; i++) {
    box(width / 16 * i, height / 9 * i, ampy, 4, 4);
    translate(0, 0, 15);
    rotateX(0);
    if (amp >= .009) {
      rotateZ(ampy);
    } else {
      rotateZ(0);
    }
  }
  pop();
}

function spheres() {
  angleMode(RADIANS);
  push();
  translate(-200, 0, 100);
  for (var i = 0; i < 2; i++) {
    translate(100, 0, 0);
    strokeWeight(2);
    stroke(226);
    rotateX(o1x);
    rotateY(o1y);
    rotateZ(o1z);
    specularMaterial(2);
    sphere(700, 5, 5);
  }
  //mouse + amplitude control rotation
  var fromCenter = dist(width / 2, height / 2, mouseX, mouseY);
  if (mouseY > height / 2) {
    o1x += .0001 * amp * fromCenter;
  } else {
    o1x -= .0001 * amp * fromCenter;
  }
  if (mouseX > width / 2) {
    o1z += .0001 * amp * fromCenter;
  } else {
    o1z -= .0001 * amp * fromCenter;
  }
  pop();
}

function cylindrive() {
  translate(0, 0, 500);
  var ampy = map(amp, 0, 1, 0, 3);
  var segments = map(amp, 0, 1, 1, 3);
  var scaleMouseX = map(mouseX, 0, width, -width / 33, width / 33);
  var scaleMouseY = map(mouseY, 0, height, 30, 90);
  angleMode(DEGREES);
  push();
  stroke(clr4);
  strokeWeight(1);
  noFill();
  rotateZ(90);
  rotateY(o1y);
  rotateX(scaleMouseX);
  cylinder(width / 2, width / 3, 5, floor(segments));
  rotateZ(scaleMouseY);
  stroke(clr1);
  cylinder(width / 2, width / 3, 5, floor(segments));
  o1y += ampy;
  pop();
}

function mousePressed() {
  if (loaded === 1) {
    triggerStart = 1;
    song.play();
    loaded = 2;
  } else {}
  console.log("pressed");
}

function songLoaded() {
  console.log('Slow Burn Loaded Successfully');
  loaded = 1;
}

//map text to 2D plane so it works in WEBGL
function loadingScreen() {
  graphics2d.background(0);
  graphics2d.textFont("Futura");
  graphics2d.textSize(width / 20);
  graphics2d.textStyle('italic');
  graphics2d.textAlign(CENTER, CENTER);
  graphics2d.noStroke();
  graphics2d.fill(255);
  graphics2d.text('df', windowWidth / 2, windowHeight / 2 - 100);
  graphics2d.text('"slow burn"', windowWidth / 2, windowHeight / 2 - 25);
  push();
  if (loaded === 0) {
    graphics2d.textSize(width / 30);
    graphics2d.fill(100);
    graphics2d.text('loading...', windowWidth / 2, windowHeight / 2 + 75);
  } else {
    graphics2d.textSize(width / 25);
    graphics2d.fill(200);
    graphics2d.text('click to play', windowWidth / 2, windowHeight / 2 + 75);
  }
  pop();
  texture(graphics2d);
  plane(windowWidth, windowHeight);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}