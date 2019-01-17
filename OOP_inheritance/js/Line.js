class Line extends Shape {
  constructor(x,y,x2,y2) { //omits the size from the parent constructor and only passes the 4 linecoords
    super(x,y,undefined);
    this.x2 = x2;
    this.y2 = y2;
  }

  update() {
    super.update(); //do the generic Shape update() jiggly jiggly
    this.x2 += random(-1,1);
    this.y2 += random(-1,1);
  }

  display() {
    push();
    strokeWeight(3);
    stroke(0);
    line(this.x,this.y,this.x2,this.y2);
    pop();
  }
}
