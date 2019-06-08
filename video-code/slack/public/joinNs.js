
function joinNs(endpoint){

//Joinng a new namespace consists of making a new socket dedicated to that namespace	
const nsSocket = io(`http://localhost:9000${endpoint}`)

    nsSocket.on('nsRoomLoad',(nsRooms)=>{
        //console.log(nsRooms)
        let roomList = document.querySelector('.room-list');
        roomList.innerHTML = "";
        nsRooms.forEach((room)=>{
          let glyph;
          if(room.privateRoom){
            glyph = 'lock'
          }
          else{
            glyph ='globe'
          }
          roomList.innerHTML += `<li class="room"><span class="glyphicon glyphicon-${glyph}"></span>${room.roomTitle}</li>`
        })
         //now add a clickListener to each room
         let roomNodes = document.getElementsByClassName('room');
         //These are html collections, and we're adding a click listener to each one and running
         ///this callback when we are done
         Array.from(roomNodes).forEach((elem)=>{
             elem.addEventListener('click',(e)=>{
                //console.log("someone clicked on ",e.target.innerText);
		joinRoom(e.target.innerText) 
             })
         })

	//add room automatically... first time here
	const topRoom = document.querySelector('.room') 
        const topRoomName = topRoom.innerText;
        console.log("THIS IS TOP ROOM NAME");
        console.log(topRoomName);
        joinRoom(topRoomName)
    })



nsSocket.on('messageToClients',(msg)=>{
    const newMsg = buildHTML(msg);
    //console.log(newMsg)
    document.querySelector('#messages').innerHTML += newMsg;
})

document.querySelector('.message-form').addEventListener('submit',(event)=>{
    event.preventDefault();
    const newMessage = document.querySelector('#user-message').value;
    nsSocket.emit('newMessageToServer',{ text : newMessage })
})

}
function buildHTML(msg){
  const convertedDate = new Date(msg.time).toLocaleString();
  const newHTML = 
   `<li>
     <div class="user-image">
       <img src="${msg.avatar}" />
     </div>
     <div class="user-message">
       <div class="user-name-time">${msg.username} <span>${convertedDate}</span></div>
       <div class="message-text">${msg.text}</div>
     </div>
   </li>`

  return newHTML;
}
