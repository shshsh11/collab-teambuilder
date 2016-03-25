module.exports = function(io)
{
	var app = require("express");
	var router = app.Router();

	var nsp = io.of("/test-namespace");

	nsp.on("connection", function(socket)
	{

		
		console.log("indexio user connexted at: " + socket.handshake.url);
		var roomID = "";
		socket.on("room id", function(data)
		{
			console.log(data);
			roomID = data;
			socket.join(roomID);
		});

		socket.on("viewing", function(data)
		{
			nsp.to(roomID).emit("show view", data);
		})

		socket.on("remove viewing", function(data)
		{
			nsp.to(roomID).emit("removing viewing", data);
		})


		socket.on("send message", function(data)
		{
			console.log("received chat message");
			nsp.to(roomID).emit("receive message", data);
		})

		socket.on("type", function(text)
		{
			//console.log(text);
			nsp.to(roomID).emit("typed", text);
		});

		socket.on("fill EVs", function(data)
		{
			nsp.to(roomID).emit("EVs filled", data);
		})

		socket.on("mon selection", function(data)
		{
			console.log(data);
			console.log(roomID);
			nsp.to(roomID).emit("update mon selection", data);
		})

		socket.on("item selection", function(data)
		{
			nsp.to(roomID).emit("update item selection", data);
		})

		socket.on("move selection", function(data)
		{
			nsp.to(roomID).emit("update move selection", data);
		})

		socket.on("nature selection", function(data)
		{
			nsp.to(roomID).emit("update nature selection", data);
		})


		socket.on("disconnect", function()
		{
			console.log("disconnexted");
			socket.leave(roomID);
		});
	});




	return router;
}