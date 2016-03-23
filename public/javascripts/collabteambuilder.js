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

// app.factory("teamInfo", function($http)
// {
// 	var o =  
// 	{
// 		party:
// 		{
// 			pokemon1: [],
// 			pokemon2: [],
// 			pokemon3: [],
// 			pokemon4: [],
// 			pokemon5: [],
// 			pokemon6: []
// 		}
// 	}

// 	o.getTeam = function(room)
// 	{
// 		return $http.get("/restful/rooms" + room).success(function(data)
// 		{

// 		})
// 	}

// 	return o;
// })

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

	$scope.tiers = ["Uber", "OU", "BL", "UU"];

	//[{name: "Uber"}, {name: "OU"}, {name: "BL"}, {name: "UU"}, {name: "BL2"}, {name: "RU"}, {name: "BL3"}, {name: "NU"}, {name: "BL4"}, {name: "PU"}, {name: "LC"}, {name: "NFE"}];

	$scope.party = [];

	if (post.party)
	{
		$scope.party = post.party;

	}
	$scope.selectedTier = post.tier;


	$scope.tierSort = function(mon)
	{
		//ordering should also depend on current tier
		//ie if RU, then the tiers above don't display at all
		if (mon.tier === $scope.selectedTier) return 0;
		else 
		{
			if (mon.tier === "OU") return 1;
			if (mon.tier === "UU") return 3;
			if (mon.tier === "RU") return 5;
			if (mon.tier === "NU") return 7;
			if (mon.tier === "PU") return 9;
			if (mon.tier === "LC") return 11;
			if (mon.tier === "NFE") return 13;
			else return 15;
		}
	}

	// $scope.showMons = function()
	// {
	
	// 	$scope.r.pokedex = [];
	// 	for (var i = 0; i < pokedex.length; i++)
	// 	{
			
	// 		if (pokedex[i].tier === $scope.selectedTier)
	// 		{

	// 			$scope.r.pokedex.push(pokedex[i]);
	// 		}
	// 	}
	// }


	$scope.roomID = post._id;
	$scope.playedCard = "not played yet";

	$scope.partySize = ["1", "2", "3", "4", "5", "6"];
	$scope.moveSize = ["1", "2", "3", "4"];

	$scope.changeWhichMon = function(which)
	{
		$scope.whichMonToShow = which;
	}

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

		var q = $scope.party["pokemon" + (parseInt(currentInput) + 1)];
		

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
		$scope.party["pokemon" + (parseInt(currentInput) + 1)] = name;
		// $scope.showMons($scope.selectedTier);
		$scope.r.pokedex = [];
		var data = {room: post._id, currentInput: currentInput, mon: name, tier: $scope.selectedTier};
		dex.updateParty(data);
		socket.emit("mon selection", data);
	}

	socket.on("update mon selection", function(data)
	{
	
		$scope.$apply(function()
		{
			$scope.party["pokemon" + (parseInt(data.currentInput) + 1)] = data.mon;
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