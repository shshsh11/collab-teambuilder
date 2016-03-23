var mongoose = require("mongoose");

var RoomSchema = new mongoose.Schema(
{
	_id: String,
	dateCreated: String,
	tier: String,
	party:
	{
		pokemon1: 
		{
			name: String,
			item: String,
			move1: String,
			move2: String,
			move3: String,
			move4: String,
			EVs: [Number],
			Nature: String
		},
		pokemon2: 
		{
			name: String,
			item: String,
			move1: String,
			move2: String,
			move3: String,
			move4: String,
			EVs: [Number],
			Nature: String
		},
		pokemon3: 
		{
			name: String,
			item: String,
			move1: String,
			move2: String,
			move3: String,
			move4: String,
			EVs: [Number],
			Nature: String
		},
		pokemon4: 
		{
			name: String,
			item: String,
			move1: String,
			move2: String,
			move3: String,
			move4: String,
			EVs: [Number],
			Nature: String
		},
		pokemon5: 
		{
			name: String,
			item: String,
			move1: String,
			move2: String,
			move3: String,
			move4: String,
			EVs: [Number],
			Nature: String
		},
		pokemon6: 
		{
			name: String,
			item: String,
			move1: String,
			move2: String,
			move3: String,
			move4: String,
			EVs: [Number],
			Nature: String
		}
	}
});

mongoose.model("Room", RoomSchema);