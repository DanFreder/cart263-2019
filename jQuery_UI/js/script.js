/*****************

Learning jQuery UI
Dan Freder

Wow you still suck @ this Dan

******************/

let $fly;
let $mouth;

$(document).ready(setup);

function setup() {
console.log('READY');

let $fly = $('#fly');
let $mouth = $('#openMouth')

//$('#fly').draggable(); would also work here
$fly.draggable();

//You don't have to use an anonymous function here, but you did
$mouth.droppable({
  drop: function (event, ui) {
    console.log('dropped');
// ui.draggable will reference the last dragged element on the page
// instead of just the fly
    ui.draggable.remove();

    let chewInterval = setInterval(chew,250);

    setTimeout(function () {
      clearInterval(chewInterval);
    },2000);
}
});
}

function chew() {
if ($mouth.attr('src') === "/assets/images/mouth-open.png") {
  $mouth.attr('src', "/assets/images/mouth-closed.png");
}
else {
  $mouth.attr('src', "/assets/images/mouth-open.png");
}
}
