"use strict";

// Food
// A class for food, involves the ability to be a random size and be reset

class Food extends Agent {
  // Constructor
  // Pass arguments on to the super() constructor (e.g. for Agent)
  // Set a min and max size for food when it resets
  constructor(x,y,minSize,maxSize,speed) {
    super(x,y,random(minSize,maxSize),'#55cccc');
    this.minSize = minSize;
    this.maxSize = maxSize;
    this.speed = speed;
    this.vx = 1;
    this.vy = 1;
  }

update() {
  //randomize velocity ~20% of the time
    if (random(1) < 0.2) {
      this.vx = random(-this.speed, this.speed);
      this.vy = random(-this.speed, this.speed);
    }
    this.x += this.vx;
    this.y += this.vy;

    // screen wrapping
    if (this.x < 0) {
      this.x += width;
    } else if (this.x > width) {
      this.x -= width;
    }
    if (this.y < 0) {
      this.y += height;
    } else if (this.y > height) {
      this.y -= height;
    }
  }

  // reset()
  // Set position to a random location on the canvas
  // Set the size to a random size within the limits
  reset() {
    this.x = random(0,width);
    this.y = random(0,height);
    this.size = random(this.minSize,this.maxSize);
    this.vx = random(-this.speed, this.speed);
    this.vy = random(-this.speed, this.speed);
  }
}
