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
const AVATAR_SIZE_LOSS_PER_FRAME = 1;
const FOOD_MIN_SIZE = 5;
const FOOD_MAX_SIZE = 100;
const FOOD_MAX_SPEED = 5;

// Variables to array and set initial velocity vals
let vx = 1;
let vy = 1;
let avatar;
let food;
let agents = [];

// setup()
// Create the canvas, avatar, and food, disable the cursor

function setup() {
createCanvas(windowWidth,windowHeight);
agents.push(new Avatar(mouseX,mouseY,AVATAR_MAX_SIZE,AVATAR_SIZE_LOSS_PER_FRAME));
agents.push(new Food(random(0,width),random(0,height),FOOD_MIN_SIZE,FOOD_MAX_SIZE,FOOD_MAX_SPEED));
noCursor();
}


// draw()
// Update the avatar and check for eating
// Display the avatar and food

function draw() {
  background(0);

  for (let i = 0; i < agents.length; i++) {
  agents[i].update();
  if (avatar.collide(food)) {
    avatar.eat(food);
  }
  agents[i].display();
}
}
