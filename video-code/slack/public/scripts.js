const socket = io('http://localhost:9000');
let nsSocket = "";
//take this nsData, and update the DOM with it.
//the only thing that this file is going to do right now, is when the nsList comes in, we update DOM
socket.on('nsList',(nsData)=>{
    console.log("The list of .rooms has arrived!!")
    // console.log(nsData)
    let namespacesDiv = document.querySelector('.namespaces');
    namespacesDiv.innerHTML = "";
    nsData.forEach((ns)=>{
        namespacesDiv.innerHTML += `<div class="namespace" ns=${ns.endpoint} ><img src="${ns.img}" /></div>`
    })

    // Add a clicklistener for each NS
    console.log(document.getElementsByClassName('namespace'))
    Array.from(document.getElementsByClassName('namespace')).forEach((elem)=>{
        // console.log(elem)
        elem.addEventListener('click',(e)=>{
            const nsEndpoint = elem.getAttribute('ns');
            // console.log(`${nsEndpoint} I should go to now`)
            joinNs(nsEndpoint)
        })
    })
    joinNs('/wiki');
})

 nsSocket = io('http://localhost:9000/wiki')
    nsSocket.on('nsRoomLoad',(nsRooms)=>{
        console.log(nsRooms)  
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
	 let roomNodes = document.getElementsByClassName('rooms'); 
         //These are html collections, and we're adding a click listener to each one and running
	 ///this callback when we are done
         Array.from(roomNodes).forEach((elem)=>{
             elem.addEventListener('click',(e)=>{
                console.log("someone clicked on ",e.target.innerHTML);
	     })
	 })
    })

   //joined event from room1 joining
//client has no idea that 'joined' is from the socket joinng a room
   socket.on('joined',(msg)=>{
	   console.log(msg)
   })
