//all data stroed about a given player stored on server
//
class Player{
   constructor(socketId, playerConfig, playerData){
       this.socketId = socketId;
       this.playerConfig = playerConfig;
       this.playerData = playerData;
   }

}

module.exports = Player
