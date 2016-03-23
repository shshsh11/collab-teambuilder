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
			id: String,
			item: String, 
			ability: String,
			move1: String,
			move2: String,
			move3: String,
			move4: String,
			EVs: 
			{
				HP: Number,
				Atk: Number,
				Def: Number,
				SpA: Number,
				SpD: Number,
				Spe: Number
			},
			nature: String
		},
		pokemon2: 
		{
			name: String,
			id: String,
			item: String,			 
			ability: String,
			move1: String,
			move2: String,
			move3: String,
			move4: String,
			EVs: 
			{
				HP: Number,
				Atk: Number,
				Def: Number,
				SpA: Number,
				SpD: Number,
				Spe: Number
			},
			nature: String
		},
		pokemon3: 
		{
			name: String,
			id: String,
			item: String,			 
			ability: String,
			move1: String,
			move2: String,
			move3: String,
			move4: String,
			EVs: 
			{
				HP: Number,
				Atk: Number,
				Def: Number,
				SpA: Number,
				SpD: Number,
				Spe: Number
			},
			nature: String
		},
		pokemon4: 
		{
			name: String,
			id: String,
			item: String,			 
			ability: String,
			move1: String,
			move2: String,
			move3: String,
			move4: String,
			EVs: 
			{
				HP: Number,
				Atk: Number,
				Def: Number,
				SpA: Number,
				SpD: Number,
				Spe: Number
			},
			nature: String
		},
		pokemon5: 
		{
			name: String,
			id: String,
			item: String,			 
			ability: String,
			move1: String,
			move2: String,
			move3: String,
			move4: String,
			EVs: 
			{
				HP: Number,
				Atk: Number,
				Def: Number,
				SpA: Number,
				SpD: Number,
				Spe: Number
			},
			nature: String
		},
		pokemon6: 
		{
			name: String,
			id: String,
			item: String,			 
			ability: String,
			move1: String,
			move2: String,
			move3: String,
			move4: String,
			EVs: 
			{
				HP: Number,
				Atk: Number,
				Def: Number,
				SpA: Number,
				SpD: Number,
				Spe: Number
			},
			nature: String
		}
	}
});

mongoose.model("Room", RoomSchema);