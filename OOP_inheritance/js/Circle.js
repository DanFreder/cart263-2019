class Circle extends Shape {
  constructor(x,y,size,c) {
    super(x,y,size);
    this.c = c; //colour
  }

update() {
  super.update(); //do the generic Shape update() jiggly jiggly
  this.size += random(-3,3); //also jiggle in size
}

display() {
  push();
  ellipseMode(CENTER);
  fill(this.c);
  noStroke();
  ellipse(this.x,this.y,this.size);
  pop();
}
  }
