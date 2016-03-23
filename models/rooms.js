var mongoose = require("mongoose");

var RoomSchema = new mongoose.Schema(
{
	_id: String,
	dateCreated: String,
	tier: String,
	party:
	{
		pokemon1: String,
		pokemon2: String,
		pokemon3: String,
		pokemon4: String,
		pokemon5: String,
		pokemon6: String
	}
});

mongoose.model("Room", RoomSchema);