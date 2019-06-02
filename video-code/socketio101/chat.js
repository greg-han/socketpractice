//this time we will use express
const express = require('express');
const app =  express();
const socketio = require('socket.io');

//at the very least, use express static methods. Hand static current directory
//this is express middleware that will serve up anything in /public
//servers serve html pages or client pages. __dirname is just the programpath
app.use(express.static(__dirname + '/public'));

//What we need socketIO to listen too, is now stored in expressServer
//it is analgous to the html server object.
const expressServer = app.listen(9000);

//use the socketio constructor (this is a function)
//we handed it the express server if you removed exprss server it loads fine, but it won't get there
//because you are no longer binding to a port you can also use the keyword "new" here, but socket IO
//adds it for you
//const io = socketio(expressServer);
//instead of giving it a server, you can also give it a port. you can change the port that it's listening on
//const io = socketio(9001);
//the below code to show what socketio adds for you from its docs
//io is our socket server, so in the docs if you see server.sockets or server.*, this is it.
const io = new socketio(expressServer, {
  //this is why we don't have to set up socketio in the cdn, that's why in that path we can load it  in the static page <script></script>
   path: '/socket.io',
   serveClient: true
});

io.on('connection', (socket)=>{
  socket.emit('messageFromServer',{data: "Welcome tot he socketio server"});
  //if the event never happens, we run this callback
  socket.on('messageToServer',(dataFromClient)=>{
    console.log(dataFromClient)
  })
})




