/*****************
dan freder
interactive webpage for df's "slow burn"
move and click the mouse to modify animations with the music
******************/

"use strict";

let o1x = 0.0001;
let o1y = 0.0002;
let o1z = 0.0003;
let song;
let loaded = 0;
let currentTime = 0;
let graphics2d;
let amplitude;
let amp = 0;
let triggerStart = 0;
let pressed = 0;
let moveX;
let moveY;

//second values for different song sections
const part1 = 1; //intro/sparse
const part2 = 20.125; //intro2/sparse
const part3 = 39.14; //intro3/sparse
const part4 = 58.2; //thicker /textured
const part5 = 77.27; //sparser (mod from .24)
const part6 = 94.75; //honk
const part7 = 115.38; //turnt changed from .28
const part8 = 136.55; // softer (rectraction/i think? changed from 134.35)
const part9 = 153.35; // louder
const part10 = 172.25; // softer (changed)
const part11 = 191.35; //(changed)
const part12 = 210.5; //culmination of events
const part13 = 220; //soaring line above ba ba da buh buh!
const part14 = 229.65; //wrapping it up
const part15 = 237.85; //no change (was 237.75)
const part16 = 248.65; //final repeat
const part17 = 268;

//ffwd option
// function keyPressed() {
//   if (keyCode === RIGHT_ARROW) {
//     song.jump(190);
//   }
// }

//colour pallete
const green = '#06d6a0';
const lightBlue = '#00a1e4';
const navy = '#073b4c';
const orange = '#db5a42';
const pink = '#e83f6f';
const yellow = '#ffbf00';
const white = '#f9fdff';
const purple = '#9d44b5'
const grey = '#5c6b73'

function setup() {
  // Create a canvas the size of the window
  canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  graphics2d = createGraphics(windowWidth, windowHeight);
  // Canvas stays fixed behind HTML & ignores scrolling
  canvas.style("display:block");
  canvas.style("position:fixed");
  canvas.style("top:0");
  canvas.style("left:0");
  canvas.style("z-index:-100");
  background(0);

  //Check if user is on mobile, loadSound if they aren't
  if (window.mobilecheck() !== true) {
    amplitude = new p5.Amplitude();
    angleMode(DEGREES);
    //load audio file if real PC, and trigger songLoaded function once loaded
    song = loadSound('assets/sounds/slowBurn256.mp3', songLoaded);
  }
}

function draw() {
  //if user is on mobile, display phoneScreen, halt draw loop
  if (window.mobilecheck() !== false) {
    phoneScreen();
    noLoop();
    //display loading screen if song hasn't loaded &/or user hasn't clicked on canvas
  } else if (triggerStart === 0) {
    loadingScreen();
  } else {
    //start music video
    background(0);
    amp = amplitude.volume * 3;
    currentTime = song.currentTime();
    console.log(currentTime);
    if (currentTime >= part1 && currentTime <= part2) {
      spheresBG();
    } else if (currentTime >= part2 && currentTime <= part3) {
      blueSphereExpansion();
    } else if (currentTime >= part3 && currentTime <= part4) {
      spheresBG();
      blueSphereExpansion();
    } else if (currentTime >= part4 && currentTime <= part5) {
      sphereDistortionBG();
      blueSphereExpansion();
    } else if (currentTime >= part5 && currentTime <= part6) {
      whiteRectangles();
      spheresExpansion();
    } else if (currentTime >= part6 && currentTime <= part7) {
      planar();
    } else if (currentTime >= part7 && currentTime <= part8) {
      dunshire();
    } else if (currentTime >= part8 && currentTime <= part9) {
      triangleCurve();
      rectraction();
    } else if (currentTime >= part9 && currentTime <= part10) {
      holeyHole();
    } else if (currentTime >= part10 && currentTime <= part11) {
      tubular();
    } else if (currentTime >= part11 && currentTime <= part12) {
      // twoPlanes();
      twoPlanes();
    } else if (currentTime >= part12 && currentTime <= part13) {
      // sphereDistortionBG();
      // blueSphereExpansion();
      rectWave();
    } else if (currentTime >= part13 && currentTime <= part14) {
      // spheresExpansion();
      circles();
    } else if (currentTime >= part14 && currentTime <= part15) {
      whiteRectangles();
      blueSphereExpansion();
    } else if (currentTime >= part15 && currentTime <= part16) {
      spheresBG();
      blueSphereExpansion();
    } else if (currentTime >= part16 && currentTime <= part17) {
      spheresExpansion();
    } else if (currentTime >= part17) {
      endScreen();
    }
  }
}

function spheresBG() {
  push();
  //mouse + amplitude control rotation
  o1x += (amp) * (map(mouseX, 0, width, 1, -1)) + .05;
  o1y += (amp) * (map(mouseY, 0, height, -1, 1)) + .05;
  translate(0, 0, 400);
  strokeWeight(4);
  rotateX(o1y);
  rotateY(o1x);
  if (pressed === 0) {
    stroke(green);
  } else {
    stroke(white);
  }
  fill(0);
  sphere(700, 5, 4);
  if (pressed === 0) {
    stroke(white);
  } else {
    stroke(green);
  }
  rotateX(o1y);
  rotateY(o1x);
  sphere(700, 5, 4);
  pop();
}

function sphereDistortionBG() {
  push();
  translate(0, 0, 0);
  var ampy = map(amp, 0, 1.25, 0., -30.);
  var scaleMouseX = map(mouseX, 0, width, 10., -10.);
  var scaleMouseY = map(mouseY, 0, height, -7., 7.);
  strokeWeight(2);
  fill(0);
  for (var i = 0; i < 7; i++) {
    if (pressed === 0) {
      stroke(white);
    } else {
      stroke(lightBlue);
    }
    rotateY(scaleMouseX);
    rotateX(scaleMouseY);
    rotateZ(-ampy);
    sphere(width, 3, 3);
    translate(0, 0, 10);
  }
  for (var i = 0; i < 4; i++) {
    if (pressed === 0) {
      stroke(green);
    } else {
      stroke(white);
    }
    rotateY(scaleMouseX);
    rotateX(scaleMouseY);
    rotateZ(ampy);
    sphere(width, 3, 3);
    translate(0, 0, 10);
  }
  pop();
}

function spheresExpansion() {
  push();
  var scaleMouseX = (map(mouseX, 0, width, -90, 90));
  var scaleMouseY = (map(mouseY, height, 0, -90, 90));
  if (pressed === 0) {
    var polyX = 3;
    var polyY = 2;
  } else {
    var polyX = 3;
    var polyY = 3;
  }
  translate(0, 0, 0);
  noFill();
  stroke(white);
  strokeWeight(1);
  rotateY(scaleMouseX);
  rotateX(scaleMouseY);
  rotateZ(o1z);
  o1z += amp;
  if (amp >= .05) {
    for (var i = 0; i < 5; i++) {
      var scalar = map(amp, .05, 1.5, width / 5, width / 2);
      var scalar2 = map(amp, .05, 1.5, width / 5, width / 3);
      stroke(white);
      sphere(width / 5, polyX, polyY);
      stroke(lightBlue);
      sphere(scalar, polyX, polyY);
      stroke(green);
      sphere(scalar2, polyX, polyY);
    }
  } else {
    sphere(width / 5, polyX, polyY);
  }
  pop();
}

function blueSphereExpansion() {
  push();
  var scaleMouseX = (map(mouseX, 0, width, -90, 90));
  var scaleMouseY = (map(mouseY, height, 0, -90, 90));
  if (pressed === 0) {
    var polyX = 3;
    var polyY = 2;
  } else {
    var polyX = 3;
    var polyY = 3;
  }
  translate(0, 0, 0);
  noFill();
  stroke(white);
  strokeWeight(1);
  rotateY(scaleMouseX);
  rotateX(scaleMouseY);
  rotateZ(o1z);
  o1z += amp;
  if (amp >= .05) {
    for (var i = 0; i < 5; i++) {
      var scalar = map(amp, .0, 1., width / 5, width / 3);
      stroke(white);
      sphere(width / 5, polyX, polyY);
      stroke(lightBlue);
      sphere(scalar, polyX, polyY);
    }
  } else {
    sphere(width / 5, polyX, polyY);
  }
  pop();
}

function planar() {
  var scaleX = map(mouseX, 0, width, 30, -30);
  var scaleY = map(mouseY, 0, height, 45., -45.);
  var zRot = map(amp, 0., 1., 0., 10.);
  var ampy = map(amp, 0., 1., 50, 100);
  push();
  translate(0, 0, 0);
  noFill();
  strokeWeight(1);
  rotateY(scaleX);
  rotateZ(scaleY);
  for (var i = 0; i < 50; i++) {
    if (pressed === 1) {
      if (i % 2 === 0) {
        stroke(purple);
      } else {
        stroke(grey);
      }
    }
    if (pressed === 0) {
      if (i % 2 === 0) {
        stroke(grey);
      } else {
        stroke(purple);
      }
    }
    box(width / 16 * i, height / 9 * i, ampy, 4, 4);
    translate(0, 0, 5);
    rotateZ(zRot);
  }
  pop();
}

function dunshire() {
  push();
  translate(0, 0, -100);
  rotateZ(o1z);
  var xScale = map(mouseX, 0, width, width, width * 1.25);
  var yScale = map(mouseY, height, 0, height / 2, height * .75);
  noFill();
  strokeWeight(1);
  rotateX(90);
  for (var i = 0; i < 2; i++) {
    if (pressed === 0) {
      stroke(green);
      o1z += (amp * .25) + .05;
    } else {
      stroke(grey);
      o1z -= (amp * .25) + .05;
    }
    rotateX(o1x);
    cone(xScale, yScale, 3, 9);
    translate(0, 0, 50);
    if (pressed === 0) {
      stroke(grey);
    } else {
      stroke(green);
    }
    cone(xScale, yScale, 3, 9);
  }
  o1x += amp * .25;
  pop();
}

function rectraction() {
  push();
  translate(0, 0, 0);
  strokeWeight(.75);
  var scaleMouseX = (map(mouseX, 0, width, -30, 30));
  var scaleMouseY = (map(mouseY, height, 0, -30, 30));
  rotateX(scaleMouseY);
  rotateY(scaleMouseX);
  var amped = map(amp, 0, 1., 0., 100.);
  push();
  translate(0, 0, amped);
  stroke(pink);
  rotateZ(o1z);
  fill(0, 0, 0, 4);
  torus(width / 3, height, 3, 4);
  pop();
  push();
  stroke(pink);
  rotateZ(o1z);
  translate(0, -amped, 0);
  torus(width / 3, height, 3, 4);
  if (pressed === 0) {
    o1z += .05 + (amp * 1.5);
  } else {
    o1z -= .05 + (amp * 1.5);
  }
  pop();
}

function holeyHole() {
  push();
  var rotationScaleMouseX = (map(mouseX, 0, width, 30., -30.));
  var rotationScaleMouseY = (map(mouseY, 0, height, -20., 20.));
  strokeWeight(1);
  fill(1, 1, 1, 4);
  if (pressed === 1) {
    stroke(lightBlue);
    o1z += .2 * amp;
  } else {
    stroke(purple);
    o1z -= .2 * amp;
  }
  rotateY(rotationScaleMouseX);
  rotateX(rotationScaleMouseY);
  rotateZ(-o1y);
  for (var i = 0; i < 10; i++) {
    rotateZ(o1z);
    torus(width / 2, width / 3, 3, 3);
    translate(0, 0, -150);
  }
  o1y += .125 * amp;
  pop();
}

function twoPlanes() {
  //whiteRectangles model
  var ampTwist = map(amp, 0., 1.25, 0., 5.);
  push();
  translate(0, 0, -1000);
  noFill();
  strokeWeight(3);
  stroke(255);
  rectMode(CENTER);
  var spacer = 50;
  var rectWidth = map(mouseX, 0, width, 3000, 5000);
  var rectHeight = map(mouseY, 0, height, 2000, 3000);
  push();
  //center to lower right
  for (var i = 0; i < 100; i++) {
    stroke(5 * i);
    rect(0, 0, rectWidth, rectHeight);
    translate(spacer, spacer);
  }
  pop();
  push();
  //center to upper left
  for (var i = 0; i < 100; i++) {
    stroke(5 * i);
    rect(0, 0, rectWidth, rectHeight);
    translate(-spacer, -spacer);
  }
  pop();
  //black rects highlight -ve space
  push();
  noFill();
  strokeWeight(40);
  stroke(0);
  for (var i = 0; i < 50; i++) {
    rect(0, 0, 230 * amp + 100 * i, 230 * amp + 100 * i);
    rotateZ(ampTwist);
  }
  pop();
  pop();

  //original 2PLanes
  push();
  translate(0, 0, 0);
  var scaleX = map(mouseX, 0, width, -3., 3.);
  var scaleY = map(mouseY, 0, height, 1., -1.);
  strokeWeight(1);
  noFill();
  for (var i = 0; i < 12; i++) {
    if (pressed === 0) {
      var pressedClr = lightBlue;
    } else {
      var pressedClr = green;
    }
    stroke(100);
    box(width / 3, height / 5, i);
    translate(0, 0, 30);
    stroke(pressedClr);
    box(width / 3, height / 5, i);
    rotateZ(1.25 * ampTwist);
    rotateX(scaleY);
    rotateY(scaleX);
  }
  pop();
}

function tubular() {
  push();
  translate(0, 0, 0);
  var ampy = constrain((map(amp, 0., 1.25, 0, 140)), 0, 140);
  var scaleY = map(mouseY, 0, height, -20., 20.);
  var scaleX = map(mouseX, 0, width, 40, -40);
  if (pressed === 0) {
    o1z += amp * .025 + .01;
    var pressedClr = lightBlue;
  } else {
    var pressedClr = green;
    o1z -= amp * .025 + .01;
  }
  strokeWeight(1);
  noFill();
  rotateX(scaleY);
  rotateY(scaleX);
  for (var i = 0; i < 11; i++) {
    translate(0, 0, ampy);
    rotateZ(o1z);
    stroke(grey);
    torus(width / 2, width / 3, 24, 2);
    translate(0, 0, -150);
    stroke(pressedClr);
    torus(width / 2, width / 3, 24, 2);
  }
  pop();
}

function triangleCurve() {
  push();
  noFill();
  stroke(255);
  strokeWeight(1);
  moveY = map(mouseY, 0, height, -10., 0.);
  moveX = map(mouseX, 0, width, -5., 5.);
  for (var i = 0; i < 250; i++) {
    if (i > 30) {
      stroke(i + 1);
    } else {
      noStroke();
    }
    rotate((amp + 1.5));
    var triVolScale = 20;
    triangle(width / 5 - 20 * i - triVolScale, height / 7 + 20 * i + triVolScale, width / 5, height / 7 - 20 * i - triVolScale, width / 5 + 20 * i + triVolScale, height / 7 + 20 * i + triVolScale);
    translate(moveX, moveY);
  }
  pop();
}

function whiteRectangles() {
  push();
  translate(0, 0, -500);
  noFill();
  strokeWeight(2);
  stroke(255);
  rectMode(CENTER);
  var spacer = 40;
  var rectWidth = map(mouseX, 0, width, 500, 2000);
  var rectHeight = map(mouseY, 0, height, 400, 1500);
  push();
  //center to lower right
  for (var i = 0; i < 50; i++) {
    stroke(5 * i);
    rect(0, 0, rectWidth, rectHeight);
    translate(spacer, spacer);
  }
  pop();
  push();
  //center to upper left
  for (var i = 0; i < 50; i++) {
    stroke(5 * i);
    rect(0, 0, rectWidth, rectHeight);
    translate(-spacer, -spacer);
  }
  pop();
  //black circles highlight -ve space
  push();
  noFill();
  strokeWeight(40);
  stroke(0);
  for (var i = 0; i < 100; i++) {
    ellipse(0, 0, 100 * amp + 100 * i, 100 * amp + 100 * i);
  }
  pop();
  pop();

}

function rectWave() {
  push();
  var ampTwist = map(amp, 0., 1.25, .1, 1.);
  var elW = width / 3;
  var elH = map(mouseY, height, 0, 0, height);
  var scaleXMouse = map(mouseX, 0, width, -45, 45);
  var spacer = 0;
  var coneRad = map(mouseX, 0, width, width / 2, width);
  var coneHeight = map(mouseY, height, 0, height / 2, height * 2);
  if (pressed === 0) {
    o1x -= ampTwist;
  } else {
    o1x += ampTwist;
  }
  //rectangles
  push();
  translate(0, 0, -1000);
  strokeWeight(2);
  noFill();
  rectMode(CENTER);
  rotateY(scaleXMouse);
  for (var i = 0; i < 300; i++) {
    if (i % 2 === 0) {
      stroke(purple);
    } else {
      stroke(pink);
    }
    rotateX(-o1x / 50);
    rect(0, 0, elW + spacer, elH + spacer, 50);
    spacer += 50;
  }
  var ampy = map(amp, 0., 1.25, .001, .01);
  if (pressed === 0) {
    o1z += ampy;
  } else {
    o1z -= ampy;
  }
  pop();
}

function circles() {
  var ampTwist = map(amp, 0., 1.25, 0., 5.);
  push();
  push();
  var ampTwist = map(amp, 0., 1.25, 0., 5.);
  var elW = map(mouseX, 0, width, 100, 200);
  var elH = map(mouseY, 0, height, -50, 50);
  translate(0, 0, -500);
  noFill();
  strokeWeight(2);
  var spacer = 80;
  //white circles
  for (var i = 0; i < 100; i++) {
    stroke(255);
    rotateZ(o1z);
    ellipse(0, 0, elW + spacer, elH + spacer, 50);
    spacer += 80;
    stroke(pink);
    ellipse(0, 0, elW + spacer, elH + spacer, 50);
    spacer += 80;
  }
  var ampy = map(amp, 0., 1.25, .02, .3);
  if (pressed === 0) {
    o1z += ampy;
  } else {
    o1z -= ampy;
  }
  pop();

  // black circles add -ve space/create mystery
  push();
  noFill();
  strokeWeight(40);
  stroke(0);
  for (var i = 0; i < 75; i++) {
    ellipse(0, 0, 100 * i, 100 * i, 50);
  }
  pop();
}

function mousePressed() {
  //only lets mousePress trigger start/play if user is on a real computer
  if (window.mobilecheck() === false && loaded === 1) {
    triggerStart = 1;
    //testing this playMode out
    song.playMode('restart');
    song.play();
    //update loaded variable to avoid retriggering on future mouse clicks
    loaded = 2;
  } else if (loaded === 2 && pressed === 0) {
    pressed = 1;
  } else {
    pressed = 0;
  }
}

function songLoaded() {
  loaded = 1;
}

// text is mapped to a 2D plane so it works in p5's WEBGL canvas
function loadingScreen() {
  push();
  push();
  graphics2d.background(0);
  graphics2d.textFont('Be Vietnam');
  graphics2d.textSize(width / 20);
  graphics2d.textAlign(CENTER, CENTER);
  graphics2d.noStroke();
  graphics2d.fill(255);
  graphics2d.text('DF', windowWidth / 2, windowHeight / 2 - 150);
  graphics2d.text('Slow Burn', windowWidth / 2, windowHeight / 2 - 50);
  if (loaded === 0) {
    graphics2d.textSize(width / 30);
    graphics2d.fill(100);
    graphics2d.text('loading...', windowWidth / 2, windowHeight / 2 + 50);
  } else {
    graphics2d.textSize(width / 25);
    graphics2d.fill(255);
    graphics2d.text('click to play', windowWidth / 2, windowHeight / 2 + 50);
  }
  texture(graphics2d);
  plane(windowWidth, windowHeight);
  pop();

  //green rectangles
  push();
  rectMode(CENTER);
  stroke(green);
  noFill();
  rect(0, -30, width * .625, height * .75);
  rect(0, -30, width * .625 + 20, height * .75 - 20);
  pop();
}

function endScreen() {
  push();
  ambientLight(255);
  graphics2d.background(0);
  graphics2d.textFont("'Be Vietnam'");
  graphics2d.textSize(width / 20);
  graphics2d.textAlign(CENTER, CENTER);
  graphics2d.noStroke();
  graphics2d.fill(255);
  // graphics2d.text('thanks for listening', windowWidth / 2, (windowHeight / 2) - 50);
  let dfSite = createA('https://dfduo.com/', 'thanks for listening');
  dfSite.style('font-family', 'Be Vietnam');
  dfSite.style('font-size', '5em');
  dfSite.style('text-align', 'center');
  dfSite.style('text-decoration', 'none');
  dfSite.style('color', 'Lavender');
  dfSite.position(0, height / 2 - 100);
  dfSite.center('horizontal');
  texture(graphics2d);
  plane(windowWidth, windowHeight);
  noLoop();
  pop();
}

//function checks if user is on mobile. False = Real Computer!
window.mobilecheck = function() {
  var check = false;
  (function(a) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
};

function phoneScreen() {
  push();
  ambientLight(255);
  graphics2d.background(0);
  graphics2d.textFont("'Be Vietnam'");
  graphics2d.textSize(width / 10);
  graphics2d.textAlign(CENTER, CENTER);
  graphics2d.noStroke();
  graphics2d.fill(255);
  graphics2d.text('please revisit', windowWidth / 2, windowHeight / 2 - 150);
  graphics2d.text('on desktop', windowWidth / 2, windowHeight / 2 - 50);
  texture(graphics2d);
  plane(windowWidth, windowHeight);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// function normalDreams() {
//   push();
//   if (pressed === 0) {
//     translate(-width / 5, 0, -200);
//   } else {
//     translate(width / 5, 0, -200);
//   }
//   normalMaterial();
//   noStroke();
//   var scaleMouseX = (map(mouseX, 0, width, -3, 3));
//   var scaleMouseY = (map(mouseY, height, 0, -5, 5));
//   for (var i = 0; i < 10; i++) {
//     var xScale = i * 50;
//     var yScale = i * 50;
//     torus(xScale, yScale, 3);
//     rotateZ(i * o1z);
//     rotateY(scaleMouseX);
//     rotateX(scaleMouseY);
//     translate(0, 0, 100);
//   }
//   o1z += .1 * amp;
//   pop();
// }