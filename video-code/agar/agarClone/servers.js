const express = require('express');
const app = express();
app.use(express.static(__dirname + '/public'));
//Capital S Server
const socketio = require('socket.io');

const expressServer = app.listen(8080);
//Now you have a socketio server listening on an express server
const io = socketio(expressServer);
const helmet = require('helmet');
app.use(helmet());
console.log("Express and socketio are listening on port 8080")

//App orgniazation. We are at an important point in our app. The
//way we progress will determine many things down the road.
//servers.js will not be our entry point it will be the place where we create app, and the place where we create io.


module.exports = {
  app,
  io
}
