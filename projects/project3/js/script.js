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

//second values for different song sections
const part1 = 1; //intro/sparse
const part2 = 20.125; //intro2/sparse
const part3 = 39.14; //intro3/sparse
const part4 = 58.2; //thicker /textured
const part5 = 77.24; //sparser
const part6 = 94.75; //honk
const part7 = 115.28; //turnt
const part8 = 134.35; // softer
const part9 = 153.35; // louder
const part10 = 172.25; // softer (changed)
const part11 = 191.35; //(changed)
const part12 = 210.5; //culmination of events
const part13 = 220; //soaring line above ba ba da buh buh!
const part14 = 229.65; //wrapping it up
const part15 = 237.75; //no change
const part16 = 248.65; //final repeat
const part17 = 268;

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
    amplitude.smooth(.5);
    angleMode(DEGREES);
    //load audio file if real PC, and trigger songLoaded function once loaded
    song = loadSound('assets/sounds/slowBurn_unmastered2.mp3', songLoaded);
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
    amp = amplitude.volume * 10.;
    // amp = constrain(amp, 0., 1);
    currentTime = song.currentTime();
    if (currentTime >= part1 && currentTime <= part2) {
      spheres();
    } else if (currentTime >= part2 && currentTime <= part3) {
      sphereXpansion2();
    } else if (currentTime >= part3 && currentTime <= part4) {
      spheres();
      sphereXpansion2();
    } else if (currentTime >= part4 && currentTime <= part5) {
      spheres();
      sphereXpansion2();
    } else if (currentTime >= part5 && currentTime <= part6) {
      sphereXpansion();
    } else if (currentTime >= part6 && currentTime <= part7) {
      planar();
    } else if (currentTime >= part7 && currentTime <= part8) {
      rectraction();
    } else if (currentTime >= part8 && currentTime <= part9) {
      dunshire();
    } else if (currentTime >= part9 && currentTime <= part10) {
      holeyHole();
    } else if (currentTime >= part10 && currentTime <= part11) {
      tubular();
    } else if (currentTime >= part11 && currentTime <= part12) {
      twoPlanes();
    } else if (currentTime >= part12 && currentTime <= part13) {
      spheres2();
      sphereXpansion2();
    } else if (currentTime >= part13 && currentTime <= part14) {
      sphereXpansion();
    } else if (currentTime >= part14 && currentTime <= part15) {
      spheres();
      sphereXpansion2();
    } else if (currentTime >= part15 && currentTime <= part16) {
      spheres();
      sphereXpansion2();
    } else if (currentTime >= part16 && currentTime <= part17) {
      sphereXpansion();
    } else if (currentTime >= part17) {
      endScreen();
    }
  }
}

function spheres() {
  push();
  //mouse + amplitude control rotation
  o1x += amp * (map(mouseX, 0, width, 2., -2.)) + .05;
  o1y += amp * (map(mouseY, 0, height, -1.5, 1.5)) + .05;
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

function spheres2() {
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

function sphereXpansion() {
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

function sphereXpansion2() {
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
    }
  } else {
    sphere(width / 5, polyX, polyY);
  }
  pop();
}

function dunshire() {
  push();
  translate(0, 0, -100);
  rotateZ(o1z);
  var xScale = map(mouseX, 0, width, width, width * 2.5);
  var yScale = map(mouseY, height, 0, height / 2, height);
  noFill();
  strokeWeight(1);
  rotateX(90);
  for (var i = 0; i < 2; i++) {
    if (pressed === 0) {
      stroke(purple);
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
      stroke(purple);
    }
    cone(xScale, yScale, 3, 9);
  }
  o1x += amp * .25;
  pop();
}

function rectraction() {
  push();
  var scaleMouseX2 = (map(mouseX, 0, width, -90, 180));
  var scaleMouseY2 = (map(mouseY, height, 0, 60, -60));
  if (pressed === 0) {
    stroke(purple);
  } else {
    stroke(grey);
  }
  noFill();
  strokeWeight(2);
  rotateX(90);
  rotateX(scaleMouseY2);
  rotateZ(scaleMouseX2);
  translate(width, height, -200);
  for (var i = 0; i < 10; i++) {
    box(width * 2, height * 2, width, 3, 3);
    translate(-100, -100, -50 - (75 * amp));
  }
  pop();
  push();
  translate(0, 0, 0);
  strokeWeight(2);
  var scaleMouseX = (map(mouseX, 0, width, 30, -30));
  var scaleMouseY = (map(mouseY, height, 0, 30, -30));
  rotateX(scaleMouseY);
  rotateY(scaleMouseX);
  var amped = map(amp, 0, 1.5, 0., 300.);
  for (var i = 0; i < 2; i++) {
    translate(0, 0, amped);
    if (pressed === 0) {
      o1z -= (amp * .125);
      stroke(lightBlue);
      rotateZ(o1z);
    } else {
      o1z += (amp * .125);
      stroke(pink);
      rotateZ(o1z);
    }
    fill(10, 10, 10, i * 10);
    torus(width / 3, height, 3, 4);
    translate(0, 0, -400);
  }
  pop();
}

function holeyHole() {
  push();
  var rotationScaleMouseX = (map(mouseX, 0, width, 60., -60.));
  var rotationScaleMouseY = (map(mouseY, 0, height, -40., 40.));
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
        stroke(100);
      }
    } else if (pressed === 0) {
      if (i % 2 === 0) {
        stroke(green);
      } else {
        stroke(100);
      }
    }
    box(width / 16 * i, height / 9 * i, ampy, 4, 4);
    translate(0, 0, 5);
    rotateZ(zRot);
  }
  pop();
}

function twoPlanes() {
  push();
  translate(0, 0, 0);
  var scaleY = map(mouseY, 0, height, -6, 6);
  var scaleX = map(mouseX, 0, width, 3, -3);
  if (pressed === 0) {
    var pressedClr = lightBlue;
  } else {
    var pressedClr = green;
  }
  strokeWeight(1);
  noFill();
  for (var i = 0; i < 50; i++) {
    stroke(100);
    box(width / 1.25, height / 2, 10 * i);
    translate(0, 0, -20);
    stroke(pressedClr);
    box(width / 1.25, height / 2, 10 * i);
    translate(0, 0, amp);
    rotateZ(1.5 * amp);
    rotateX(scaleY);
    rotateY(scaleX);
  }
  pop();
}

function tubular() {
  push();
  translate(0, 0, 0);
  var ampy = constrain((map(amp, 0., 3., 0., 200.)), 0, 200);
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

function mousePressed() {
  //only lets mousePress trigger start/play if user is on a real computer
  if (window.mobilecheck() === false && loaded === 1) {
    triggerStart = 1;
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
  graphics2d.background(0);
  graphics2d.textFont('Be Vietnam');
  graphics2d.textSize(width / 20);
  // graphics2d.textStyle('italic');
  graphics2d.textAlign(CENTER, CENTER);
  graphics2d.noStroke();
  graphics2d.fill(255);
  graphics2d.text('DF', windowWidth / 2, windowHeight / 2 - 150);
  graphics2d.text('" Slow Burn "', windowWidth / 2, windowHeight / 2 - 50);
  push();
  if (loaded === 0) {
    graphics2d.textSize(width / 30);
    graphics2d.fill(100);
    graphics2d.text('loading...', windowWidth / 2, windowHeight / 2 + 50);
  } else {
    graphics2d.textSize(width / 25);
    graphics2d.fill(200);
    graphics2d.text('click to play', windowWidth / 2, windowHeight / 2 + 50);
  }
  pop();
  texture(graphics2d);
  plane(windowWidth, windowHeight);
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
  graphics2d.text('thanks for listening', windowWidth / 2, (windowHeight / 2) - 50);
  let dfSite = createA('https://dfduo.com/', '< df site');
  dfSite.style('font-family', 'Be Vietnam');
  dfSite.style('font-size', '3em');
  dfSite.style('color', 'Lavender');
  dfSite.position(width / 35, height / 25);
  dfSite.style('text-align', 'center');
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