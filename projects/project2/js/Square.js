function square(x,y,colour) {
this.x = x;
this.y = y;
this.colour = colour;
}

square.prototype.update = function() {
if (dist(mouseX, mouseY,this.x,this.y) < 150) {
    background('#4b5358');
  } else {
    background('#af929d');
  }
}

square.prototype.display = function() {
  push();
  rectMode(CENTER);
  fill(this.colour);
  strokeWeight(3);
  stroke(0);
  rect(this.x + spacing, this.y + spacing,300,300);
  pop();
}
