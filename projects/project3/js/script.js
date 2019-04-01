/*****************
project 3 - interactive music video
dan freder
******************/
'use strict';

let o1x = 0.0001;
let o1y = 0.0002;
let o1z = 0.0003;
let song;
let loaded = 0;
let currentTime = 0;
let graphics2d;
let amplitude;
let amp;

//second values for different song sections
let p1 = 1;
let p2 = 50;
let p3 = 100;
let p4 = 100;
let p5 = 100;
let p6 = 100;
let p7 = 100;
let p8 = 100;

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

  //WHY IS THIS NOT WORKING???
  amplitude = new p5.Amplitude(0.);

  //load audio file and trigger songLoaded function once it's loaded
  song = loadSound('assets/sounds/phosphenes_rough.mp3', songLoaded);
}

function songLoaded() {
  console.log('Phosphenes Loaded Successfully');
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
    // amp = amplitude.getLevel();
    currentTime = song.currentTime();
    // change graphics based on currentTime
    if (currentTime >= p1 && currentTime <= p2) {
      dunshire();
    } else if (currentTime >= p2 && currentTime <= p3) {
      spheres();
    } else if (currentTime >= p3 && currentTime <= p4) {
      spheres();
    } else if (currentTime >= p4 && currentTime <= p5) {
      spheres();
    } else if (currentTime >= p5 && currentTime <= p6) {
      spheres();
    } else if (currentTime >= p6 && currentTime <= p7) {
      spheres();
    } else if (currentTime >= p7 && currentTime <= p8) {
      spheres();
    }
  }
}

function dunshire() {
  var xScale = mouseX;
  xScale = map(xScale, 0, width, width / 101, width - width / 101);
  var yScale = mouseY;
  yScale = map(yScale, height, 0, height / 2, 2 * height);
  angleMode(DEGREES);
  push();
  translate(0, 0, 0);
  strokeWeight(1);
  stroke(226);
  rotateX(90);
  rotateY(o1y);
  rotateZ(0);
  fill(0, 0, 0, 3);
  cone(yScale, xScale, 11, 6);
  pop();
  o1y += .1;
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
  pop();

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