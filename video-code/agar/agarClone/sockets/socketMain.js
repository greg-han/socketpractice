//this is where all the main socket stuff will go
//this grabs the io (Server) fromt he io
const io = require('../servers').io
const checkForOrbCollisions = require('./checkCollisions').checkForOrbCollisions;
const checkForPlayerCollisions = require('./checkCollisions').checkForPlayerCollisions;

// =============CLASSES==============
const Player =require('./classes/Player')
const PlayerData =require('./classes/PlayerData')
const PlayerConfig =require('./classes/PlayerConfig')
const Orb = require('./classes/Orb')

let orbs = []
let players = []
//calls on load

let settings = {
 // defaultOrbs: 5000,
  defaultOrbs: 50,
  defaultSpeed: 6,
  defaultSize: 6,
  //as a player gets bigger, the zoom needs to go out
  defaultZoom: 1.5,
  //worldWidth: 5000,
  //worldHeight: 5000
  worldWidth: 500,
  worldHeight: 500
}

initGame()
//here we are sending out ALL players every frame, but we're not etlling them where to clamp camera
//we do this by sending to namespace 'game'. This is so we can draw them all
setInterval(()=>{
  if(players.length > 0){
    io.to('game').emit('tock',{
        players
     });
  }
  },33); //There are 30 33s in 1000 milliseconds or 1/30th of a second or 1 of 30 fps

//Run at the beginning of a new game

//sockets is an alias for the ('/') namespace
//equivalent to io.of('/').on('connect')
io.sockets.on('connect',(socket)=>{
  let player = {}
  //now when a client connects, instead of immediately kicking off 'init' we wait for it
  socket.on('init',(data)=>{
    //add the player to the game namespace
    socket.join('game');
    //A playe rhas connected
    //make a player config object with pertinent data
    let playerConfig = new PlayerConfig(settings)
    //Make a playerData object
    let playerData = new PlayerData(data.playerName,settings)
    //make a master player objecgt to hold both
    //scope issues, this makes the variable local to 'init' event
    //let player = new Player(socket.id,playerConfig,playerData)
    player = new Player(socket.id,playerConfig,playerData)
    //issue a message to every connected socket 30 fps
    //send out all players  every 33 ms
    //here, each socket gets it's own unique update emit
    setInterval(()=>{
       socket.emit('tickTock',{
          playerX: player.playerData.locX,
          playerY: player.playerData.locY,
      })
    },33); //There are 30 33s in 1000 milliseconds or 1/30th of a second or 1 of 30 fps

    socket.emit('initReturn',{
        orbs 
     })
     players.push(playerData)
    })
  //the server sent over a tick
  socket.on('tick',(data)=>{
    speed = player.playerConfig.speed
    //Update the player config object with the new direction in data
    //and at the same time creat ea variable for local callback for readability
    xV = player.playerConfig.xVector = data.xVector;
    yV = player.playerConfig.yVector = data.yVector;

    if((player.playerData.locX < 5 && player.playerData.xVector < 0) || (player.playerData.locX > settings.worldWidth) && (xV > 0)){
        player.playerData.locY -= speed * yV;
    }else if((player.playerData.locY < 5 && yV > 0) || (player.playerData.locY > settings.worldHeight) && (yV < 0)){
        player.playerData.locX += speed * xV;
    }else{
        player.playerData.locX += speed * xV;
        player.playerData.locY -= speed * yV;
    }    
    // ORB COLLISION
    let capturedOrb = checkForOrbCollisions(player.playerData,player.playerConfig,orbs,settings)
    capturedOrb.then((data)=>{
      //then runs if resolve runs! a collision happened!
      //console.log(`Orb collisions at ${data}`)
        //What we're hoping for is that each time there is a collisiion we get an object
	 ///with the index number  data is the index of the orb in the orbs array 
	const orbData = {
            orbIndex: data,
            newOrb: orbs[data]
	} 
      console.log(orbData)
      io.sockets.emit('updateLeaderBoard',getLeaderBoard());
      io.sockets.emit('orbSwitch',orbData)
        //we need index as well as orb itself, and we're only goint o send back orb that hit
     
    }).catch(()=>{
        //catch runs if reject runs! no collision (on reject() call inside of checkCollisions())(
	//console.log("no Collisions") 
    })
    //PLAYER COLLISION
    let playerDeath = checkForPlayerCollisions(player.playerData,player.playerConfig,players,player.socketId);
    playerDeath.then((data)=>{
      //every socket will know that the leaderboard has changed
      io.sockets.emit('updateLeaderBoard',getLeaderBoard());
      //a player was absorbed, let everyone know
      io.sockets.emit('playerDeath',data);
    }).catch(()=>{
      //no playe rcollision
    })
  })
  socket.on('disconnect',(data)=>{
    //console.log(data) 
    //We need to find out who left. which player is players.
player.forEach((currPlayer)=>{
   //if they match
    if(currPlayer.uid == player.playerData.uid)
       players.splice(i,1);  
    })
  });	  
  //const updateStats = 
})

function getLeaderBoard(){
  //sort plaeyr sin non-increasing order
  players.sort((a,b)=>{
     return b.score - a.score;
  });
  let leaderBoard = players.map((curPlayer)=>{
     return{
         name: curPlayer.name,
         score: curPlayer.score
     }
  })
  return leaderBoard
}

function initGame(){
   for(let i = 0; i < settings.defaultOrbs; i++){
      orbs.push(new Orb(settings))
   }
}

module.exports = io
