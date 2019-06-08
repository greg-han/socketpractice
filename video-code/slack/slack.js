const express = require('express');
const app = express();
const socketio = require('socket.io')

let namespaces = require('./data/namespaces');

app.use(express.static(__dirname + '/public'));
const expressServer = app.listen(9000);
const io = socketio(expressServer);

io.on('connection',(socket)=>{
    // console.log(socket.handshake)
    // build an array to send back with the img and endpoing for each NS
    let nsData = namespaces.map((ns)=>{
        return {
            img: ns.img,
            endpoint: ns.endpoint
        }
    })
    // console.log(nsData)
    // sned the nsData back to the client. We need to use socket, NOT io, because we want it to 
    // go to just this client. 
    socket.emit('nsList',nsData);
})


// loop through each namespace and listen for a connection
namespaces.forEach((namespace)=>{
    // console.log(namespace)
    // const thisNs = io.of(namespace.endpoint)
    io.of(namespace.endpoint).on('connection',(nsSocket)=>{
    //a socket has connected to one of our chatgroup namespaces.
    //send that namespace group info back to the client.
    //just to keep it simple, we're just going to join wikipedias rooms for now namespace[0]
        nsSocket.emit('nsRoomLoad',namespaces[0].rooms)
        nsSocket.on('joinRoom',(roomToJoin,numberOfUsersCallback)=>{
            // deal with history... once we have it
            console.log(nsSocket.rooms);
            nsSocket.join(roomToJoin)
            io.of('/wiki').in(roomToJoin).clients((error, clients)=>{
            //     console.log(clients.length)
                numberOfUsersCallback(clients.length);
            })
            //const nsRoom = namespace.rooms.find((room)=>{
            //    return room.roomTitle === roomToJoin;
            //})
        })
        nsSocket.on('newMessageToServer',(msg)=>{
            const fullMsg = {
                text: msg.text,
                time: Date.now(),
                username: 'rbunch',
                avatar: 'https://via.placeholder.com/30'
            }
            // console.log(fullMsg)
            // this is because the socket ALWAYS joins its own room on connection
            // get the keys
            const roomTitle = Object.keys(nsSocket.rooms);
            console.log("nsRoom2")
            console.log(nsSocket.rooms)
            // we need to find the Room object for this room
            const nsRoom = namespace.rooms.find((room)=>{
                return room.roomTitle === roomTitle;
            })
            // console.log("The room object that we made that matches this NS room is...")
            // console.log(nsRoom)
            io.of('/wiki').to(roomTitle).emit('messageToClients',fullMsg)
        })
    })
})

