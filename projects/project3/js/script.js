/*****************
project 3 - interactive music video
dan freder
******************/
'use strict';

let mic;
let vol;
let o1x = 0;
let o1y = 5;
let o1z = 10;
let song;
let loaded = 0;
let whereYat = 0;

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

  //load audio file and trigger songLoaded function once it's loaded
  song = loadSound('assets/sounds/phosphenes_rough.wav', songLoaded);
}

function songLoaded() {
  console.log('Phosphenes Loaded Successfully');
  loaded = 1;
  song.play();
}

function draw() {
  //display loading screen if song hasn't loaded
  if (loaded == 0) {
    background(0);
    textFont("Futura");
    textSize(width / height * 50);
    textStyle('italic');
    textAlign(CENTER, CENTER);
    noStroke();
    fill(255);
    text('loading', width / 2, height / 2 + 20);
  } else {

    //start the 'video'
    whereYat = song.currentTime();
    console.log(whereYat);
    background(0);
    //style for our spheres
    push();
    strokeWeight(1);
    stroke(226);
    fill(0, 0, 0, 0);
    // rotating sphere
    translate(windowWidth / 2, windowHeight / 2);
    ellipse(0, 0, 100, 100);
    pop();

    o1x += .004;
    o1y += .005;
    o1z += .006;
  }
}

// resize canvas to new window dimensions
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}