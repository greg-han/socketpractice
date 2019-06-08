function joinRoom(roomName){
  //Send this roomName to the server!
  //the client knows nothing about the room, the client can join namespaces, but knows nothing about the room
	//callback gets send server if we want, and it gets run on the server
	//event, data, callback we probably need number of Members to populate
    nsSocket.emit('joinRoom', roomName, (newNumberOfMembers)=>{
       //we want to update the room member total now that we have joined
document.querySelector('.curr-room-num-users').innerHTML = `${newNumberOfMembers} <span class="glyphicon glyphicon-user></span>`	
    }) 


};
