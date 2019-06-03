    
    const socket =io('http://localhost:9000');
    const socket2 = io('http://localhost:9000/admin')//admin namespace

    socket.on('messagefromServer', (dataFromServer)=>{
            console.log(dataFromServer);
            socket.emit('dataToServer', { data: "Data from the Client!"});
    })
    //These sockets have nothign to do with each other other than we're connected to both of them 
    // we must connect to this in the server as well 
    socket2.on('messagefromServer', (dataFromServer)=>{
            console.log(dataFromServer);
            socket.emit('dataToServer', { data: "Data from the Client!"});
    })

//if you changed this to socket, it woudln't work because the 'welcome' event is only defined in the
// /admin namespace
    socket2.on('welcome',(msg)=>{
      console.log(msg)
    })
    //grab the one thing with id of message-form, it will add its event listener
    //and runt he callback if the event happens, then we will get the event oject
    document.querySelector('#message-form').addEventListener('submit',(event)=>{
       //this prevents form from submitting when it gets the event
       event.preventDefault();
       console.log("Form Submitted!!") 
       const newMessage = document.querySelector('#user-message').value;
       console.log(newMessage)
       //Now that we have the value (newMessage), we want to send it to server
       socket.emit('newMessageToServer',{text: newMessage})
   })
//As soon as the server sends this out, with custom event messageToClients, this will show on the screen
   socket.on('messageToClients',(msg)=>{
     console.log(msg)
           document.querySelector('#messages').innerHTML += `<li>${msg.text}</li>`;
   })
//socket.on('ping',()=>{
//      console.log("Ping received from server");
//    })
//socket.on('pong',(latency)=>{
//      console.log(latency);
//      console.log("Pong received from server")
//    })


