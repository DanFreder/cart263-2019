/*****************
project 3
interactive music video
for df's "slow burn"
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
let triggerStart = 0;
let pressed = 0;

//second values for different song sections
let part1 = 1;
let part2 = 18;
let part3 = 41;
let part4 = 48;
let part5 = 59.75;
let part6 = 96;
let part7 = 104;
let part8 = 115;
let part9 = 134;
let part10 = 143;
let part11 = 153;
let part12 = 163;
let part13 = 300;

//colour pallete
let red = '#ff192c';
let green = '#06d6a0';
let lightBlue = '#2274a5';
let navy = '#073b4c';
let orange = '#db5a42';
let turquoise = '#50d8d7';
let pink = '#e83f6f';
let yellow = '#ffbf00';
let white = '#f9fdff';


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
  amplitude.smooth(.5);
  //load audio file and trigger songLoaded function once it's loaded
  song = loadSound('assets/sounds/slowBurnUnmixed2.mp3', songLoaded);
}

function draw() {
  //display loading screen if song hasn't loaded &/or user hasn't clicked on canvas
  if (triggerStart === 0) {
    loadingScreen();
  } else {
    //start music video
    background(0);
    // noCursor();
    amp = amplitude.volume * 10;
    amp = constrain(amp, 0., 1);
    currentTime = song.currentTime();
    // change graphics based on currentTime
    if (currentTime >= part1 && currentTime <= part2) {
      spheres();
    } else if (currentTime >= part2 && currentTime <= part3) {
      dunshire();
    } else if (currentTime >= part3 && currentTime <= part4) {
      rectraction();
    } else if (currentTime >= part4 && currentTime <= part5) {
      rectraction();
    } else if (currentTime >= part5 && currentTime <= part6) {
      holeyHole();
    } else if (currentTime >= part6 && currentTime <= part7) {
      planar();
      holeyHole();
    } else if (currentTime >= part7 && currentTime <= part8) {
      planar();
      cylindrive();
    } else if (currentTime >= part8 && currentTime <= part9) {
      twoPlanes();
    } else if (currentTime >= part9 && currentTime <= part10) {
      sphereXpansion();
    } else if (currentTime >= part10 && currentTime <= part11) {
      sphereXpansion();
    } else if (currentTime >= part11 && currentTime <= part12) {
      spheres();
      sphereXpansion();
    } else if (currentTime >= part12 && currentTime <= part13) {
      spheres();
    }
  }
}

function holeyHole() {
  push();
  var rotationScaleMouseX = (map(mouseX, 0, width, -15, 15));
  translate(0, 0, 0);
  angleMode(DEGREES);
  strokeWeight(2);
  if (pressed === 1) {
    stroke(lightBlue);
    fill(1, 1, 1, 3);
  } else {
    stroke(lightBlue);
    noFill();
  }
  translate(-(width / 2 - mouseX), -(height / 2 - mouseY), 0);
  rotateZ(-o1y)
  rotateY(rotationScaleMouseX);
  for (var i = 0; i < 12; i++) {
    rotateZ(o1z);
    torus(width / 2, width / 3, 3, 3);
    translate(0, 0, -150);
  }
  o1z += .333 * amp;
  o1y += .777 * amp;
  pop();
}

function sphereXpansion() {
  push();
  var scaleMouseX = (map(mouseX, 0, width, -90, 90));
  var scaleMouseY = (map(mouseY, height, 0, -90, 90));
  if (pressed === 0) {
    var polyX = 6;
    var polyY = 4;
  } else {
    var polyX = 3;
    var polyY = 3;
  }
  translate(0, 0, 0);
  angleMode(DEGREES);
  noFill();
  stroke(white);
  strokeWeight(1);
  rotateY(scaleMouseX);
  rotateX(scaleMouseY);
  rotateZ(o1z);
  o1z += 2 * amp;
  if (amp >= .05) {
    for (var i = 0; i < 5; i++) {
      var scalar = map(amp, .05, 1, width / 5, width);
      var scalar2 = map(amp, .05, 1, width / 5, width / 2);
      stroke(white);
      sphere(width / 5, polyX, polyY);
      stroke(red);
      sphere(scalar, polyX, polyY);
      stroke(turquoise);
      sphere(scalar2, polyX, polyY);
    }
  } else {
    sphere(width / 5, polyX, polyY);
  }
  pop();
}

function rectraction() {
  push();
  translate(0, 0, -1000);
  angleMode(DEGREES);
  strokeWeight(2);
  stroke(white);
  var scaleMouseX = (map(mouseX, 0, width, -30, 30));
  var scaleMouseY = (map(mouseY, height, 0, -30, 30));
  rotateY(scaleMouseX);
  rotateX(scaleMouseY);
  for (var i = 0; i < 10; i++) {
    fill(i * 4, i * 4, i * 4, i);
    torus(width / 15 * i, height / 10 * i, 4, 2);
    if (pressed === 0) {
      o1z += (amp * (.01 * i));
      rotateZ(o1z);
    } else {
      o1z -= (amp * (.01 * i));
      rotateZ(o1z);
    }
    translate(0, 0, 100);
  }
  pop();
}


function normalDreams() {
  push();
  angleMode(DEGREES);
  if (pressed === 0) {
    translate(-width / 5, 0, -200);
  } else {
    translate(width / 5, 0, -200);
  }
  normalMaterial();
  noStroke();
  var scaleMouseX = (map(mouseX, 0, width, -3, 3));
  var scaleMouseY = (map(mouseY, height, 0, -5, 5));
  for (var i = 0; i < 10; i++) {
    var xScale = i * 50;
    var yScale = i * 50;
    torus(xScale, yScale, 3);
    rotateZ(i * o1z);
    rotateY(scaleMouseX);
    rotateX(scaleMouseY);
    translate(0, 0, 100);
  }
  o1z += .1 * amp;
  pop();
}

function twoPlanes() {
  push();
  translate(0, 0, 0);
  var scalar = map(amp, 0.15, 1, 12, 15);
  var scaleY = map(mouseY, 0, height, -15, 15);
  var scaleX = map(mouseX, 0, width, 20, -20);
  var thick = map(amp, 0, 1, 1, 3);
  angleMode(DEGREES);
  if (pressed === 0) {
    var pressedClr = yellow;
  } else {
    var pressedClr = pink;
  }
  noFill();
  strokeWeight(thick);
  rotateZ(30);
  for (var i = 0; i < 35; i++) {
    stroke(green);
    plane(width / 5, height / 3);
    rotateZ(91);
    stroke(pressedClr);
    plane(width / 5, height / 3);
    if (amp >= .15) {
      translate(0, 0, scalar);
      rotateZ(10 * amp);
    } else {
      translate(0, 0, 12);
      rotateZ(0);
    }
    rotateX(scaleY);
    rotateY(scaleX);
  }
  pop();
}

function dunshire() {
  push();
  var xScale = map(mouseX, 0, width, -width / 2, width / 2);
  var yScale = map(mouseY, height, 0, height / 2, height);
  angleMode(DEGREES);
  translate(0, 0, 0);
  strokeWeight(2);
  stroke(red);
  rotateX(90);
  rotateY(o1y);
  rotateZ(o1z);
  noFill();
  if (pressed === 0) {
    var polyAmpLow = 1;
    var polyAmpLow2 = 3;
  } else {
    var polyAmpLow = 2;
    var polyAmpLow2 = 4;
  }
  if (amp > .4) {
    var polyAmp = map(amp, .3, 1, polyAmpLow, 16);
    var polyAmp2 = map(amp, .3, 1, polyAmpLow2, 24);
  } else {
    var polyAmp = polyAmpLow;
    var polyAmp2 = polyAmpLow2;
  }
  cone(yScale, xScale, floor(polyAmp2), floor(polyAmp));
  translate(0, 0, -10);
  stroke(lightBlue);
  cone(yScale, xScale, floor(polyAmp2), floor(polyAmp));
  o1z += 3 * amp;
  o1y += 2 * amp;
  pop();
}

function planar() {
  var scaleX = map(mouseX, 0, width, 45, -45);
  var scaleY = map(mouseY, 0, height, 45, -45);
  var ampy = map(amp, 0, 1, 0, 50);
  var zRot = map(amp, .009, 1, 0, 30);
  push();
  angleMode(DEGREES);
  translate(0, 0, 200);
  noFill();
  strokeWeight(1);
  rotateY(scaleX);
  rotateZ(scaleY);
  for (var i = 0; i < 20; i++) {
    if (pressed === 1) {
      if (i % 2 === 0) {
        stroke(green);
      } else {
        stroke(red);
      }
    } else {
      stroke(green);
    }
    box(width / 16 * i, height / 9 * i, ampy, 4, 4);
    translate(0, 0, 15);
    if (amp >= .009) {
      rotateZ(zRot);
    } else {
      rotateZ(0);
    }
  }
  pop();
}

function spheres() {
  push();
  angleMode(DEGREES);
  translate(-200, 0, 400);
  strokeWeight(2);
  specularMaterial(0);
  for (var i = 0; i < 2; i++) {
    rotateX(o1x);
    rotateY(o1y);
    rotateZ(o1z);
    if (pressed === 1) {
      push();
      stroke(green);
      noFill();
      sphere(700, 4, 3);
      pop();
    }
    translate(100, 0, 0);
    stroke(white);
    sphere(700, 5, 5);
  }
  //mouse + amplitude control rotation
  var fromCenter = dist(width / 2, height / 2, mouseX, mouseY);
  if (mouseY > height / 2) {
    o1x += .01 * amp * fromCenter;
  } else {
    o1x -= .01 * amp * fromCenter;
  }
  if (mouseX > width / 2) {
    o1z += .01 * amp * fromCenter;
  } else {
    o1z -= .01 * amp * fromCenter;
  }
  pop();
}

function cylindrive() {
  push();
  translate(0, 0, 400);
  if (amp >= .35) {
    var xsegments = floor(map(amp, .35, 1, 1, 5));
    var ysegments = floor(map(amp, .35, 1, 1, 8));
  } else {
    var xsegments = 1;
    var ysegments = 1;
  }
  var ampy = map(amp, 0, 1, 0, 4);
  var scaleMouseX = map(mouseX, 0, width, -45, 45);
  var scaleMouseY = map(mouseY, 0, height, 45, 90);
  angleMode(DEGREES);
  noStroke();
  var dx = mouseX - width / 2;
  var dy = mouseY - height / 2;
  var v = createVector(dx, dy, 0);
  v.normalize();
  directionalLight(45, 125, 210, v);
  // specularMaterial(255, 255, 255, 255);
  specularMaterial(white);
  rotateZ(90);
  rotateY(o1y);
  rotateX(scaleMouseX);
  cylinder(width / 5, height / 2, 24, 16);
  rotateZ(scaleMouseY);
  push();
  noFill();
  stroke(0);
  strokeWeight(2);
  cylinder(width / 5, height / 2, 5, 8);
  pop();
  o1y += ampy;
  pop();
}

function mousePressed() {
  if (loaded === 1) {
    triggerStart = 1;
    song.play();
    //update loaded variable to avoid retriggering on future mouse clicks
    loaded = 2;
  } else if (loaded === 2 && pressed === 0) {
    pressed = 1;
  } else {
    pressed = 0;
  }
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
  graphics2d.text('df', windowWidth / 2, windowHeight / 2 - 150);
  graphics2d.text('"slow burn"', windowWidth / 2, windowHeight / 2 - 50);
  push();
  if (loaded === 0) {
    graphics2d.textSize(width / 30);
    graphics2d.fill(100);
    graphics2d.text('loading...', windowWidth / 2, windowHeight / 2 + 50);
  } else {
    graphics2d.textSize(width / 25);
    graphics2d.fill(200);
    graphics2d.text('click to play', windowWidth / 2, windowHeight / 2 + 50);
  }
  pop();
  texture(graphics2d);
  plane(windowWidth, windowHeight);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}