var express = require('express');
var router = express.Router();

var mongoose = require("mongoose");

var Room = mongoose.model("Room");

var pokes = require("../public/data/pokedex");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',{});
});

router.get("/pokedex", function(req, res, next)
{
	var pokedex = [];
	for (var mon in pokes.BattlePokedex)
	{
		delete pokes.BattlePokedex[mon]['heightm'];
		delete pokes.BattlePokedex[mon]['weightkg'];
		delete pokes.BattlePokedex[mon]['genderRatio'];
		delete pokes.BattlePokedex[mon]['eggGroups'];
		delete pokes.BattlePokedex[mon]['color'];
		delete pokes.BattlePokedex[mon]['evos'];
		delete pokes.BattlePokedex[mon]['prevo'];
		delete pokes.BattlePokedex[mon]['evoLevel'];
		pokedex.push(pokes.BattlePokedex[mon]);

	}
	res.send(pokedex);
});

router.post("/updateParty", function(req, res, next)
{
	console.log("updatin party");


	Room.findById(req.body.room, function(err, docs)
	{
		if (err) throw err;



		docs.party["pokemon" + (parseInt(req.body.currentInput) + 1)] = req.body.mon;

		docs.save(function(err)
		{
			if (err) throw err;
			res.send("updated team successfully");
		});


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
