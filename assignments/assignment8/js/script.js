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
let part1 = 1;
let part2 = 10;
let part3 = 20;
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
  amplitude = new p5.Amplitude();
  //load audio file and trigger songLoaded function once it's loaded
  song = loadSound('assets/sounds/slowBurnUnmixed2.mp3', songLoaded);
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
    amp = amplitude.volume * 10;
    currentTime = song.currentTime();
    // change graphics based on currentTime
    if (currentTime >= part1 && currentTime <= part2) {
      planar();
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

function dunshire() {
  var xScale = mouseX;
  xScale = map(xScale, 0, width, -width / 12, -width / 3);
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
  var scaleX = map(mouseX, 0, width, -91, 91);
  var scaleY = map(mouseY, height, 0, -91, 91);
  var ampy = map(amp, 0, 1., 0, 60);
  push();
  angleMode(DEGREES);
  translate(0, 0, 0);
  noFill();
  strokeWeight(1);
  stroke(clr3);
  rotateX(scaleY);
  rotateZ(scaleX);
  for (var i = 0; i < 50; i++) {
    box(width / 7, width / 9, 0, 4, 4);
    translate(0, 0, 15);
    rotateX(ampy);
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