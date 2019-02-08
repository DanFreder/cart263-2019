"use strict";

/*****************
Project 1
Dan Freder
Wow I hate jQuery, and you should too
******************/

let canvas;
let $punct;
let $folder;
let $folder2;
let $glitch1;
let $glitch2;
let $glitch3;
let $glitch4;
let $glitch5;

$(document).ready(setup);

function setup() {
  $punct = $('.punctuation');
  $folder = $('#folder');
  $folder2 = $('#folder2');
  $glitch1 = $('#glitch1');
  $glitch2 = $('#glitch2')
  $glitch3 = $('#glitch3');
  $glitch4 = $('#glitch4')

  $punct.on('click',spanClicked);

  $punct.draggable();
  $folder.draggable();
  $folder2.draggable();
  $glitch1.draggable();
  $glitch2.draggable();
  $glitch3.draggable();
  $glitch4.draggable();

  $folder.droppable();
  $folder2.droppable();

//stupid anonymous function for folder drop
  $folder.droppable({
  drop: function (event, ui) {
    console.log('dropped');
// ui.draggable will reference the last dragged element on the page
    ui.draggable.remove();
    $folder.toggle();
}
});

$folder2.droppable({
drop: function (event, ui) {
  console.log('dropped');
// ui.draggable will reference the last dragged element on the page
  ui.draggable.remove();
}
});

  canvas = createCanvas(windowWidth, windowHeight);
  canvas.style("display:block");
  canvas.style("position:fixed");
  canvas.style("top:0");
  canvas.style("left:0");
  canvas.style("z-index:-100");
  background(0);
}

function draw() {
  background(0,0,0,5);
  stroke(random(100)+100,0,0);
  strokeWeight(3);
   if (mouseIsPressed === true) {
     line(width/2,height/2, mouseX,mouseY);
   }
}

function spanClicked() {
  $(this).removeClass('punctuation1');
  $(this).addClass('punctuation2');
}

function windowResized() {
  // resize our canvas to the new window dimensions
  resizeCanvas(windowWidth, windowHeight);
}
