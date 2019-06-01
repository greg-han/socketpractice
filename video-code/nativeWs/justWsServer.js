const http = require('http');
//3rd party module, ws!
const websocket = require('ws');


//create a basic http server
const server = http.createServer((req,res)=>{
   res.end("I am connected!")
});

//according to docs, we need to make web socket server
//{Server} is synatic sugar for {server: server}
//handed the server object the http server we created listening on 8000
//build awebsocket out of the websocket module hand it he server listening on port 8000
const wss = new websocket.Server({server});
//give it headers argument, and a callback that takes msg as a na rgument.
//anytime the websocket server erceives some headers, ar equest, we print them. usually 101 switch
////from http to websocket
wss.on('headers',(headers,req)=>{
   console.log(headers)
})

//there is also an event for connection it has the socket which will remember for the life of the socket. Once everything has been set up, and wrked out, connection works.
wss.on('connection', (ws, req)=>{
   //console.log(req)
   ws.send('Welcome to the websocket server!!');
   //as soon as it's connected, and a message shows up, it will print it out
   ws.on('message',(msg)=>{
     console.log(msg)
   })
})

//the websocket itself has a send method. You can send information whateve ryou want, and have ac allback. that is invoked whenever this is finished

server.listen(8000);
