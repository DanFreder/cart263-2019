let rectWidth = 10;
let rectHeight = 100;
let angle = 0;

function Square(x,y) {
this.x = x;
this.y = y;
}

Square.prototype.update = function() {

rectWidth = (sin(angle + PI/2) * (width/2 + pmouseX));
rectHeight = (sin(angle + PI/2) * (height/2 + pmouseY));

angleAmp = map(vol,0,1,0,.4);
angle += angleAmp;
}

Square.prototype.display = function() {
  push();
  noFill();
  strokeWeight(2);
  stroke(255,255,255,255);
  rectMode(CENTER);
  rect(this.x, this.y,rectWidth,rectHeight);
  pop();
}
