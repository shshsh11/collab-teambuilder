var socket_io = require("socket.io");

var io = socket_io();

io.on("connection", function(socket)
{
  console.log("a user connexted");
});