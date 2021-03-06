"use strict";

/*****************
OOP Circle Eater by Pippin Barr
modified for Assignment 2
by Dan Freder

An Object-Oriented version of the Circle Eater program.
The player moves a circle around with the mouse.
Another circle represents food which the player eats by overlapping.
The player circle shrinks over time, but grows when it eats.
******************/

// Constants for key quantities
const AVATAR_MAX_SIZE = 64;
const AVATAR_SIZE_LOSS_PER_FRAME = .75;
const FOOD_MIN_SIZE = 10;
const FOOD_MAX_SIZE = 100;
const FOOD_MAX_SPEED = 4;

// Variables to store array and set initial velocity vals
let vy = 1;
let vx = 1;
let agents = [];
let avatar;

// setup()
// Create the canvas, avatar, and food, disable the cursor
function setup() {
  createCanvas(windowWidth, windowHeight);
  agents.push(new Food(random(0, width), random(0, height), FOOD_MIN_SIZE, FOOD_MAX_SIZE, FOOD_MAX_SPEED));
  agents.push(new Food(random(0, width), random(0, height), FOOD_MIN_SIZE, FOOD_MAX_SIZE, FOOD_MAX_SPEED));
  agents.push(new Food(random(0, width), random(0, height), FOOD_MIN_SIZE, FOOD_MAX_SIZE, FOOD_MAX_SPEED));
  agents.push(new Food(random(0, width), random(0, height), FOOD_MIN_SIZE, FOOD_MAX_SIZE, FOOD_MAX_SPEED));
  avatar = new Avatar(mouseX, mouseY, AVATAR_MAX_SIZE, AVATAR_SIZE_LOSS_PER_FRAME);
  noCursor();
}

// draw()
// Update the avatar and check for eating
// Display the avatar and food
function draw() {
  background(0);
  avatar.update();
  for (let i = 0; i < agents.length; i++) {
    agents[i].update();
    if (avatar.collide(agents[i])) {
      avatar.eat(agents[i]);
    }
    agents[i].display();
  }
    avatar.display();
}
// if (avatar.collide(food)) {
//   avatar.eat(food); }
