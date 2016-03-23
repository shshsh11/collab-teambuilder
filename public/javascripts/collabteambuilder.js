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
		moves: [],
		items: []
	}

	obj.updateParty = function(data)
	{
		$http.post("/updateParty",  data, {}).success(function(data)
		{

		});
	}

	obj.getAllMoves = function()
	{
		
	}


	obj.getAll = function()
	{
		$http.get("/pokedex").success(function(monData)
		{
			$http.get("/movedex").success(function(data)
			{
				$http.get("/itemdex").success(function(itemData)
				{
					angular.copy(monData, obj.dex);
					angular.copy(data, obj.moves);
					angular.copy(itemData, obj.items);
				})

				
			});

		});
	}

	return obj;


})




app.controller("RoomCtrl", function($scope, rooms, post, dex)
{

	var socket = io("/test-namespace");

	socket.on("connect", function()
	{
		socket.emit("room id", post._id);

	});

	var pokedex = dex.dex;
	var movedex = dex.moves;
	var itemdex = dex.items;
	$scope.spriteBaseURL = "https://play.pokemonshowdown.com/sprites/bw/";
	$scope.tiers = ["Uber", "OU", "BL", "UU", "BL2", "RU", "BL3", "NU", "BL4", "PU", "LC", "NFE"];
	$scope.evs = ["HP", "Atk", "Def", "SpA", "SpD", "Spe"];
	//[{name: "Uber"}, {name: "OU"}, {name: "BL"}, {name: "UU"}, {name: "BL2"}, {name: "RU"}, {name: "BL3"}, {name: "NU"}, {name: "BL4"}, {name: "PU"}, {name: "LC"}, {name: "NFE"}];

	$scope.party = [];


	if (post.tier)
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
			if ($scope.tiers.indexOf(mon.tier) === -1) return 100;
			else return $scope.tiers.indexOf(mon.tier) + 1;

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
	

	$scope.getPokeSprite = function(index)
	{
		if ($scope.party["pokemon" + index].name.length > 0)
		{
			return "http://www.smogon.com/dex/media/sprites/xyicons/" + $scope.party["pokemon" + index].name.toLowerCase() + ".png";
		}	
		else
		{
			return "http://www.smogon.com/dex/media/sprites/xyicons/ditto.png";

		}

		//return $scope.spriteBaseURL + $scope.party["pokemon" + index].toLowerCase() + ".png";
	}



	$scope.getAbility = function(which, num)
	{
		
		var mon = $scope.party["pokemon" + num].name;
		if (pokedex) 
		{
			var i = 0;
			for (i = 0; i < pokedex.length; i++)
			{
				if (pokedex[i].species === mon) break;
			}
			return pokedex[i].abilities[which];
		}
		else return "";
		
	}
	
	$scope.fillEVs = function(whichPoke, whichEV)
	{
		var amount = $scope.party["pokemon" + whichPoke].EVs[whichEV];

		var dataToSend = {room: post._id, currentInput: currentInput, amount: amount, tier: $scope.selectedTier};
		dex.updateParty(data);


		var data = {pokemonNumber: whichPoke, whichEV: whichEV, amount: amount};
		setTimeout(function()
		{
			socket.emit("fill EVs", data);
		}, 1000);
	}

	socket.on("EVs filled", function(data)
	{
		$scope.$apply(function()
		{
			$scope.party["pokemon" + data.pokemonNumber].EVs[data.whichEV] = data.amount;
		});
	});

	var howManyKeystrokes = 0;





	
	var currentInput = "";
	$scope.currentInput = [];

{
	// $scope.findRelevant = function(index)
	// {
	// 	$scope.currentInput = [];
	// 	$scope.r.displayDex = [];

	// 	if (index.length === 1)
	// 	{
	// 		$scope.currentInput[0] = "pokemon" + index;
	// 		var q = $scope.party[$scope.currentInput[0]].name;

	// 		for(var i = 0; i < pokedex.length; i++)
	// 		{
	// 			if (pokedex[i].species.indexOf(q) > -1 || pokedex[i].species.toLowerCase().indexOf(q) > -1)
	// 			{
					
	// 				if (q.length >= 2)
	// 				{
	// 					$scope.r.displayDex.push(pokedex[i]);

	// 				}
	// 			}
	// 		}
	// 	}
	// }

	// $scope.fillInputSpecial = function(item)
	// {
		
	// 	$scope.party[$scope.currentInput[0]].name = item.species;
	// 	$scope.displayDex = [];
	// 	var data = {room: post._id, currentInput: currentInput, mon: name, tier: $scope.selectedTier};
	// 	dex.updateParty(data);
	// 	socket.emit("mon selection", data);

	// 	// $scope.party["pokemon" + currentInput].name = name;
	// 	// // $scope.showMons($scope.selectedTier);
	// 	// $scope.r.pokedex = [];
	// 	// var data = {room: post._id, currentInput: currentInput, mon: name, tier: $scope.selectedTier};
	// 	// dex.updateParty(data);
	// 	// socket.emit("mon selection", data);
	// }
}
	$scope.findRelMons = function(index)
	{
		

		//currentInput = event.target.id;
		currentInput = "";
		currentInput = index;

		$scope.r.pokedex = [];

		var q = $scope.party["pokemon" + currentInput].name;
		

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

	$scope.findRelItems = function(index)
	{
		

		//currentInput = event.target.id;
		currentInput = "";
		currentInput = index;

		$scope.r.itemdex = [];

		var q = $scope.party["pokemon" + currentInput].item;
		

		for (var i = 0; i < itemdex.length; i++)
		{
			if (itemdex[i].name.indexOf(q) > -1 || itemdex[i].id.indexOf(q) > -1)
			{
				
				if (q.length >= 2)
				{
					$scope.r.itemdex.push(itemdex[i]);

				}
			}
		}

	}

	$scope.findRelMoves = function(index)
	{
		

		currentInput = "";
		currentInput = index; //"pokemon" + index.substring(0, 1) + "." + "move" + index.substring(1);
	

		$scope.r.movedex = [];

		var q = $scope.party["pokemon" + index.substring(0, 1)]["move" + index.substring(1)];
		

		for (var i = 0; i < movedex.length; i++)
		{
			if (movedex[i].name.indexOf(q) > -1 || movedex[i].name.toLowerCase().indexOf(q) > -1)
			{
				
				if (q.length >= 2)
				{
					$scope.r.movedex.push(movedex[i]);

				}
			}
		}

	}

	$scope.fillInput = function(name)
	{

		$scope.party["pokemon" + currentInput].name = name;
		// $scope.showMons($scope.selectedTier);
		$scope.r.pokedex = [];
		var data = {room: post._id, currentInput: currentInput, mon: name, tier: $scope.selectedTier};
		dex.updateParty(data);
		socket.emit("mon selection", data);
	}

	$scope.fillInputItem = function(item)
	{
		$scope.party["pokemon" + currentInput].item = item;
		$scope.r.itemdex = [];
		var data = {room: post._id, currentInput: currentInput, item: item, tier: $scope.selectedTier};
		dex.updateParty(data);
		socket.emit("item selection", data);
	}

	$scope.fillInputMove = function(move)
	{
		$scope.party["pokemon" + currentInput.substring(0, 1)]["move" + currentInput.substring(1)] = move;
		$scope.r.movedex = [];
		var data = {room: post._id, currentInput: currentInput, move: move, tier: $scope.selectedTier};
		dex.updateParty(data);
		socket.emit("move selection", data);
	}

	socket.on("update mon selection", function(data)
	{
	
		$scope.$apply(function()
		{
			$scope.party["pokemon" + data.currentInput].name = data.mon;
		});
	});

	socket.on("update item selection", function(data)
	{
		$scope.$apply(function()
		{
			$scope.party["pokemon" + data.currentInput].item = data.item;
		})
	})

	socket.on("update move selection", function(data)
	{
		$scope.$apply(function()
		{
			$scope.party["pokemon" + data.currentInput.substring(0, 1)]["move" + data.currentInput.substring(1)] = data.move;
		})
	})

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