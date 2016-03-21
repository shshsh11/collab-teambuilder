var mongoose = require("mongoose");

var RoomSchema = new mongoose.Schema(
{
	_id: String,
	dateCreated: String
});

mongoose.model("Room", RoomSchema);