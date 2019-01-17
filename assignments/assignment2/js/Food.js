// Food
// A class for food, involves the ability to be a random size and be reset

class Food extends Agent {
  // Constructor
  // Pass arguments on to the super() constructor (e.g. for Agent)
  // Set a min and max size for food when it resets
  constructor(x,y,minSize,maxSize) {
    super(x,y,random(minSize,maxSize),'#55cccc');
    this.minSize = minSize;
    this.maxSize = maxSize;
  }

  // reset()
  // Set position to a random location on the canvas
  // Set the size to a random size within the limits
  reset() {
    this.x = random(0,width);
    this.y = random(0,height);
    this.size = random(this.minSize,this.maxSize);
  }
}
