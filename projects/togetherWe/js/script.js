/*****************
dan freder
interactive webpage for df's "together, We"
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
let cabin;
let bgClr = 220;
var noiseValX;
var noiseValY;
var lowSpacer = 100;
var highSpacer = 150;
var curveCount = 10;
var mousePull = 320;


let xOff1 = 0;
let yOff1 = 0;
let zOff1 = 0;
let inc = 0.02;
let start = 0;
let scl = 100;
let cols, rows;

//second values for different song sections
const part1 = 1;
const part2 = 14.91;
const part3 = 19;
const part4 = 27.5;
const part5 = 39.8;
const part6 = 200;


//ffwd option
// function keyPressed() {
//   if (keyCode === RIGHT_ARROW) {
//     song.jump(200);
//   }
// }

//colour pallete
const elecGreen = '#06d6a0';
const white = '#f9fdff';
const violet = '#FF89FF';
const yellow = '#FFF200';
const green = '#86C35E';
const red = '#DD1C29';
const blue = '#005788';

function preload() {
  cabin = loadFont('assets/images/Cabin-Medium.otf');
}

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
    song = loadSound('assets/sounds/togetherWe.mp3', songLoaded);
    noiseValX = random(1);
    noiseValY = random(1);
    rectMode(CENTER);
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
    amp = amplitude.volume * 3;
    currentTime = song.currentTime();

    //draw pulsing background
    var bgClr = map(sin(frameCount / 5), -1, 1, 0, 55);
    background(bgClr);

    //timeline
    if (currentTime >= part1 && currentTime <= part2) {
      rays();
    } else if (currentTime >= part2 && currentTime <= part3) {
      circleSin();
      rays();
    } else if (currentTime >= part3 && currentTime <= part4) {
      circleSin();
      rays();
    } else if (currentTime >= part4 && currentTime <= part5) {
      curvaceous();
      circleSin();
      rays();
    } else if (currentTime >= part5 && currentTime <= part6) {
      curvaceous();
      crissCross();
      circleSin();
      rays();
      // } else if (currentTime >= part6 && currentTime <= part7) {
      //   //
      // } else if (currentTime >= part7 && currentTime <= part8) {
      //   //
      // } else if (currentTime >= part8 && currentTime <= part9) {
      //   //
      // } else if (currentTime >= part9 && currentTime <= part10) {
      //   //
      // } else if (currentTime >= part10 && currentTime <= part11) {
      //   //
      // }
    }
  }
}

function circleSin() {
  push();
  noFill();
  strokeWeight(10);
  var ampy = constrain(amp, 0, 1);
  for (var i = 0; i < 50; i++) {
    rotateZ(o1z);
    var pulseR = map(sin(frameCount / 9), -1, 1, 255, 100);
    var pulseG = map(sin(frameCount / 11), -1, 1, 0, 50);
    stroke(pulseR, pulseG, i);
    ellipse(0, 0, (i * 10));
    o1z += .0002 * ampy;
  }
  pop();
}

function rays() {
  push();
  fill(0, 0, 0, 0);
  rectMode(CENTER);
  noStroke();
  rect(0, 0, width, height);
  stroke(255, 255, 0);
  for (var i = 0; i < 9; i++) {
    if (i % 2 == 1) {
      strokeWeight(2);
    } else {
      strokeWeight(1);
    }
    noiseValX = map(noise(frameCount / (23 * i)), 0, 1, -1.5 * width * amp, 1.5 * width * amp);
    noiseValY = map(noise(frameCount / (24 * i)), 0, 1, -1.5 * width * amp, 1.5 * width * amp);
    line(0, 0, noiseValX, noiseValY);
  }
  pop();
}

function curvaceous() {
  push();
  translate(-width / 2, -height / 2);
  //noFill also cool
  fill(100, 0, 255, 5);
  strokeWeight(2);
  var ampy = map(amp, 0., 1, lowSpacer, highSpacer);
  var mX = map(mouseX, 0, width, -mousePull, mousePull);
  var mY = map(mouseY, 0, height, mousePull, -mousePull);
  for (var i = 0; i < curveCount; i++) {
    //first and last x,y pair are anchors
    noStroke();
    //middle up lines
    bezier(0, height - (i * ampy) - mY, (width * .125) + mX, 0, (width * .75) + mX, 0, width, height - (i * ampy) - mY);

    bezier(0, (i * ampy) - mY, (width * .125) + mX, height, (width * .75) + mX, height, width, (i * ampy) - mY);
  }
  pop();
}

function crissCross() {
  var rectDist = map(amp, 0, 1, 200, 250);
  var rectSize = height;
  var numRects = 10;
  push();
  rectMode(CENTER);
  stroke(0, 50, 255, 200);
  strokeWeight(1);
  noFill();
  for (var i = 0; i < numRects; i++) {
    var scalarX = map(noise(frameCount / 400), 0, 1, -rectDist * i, rectDist * i);
    var scalarY = map(noise(frameCount / 420), 0, 1, -rectDist * i, rectDist * i);
    rect(scalarX, scalarY, rectSize, rectSize);
    rect(-scalarX, -scalarY, rectSize, rectSize);
  }
  for (var i = 0; i < numRects; i++) {
    var scalarX = map(noise(frameCount / 500), 0, 1, -rectDist * i, rectDist * i);
    var scalarY = map(noise(frameCount / 520), 0, 1, -rectDist * i, rectDist * i);
    rect(scalarX, scalarY, rectSize, rectSize);
    rect(-scalarX, -scalarY, rectSize, rectSize);
  }
  pop();
}

// function vectorField() {
//   push();
//   background(0);
//   cols = floor(windowWidth / scl) + 1;
//   rows = floor(windowHeight / scl) + 1;
//   angleMode(RADIANS);
//   // var yOff1 = map(mouseX, 0, width, -1, 1);
//   translate(-width / 2, -height / 2);
//   for (var y = 0; y < rows; y++) {
//     xOff1 = 0;
//     for (var x = 0; x < cols; x++) {
//       //calculate angle for every vector from perlin noise
//       var angle = noise(xOff1, yOff1, zOff1) * TWO_PI;
//       var v = p5.Vector.fromAngle(angle);
//       xOff1 += map(mouseX, 0, width, -.1, -.2);
//       fill(y + 1, 3);
//       noStroke();
//       push();
//       translate(x * scl, y * scl);
//       rotate(v.heading());
//       rectMode(CENTER);
//       rect(0, 0, 2 * scl, 3 * scl);
//       pop();
//     }
//     zOff1 = map(mouseY, height, 0, -.1, -.5);
//   }
//   pop();
// }
// function circleSinSpiral() {
//   push();
//   // var bgClr = map(sin(frameCount / 4), -1, 1, 0, 220);
//   // background(bgClr);
//   var elClrR = map(sin(frameCount / 6), -1, 1, 0, 200);
//   noStroke();
//   strokeWeight(0);
//   fill(elClrR);
//   ellipse(0, 0, width / 5);
//   pop();
// }
//
// function horizontalPlane() {
//   push();
//   noFill();
//   strokeWeight(1);
//   var strkClr = map(sin(frameCount / 10), -1, 1, 0, 50);
//   stroke(strkClr);
//   rotateX(80);
//   rotateZ(frameCount / 3);
//   box(width / 2, width / 2, 1);
//   pop();
// }
//
// function circlingMouse() {
//   push();
//   translate(0, 0, 0);
//   fill(green);
//   noStroke();
//   ellipse(width / 3, 0, 100, 100, 50)
//   stroke(0);
//   line(width / 3, 0, width / 3 + 50, 50);
//   pop();
// }
//
// function spherical() {
//   push();
//   normalMaterial();
//   noStroke();
//   var ampy = map(amp, 0, 1, .1, 1);
//   o1z += ampy;
//   rotateZ(o1z);
//   translate(0, 0, 100);
//   sphere(width / 22, 24, 24);
//   pop();
// }

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
  graphics2d.background(0);
  graphics2d.textFont('Be Vietnam');
  graphics2d.textSize(width / 20);
  graphics2d.textAlign(CENTER, CENTER);
  graphics2d.noStroke();
  graphics2d.fill(255);
  graphics2d.text('DF', windowWidth / 2, windowHeight / 2 - 150);
  graphics2d.text('Together, We', windowWidth / 2, windowHeight / 2 - 50);
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
  stroke(elecGreen);
  noFill();
  rect(0, -30, width * .625, height * .75);
  rect(0, -30, width * .625 + 20, height * .75 - 20);
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

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}