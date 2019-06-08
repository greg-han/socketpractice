//client joins the sockete here
let socket = io.connect('http://localhost:8080')

//This function is called when the user clicks on the start button
function init(){
  //start drawing the screen
  draw()
  //now init will be sent over when the player clicks start
  //call the init event whent he client is ready for the data
  socket.emit('init',{
      playerName: player.name
  })
}
//server sends this over
//whenever any client connects, it has it's own socket that connects to the '/' namespace, and now ew wait for the 'init' event
//which will happen whenever ANY socket connects to the socket in the server. we could potentially connect ot another namespace
//which can be done in the client with io.connect('http://localhost:8080/namespace')
//This should be happening in reverse, becuse we are wasting resources if the clietn gets an orb just for connection it should play first
socket.on('initReturn',(data)=>{
  //this is imported in index.html it's all in the same script
  //orbs is in canvasStuff
  orbs = data.orbs
  setInterval(()=>{
    socket.emit('tick',{
       xVector: player.xVector,
       yVector: player.yVector
    })
  },33)
})

socket.on('tock',(data)=>{
  //console.log(data)	
  players = data.players,
  player.locX = data.playerX,
  player.locY = data.playerY
})

//Remember that splice removes that element from an array so this mak/// the orbs dissappear
socket.on('orbSwitch',(data)=>{
   orbs.splice(data.orbIndex,1,data.newOrb)
})

socket.on('tickTock',(data)=>{
   player.locX = data.playerX,
   player.locX = data.playerY
})

socket.on('updateLeaderBoard',(data)=>{
  document.querySelector('.leader-board').innerHTML = "";
  data.forEach((curPlayer)=>{
    document.querySelector('.leader-board').innerHTML += `<li class="leaderboard-player">${curPlayer.name} - ${curPlayer.score}</li>` 
  })
  console.log(data)
})

socket.on('playerDeath',(data)=>{
   console.log(`Got killed: ${data.died.name}`)
   console.log(`killer ${data.killedBy.name}`)
   document.querySelector('#game-message').innerHTML =`${data.died.name} absorbed by ${data.killedBy.name}` 
  $('#game-message').css({"background-color" : "#00e6e6",
     "opacity" : 1
  })
  $('#game-message').show();
  $('#game-message').fadeOut(5000);
});



