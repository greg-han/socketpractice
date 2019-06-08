let wHeight = $(window).height();
let wWidth = $(window).width();
let player = {};//This is all things "this" player
let orbs = [];
let players = [];

let canvas = document.querySelector('#the-canvas');
let context = canvas.getContext('2d');
canvas.width = wWidth;
canvas.height = wHeight;

$(window).load(()=>{
    $('#loginModal').modal('show')
})

$('.name-form').submit((event)=>{
	//because we're not actually submitting form, we're doing it all with JS
  event.preventDefault()
  //console.log("Submitted!'")
  player.name = document.querySelector('#name-input').value
  $('#loginModal').modal('hide');	
  $('#spawnModal').modal('show');
  document.querySelector('.player-name').innerHTML = player.name  
})

$('.start-game').click((event)=>{
  $('.modal').modal('hide');
  $('.hiddenOnStart').removeAttr('hidden');
  init();
})
