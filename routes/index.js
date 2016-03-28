var express = require('express');
var router = express.Router();

var mongoose = require("mongoose");

var Room = mongoose.model("Room");

var pokes = require("../public/data/pokedex");
var moves = require("../public/data/moves");
var items = require("../public/data/items");
var formats = require("../public/data/formats-data");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',{});
});

router.get("/pokedex", function(req, res, next)
{
	var pokedex = [];
	for (var mon in pokes.BattlePokedex)
	{
		pokes.BattlePokedex[mon].tier = formats.BattleFormatsData[mon].tier;
		delete pokes.BattlePokedex[mon]['heightm'];
		delete pokes.BattlePokedex[mon]['weightkg'];
		delete pokes.BattlePokedex[mon]['genderRatio'];
		delete pokes.BattlePokedex[mon]['eggGroups'];
		delete pokes.BattlePokedex[mon]['color'];
		// delete pokes.BattlePokedex[mon]['evos'];
		delete pokes.BattlePokedex[mon]['prevo'];
		delete pokes.BattlePokedex[mon]['evoLevel'];
		pokedex.push(pokes.BattlePokedex[mon]);

	}
	res.send(pokedex);
});

router.get("/itemdex", function(req, res, renx)
{
	var itemdex = [];
	for (var item in items.BattleItems)
	{
		itemdex.push(items.BattleItems[item]);
	}
	res.send(itemdex);
})

router.get("/movedex", function(req, res, next)
{
	var movedex = [];
	for (var move in moves.BattleMovedex)
	{
		delete moves.BattleMovedex[move]['desc'];
		movedex.push(moves.BattleMovedex[move]);
	}
	res.send(movedex);
});

router.post("/updateParty", function(req, res, next)
{
	console.log("updatin party");


	Room.findById(req.body.room, function(err, docs)
	{
		if (err) throw err;


		if (req.body.tier)
		{
			console.log("updating tier");
			docs.tier = req.body.tier;
			docs.save(function(err)
			{
				if (err) throw err;
				res.send("updated tier");
			});
		}
		else if (req.body.move)
		{
			console.log("updating move");
			var ci = req.body.currentInput;

			docs.party["pokemon" + ci.substring(0, 1)]["move" + ci.substring(1)] = req.body.move;
			docs.save(function(err)
			{
				if (err) throw err;
				res.send("updated move successfully");
			});
		}
		else if (req.body.item)
		{
			console.log("updating item");
			var ci = req.body.currentInput;

			docs.party["pokemon" + ci].item = req.body.item;
			docs.save(function(err)
			{
				if (err) throw err;
				res.send("updated item successfully");
			});
		}
		else if (req.body.mon)
		{

			console.log("updating mon");
			docs.party["pokemon" + req.body.currentInput].name = req.body.mon;
			console.log(docs);
			docs.save(function(err)
			{
				if (err) throw err;
				res.send("updated team successfully");
			});
		}

		else if (req.body.whichEV)
		{

			console.log("updating evs");
			console.log(docs.party["pokemon" + req.body.currentInput.substring(0, 1)])
			docs.party["pokemon" + req.body.currentInput.substring(0, 1)].EVs[req.body.whichEV] = req.body.amount;
			docs.save(function(err)
			{
				if (err) throw err;
				res.send("updated EV " + req.body.whichEV + " successfully");
			});
		}

		else if (req.body.whichIV)
		{
			console.log("updating ivs");
			docs.party["pokemon" + req.body.currentInput.substring(0, 1)].IVs[req.body.whichIV] = req.body.amount;
			docs.save(function(err)
			{
				if (err) throw err;
				res.send("updated IV " + req.body.whichIV + " successfully");
			});
		}

		else if (req.body.nature)
		{
			console.log("updating nature");
			
			docs.party["pokemon" + req.body.currentInput.substring(0, 1)].nature = req.body.nature;
			docs.save(function(err)
			{
				if (err) throw err;
				res.send("updated nature");
			});
		}

		else if (req.body.abName)
		{
			console.log("updating ability");

			docs.party["pokemon" + req.body.currentInput.substring(0, 1)].ability = req.body.abName;
			docs.save(function(err)
			{
				if (err) throw err;
				res.send("updated ability");
			});
		}

	});



})

router.get("/restful/rooms", function(req, res, next)
{
	Room.find({}, function(err, docs)
	{
		if (err) throw err;
		res.json(docs);
	})
})

router.post("/createroom", function(req, res, next)
{
	console.log("creatin");

	

	console.log(req.body);

	var newRoom = new Room();
	newRoom.dateCreated = req.body.dateCreated;
	newRoom._id = req.body._id;
	newRoom.tier = "";
	newRoom.party = 	
	{
		pokemon1: 
		{
			name: "",
			id: "",
			item: "", 
			ability: "",
			move1: "",
			move2: "",
			move3: "",
			move4: "",
			EVs: 
			{
				HP: 0,
				Atk: 0,
				Def: 0,
				SpA: 0,
				SpD: 0,
				Spe: 0
			},
			IVs: 
			{
				HP: 31,
				Atk: 31,
				Def: 31,
				SpA: 31,
				SpD: 31,
				Spe: 31
			},
			nature: "Hardy"
		},
		pokemon2: 
		{
			name: "",
			id: "",
			item: "",			 
			ability: "",
			move1: "",
			move2: "",
			move3: "",
			move4: "",
			EVs: 
			{
				HP: 0,
				Atk: 0,
				Def: 0,
				SpA: 0,
				SpD: 0,
				Spe: 0
			},
			IVs: 
			{
				HP: 31,
				Atk: 31,
				Def: 31,
				SpA: 31,
				SpD: 31,
				Spe: 31
			},
			nature: "Hardy"
		},
		pokemon3: 
		{
			name: "",
			id: "",
			item: "",			 
			ability: "",
			move1: "",
			move2: "",
			move3: "",
			move4: "",
			EVs: 
			{
				HP: 0,
				Atk: 0,
				Def: 0,
				SpA: 0,
				SpD: 0,
				Spe: 0
			},
			IVs: 
			{
				HP: 31,
				Atk: 31,
				Def: 31,
				SpA: 31,
				SpD: 31,
				Spe: 31
			},
			nature: "Hardy"
		},
		pokemon4: 
		{
			name: "",
			id: "",
			item: "",			 
			ability: "",
			move1: "",
			move2: "",
			move3: "",
			move4: "",
			EVs: 
			{
				HP: 0,
				Atk: 0,
				Def: 0,
				SpA: 0,
				SpD: 0,
				Spe: 0
			},
			IVs: 
			{
				HP: 31,
				Atk: 31,
				Def: 31,
				SpA: 31,
				SpD: 31,
				Spe: 31
			},
			nature: "Hardy"
		},
		pokemon5: 
		{
			name: "",
			id: "",
			item: "",			 
			ability: "",
			move1: "",
			move2: "",
			move3: "",
			move4: "",
			EVs: 
			{
				HP: 0,
				Atk: 0,
				Def: 0,
				SpA: 0,
				SpD: 0,
				Spe: 0
			},
			IVs: 
			{
				HP: 31,
				Atk: 31,
				Def: 31,
				SpA: 31,
				SpD: 31,
				Spe: 31
			},
			nature: "Hardy"
		},
		pokemon6: 
		{
			name: "",
			id: "",
			item: "",			 
			ability: "",
			move1: "",
			move2: "",
			move3: "",
			move4: "",
			EVs: 
			{
				HP: 0,
				Atk: 0,
				Def: 0,
				SpA: 0,
				SpD: 0,
				Spe: 0
			},
			IVs: 
			{
				HP: 31,
				Atk: 31,
				Def: 31,
				SpA: 31,
				SpD: 31,
				Spe: 31
			},
			nature: "Hardy"
		}
	}

	console.log(newRoom);

	newRoom.save(function(err)
	{
		if (err) throw err;
		res.send("new room made");
		
	})

	
});

router.param("room", function(req, res, next, roomID)
{
	console.log(roomID);
	var query = Room.findById(roomID);

	//query.select("_id dateCreated");

	query.exec(function(err, room)
	{
		if (err) return next(err);
		if(!room) return next(new Error("rip"));
		req.room = room;
		return next();
	})
})


router.get("/restful/rooms/:room", function(req, res, next)
{
	req.room.populate("", function(err, docs)
	{
		if (err) throw err;
		res.json(docs);
	})
})

module.exports = router;
