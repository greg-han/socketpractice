//we need http because w'ere not using express
//http is made xactxly he same way
const http = require('http');
const socketio = require('socket.io');

//we make an http server with node if someone shows up looking for http traffic, this callback will run and it will do this.
const server = http.createServer((req, res)=>{
    res.end("I am conected!")
});

//This is already included through node. this is 3rd party
//we hand the server ot he socket. it's piggybacking on the server. it's listening to hte listener
//the listener is the server, and socketio is lstening on the server
//handed server o io instead of ws
const io = socketio(server);

io.on('connection',(socket,req)=>{
  //ws.send becomes socket.emit
  //you need to specificy an event, here this is a custom event 'welcome'
  //this is instead of send
  socket.emit('welcome','Welcome to the websocket server!!')
  //with socket io you can change mesage to whatever
  // eg. socket.on('myotherevent')//if a message comes in, we run this callback (socket.on)	
  socket.on('message',(msg)=>{
    console.log(msg)
  })
})

//Now that server listens on port 8000
server.listen(8000);


