"use strict";

/*****************

Circle Eater by Pippin Barr
modified by Dan Freder for
Assignment 1

A simple game in which the player controls a shrinking circle with their mouse and tries
to overlap another circle (food) in order to grow bigger.

******************/

// Constants defining key quantities
const AVATAR_SIZE_GAIN = 50;
const AVATAR_SIZE_LOSS = .5;

// Avatar is an object defined by its properties
let avatar = {
  x: 0,
  y: 0,
  maxSize: 64,
  size: 64,
  active: true,
  color: '#cccc55'
}

// Food is an object defined by its properties
let food = {
  x: 0,
  y: 0,
  vx: 10,
  vy: 10,
  speed: 10,
  size: 64,
  color: '#55cccc'
}

// preload()
//
// Not needed

function preload() {

}

// setup()
//
// Create the canvas, position the food, remove the cursor

function setup() {
  createCanvas(windowWidth,windowHeight);
  positionFood();
  noCursor();
}


// draw()
//
// Move the avatar, check for collisions, display avatar and food

function draw() {
  // Make sure the avatar is still alive - if not, we don't run
  // the rest of the draw loop
  if (!avatar.active) {
    push();
      textSize(250);
      textAlign(CENTER, CENTER);
      textStyle(BOLD);
      textFont('Helvetica');
      fill(random(100)+100);
      text('R.I.P',windowWidth/2,windowHeight/2);
      pop();
      return;
      // By using "return" the draw() function exits immediately
  }
  // Otherwise we handle the game
  background(0);
  updateAvatar();
  checkCollision();
  displayAvatar();
  positionFood();
  displayFood();
}

// updateAvatar()
//
// Set the position to the mouse location
// Shrink the avatar
// Set it to inactive if it reaches a size of zero
function updateAvatar() {
  avatar.x = mouseX;
  avatar.y = mouseY;
  // Shrink the avatar and use constrain() to keep it to reasonable bounds
  avatar.size = constrain(avatar.size - AVATAR_SIZE_LOSS,0,avatar.maxSize);
  if (avatar.size === 0) {
    avatar.active = false;
  }
}

// checkCollision()
//
// Calculate distance of avatar to food
// Check if the distance is small enough to be an overlap of the two circles
// If so, grow the avatar and reposition the food
function checkCollision() {
  let d = dist(avatar.x,avatar.y,food.x,food.y);
  if (d < avatar.size/2 + food.size/2) {
    avatar.size = constrain(avatar.size + AVATAR_SIZE_GAIN,0,avatar.maxSize);
    positionFood();
  }
}

// displayAvatar()
//
// Draw the avatar in its current position, using its size and color
// Use push() and pop() around it all to avoid affecting the rest of the program
// with drawing commands
function displayAvatar() {
  push();
  noStroke();
  fill(avatar.color);
  ellipse(avatar.x,avatar.y,avatar.size);
  pop();
}

// displayFood()
//
// Draw the food in its current position, using its size and color
// Use push() and pop() around it all to avoid affecting the rest of the program
// with drawing commands
function displayFood() {
  push();
  noStroke();
  fill(food.color);
  ellipse(food.x,food.y,food.size);
  pop();
}

function positionFood() {

//randomize velocity ~10% of the time
  if (random() < 0.1) {
   food.vx = random(-food.speed,food.speed);
   food.vy = random(-food.speed,food.speed);
}
  food.x += food.vx;
  food.y += food.vy;

  // screen wrapping
  if (food.x < 0) {
    food.x += width;
  }
  else if (food.x > width) {
    food.x -= width;
  }
  if (food.y < 0) {
    food.y += height;
  }
  else if (food.y > height) {
    food.y -= height;
}
}
