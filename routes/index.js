var express = require('express');
var router = express.Router();

var mongoose = require("mongoose");

var Room = mongoose.model("Room");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',{});
});

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
		
	})

	
});

router.param("room", function(req, res, next, roomID)
{
	console.log(roomID);
	var query = Room.findById(roomID);

	query.select("_id dateCreated");

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
