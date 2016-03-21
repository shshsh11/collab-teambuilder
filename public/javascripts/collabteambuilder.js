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








app.factory("dex", function($http)
{
	var obj = 
	{
		dex: [],
		moves: []
	}

	obj.updateParty = function(data)
	{
		$http.post("/updateParty",  data, {}).success(function(data)
		{

		});
	}



	obj.getAll = function()
	{
		$http.get("/pokedex").success(function(data)
		{
			angular.copy(data, obj.dex);
		});
	}

	return obj;


})




app.controller("RoomCtrl", function($scope, rooms, post, dex)
{

	var pokedex = dex.dex;

	$scope.party = [];

	$scope.roomID = post._id;
	$scope.playedCard = "not played yet";

	$scope.partySize = ["1", "2", "3", "4", "5", "6"];


	var howManyKeystrokes = 0;

	var socket = io("/test-namespace");


	socket.on("connect", function()
	{
		socket.emit("room id", post._id);
	});
	

	var currentInput = "";
	$scope.findRelMons = function(index)
	{

		//currentInput = event.target.id;
		
		currentInput = index;

		$scope.r.pokedex = [];

		var q = $scope.party[currentInput];
	

		for (var i = 0; i < pokedex.length; i++)
		{
			if (pokedex[i].species.indexOf(q) > -1 || pokedex[i].species.toLowerCase().indexOf(q) > -1)
			{
				
				if (q.length >= 2)
				{
					$scope.r.pokedex.push(pokedex[i]);
				}
			}
		}

	}

	$scope.fillInput = function(name)
	{
		$scope.party[currentInput] = name;
		$scope.r.pokedex = [];
		var data = {room: post._id, currentInput: currentInput, mon: name};
		dex.updateParty(data);
		socket.emit("mon selection", data);
	}

	socket.on("update mon selection", function(data)
	{
	
		$scope.$apply(function()
		{
			$scope.party[data.currentInput] = data.mon;
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
			}],
			postPromise: ["dex", function(dex)
			{
				return dex.getAll();
			}]
		}
	})

});