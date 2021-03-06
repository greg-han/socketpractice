//this time we will use express
const express = require('express');
const app =  express();
const socketio = require('socket.io');


//at the very least, use express static methods. Hand static current directory
//this is express middleware that will serve up anything in /public
//servers serve html pages or client pages. __dirname is just the programpath
//we just need express to serve up our html
//add middleware for express to serve up static files  in public
app.use(express.static(__dirname + '/public'));

//What we need socketIO to listen too, is now stored in expressServer
//it is analgous to the html server object. make an express app by invoking express module
//listen to port 9000 for http traffic, and that server gets handed to express server
const expressServer = app.listen(9000);

//use the socketio constructor (this is a function)
//we handed it the express server if you removed exprss server it loads fine, but it won't get there
//because you are no longer binding to a port you can also use the keyword "new" here, but socket IO
//adds it for you. now hand the express server to socketio which is the io object
const io = socketio(expressServer);
//instead of giving it a server, you can also give it a port. you can change the port that it's listening on
//const io = socketio(9001);
//the below code to show what socketio adds for you from its docs
//io is our socket server, so in the docs if you see server.sockets or server.*, this is it.
//const io = new socketio(expressServer, {
  //this is why we don't have to set up socketio in the cdn, that's why in that path we can load it  in the static page <script></script>
//   path: '/socket.io',
//   serveClient: true
//});

//Only one window will get this... Why? Because it's on connect, and once one connects that's it
io.on('connection', (socket)=>{
  socket.emit('messageFromServer',{data: "Welcome tot he socketio server"});
  //if the event never happens, we run this callback
  socket.on('messageToServer',(dataFromClient)=>{
    console.log(dataFromClient)
  })
 //server saw this from some clietn one of the open windows. each window opens a different socket
  socket.on('newMessageToServer',(msg)=>{
    //we made a json object with the property text
    io.emit('messageToClients', {text: msg.text})
    //exactly the same as above line
    //io.of('/').emit('messageToClients', {text: msg.text})
    console.log(msg)
  })
//the server can still communicate across namespaces, but on the clietnInformation, the socket needs to be in THAT namespace in order to get the events
//eg. if you were to put in io.of('/admin').emit('welome',"welcome to admin chat within main channel");// it wouldn't work, becausse although the code runs, admin hasn't been created yet
	//
// but if you did setTimeout(2) and did io.of('/admin').emit('welcome','welcome etoa dmint chatwithin main channel") it would work!
// the server can emit a message to any namespace even within io.on connection listener becuase the server can do anything . The server does this to the socket, client has no idea.
  socket.join('level1')
  socket.to('level1').emit('joined',`${socket.id} says I have joined the level 1 room!`)
	//as soon as someone connects, they'll juoin the level 1 room
	//now ew need an on for this int he client
  //This doesn't come from teh socket anymore, now it comes from teh whole server, so namespace
  //goes to everyone
  io.of('/').to('level1').emit('joined',`${socket.id} says I have joined the level 1 room `)
})


//exactly the same as above, but we added a namespace. we are listening for the connection event on this namespace
io.of('/admin').on('connection',(socket)=>{
    console.log("Someone connected to the admin namespace!")
    io.of('/admin').emit('welcome', "welcome tot he admin channel1");
})



