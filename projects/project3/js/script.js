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
let graphics2d;

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
  } else {

    //start music video
    whereYat = song.currentTime();
    console.log(whereYat);
    background(0);

    //low-poly spheres
    push();
    strokeWeight(1);
    stroke(226);
    fill(0, 0, 0, 0);
    sphere(100, 5, 5);
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