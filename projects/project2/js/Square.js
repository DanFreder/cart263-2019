let rectWidth = 10;
let rectHeight = 100;
let angle = 0;

function Square(x, y) {
  this.x = x;
  this.y = y;
}

Square.prototype.update = function() {
  angleAmp = map(vol, 0, 1, 0, .4);
  angle += angleAmp;
  rectWidth = (sin(angle + PI / 8) * (width / 2 + mouseX));
  rectHeight = (sin(angle + PI / 8) * (height / 2 + mouseY / 2));
}

Square.prototype.display = function() {
  push();
  if (mouseIsPressed) {
    fill(0, 0, 0, 25);
  } else {
    fill(0, 0, 0, 0);
  }
  strokeWeight(2);
  stroke(255, 255, 255, 255);
  rectMode(CENTER);
  rect(this.x, this.y, rectWidth, rectHeight);
  pop();
}