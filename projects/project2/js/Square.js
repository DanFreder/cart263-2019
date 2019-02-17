let rectWidth = 10;
let rectHeight = 100;
let angle = 0;

function Square(x,y,colour) {
this.x = x;
this.y = y;
this.colour = colour;
}

Square.prototype.update = function() {

rectWidth = (sin(angle + PI/2) * (width/2 + mouseX));
rectHeight = (sin(angle + PI/2) * (height/2 + mouseY));

angleAmp = map(vol,0,1,0,.4);
angle += angleAmp;
}

Square.prototype.display = function() {
  push();
  fill(this.colour);
  strokeWeight(2);
  stroke(255);
  noFill();
  rectMode(CENTER);
  rect(this.x, this.y,rectWidth,rectHeight);
  pop();
}
