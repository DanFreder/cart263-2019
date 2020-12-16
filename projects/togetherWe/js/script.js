/*****************
dan freder
interactive webpage for df's "together, We"
move and click the mouse to modify animations with the music
******************/

"use strict";

var song;
var loaded = 0;
var currentTime = 0;
var graphics2d;
var amplitude;
var amp = 0;
var triggerStart = 0;
var pressed = 0;
var cabin;
var bgClr;
var noiseValX;
var noiseValY;
var offX;
var offY;
var o1x = 0;
var o2x = 0;
var o3x = 0;
var o1z = .03;
var o2z = 0;
var o3z = 10;
var o5z = 0;
var polyTwist = 0;
var xyLoc;
var mX;
var atomicMx;
var atomicMy;
var mXTwisted;
var mY;
var off1 = 10;
var off2 = 10;
var circleSinZ = 0;
var sDrive1;
var sDrive2;
var redForeman = 150;
var notEasy = 19;
var sphereXoff = 0;
var sphereYoff = 0;
var xGrow = 0;
var yGrow = 0;
var o4z = 90;
var o6x = 15;
var o6z = 45;
var touched = 0;

//colour palette
var navyBlue;
var punchyPurp;
var mutedPurp;
var darkPurp;
var punchyPink;
var lightBlue;
var yellow;
var orange;
var red;

//second values for different song sections
const part1 = 1; //rays
const part2 = 14.91; //starfield
const part3 = 18.2 //circleSin
const part4 = 27.5; //curvaceous
const part5 = 33.6; //atomic
const part6 = 46; //polyMorph
const part7 = 61.3; //orangeQuad
const part8 = 78.4; //blueQuad
const part9 = 90.6; //sphere
const part10 = 115.4; //115.5 - twistedLines
const part11 = 127.82; //127.22 - neonRects
const part12 = 140.22; //140.02 - side tris
const part13 = 152.43; //152.13 - curvy lines
const part14 = 161.7; //161.2
const part15 = 170.57; //170.27
const part16 = 180.57; //180.07
const part17 = 186.63; //186.13
const part18 = 192.64; //terminate
const part19 = 196; //endScreen (197 too far)

// ffwd option for testing
// function keyPressed() {
//   if (keyCode === RIGHT_ARROW) {
//     song.jump(60);
//   }
// }


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

  //colour palette
  navyBlue = color(0, 0, 100);
  punchyPurp = color(130, 0, 255);
  mutedPurp = color(84, 0, 255);
  punchyPink = color(255, 0, 148);
  lightBlue = color(0, 145, 255);
  yellow = color(255, 255, 0);
  orange = color(255, 142, 0);
  red = color(255, 0, 0);
  darkPurp = color(46, 0, 62);

  amplitude = new p5.Amplitude();
  //load audio file if real PC, and trigger songLoaded function once loaded
  song = loadSound('assets/sounds/togetherWe.mp3', songLoaded);

  noiseValX = random(width);
  noiseValY = random(height);
  rectMode(CENTER);
  angleMode(DEGREES);
  sDrive1 = random(1);
  sDrive2 = random(1);
  sphereXoff = random(30);
  sphereYoff = random(30);
}

//check if user is on mobile

window.mobileCheck = function() {
  let check = false;
  (function(a) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
};

function touchStarted() {
  touched = 1;
}

function isMobileDevice() {
  return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};

function draw() {

  if (isMobileDevice() === true || touched === 1 || window.mobileCheck === true) {
    phoneScreen();
    currentTime = 0;
    song.pause();
  } else if (triggerStart === 0) {
    loadingScreen();
  } else {
    //start music video
    amp = amplitude.volume * 3;
    currentTime = song.currentTime();
    //draw pulsing background
    bgClr = map(sin(frameCount / 5), -1, 1, 0, 55);
    //timeline
    if (currentTime >= part1 && currentTime <= part2) {
      background(bgClr);
      rays();
    } else if (currentTime >= part2 && currentTime <= part3) {
      background(bgClr);
      starfield();
      rays();
    } else if (currentTime >= part3 && currentTime <= part4) {
      background(bgClr);
      starfield();
      circleSin();
      rays();
    } else if (currentTime >= part4 && currentTime <= part5) {
      background(bgClr);
      starfield();
      curvaceous();
      circleSin();
      rays();
    } else if (currentTime >= part5 && currentTime <= part6) {
      background(bgClr);
      starfield();
      curvaceous();
      circleSin();
      atomic();
      rays();
    } else if (currentTime >= part6 && currentTime <= part7) {
      background(bgClr);
      starfield();
      curvaceous();
      circleSin();
      atomic();
      polyMorph();
      rays();
    } else if (currentTime >= part7 && currentTime <= part8) {
      background(bgClr);
      starfield();
      curvaceous();
      orangeQuad();
      circleSin();
      atomic();
      polyMorph();
      rays();
    } else if (currentTime >= part8 && currentTime <= part9) {
      background(bgClr);
      starfield();
      curvaceous();
      orangeQuad();
      blueQuad();
      circleSin();
      atomic();
      polyMorph();
      rays();
    } else if (currentTime >= part9 && currentTime <= part10) {
      background(bgClr);
      starfield();
      curvaceous();
      orangeQuad();
      blueQuad();
      circleSin();
      atomic();
      polyMorph();
      rays();
      spheres();
    } else if (currentTime >= part10 && currentTime <= part11) {
      background(bgClr);
      starfield();
      curvaceous();
      orangeQuad();
      blueQuad();
      circleSin();
      atomic();
      polyMorph();
      rays();
      spheres();
      twistedLines();
    } else if (currentTime >= part11 && currentTime <= part12) {
      background(bgClr);
      starfield();
      curvaceous();
      neonRects();
      orangeQuad();
      blueQuad();
      circleSin();
      atomic();
      polyMorph();
      rays();
      spheres();
      twistedLines();
    } else if (currentTime >= part12 && currentTime <= part13) {
      background(bgClr);
      starfield();
      curvaceous();
      neonRects();
      orangeQuad();
      blueQuad();
      circleSin();
      atomic();
      polyMorph();
      rays();
      spheres();
      twistedLines();
      sideTris();
    } else if (currentTime >= part13 && currentTime <= part14) {
      background(bgClr);
      starfield();
      curvaceous();
      neonRects();
      orangeQuad();
      blueQuad();
      circleSin();
      atomic();
      polyMorph();
      rays();
      spheres();
      curvyLines();
      twistedLines();
      sideTris();
    } else if (currentTime >= part14 && currentTime <= part15) {
      starfield();
      curvaceous();
      neonRects();
      orangeQuad();
      blueQuad();
      circleSin();
      atomic();
      polyMorph();
      rays();
      spheres();
      curvyLines();
      twistedLines();
      sideTris();
    } else if (currentTime >= part15 && currentTime <= part16) {
      starfield();
      curvaceous();
      neonRects();
      orangeQuad();
      blueQuad();
      circleSin();
      twistAlong();
      atomic();
      polyMorph();
      rays();
      spheres();
      curvyLines();
      twistedLines();
      sideTris();
    } else if (currentTime >= part16 && currentTime <= part17) {
      starfield();
      curvaceous();
      neonRects();
      orangeQuad();
      blueQuad();
      circleSin();
      twistAlong();
      atomic();
      polyMorph();
      rays();
      spheres();
      curvyLines();
      twistedLines();
      sideTris();
    } else if (currentTime >= part17 && currentTime <= part18) {
      starfield();
      curvaceous();
      neonRects();
      orangeQuad();
      blueQuad();
      circleSin();
      twistAlong();
      atomic();
      polyMorph();
      rays();
      spheres();
      curvyLines();
      twistedLines();
      sideTris();

      //terminate
    } else if (currentTime >= part18 && currentTime <= part19) {
      background(bgClr);

      //endScreen
    } else if (currentTime >= part19) {
      endScreen();
    }
  }
}

function sideTris() {
  push();
  translate(0, 0, -100);
  noStroke();
  if (pressed == 0) {
    fill(punchyPink);
  } else {
    fill(punchyPink);
  }
  var mZ = map(mouseX, 0, width, -45, 45);
  rotateZ(mZ);
  triangle(-width * 1.5, -height * 1.5, -width * 1.5, height * 1.5, 0, 0);
  triangle(width * 1.5, -height * 1.5, width * 1.5, height * 1.5, 0, 0);
  o5z += 1;
  pop();
}

function spheres() {
  push();
  translate(0, 0, 115);
  rotateZ(frameCount * .0005);
  strokeWeight(1);
  // noCursor();
  for (var i = 0; i < 7; i++) {
    if (i == 2) {
      noStroke();
    } else if (i % 2 == 1) {
      fill(redForeman, notEasy, 0);
      noStroke();
    } else {
      fill(0);
    }
    rotateX(sphereXoff);
    rotateY(sphereYoff);
    sphere(width / 30, 6, 6);
  }
  xGrow += random(.01);
  yGrow += random(.01);
  sphereXoff += .06;
  sphereYoff += .05;
  pop();
}

function neonRects() {
  var m3X = map(mouseX, 0, width, width * .125, width);
  var m3Y = map(mouseY, 0, height, -height * .5, height * .5);
  push();
  translate(0, 0, -5);
  strokeWeight(10);
  fill(255, 10);
  for (var i = 0; i < 10; i++) {
    if (i % 2 == 0) {
      stroke(punchyPurp);
    } else {
      stroke(punchyPink);
    }
    rotateZ(o4z);
    rect(20 * i, 20 * i, m3X, m3Y);
  }
  for (var i = 0; i < 10; i++) {
    if (i % 2 == 0) {
      stroke(punchyPink);
    } else {
      stroke(punchyPurp);
    }
    rotateZ(o4z);
    rect(-20 * i, -20 * i, m3X, m3Y);
  }
  o4z += .003
  pop();
}

function curvyLines() {
  push();
  var mXC = map(mouseX, 0, width, -width * .75, width * .75);
  var mYC = map(mouseY, 0, height, -height * .75, height * .75);
  translate(-width / 2, -height / 2, 0);
  noFill();
  for (var i = 0; i < 2; i++) {
    if (i % 2 == 0) {
      if (pressed == 0) {
        stroke(redForeman, notEasy, 0);
      } else {
        stroke(orange);
      }
    } else {
      if (pressed == 0) {
        stroke(orange);
      } else {
        stroke(redForeman, notEasy, 0);
      }
    }
    bezier(0, height * .5, width * .25 + mXC, height * .75 - mYC, width * .75 + mXC, height * .25 + mYC, width, height * .5);
    translate(0, -10, 0);
  }
  pop();
}

function orangeQuad() {
  push();
  if (pressed == 0) {
    fill(orange);
  } else {
    fill(lightBlue);
  }
  noStroke();
  o3x = map(mouseX, 0, width, -10, 10);
  var yPull = map(mouseY, 0, height, -300, -50);
  rotateZ(o3x);
  var q_x1 = width * -.175;
  var q_y1 = height * .125 + yPull;
  var q_x2 = width * -.5;
  var q_y2 = height * .25;
  var q_x3 = width * .175;
  var q_y3 = height * .125 + yPull;
  var q_x4 = width * .5;
  var q_y4 = height * .25;
  quad(q_x1, q_y1, q_x2, q_y2, q_x3, q_y3, q_x4, q_y4);
  pop();
}

function blueQuad() {
  push();
  if (pressed == 0) {
    fill(lightBlue);
  } else {
    fill(orange);
  }
  noStroke();
  o3x = map(mouseX, 0, width, -10, 10);
  var yPull = map(mouseY, 0, height, -200, 0);
  rotateZ(o3x);
  var q2_x1 = width * -.125;
  var q2_y1 = height * .25 + yPull;
  var q2_x2 = width * -.4;
  var q2_y2 = height * -.25;
  var q2_x3 = width * .125;
  var q2_y3 = height * .25 + yPull;
  var q2_x4 = width * .4;
  var q2_y4 = height * -.25;
  quad(q2_x1, q2_y1, q2_x2, q2_y2, q2_x3, q2_y3, q2_x4, q2_y4);
  pop();
}

function circleSin() {
  push();
  translate(0, 0, 50);
  noStroke();
  redForeman = map(sin(frameCount / 3), -1, 1, 100, 200);
  notEasy = map(sin(frameCount / 4), -1, 1, 0, 38);
  fill(redForeman, notEasy, 0, 255);
  rotateZ(circleSinZ);
  ellipse(0, 0, 250);
  pop();
  push();
  var ampy = amp * 90;
  noStroke();
  translate(0, 0, 50);
  for (var i = 0; i < 30; i++) {
    var pulsar = map(sin(ampy), -1, 1, 0, 8);
    rotateZ(circleSinZ);
    var pulseR = map(sin(frameCount / 9), -1, 1, 255, 100);
    var pulseG = map(sin(frameCount / 11), -1, 1, 0, 50);
    // stroke(pulseR, pulseG, i);
    fill(pulseR, pulseG, 0, 2);
    ellipse(0, 0, (i * pulsar) + 1);
    circleSinZ -= .0002 * ampy;
  }
  pop();
}

function rays() {
  push();
  translate(0, 0, 150);
  stroke(yellow);
  for (var i = 0; i < 9; i++) {
    if (i % 2 == 1) {
      if (pressed == 0) {
        strokeWeight(2);
      } else {
        strokeWeight(1)
      }
    } else {
      if (pressed == 0) {
        strokeWeight(1);
      } else {
        strokeWeight(2);
      }
    }
    noiseValX = map(noise(frameCount / (29 * i)), 0, 1, -1.5 * width * amp, 1.5 * width * amp);
    noiseValY = map(noise(frameCount / (27 * i)), 0, 1, -1.5 * width * amp, 1.5 * width * amp);
    line(0, 0, noiseValX, noiseValY);
  }
  pop();
}

function atomic() {
  push();
  strokeWeight(.5);
  noFill();
  if (pressed == 0) {
    stroke(lightBlue);
  } else {
    stroke(punchyPurp);
  }
  var amped = amp * 90;
  var atomicMx = map(mouseX, 0, width, -width * .05, width * .75);
  var atomicMy = map(mouseY, 0, height, height * .25, height * .5);
  for (var i = 0; i < 11; i++) {
    rotateZ(o1x);
    bezier(-width / 4, 0, -width / 7 + atomicMx, height / 9 + atomicMy, width / 7 + atomicMx, height / 9 + atomicMy, width / 4, 0)
    o1x -= .0001 * amped;
  }
  pop();
}

function curvaceous() {
  var lowSpacer = 75;
  var highSpacer = 125;
  var curveCount = 10;
  var mousePull = 320;
  push();
  translate(-width / 2, -height / 2);
  noFill();
  if (pressed == 0) {
    stroke(darkPurp);
  } else {
    stroke(navyBlue);
  }
  strokeWeight(1);
  var ampy = map(amp, 0., 1, lowSpacer, highSpacer);
  var mX = map(mouseX, 0, width, -mousePull, mousePull);
  var mY = map(mouseY, 0, height, mousePull, -mousePull);
  for (var i = 0; i < curveCount; i++) {
    //first and last x,y pair are anchors
    //middle up lines
    bezier(0, height - (i * ampy) - mY, (width * .125) + mX, 0, (width * .75) + mX, 0, width, height - (i * ampy) - mY);
    //middle down lines
    bezier(0, (i * ampy) - mY, (width * .125) + mX, height, (width * .75) + mX, height, width, (i * ampy) - mY);
  }
  pop();
}

function starfield() {
  push();
  noStroke();
  fill(0, 255);
  translate(0, 0, 50);
  ellipse(0, 0, 20);
  pop();
  push();
  noFill();
  stroke(255);
  strokeWeight(1);
  for (var i = 0; i < 20; i++) {
    rotateX(o2x);
    rotateZ(o3z);
    var noiZ = map(noise(i * frameCount / 500), 0, 1, 20, 100);
    triangle(-50 * i - noiZ, 0, 0, -50 * i - noiZ, 50 * i + noiZ, 0);
    o3z += .000001 * (i * noiZ);
  }
  for (var i = 0; i < 50; i++) {
    noFill();
    stroke(0);
    strokeWeight(15);
    ellipse(0, 0, 50 * i);
    rectMode(CENTER);
    rect(0, 0, 33 * i);
  }
  fill(0);
  translate(0, 0, 100);
  pop();
  push();
  var amper = amp * 90;
  var elW = map(sin(sDrive1), -1, 1, width * 9, width * 16);
  var elH = map(sin(sDrive2), -1, 1, height * 9, height * 16);
  var elMW = map(mouseX, 0, width, width * 9, width * 16);
  var elMH = map(mouseY, 0, height, height * 9, height * 16);
  noFill();
  stroke(0);
  strokeWeight(10);
  for (var i = 0; i < 30; i++) {
    rotateZ(o2z);
    ellipse(0, 0, mouseX / 2 - elW / i, mouseY / 2 - elH / i);
    o2z += .00001;
  }
  sDrive1 += .003 * amper;
  sDrive2 += .005 * amper;
  pop();
}

function polyMorph() {
  push();
  translate(0, 0, 100);
  var elRadius = 10;
  stroke(redForeman, notEasy, 0, 50);
  noFill();
  strokeWeight(1);
  for (var i = 0; i < 16; i++) {
    elRadius = map(sin(frameCount * i / 5), -1, 1, 7, 12);
    elRadius += noise(polyTwist * i);
    rotateZ(2);
    rotateY(polyTwist);
    ellipse(0, 0, (elRadius * i) + 10);
    if (pressed == 0) {
      polyTwist += .0008;
    } else {
      polyTwist -= .0008;
    }
  }
  pop();
}

function twistedLines() {

  //lower lines (cone below sphere)
  push();
  translate(0, 0, -100);
  strokeWeight(1);
  var mYTwisted = map(mouseY, 0, height, -2, 2);
  var mXTwisted = map(mouseX, 0, width, -10, 10);
  rectMode(CENTER);
  for (var i = 0; i < 30; i++) {
    if (i % 2 == 0) {
      if (pressed == 0) {
        stroke(yellow);
      } else {
        stroke(punchyPink);
      }
    } else {
      if (pressed == 0) {
        stroke(punchyPink);
      } else {
        stroke(yellow);
      }
    }
    line(0, 0, (xyLoc * i) + 16, (xyLoc * i) + 9);
    xyLoc = map(sin(frameCount / 6), -1, 1, 25, 50);
    rotateY(off2);
    off2 = map(sin(frameCount / 2), -1, 1, 10, 15);
    translate(-mXTwisted, mYTwisted);
  }
  pop();
  //upper lines (cone above sphere)
  push();
  translate(0, 0, -100);
  strokeWeight(1);
  var m4Y = map(mouseY, 0, height, -2, 2);
  var m4X = map(mouseX, 0, width, -10, 10);
  rectMode(CENTER);
  for (var i = 0; i < 30; i++) {
    if (i % 2 == 0) {
      if (pressed == 0) {
        stroke(yellow);
      } else {
        stroke(punchyPink);
      }
    } else {
      if (pressed == 0) {
        stroke(punchyPink);
      } else {
        stroke(yellow);
      }
    }
    line(0, 0, (-xyLoc * i) - 16, (-xyLoc * i) - 9);
    xyLoc = map(sin(frameCount / 6), -1, 1, 25, 50);
    rotateY(off2);
    off2 = map(sin(frameCount / 2), -1, 1, 10, 15);
    translate(m4X, m4Y);
  }
  pop();
}

function twistAlong() {
  push();
  noStroke();
  translate(0, 0, -500);
  var m5x = map(mouseX, 0, width, 20, width);
  var m5y = map(mouseY, 0, height, -height, height);
  for (var i = 0; i < 20; i++) {
    if (i % 2 == 0) {
      fill(lightBlue);
    } else {
      fill(orange);
    }
    rotateX(o6x);
    rotateZ(o6z);
    ellipse(0, 0, m5x + (30 * i), m5y + (30 * i));
  }
  o6x += .00001;
  o6z += .015;
  pop();
}

function mousePressed() {
  //trigger start/play
  if (loaded === 1) {
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
  noStroke();
  plane(windowWidth, windowHeight);
  pop();

  //red rectangles
  push();
  rectMode(CENTER);
  stroke(200, 0, 0);
  noFill();
  rect(0, -30, width * .625, height * .75);
  rect(0, -30, width * .625 + 20, height * .75 - 20);
  pop();
}

function phoneScreen() {
  push();
  graphics2d.background(0);
  graphics2d.textFont("'Be Vietnam'");
  graphics2d.textSize(width / 25);
  graphics2d.textAlign(CENTER, CENTER);
  graphics2d.fill(255);
  graphics2d.text('please revisit', windowWidth / 2, windowHeight / 2 - 150);
  graphics2d.text('on desktop', windowWidth / 2, windowHeight / 2 - 50);
  texture(graphics2d);
  noStroke();
  plane(windowWidth, windowHeight);
  pop();
}

function endScreen() {
  push();
  ambientLight(255);
  graphics2d.background(0);
  graphics2d.textFont("'Be Vietnam'");
  graphics2d.textSize(width / 25);
  graphics2d.textAlign(CENTER, CENTER);
  graphics2d.noStroke();
  graphics2d.fill(255);
  // graphics2d.text('thanks for listening', windowWidth / 2, (windowHeight / 2) - 50);
  var dfSite = createA('https://dfduo.com/', 'thanks for listening');
  dfSite.style('font-family', 'Be Vietnam');
  dfSite.style('font-size', '5em');
  dfSite.style('text-align', 'center');
  dfSite.style('text-decoration', 'none');
  dfSite.style('color', 'Lavender');
  dfSite.position(0, height / 2 - 100);
  dfSite.center('horizontal');
  texture(graphics2d);
  noStroke();
  plane(windowWidth, windowHeight);
  noLoop();
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}