module.exports = function(io)
{
	var app = require("express");
	var router = app.Router();

	io.on("connection", function(socket)
	{
		console.log("indexio user connexted at: " + socket.handshake.url);

		socket.on("type", function(text)
		{
			//console.log(text);
			io.emit("typed", text);
		});


		socket.on("mon selection", function(data)
		{
			console.log(data);
			io.emit("update mon selection", data);
		})




		socket.on("disconnect", function()
		{
			console.log("disconnexted");
		});
	});




	return router;
}