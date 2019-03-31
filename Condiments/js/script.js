"use strict";

/*****************
Condiments - In Class Exercise
Dan Freder
******************/

let paint;

$(document).ready(function() {
  $.getJSON('data/paints.JSON', dataLoaded);
  $.getJSON('data/data.JSON', dataLoaded);
});

function dataLoaded(data) {
  let paint = getRandomElement(data.colors);
  console.log(paint);

  let condiment = getRandomElement(data.condiments);
  // console.log(condiment);
  //check if ends with s
  let verb = 'is';
  if (condiment.charAt(condiment.length - 1) === 's') {
    verb = 'are'
  }
  // console.log(verb);

  //pick random cat and room from JSON archive
  let cat = getRandomElement(data.cats);
  // console.log(cat);
  let room = getRandomElement(data.rooms);
  // console.log(room);

  let description = `${condiment} ${verb} like a ${cat} in a ${paint} ${room}`;
  $('body').append(description);
}

function getRandomElement(array) {
  let element = array[Math.floor(Math.random() * array.length)];
  return element;
}