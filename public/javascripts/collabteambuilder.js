var app = angular.module("collabteambuilder", ["ui.router", "ngSanitize"]);


app.factory("createRoom", function($http, $window)
{

	var data = 
	{
		room: []
	}

	data.create = function(roomID)
	{
		return $http.post("/createroom", roomID, {}).success(function(data)
		{
			
		})
	}


	return data;


});

app.factory("rooms", function($http)
{
	var o =
	{
		rooms: []
	}


	o.getByID = function(id)
	{
		return $http.get("/restful/rooms/" + id).then(function(res)
		{
			return res.data;
		})
	}

	o.getAll = function()
	{
		return $http.get("/restful/rooms").success(function(data)
		{
			angular.copy(data, o.rooms);
		})
	}

	return o;
})

app.controller("MainCtrl", function($scope, createRoom)
{

	


	$scope.createRoom = function()
	{
		var randID = Math.random().toString(24).slice(2);
		var date = new Date();
		$scope.roomID = randID + date.getDate() + date.getHours() + date.getSeconds();
		createRoom.create({_id: $scope.roomID, dateCreated: date});

	}

});


app.controller("RoomCtrl", function($scope, rooms, post)
{


	$scope.roomID = post._id;
	$scope.playedCard = "not played yet";


	var howManyKeystrokes = 0;

	var socket = io();


	$scope.playCard = function()
	{
		//alert("card played");
		socket.emit("play", "test in room " + post._id);
	}

	socket.on("played", function(card)
	{
		$scope.$apply(function() 
		{
			$scope.playedCard = card;
		});
	});


	$scope.gDocsIt = function(event)
	{
		//howManyKeystrokes++;
		//if (howManyKeystrokes >= 20)
		//if (event.keyCode === 13)
		{
			setTimeout(function()
			{
				socket.emit("type", $scope.text);
			}, 1000);
			//howManyKeystrokes = 0;
		}
		
	}

	socket.on("typed", function(text)
	{
		$scope.$apply(function()
		{
			$scope.text = text;
		});
	});


});

app.config(function($stateProvider, $urlRouterProvider, $locationProvider)
{
	$urlRouterProvider.otherwise("/");

	$stateProvider.state("main",
	{
		url: "/",
		templateUrl: "/views/main.html",
		controller: "MainCtrl as m"
		// resolve:
  //     	{
  //       	postPromise: ["poems", function(poems)
  //       	{
  //         		return poems.getAll();
  //       	}]
  //     	}
	});

	$stateProvider.state("room",
	{
		url: "/{roomID}",
		templateUrl: "/views/room.html",
		controller: "RoomCtrl as r",
		resolve:
		{
			post: ["$stateParams", "rooms", function($stateParams, rooms)
			{
				
				return rooms.getByID($stateParams.roomID);
			}]
		}
	})

});