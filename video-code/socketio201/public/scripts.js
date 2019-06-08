 //You have to join anamespace whether you like it or not     
//Server is in charge of deciding which namespace you are a part of
//everytime you emit or listen from server or i/o ro socket, you are ALWAYS doing it from an amespace whether you like it or not
//client decides what namespace to join, but after that once youv'e saved your socket connection in a variable you can only get that namespace and listen to that namespace.
//connect ot port 900 main namespace '/'    
    const socket = io('http://localhost:9000');
   //now connect to admin namespace
    const socket2 = io('http://localhost:9000/admin')//admin namespace
    
    socket.on('messagefromServer', (dataFromServer)=>{
            console.log(dataFromServer);
	    //this is again, the main namespace. emit this event with this data
            socket.emit('dataToServer', { data: "Data from the Client!"});
    })

    socket2.on('welcome',(dataFromServer)=>{
      console.log(dataFromServer)
    })

   //joined event from room1 joining
//client has no idea that 'joined' is from the socket joinng a room
   socket.on('joined',(msg)=>{
	   console.log(msg)
   })

    //grab the one thing with id of message-form, it will add its event listener
    //and runt he callback if the event happens, then we will get the event oject
    document.querySelector('#message-form').addEventListener('submit',(event)=>{
       //this prevents form from submitting when it gets the event
       event.preventDefault();
       const newMessage = document.querySelector('#user-message').value;
       //Now that we have the value (newMessage), we want to send it to server
       socket.emit('newMessageToServer',{text: newMessage})
   })

