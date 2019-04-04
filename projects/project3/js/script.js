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
let amp = 0;
let amplitude = 0;

//second values for different song sections
let part1 = 1;
let part2 = 100;
let part3 = 100;
let part4 = 100;
let part5 = 100;
let part6 = 100;
let part7 = 100;
let part8 = 100;

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
  amplitude = new p5.Amplitude(.125);
  //load audio file and trigger songLoaded function once it's loaded
  song = loadSound('assets/sounds/slowBurnUnmixed.mp3', songLoaded);
}

function songLoaded() {
  console.log('Slow Burn Loaded Successfully');
  loaded = 1;
  song.play();
}

function draw() {
  //display loading screen if song hasn't loaded
  if (loaded == 0) {
    loadingScreen();
  } else {
    //start music video
    background(0);
    amp = amplitude.getLevel();
    currentTime = song.currentTime();
    // change graphics based on currentTime
    if (currentTime >= part1 && currentTime <= part2) {
      testing();
    } else if (currentTime >= part2 && currentTime <= part3) {
      spheres();
    } else if (currentTime >= part3 && currentTime <= part4) {
      dunshire();
    } else if (currentTime >= part4 && currentTime <= part5) {
      spheres();
    } else if (currentTime >= part5 && currentTime <= part6) {
      spheres();
    } else if (currentTime >= part6 && currentTime <= part7) {
      spheres();
    } else if (currentTime >= part7 && currentTime <= part8) {
      spheres();
    }
  }
}

function testing() {
  push();
  noFill();
  strokeWeight(2);
  stroke(255);
  sphere(300, 10, floor(amp * 1000));
  pop();
}

function dunshire() {
  var xScale = mouseX;
  xScale = map(xScale, 0, width, -width / 12, -width / 3);
  var yScale = mouseY;
  yScale = map(yScale, height, 0, height / 2, 3 * height);
  var scaledAmp = map(amp, 0., 1., 15, 180.);
  angleMode(DEGREES);
  push();
  translate(0, 0, 0);
  strokeWeight(1);
  stroke('#6EDBA1');
  rotateX(90);
  rotateY(o1y);
  rotateZ(scaledAmp);
  noFill();
  cone(yScale, xScale, 3, 16);
  pop();
  o1y += .01 * scaledAmp;
}

function planar() {
  push();
  angleMode(DEGREES);
  translate(0, 10, -50);
  noFill();
  strokeWeight(2);
  stroke(255);
  for (var i = 0; i < 10; i++) {
    box(width / 2, height / 2, width / 2 * amp * 100, 4, 4);
    translate(0, 0, -100);
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
    o1x += .0005 * amp * fromCenter;
  } else {
    o1x -= .0005 * amp * fromCenter;
  }
  if (mouseX > width / 2) {
    o1z += .0005 * amp * fromCenter;
  } else {
    o1z -= .0005 * amp * fromCenter;
  }
  pop();
}

//map text to 2D plane so it works in WEBGL
function loadingScreen() {
  graphics2d.background(0);
  graphics2d.textFont("Futura");
  graphics2d.textSize(100);
  graphics2d.textStyle('italic');
  graphics2d.textAlign(CENTER, CENTER);
  graphics2d.noStroke();
  graphics2d.fill(255);
  graphics2d.text('loading', windowWidth / 2, windowHeight / 2 + 20);
  texture(graphics2d);
  plane(windowWidth, windowHeight);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}