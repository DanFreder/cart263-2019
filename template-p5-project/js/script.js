"use strict";

/*****************

Re-learning JS
dfreeds1

******************/

let avatar = {
  x: 0,
  y: 0,
  maxSize: 50,
  size: 20,
  alive: true,
  color: '#ff0000'
};

let food = {
  x: 0,
  y: 0,
  size: 30,
  color: '#69dc9e'
};

function preload() {

}

// setup()
// creates canvas and sets starting positions

function setup() {
createCanvas(windowWidth,windowHeight);
food.x = random(0, windowWidth);
food.y = random(0, windowHeight);
}


// draw()
// avatar moves with the mouse
// eats food: grows, doesn't eat food: shrivels & dies

function draw() {
  noCursor();
  background('#4a4a48');
  displayConsumer();
  displayCake();
  checkEating();
  death();
}


function displayConsumer() {
  push();
  noStroke();
  fill(avatar.color);
  ellipse(avatar.x,avatar.y,avatar.size);
  pop();
  avatar.x = mouseX;
  avatar.y = mouseY;
  avatar.size -= .1;
  avatar.size = constrain(avatar.size,0,avatar.maxSize);
}

function displayCake() {
  push();
  noStroke();
  fill(food.color);
  ellipse(food.x,food.y,food.size);
  pop();
}

function checkEating() {
  if (avatar.alive === true) {
  if (dist(avatar.x,avatar.y,food.x,food.y) < food.size) {
    avatar.size += 20;
    food.x = random(0,windowWidth);
    food.y = random(0,windowHeight);
  }
}
}

function death() {
    if (avatar.size === 0) {
      avatar.alive = false;
      push();
      textSize(250);
      textAlign(CENTER, CENTER);
      textStyle(BOLD);
      textFont('Helvetica');
      fill(random(100)+100);
      text('R.I.P',windowWidth/2,windowHeight/2);
      pop();
    }
}
