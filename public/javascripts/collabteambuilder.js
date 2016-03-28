var app = angular.module("collabteambuilder", ["ui.router", "ngSanitize", "sticky", "ngclipboard", "angular-clipboard"]);



app.directive('focusOn',function($timeout) {
    return {
        restrict : 'A',
        link : function($scope,$element,$attr) {
            $scope.$watch($attr.focusOn,function(_focusVal) {
                $timeout(function() {
                    if (_focusVal)
                   	{
                    	$element.focus();
                    }
                    else
                    {
                    	$element.blur();
                    }
                       
                });
            });
        }
    }
})


// angular.module("collabteambuilder", ["createRoom"]);
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
	$scope.evs = ["HP", "Atk", "Def", "SpA", "SpD", "Spe"];

	$scope.hideChat = false;
	$scope.exporting = false;
	$scope.messages = "";

	socket.on("connect", function()
	{
		socket.emit("room id", post._id);

		for (var i = 0; i < 6; i++)
		{
			
			$scope["howManyViewing" + i] = "";

			// for (var ev in $scope.evs)
			// {
			// 	$scope.party["pokemon" + (i + 1)].EVs[ev] = 0;
			// }
		}

	});

	{
	$scope.party = [];
	// {
	// 	pokemon1: 
	// 	{
	// 		name: "place",
	// 		id: "place",
	// 		item: "place", 
	// 		ability: "place",
	// 		move1: "place",
	// 		move2: "place",
	// 		move3: "place",
	// 		move4: "place",
	// 		EVs: 
	// 		{
	// 			HP: 0,
	// 			Atk: 0,
	// 			Def: 0,
	// 			SpA: 0,
	// 			SpD: 0,
	// 			Spe: 0
	// 		},
	// 		nature: "place"
	// 	},
	// 	pokemon2: 
	// 	{
	// 		name: "place",
	// 		id: "place",
	// 		item: "place",			 
	// 		ability: "place",
	// 		move1: "place",
	// 		move2: "place",
	// 		move3: "place",
	// 		move4: "place",
	// 		EVs: 
	// 		{
	// 			HP: 0,
	// 			Atk: 0,
	// 			Def: 0,
	// 			SpA: 0,
	// 			SpD: 0,
	// 			Spe: 0
	// 		},
	// 		nature: "place"
	// 	},
	// 	pokemon3: 
	// 	{
	// 		name: "place",
	// 		id: "place",
	// 		item: "place",			 
	// 		ability: "place",
	// 		move1: "place",
	// 		move2: "place",
	// 		move3: "place",
	// 		move4: "place",
	// 		EVs: 
	// 		{
	// 			HP: 0,
	// 			Atk: 0,
	// 			Def: 0,
	// 			SpA: 0,
	// 			SpD: 0,
	// 			Spe: 0
	// 		},
	// 		nature: "place"
	// 	},
	// 	pokemon4: 
	// 	{
	// 		name: "place",
	// 		id: "place",
	// 		item: "place",			 
	// 		ability: "place",
	// 		move1: "place",
	// 		move2: "place",
	// 		move3: "place",
	// 		move4: "place",
	// 		EVs: 
	// 		{
	// 			HP: 0,
	// 			Atk: 0,
	// 			Def: 0,
	// 			SpA: 0,
	// 			SpD: 0,
	// 			Spe: 0
	// 		},
	// 		nature: "place"
	// 	},
	// 	pokemon5: 
	// 	{
	// 		name: "place",
	// 		id: "place",
	// 		item: "place",			 
	// 		ability: "place",
	// 		move1: "place",
	// 		move2: "place",
	// 		move3: "place",
	// 		move4: "place",
	// 		EVs: 
	// 		{
	// 			HP: 0,
	// 			Atk: 0,
	// 			Def: 0,
	// 			SpA: 0,
	// 			SpD: 0,
	// 			Spe: 0
	// 		},
	// 		nature: "place"
	// 	},
	// 	pokemon6: 
	// 	{
	// 		name: "place",
	// 		id: "place",
	// 		item: "place",			 
	// 		ability: "place",
	// 		move1: "place",
	// 		move2: "place",
	// 		move3: "place",
	// 		move4: "place",
	// 		EVs: 
	// 		{
	// 			HP: 0,
	// 			Atk: 0,
	// 			Def: 0,
	// 			SpA: 0,
	// 			SpD: 0,
	// 			Spe: 0
	// 		},
	// 		nature: "place"
	// 	}
	// }
	}
	$scope.evNums = 
	{
		"1":
		{
			HP: [],
			Atk: [],
			Def: [],
			SpA: [],
			SpD: [],
			Spe: []
		},
		"2":
		{
			HP: [],
			Atk: [],
			Def: [],
			SpA: [],
			SpD: [],
			Spe: []
		},
		"3":
		{
			HP: [],
			Atk: [],
			Def: [],
			SpA: [],
			SpD: [],
			Spe: []
		},
		"4":
		{
			HP: [],
			Atk: [],
			Def: [],
			SpA: [],
			SpD: [],
			Spe: []
		},
		"5":
		{
			HP: [],
			Atk: [],
			Def: [],
			SpA: [],
			SpD: [],
			Spe: []
		},
		"6":
		{
			HP: [],
			Atk: [],
			Def: [],
			SpA: [],
			SpD: [],
			Spe: []
		},
	};
	$scope.fullEVs = [4,8,12,16,20,24,28,32,36,40,44,48,52,56,60,64,68,72,76,80,84,88,92,96,100,104,108,112,116,120,124,128,132,136,140,144,148,152,156,160,164,168,172,176,180,184,188,192,196,200,204,208,212,216,220,224,228,232,236,240,244,248,252,0];

	var typeChart = 
	{
		Normal : 
		{
			Normal: 1,
			Grass: 1,
			Fire: 1,
			Water: 1,
			Electric: 1,
			Ice: 1,
			Flying: 1,
			Bug: 1,
			Poison: 1,
			Ground: 1,
			Rock: 0.5,
			Fighting: 1,
			Psychic: 1,
			Ghost: 0,
			Dragon: 1,
			Dark: 1,
			Steel: 0.5,
			Fairy: 1 
		},
		Grass : 
		{
			Normal: 1,
			Grass: 0.5,
			Fire: 0.5,
			Water: 2,
			Electric: 1,
			Ice: 1,
			Flying: 0.5,
			Bug: 0.5,
			Poison: 0.5,
			Ground: 2,
			Rock: 2,
			Fighting: 1,
			Psychic: 1,
			Ghost: 1,
			Dragon: 0.5,
			Dark: 1,
			Steel: 0.5,
			Fairy: 1 
		},
		Fire : 
		{
			Normal: 1,
			Grass: 2,
			Fire: 0.5,
			Water: 0.5,
			Electric: 1,
			Ice: 2,
			Flying: 1,
			Bug: 2,
			Poison: 1,
			Ground: 1,
			Rock: 0.5,
			Fighting: 1,
			Psychic: 1,
			Ghost: 1,
			Dragon: 0.5,
			Dark: 1,
			Steel: 2,
			Fairy: 1 
		},
		Water : 
		{
			Normal: 1,
			Grass: 0.5,
			Fire: 2,
			Water: 0.5,
			Electric: 1,
			Ice: 1,
			Flying: 1,
			Bug: 1,
			Poison: 1,
			Ground: 2,
			Rock: 2,
			Fighting: 1,
			Psychic: 1,
			Ghost: 1,
			Dragon: 0.5,
			Dark: 1,
			Steel: 1,
			Fairy: 1 
		},
		Electric : 
		{
			Normal: 1,
			Grass: 0.5,
			Fire: 1,
			Water: 2,
			Electric: 0.5,
			Ice: 1,
			Flying: 2,
			Bug: 1,
			Poison: 1,
			Ground: 0,
			Rock: 1,
			Fighting: 1,
			Psychic: 1,
			Ghost: 1,
			Dragon: 0.5,
			Dark: 1,
			Steel: 1,
			Fairy: 1 
		},
		Ice : 
		{
			Normal: 1,
			Grass: 2,
			Fire: 0.5,
			Water: 0.5,
			Electric: 1,
			Ice: 0.5,
			Flying: 2,
			Bug: 1,
			Poison: 1,
			Ground: 2,
			Rock: 1,
			Fighting: 1,
			Psychic: 1,
			Ghost: 1,
			Dragon: 2,
			Dark: 1,
			Steel: 0.5,
			Fairy: 1 
		},
		Flying : 
		{
			Normal: 1,
			Grass: 2,
			Fire: 1,
			Water: 1,
			Electric: 0.5,
			Ice: 1,
			Flying: 1,
			Bug: 2,
			Poison: 1,
			Ground: 1,
			Rock: 0.5,
			Fighting: 2,
			Psychic: 1,
			Ghost: 1,
			Dragon: 1,
			Dark: 1,
			Steel: 0.5,
			Fairy: 1 
		},
		Bug : 
		{
			Normal: 1,
			Grass: 2,
			Fire: 0.5,
			Water: 1,
			Electric: 1,
			Ice: 1,
			Flying: 0.5,
			Bug: 1,
			Poison: 0.5,
			Ground: 1,
			Rock: 1,
			Fighting: 0.5,
			Psychic: 2,
			Ghost: 0.5,
			Dragon: 1,
			Dark: 2,
			Steel: 0.5,
			Fairy: 0.5 
		},
		Poison : 
		{
			Normal: 1,
			Grass: 2,
			Fire: 1,
			Water: 1,
			Electric: 1,
			Ice: 1,
			Flying: 1,
			Bug: 1,
			Poison: 0.5,
			Ground: 0.5,
			Rock: 0.5,
			Fighting: 1,
			Psychic: 1,
			Ghost: 0.5,
			Dragon: 1,
			Dark: 1,
			Steel: 0,
			Fairy: 2 
		},
		Ground : 
		{
			Normal: 1,
			Grass: 0.5,
			Fire: 2,
			Water: 1,
			Electric: 2,
			Ice: 1,
			Flying: 0,
			Bug: 0.5,
			Poison: 2,
			Ground: 1,
			Rock: 2,
			Fighting: 1,
			Psychic: 1,
			Ghost: 1,
			Dragon: 1,
			Dark: 1,
			Steel: 2,
			Fairy: 1 
		},
		Rock : 
		{
			Normal: 1,
			Grass: 1,
			Fire: 2,
			Water: 1,
			Electric: 1,
			Ice: 2,
			Flying: 2,
			Bug: 2,
			Poison: 1,
			Ground: 0.5,
			Rock: 1,
			Fighting: 0.5,
			Psychic: 1,
			Ghost: 1,
			Dragon: 1,
			Dark: 1,
			Steel: 0.5,
			Fairy: 1 
		},
		Fighting : 
		{
			Normal: 2,
			Grass: 1,
			Fire: 1,
			Water: 1,
			Electric: 1,
			Ice: 2,
			Flying: 0.5,
			Bug: 0.5,
			Poison: 0.5,
			Ground: 1,
			Rock: 2,
			Fighting: 1,
			Psychic: 0.5,
			Ghost: 0,
			Dragon: 1,
			Dark: 2,
			Steel: 2,
			Fairy: 0.5 
		},
		Psychic : 
		{
			Normal: 1,
			Grass: 1,
			Fire: 1,
			Water: 1,
			Electric: 1,
			Ice: 1,
			Flying: 1,
			Bug: 1,
			Poison: 2,
			Ground: 1,
			Rock: 1,
			Fighting: 2,
			Psychic: 0.5,
			Ghost: 1,
			Dragon: 1,
			Dark: 0,
			Steel: 0.5,
			Fairy: 1 
		},
		Ghost : 
		{
			Normal: 0,
			Grass: 1,
			Fire: 1,
			Water: 1,
			Electric: 1,
			Ice: 1,
			Flying: 1,
			Bug: 1,
			Poison: 1,
			Ground: 1,
			Rock: 1,
			Fighting: 1,
			Psychic: 2,
			Ghost: 2,
			Dragon: 1,
			Dark: 0.5,
			Steel: 1,
			Fairy: 1 
		},
		Dragon : 
		{
			Normal: 1,
			Grass: 1,
			Fire: 1,
			Water: 1,
			Electric: 1,
			Ice: 1,
			Flying: 1,
			Bug: 1,
			Poison: 1,
			Ground: 1,
			Rock: 1,
			Fighting: 1,
			Psychic: 1,
			Ghost: 1,
			Dragon: 2,
			Dark: 1,
			Steel: 0.5,
			Fairy: 0 
		},
		Dark : 
		{
			Normal: 1,
			Grass: 1,
			Fire: 1,
			Water: 1,
			Electric: 1,
			Ice: 1,
			Flying: 1,
			Bug: 1,
			Poison: 1,
			Ground: 1,
			Rock: 1,
			Fighting: 0.5,
			Psychic: 2,
			Ghost: 2,
			Dragon: 1,
			Dark: 0.5,
			Steel: 1,
			Fairy: 0.5 
		},
		Steel : 
		{
			Normal: 1,
			Grass: 1,
			Fire: 0.5,
			Water: 0.5,
			Electric: 0.5,
			Ice: 2,
			Flying: 1,
			Bug: 1,
			Poison: 1,
			Ground: 1,
			Rock: 2,
			Fighting: 1,
			Psychic: 1,
			Ghost: 1,
			Dragon: 1,
			Dark: 1,
			Steel: 0.5,
			Fairy: 2 
		}, 
		Fairy : 
		{
			Normal: 1,
			Grass: 1,
			Fire: 0.5,
			Water: 1,
			Electric: 1,
			Ice: 1,
			Flying: 1,
			Bug: 1,
			Poison: 0.5,
			Ground: 1,
			Rock: 1,
			Fighting: 2,
			Psychic: 1,
			Ghost: 1,
			Dragon: 2,
			Dark: 2,
			Steel: 0.5,
			Fairy: 1 
		}

	}
		
	function getEffectiveness(moveType, typing)
	{
		return typing[1] ? typeChart[moveType][typing[0]] * typeChart[moveType][typing[1]] : typeChart[moveType][typing[0]];
	}


	var natures = 
	{
		Hardy:
		{
			name: "Hardy",
			Atk: 1,
			Def: 1,
			SpA: 1,
			SpD: 1,
			Spe: 1
		},
		Adamant:
		{
			name: "Adamant",
			Atk: 1.1,
			Def: 1,
			SpA: 0.9,
			SpD: 1,
			Spe: 1
		},
		Bold:
		{
			name: "Bold",
			Atk: 0.9,
			Def: 1.1,
			SpA: 1,
			SpD: 1,
			Spe: 1
		},
		Brave:
		{
			name: "Brave",
			Atk: 1.1,
			Def: 1,
			SpA: 1,
			SpD: 1,
			Spe: 0.9
		},
		Calm:
		{
			name: "Calm",
			Atk: 0.9,
			Def: 1,
			SpA: 1,
			SpD: 1.1,
			Spe: 1
		},
		Careful:
		{
			name: "Careful",
			Atk: 1,
			Def: 1,
			SpA: 0.9,
			SpD: 1.1,
			Spe: 1
		},
		Gentle:
		{
			name: "Gentle",
			Atk: 1,
			Def: 1.1,
			SpA: 1,
			SpD: 0.9,
			Spe: 1
		},
		Hasty:
		{
			name: "Hasty",
			Atk: 1,
			Def: 0.9,
			SpA: 1,
			SpD: 1,
			Spe: 1.1
		},
		Impish:
		{
			name: "Impish",
			Atk: 1,
			Def: 1.1,
			SpA: 0.9,
			SpD: 1,
			Spe: 1
		},
		Jolly:
		{
			name: "Jolly",
			Atk: 1,
			Def: 1,
			SpA: 0.9,
			SpD: 1,
			Spe: 1.1
		},
		Lax:
		{
			name: "Lax",
			Atk: 1,
			Def: 1.1,
			SpA: 1,
			SpD: 0.9,
			Spe: 1
		},
		Lonely:
		{
			name: "Lonely",
			Atk: 1.1,
			Def: 0.9,
			SpA: 1,
			SpD: 1,
			Spe: 1
		},
		Mild:
		{
			name: "Mild",
			Atk: 1,
			Def: 0.9,
			SpA: 1.1,
			SpD: 1,
			Spe: 1
		},
		Modest:
		{
			name: "Modest",
			Atk: 0.9,
			Def: 1,
			SpA: 1.1,
			SpD: 1,
			Spe: 1
		},
		Naive:
		{
			name: "Naive",
			Atk: 1,
			Def: 1,
			SpA: 1,
			SpD: 0.9,
			Spe: 1.1
		},
		Naughty:
		{
			name: "Naughty",
			Atk: 1.1,
			Def: 1,
			SpA: 1,
			SpD: 0.9,
			Spe: 1
		},
		Quiet:
		{
			name: "Quiet",
			Atk: 1,
			Def: 1,
			SpA: 1.1,
			SpD: 1,
			Spe: 0.9
		},
		Rash:
		{
			name: "Rash",
			Atk: 1,
			Def: 1,
			SpA: 1.1,
			SpD: 0.9,
			Spe: 1
		},
		Relaxed:
		{
			name: "Relaxed",
			Atk: 1,
			Def: 1.1,
			SpA: 1,
			SpD: 1,
			Spe: 0.9
		},
		Sassy:
		{
			name: "Relaxed",
			Atk: 1,
			Def: 1,
			SpA: 1,
			SpD: 1.1,
			Spe: 0.9
		},
		Timid:
		{
			name: "Timid",
			Atk: 0.9,
			Def: 1,
			SpA: 1,
			SpD: 1,
			Spe: 1.1
		}

	}

	$scope.natureList = ["Hardy", "Adamant (+Atk, -SpA)", "Bold (+Def, -Atk)", "Brave (+Atk, -Spe)", "Calm (+SpD, -Atk)", "Careful (+SpD, -SpA)", "Gentle (+Def, -SpD)", "Hasty (+Spe, -Def)", "Impish (+Def, -SpA)", "Jolly (+Spe, -SpA)", "Lax (+Def, -SpD)", "Lonely (+Atk, -Def)", "Mild (+SpA, -Def)", "Modest (+SpA, -Atk)", "Naive (+Spe, -SpD)", "Naughty (+Atk, -SpD)", "Quiet (+SpA, -Spe)", "Rash (+SpA, -SpD)", "Relaxed (+Def, -Spe)", "Sassy (+SpD, -Spe)", "Timid (+Spe, -Atk)"];
	// var pos = "";
	// var neg = "";
	// for (var n in natures)
	// {
	// 	for (var s in natures[n])
	// 	{
	// 		if (natures[n][s] === 1.1) pos = "+" + s;
	// 		if (natures[n][s] === 0.9) neg = "-" + s;
	// 	}
	// 	$scope.natureList.push(n + " (" + pos + ", " + neg + ")");
	// }
	


	var pokedex = dex.dex;
	var movedex = dex.moves;
	var itemdex = dex.items;



	var currentInput = "";
	$scope.spriteBaseURL = "https://play.pokemonshowdown.com/sprites/bw/";
	$scope.tiers = ["Uber", "OU", "BL", "UU", "BL2", "RU", "BL3", "NU", "BL4", "PU", "LC", "NFE"];
	
	//[{name: "Uber"}, {name: "OU"}, {name: "BL"}, {name: "UU"}, {name: "BL2"}, {name: "RU"}, {name: "BL3"}, {name: "NU"}, {name: "BL4"}, {name: "PU"}, {name: "LC"}, {name: "NFE"}];
	// $scope.natures = ["Adamant", "Jolly", "Modest", "Timid", "Bold", "Calm"];
	//$scope.party = [];

	$scope.colors = ["aqua", "purple", "green", "red", "orange", "gray", "cyan", "black", "magenta", "violet", "darkorchid", "darkturquoise"];
	$scope.yourCol = $scope.colors[Math.floor(Math.random() * $scope.colors.length)];

	$scope.randCol = function()
	{
		return {'color' : $scope.yourCol};
	}

	$scope.attackingCalcActive = false;
	$scope.defendingCalcActive = false;

	$scope.styleNav = function()
	{
		//if (i === 1)
		{
			if (!$scope.attackingCalcActive && !$scope.defendingCalcActive)
			{
				//'background-color': '#006186', 
				return {'background-color' : 'white', 'color' : '#00374C', 'border-radius' : '0px'};
			}
		}

	}


	$scope.userNick = $scope.yourCol;

	$scope.party = post.party;


	
	$scope.selectedTier = post.tier;


	$scope.chooseTier = function(tier)
	{
		var data = {room: post._id, tier: tier};
		dex.updateParty(data);
		socket.emit("tier selection", data);
	}

	socket.on("update tier selection", function(data)
	{
		$scope.$apply(function()
		{
			$scope.selectedTier = data.tier;
		});
	});

	$scope.copied = function()
	{
		$scope.copied2clip = "Copied!";
	}

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

	$scope.export = function()
	{

		if ($scope.exporting === true)
		{
			$scope.copied2clip = "";
		}

		$scope.exporting = !$scope.exporting;
		$scope.exported = "";
		var toExport = "";
		for (var poke in $scope.party)
		{

			toExport += $scope.party[poke].name + " @ " + $scope.party[poke].item + "\n";
			toExport += "Ability: " + $scope.party[poke].ability + "\n";
			toExport += "EVs: ";
			for (var ev in $scope.party[poke].EVs)
			{
				toExport += $scope.party[poke].EVs[ev] + " " + ev + " / ";
			}
			toExport = toExport.substring(0, toExport.length - 3);
			toExport += "\n";
			toExport += $scope.party[poke].nature.split(" ")[0] + " Nature \n";
			//possible restructure of moves
			toExport += "- " + $scope.party[poke].move1 + "\n";
			toExport += "- " + $scope.party[poke].move2 + "\n";
			toExport += "- " + $scope.party[poke].move3 + "\n";
			toExport += "- " + $scope.party[poke].move4 + "\n";




			toExport += "\n";
		}


		$scope.exported = toExport;
	}

	function calcHP(base, EV, level)
	{
		return ((2*base + 31 + EV / 4 + 100) * level) / 100 + 10;
	}

	function calcStat(base, EV, level)
	{
		//natures is actually calculated elsewhere
		return Math.floor(((2 * base + 31 + EV / 4) * level) / 100 + 5);
	}


	$scope.isAerilate = "";
	$scope.isPixilate = "";
	$scope.isRefrigerate = "";


	//types is what types the attacker is
	function damageCalc(move, typing, level, offense, defense, bp, attacker, defender)
	{

		$scope.test = typing;
		var baseDamage;
		var minDamage;

		var mods = [];
		var effectiveness = getEffectiveness(move.type, defender.types);
		// var attacker = $scope.party["pokemon" + currentInput.substring(0, 1)];

		var stabMod;		
		//spread, weather, gravity, crit
		//random
		baseDamage = Math.floor(Math.floor((Math.floor((2 * level) / 5 + 2) * offense) / defense * bp) / 50 + 2);
		minDamage = Math.floor(85 / 100 * baseDamage);
		//STAB
		if (typing.indexOf(move.type) > -1 && attacker.ability === "Adaptability")
		{
			stabMod = 0x2000;
		}
		else if ((typing.indexOf(move.type) > -1 && !(attacker.ability === "Adaptability")))// || $scope.isAerilate || $scope.isPixilate || $scope.isRefrigerate)
		{
			stabMod = 0x1800;
		}
		else if ((typing.indexOf("Fairy") > -1 && $scope.isPixilate) || (typing.indexOf("Flying") && $scope.isAerilate) || (typing.indexOf("Ice") && $scope.isRefrigerate))
		{
			stabMod = 0x1800;
		}
		else if (attacker.ability === "Protean")
		{
			stabMod = 0x1800;
		}
		else stabMod = 0x1000;

		if (attacker.ability === "Tinted Lens" && effectiveness < 1)
		{
			mods.push(0x2000);
		}

		//defensive abilities still needed

		//expert belt

		if (attacker.item === "Life Orb")
		{
			
			mods.push(0x14CC);
		}



		var finalMod = chainMods(mods);
		minDamage = pokeRound(minDamage * stabMod / 0x1000);

		minDamage = Math.floor(minDamage * effectiveness);
		minDamage = Math.max(1, minDamage);
		minDamage = pokeRound(minDamage * finalMod / 0x1000);

		baseDamage = pokeRound(baseDamage * stabMod / 0x1000);
		baseDamage = Math.floor(baseDamage * effectiveness);
		baseDamage = Math.max(1, baseDamage);
		baseDamage = pokeRound(baseDamage * finalMod / 0x1000);

	

		return [minDamage, baseDamage];


	}
	function truncToOnePlace(num)
	{
		return Math.floor(num * 10) / 10;
	}

	function pokeRound(num)
	{
		return (num % 1 > 0.5) ? Math.ceil(num) : Math.floor(num);
	}



	$scope.natureBoost = 1;
	$scope.plateBoost = 0;
	$scope.knockMod = 0;

	$scope.defNatureBoost = 1;
	$scope.defHPEVs = 0;
	$scope.dEVs = 0;
	$scope.spdEVs = 0;

	$scope.defenderName = "";

	$scope.howEffective = [0.25, 0.5, 1, 2, 4];
	$scope.effectiveness = 1;

	$scope.itemEff = [1, 1.2, 1.3, 1.5];
	$scope.itemEffectiveness = 1;

	$scope.abEff = [1, 1.3, 1.33, 1.5];
	$scope.abilityEffectiveness = 1;

	$scope.atkStatMods = [0.5, 1, 1.5, 2];
	$scope.atkStatMod = 1;

	$scope.defStatMods = [1, 1.5, 2];
	$scope.defStatMod = 1;

	$scope.damageMods = [0.5, 1, 1.2, 1.5, 2];
	$scope.damageMod = 1;

	$scope.STABMods = [1, 1.5, 2];
	$scope.STABMod = 1;

	// $scope.boostMods = [6, 5, 4, 3, 2, 1, 0, -1, -2, -3, -4, -5, -6];
	$scope.boostMods = ["+6", "+5", "+4", "+3", "+2", "+1", "+0", "-1", "-2", "-3", "-4", "-5", "-6"];
	$scope.AtkBoostMod = "+0";
	$scope.SpABoostMod = "+0";
	$scope.defBoostMod = "+0";
	$scope.spdBoostMod = "+0";
	$scope.defNat = "Hardy";

	function boostConverter(num)
	{
		num = parseInt(num);
		if (num < 0)
		{
			return 2 / (2 - num);
		}
		if (num > 0)
		{
			return (num + 2) / 2;
		}
		else return 1;
	}

	function decToPokeHex(num)
	{
		switch (num)
		{
			case 0.5:
				return 0x800;
				break;
			case 1:
				return 0x1000;
				break;
			case 1.1:
				return 0x1199;
				break;
			case 1.2:
				return 0x1333;
				break;
			case 1.3:
				return 0x14CD;
				break;
			case 1.5:
				return 0x1800;
				break;
			case 2:
				return 0x2000;
				break;
			default:
				return 0x1000;

		}
	}



	function chainMods(mods) 
	{
	    var M = 0x1000;
	    for(var i = 0; i < mods.length; i++) {

	        if(mods[i] !== 0x1000) 
	        {
	            M = ((M * mods[i]) + 0x800) >> 12;
	        }
	    }
	    return M;
	}


	function calcBasePower(move, attacker, defender)
	{
		
		var bp = move.basePower;

		// var attacker = $scope.party["pokemon" + currentInput.substring(0, 1)];
		var bpMods = [0x1000];

		if (attacker.ability === "Technician" && bp <= 60)
		{
			bpMods.push(0x1800);
		}
		else if (attacker.ability === "Reckless" && move.recoil)
		{
			bpMods.push(0x1333);
		}
		else if (attacker.ability === "Iron Fist" && move.flags)
		{
			if (move.flags.punch)
			{
				bpMods.push(0x1333);
			}
		}
		if (attacker.ability === "Sheer Force" && move.secondary)
		{
			bpMods.push(0x14CD);
		}
		if ($scope.plateBoost || $scope.attackerPlateBoost)
		{
			
			bpMods.push(0x1333);
		}
		else if ((attacker.item === "Muscle Band" && move.category === "Physical") || (attacker.item === "Wise Glasses" && move.category === "Special"))
		{
			bpMods.push(0x1199);
		}


		//Gen 4 Orbs
		//status, eg facade

		if (move.name === "Knock Off" && defender.item)
		{
			bpMods.push(0x1800);
		}

		$scope.isAerilate = (attacker.ability === "Aerilate" && move.type === "Normal");
		$scope.isPixilate = (attacker.ability === "Pixilate" && move.type === "Normal");
		$scope.isRefrigerate = (attacker.ability === "Refrigerate" && move.type === "Normal");

		if ($scope.isAerilate || $scope.isPixilate || $scope.isRefrigerate)
		{
			bpMods.push(0x14CD);
		}
		else if ((attacker.ability === "Mega Launcher" && move.flags.pulse) || (attacker.ability === "Strong Jaw" && move.flags.bite))
		{
			bpMods.push(0x1800);
		}
		else if (attacker.ability === "Tough Claws" && move.flags.contact)
		{
			bpMods.push(0x14CD);
		}
		//account for defending mon's aura too
		else if (attacker.ability === (move.type + " Aura"))
		{
			bpMods.push(0x1547);
		}

		return Math.max(1, pokeRound(bp * chainMods(bpMods) / 0x1000));
	}

	$scope.attackerBoostMod = "+0";
	$scope.sattackerBoostMod = "+0";

//	var AtkStat = calcAttack(unmodAtk, attackingPoke, mon, attackingPoke.moves[mov], $scope.attackerBoostMod, $scope.sattackerBoostMod);

	function calcAttack(stat, attacker, defender, move, pBoost, sBoost)
	{
		var statMods = [0x1000];


		var nat = attacker.nature.split(" ")[0];
		var atkBoost = natures[nat].Atk;
		var spaBoost = natures[nat].SpA;



		if (move.category === "Physical")
		{
			stat = Math.floor(stat * atkBoost);
			stat = pokeRound(stat * boostConverter(pBoost));
		}
		else if (move.category === "Special")
		{
			stat = Math.floor(stat * spaBoost);
			stat = pokeRound(stat * boostConverter(sBoost))
		}

		// stat = Math.floor(stat * $scope.natureBoost);
		//could lead to errors because not technically right


		if ((attacker.ability === "Hustle" || attacker.ability === "hustle") && move.category === "Physical")
		{
			stat = pokeRound(stat * 1.5);
		}

		//bunch of niche stuff, https://github.com/Zarel/honko-damagecalc/blob/master/js/damage.js


		if ((attacker.item === "Soul Dew" && (attacker.name === "Latias" || attacker.name === "Latios") && move.category === "Special")
		|| (attacker.item === "Choice Band" && move.category === "Physical") || (attacker.item === "Choice Specs" && move.category === "Special"))
		{

			statMods.push(0x1800);
		}

		// else if ((attacker.item === "soul dew" && (attacker.name === "latias" || attacker.name === "latios") && move.category === "Special")
		// || (attacker.item === "choice band" && move.category === "Physical") || (attacker.item === "choice specs" && move.category === "Special"))
		// {

		// 	statMods.push(0x1800);
		// }


		return Math.max(1, pokeRound(stat * chainMods(statMods) / 0x1000));
	}

	function hitsDefense(move)
	{
		
		if (move.defensiveCategory)
		{
			if (move.defensiveCategory === "Physical") return true;
			else return false;
		}
		return false;
	}

	function calcDef(stat, attacker, defender, move, dBoost, sBoost)
	{
		var statMods = [0x1000];
		var nat = defender.nature.split(" ")[0];

		var defBoost = natures[nat].Def;
		var spdBoost = natures[nat].SpD;
		if (move.category === "Physical")
		{
			stat = Math.floor(stat * defBoost);
			stat = pokeRound(stat * boostConverter(dBoost));
		}
		else if (move.category === "Special")
		{
			stat = Math.floor(stat * spdBoost);
			stat = pokeRound(stat * boostConverter(sBoost));
		}
		
		if ((defender.item === "Soul Dew" && (defender.name === "Latios" || defender.name === "Latias") && !hitsDefense(move)) ||
            (defender.item === "Assault Vest" && !hitsDefense(move)) || (defender.item === "Eviolite")) 
		{
        	statMods.push(0x1800);

    	}


		//implement things for defending calc
		
		return Math.max(1, pokeRound(stat * chainMods(statMods) / 0x1000));
	}

	$scope.refreshCalcs = function()
	{

		////$scope.test = $scope.party["pokemon" + currentInput.substring(0, 1)].move4;//["move" + currentInput.substring(1)];
		var mon = $scope.party["pokemon" + currentInput.substring(0, 1)];

		var moves =
		{

			move1:
			{
				// name: [],
				// bp: [],
				// cat: [],
				// type: []
			},
			move2:
			{
				// name: [],
				// bp: [],
				// cat: [],
				// type: []
			},
			move3:
			{
				// name: [],
				// bp: [],
				// cat: [],
				// type: []
			},
			move4:
			{
				// name: [],
				// bp: [],
				// cat: [],
				// type: []
			}
		}

		for (var m in moves)
		{
			moves[m].name = mon[m];
		}

		var AtkEV = mon.EVs.Atk; //$scope.party["pokemon" + currentInput.substring(0, 1)].EVs.Atk;
		var SpAEV = mon.EVs.SpA; //$scope.party["pokemon" + currentInput.substring(0, 1)].EVs.SpA;
		var baseAtk = 0;
		var baseSpA = 0;
		var types = [];
		for (var poke in pokedex)
		{
			if (mon.name === pokedex[poke].species)
			{
				baseAtk = pokedex[poke].baseStats.atk;
				baseSpA = pokedex[poke].baseStats.spa;
				typing = pokedex[poke].types;
			}
		}
		var level = 100;
		if ($scope.selectedTier === "LC") level = 5;

		var AtkStat = 0;
		var SpAStat = 0;

		var unmodAtkStat = Math.floor(calcStat(baseAtk, AtkEV, level));
		var unmodSpAStat = Math.floor(calcStat(baseSpA, SpAEV, level));

		for (var move in movedex)
		{
			for (var i in moves)
			{
				if (moves[i].name === movedex[move].name)
				{
					moves[i] = movedex[move];
					// moves[i].bp = movedex[move].basePower;
					// moves[i].cat = movedex[move].category;
					// moves[i].type = movedex[move].type;
				}
			}

		}

		var baseDef = 0;
		var baseSpD = 0;
		var baseHP = 0;
		var defendingPoke = 
		{
			species: "",
			types: ["", ""],
			baseStats: {hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0},
			abilities: {0: "", 1: "", H: ""}
		};
		if ($scope.defenderName.length >= 3)
		{
			
			for (var poke in pokedex)
			{
				if ($scope.defenderName === pokedex[poke].species || $scope.defenderName === pokedex[poke].species.toLowerCase())
				{
					defendingPoke = pokedex[poke];
				}
			}
			


			baseDef = defendingPoke.baseStats.def;
			baseSpD = defendingPoke.baseStats.spd;
			baseHP = defendingPoke.baseStats.hp;
			defendingPoke.nature = $scope.defNat;
			defendingPoke.item = $scope.defenderItem;

			var defenderHP = Math.floor(calcHP(baseHP, $scope.defHPEVs, level));
			var unmodDefStat = Math.floor(calcStat(baseDef, $scope.dEVs, level));
			var unmodSpDStat = Math.floor(calcStat(baseSpD, $scope.spdEVs, level));

			var DefStat = 0;
			var SpDStat = 0;
			var damage = "";
			damage += "<table class='dispDmgCalcs'>";
			for (var mov in moves)
			{
				AtkStat = calcAttack(unmodAtkStat, mon, defendingPoke, moves[mov], $scope.AtkBoostMod, $scope.SpABoostMod);
				SpAStat = calcAttack(unmodSpAStat, mon, defendingPoke, moves[mov], $scope.AtkBoostMod, $scope.SpABoostMod);
				DefStat = calcDef(unmodDefStat, mon, defendingPoke, moves[mov], $scope.defBoostMod, $scope.spdBoostMod);
				SpDStat = calcDef(unmodSpDStat, mon, defendingPoke, moves[mov], $scope.defBoostMod, $scope.spdBoostMod);

				var basePower = calcBasePower(moves[mov], mon, defendingPoke);
				var mod = [1];

				damage += "<tr>";

				if (moves[mov].category === "Physical")
				{
					damage += "<td>";
					damage += moves[mov].name + ": </td><td>" + 
					truncToOnePlace(Math.floor(damageCalc(moves[mov], typing, level, AtkStat, DefStat, basePower, mon, defendingPoke)[0]) / defenderHP * 100) + "% to " + 
					truncToOnePlace(Math.floor(damageCalc(moves[mov], typing, level, AtkStat, DefStat, basePower, mon, defendingPoke)[1]) / defenderHP * 100) + "%";
					damage += "</td>";
				}
				else if (moves[mov].category === "Special")
				{	
					damage += "<td>";
					damage += moves[mov].name + ": </td><td>" + 
					truncToOnePlace(Math.floor(damageCalc(moves[mov], typing, level, SpAStat, SpDStat, basePower, mon, defendingPoke)[0]) / defenderHP * 100) + "% to " + 
					truncToOnePlace(Math.floor(damageCalc(moves[mov], typing, level, SpAStat, SpDStat, basePower, mon, defendingPoke)[1]) / defenderHP * 100) + "%";
					damage += "</td>";
				}

				damage += "</tr>";
			}
			damage += "</table>";
			$scope.damageCalculations = damage;
		}

		
	}
	$scope.attacker = 
	{
		EVs:
		{
			Atk: 0,
			SpA: 0
		},
		nature: "Hardy"
	}
	$scope.defenderBoostMod = "+0";
	$scope.sdefenderBoostMod = "+0";

	$scope.refreshDefCalcs = function()
	{
		
		if ($scope.attacker.move1.length >= 3 || $scope.attacker.move2.length >= 3 || $scope.attacker.move3.length >= 3 || $scope.attacker.move4.length >= 3)
		{

			var attackingPoke = 
			{
				moves:
				{
					move1: {},
					move2: {},
					move3: {},
					move4: {}
				}

			};

			for (var mov in movedex)
			{
				for (var i in attackingPoke.moves)
				{
					if ($scope.attacker[i] === movedex[mov].name || $scope.attacker[i] === movedex[mov].name.toLowerCase())
					{
						
						attackingPoke.moves[i] = movedex[mov];
					}
				}
			}

			var mon = $scope.party["pokemon" + currentInput.substring(0, 1)];
			var HPEVs = mon.EVs.HP;
			var DefEVs = mon.EVs.Def;
			var SpDEVs = mon.EVs.SpD;
			var baseHP = 0;
			var baseDef = 0;
			var baseSpD = 0;
			var typing = [];
			for (var poke in pokedex)
			{
				if (mon.name === pokedex[poke].species)
				{
					baseHP = pokedex[poke].baseStats.hp;
					baseDef = pokedex[poke].baseStats.def;
					baseSpD = pokedex[poke].baseStats.spd;
					mon.types = pokedex[poke].types;
				}
			}

			var level = 100;
			if ($scope.selectedTier === "LC") level = 5;

			var HPStat = 0;
			var DefStat = 0;
			var SpDStat = 0;

			var unmodHP = Math.floor(calcHP(baseHP, HPEVs, level));
			var unmodDef = Math.floor(calcStat(baseDef, DefEVs, level));
			var unmodSpD = Math.floor(calcStat(baseSpD, SpDEVs, level));

			if ($scope.attacker.name.length >= 3)
			{
				attackingPoke.name = $scope.attacker.name;
				attackingPoke.ability = $scope.attacker.ability;
				for (var poke in pokedex)
				{
					if (attackingPoke.name === pokedex[poke].species || attackingPoke.name === pokedex[poke].species.toLowerCase())
					{
						attackingPoke.details = pokedex[poke];
						typing = pokedex[poke].types;
					}
				}

				var baseAtk = attackingPoke.details.baseStats.atk;
				var baseSpA = attackingPoke.details.baseStats.spa;

				var unmodAtk = Math.floor(calcStat(baseAtk, $scope.attacker.EVs.Atk, level));
				var unmodSpA = Math.floor(calcStat(baseSpA, $scope.attacker.EVs.SpA, level));

			
				attackingPoke.nature = $scope.attacker.nature;
				attackingPoke.item = $scope.attacker.item;
				var damage = ""
				damage += "<table>";
				for (var move in attackingPoke.moves)
				{
					damage += "<tr>";
					var AtkStat = calcAttack(unmodAtk, attackingPoke, mon, attackingPoke.moves[move], $scope.attackerBoostMod, $scope.sattackerBoostMod);
					var SpAStat = calcAttack(unmodSpA, attackingPoke, mon, attackingPoke.moves[move], $scope.attackerBoostMod, $scope.sattackerBoostMod);
					var DefStat = calcDef(unmodDef, attackingPoke, mon, attackingPoke.moves[move], $scope.defenderBoostMod, $scope.sdefenderBoostMod);
					var SpDStat = calcDef(unmodSpD, attackingPoke, mon, attackingPoke.moves[move], $scope.defenderBoostMod, $scope.sdefenderBoostMod);
					
					var basePower = calcBasePower(attackingPoke.moves[move], attackingPoke, mon);

					if (attackingPoke.moves[move].category === "Physical")
					{
						damage += "<td>";
						damage += attackingPoke.moves[move].name + ": </td><td>" + 
						truncToOnePlace(Math.floor(damageCalc(attackingPoke.moves[move], typing, level, AtkStat, DefStat, basePower, attackingPoke, mon)[0]) / unmodHP * 100) + "% to " + 
						truncToOnePlace(Math.floor(damageCalc(attackingPoke.moves[move], typing, level, AtkStat, DefStat, basePower, attackingPoke, mon)[1]) / unmodHP * 100) + "%";
						damage += "</td>";
						
					}

					if (attackingPoke.moves[move].category === "Special")
					{
						damage += "<td>";
						damage += attackingPoke.moves[move].name + ": </td><td>" + 
						truncToOnePlace(Math.floor(damageCalc(attackingPoke.moves[move], typing, level, SpAStat, SpDStat, basePower, attackingPoke, mon)[0]) / unmodHP * 100) + "% to " + 
						truncToOnePlace(Math.floor(damageCalc(attackingPoke.moves[move], typing, level, SpAStat, SpDStat, basePower, attackingPoke, mon)[1]) / unmodHP * 100) + "%";
						damage += "</td>";
						
					}

					damage += "</tr>";

				}
				damage += "</table>";
				$scope.defendingCalculations = damage;
			}


			
		}


	}


	$scope.roomID = post._id;
	$scope.playedCard = "not played yet";

	$scope.partySize = ["1", "2", "3", "4", "5", "6"];
	$scope.moveSize = ["1", "2", "3", "4"];


	function filterEVlist(which)
	{
		var totalEVs = 0;
		for (var ev in $scope.evNums[which])
		{
			totalEVs += $scope.party["pokemon" + which].EVs[ev];
		}
		var max = 508 - totalEVs;
		
		for (var ev in $scope.evNums[which])
		{
			if ($scope.party["pokemon" + which].EVs[ev] <= max)
			{
				$scope.evNums[which][ev] = $scope.fullEVs.filter(lessThan(max));
			}
		}
	}


	var mostRecentModded = "";
	$scope.changeWhichMon = function(which)
	{
		//alert($scope["pokemon" + which].EVs.toSource());



		for (var ev in $scope.evNums[which])
		{
			$scope.evNums[which][ev] = [4,8,12,16,20,24,28,32,36,40,44,48,52,56,60,64,68,72,76,80,84,88,92,96,100,104,108,112,116,120,124,128,132,136,140,144,148,152,156,160,164,168,172,176,180,184,188,192,196,200,204,208,212,216,220,224,228,232,236,240,244,248,252,0];
		}

		filterEVlist(which);

		$scope["howManyViewing" + mostRecentModded] = "";
		currentInput = which;
		$scope.whichMonToShow = which;


		var data = {color: $scope.yourCol, whichMon: which};
		
		socket.emit("viewing", data);
		socket.emit("remove viewing", mostRecentModded);
		mostRecentModded = which;
		$scope.refreshCalcs();
		$scope.refreshDefCalcs();
		var toFocus = "focusMe" + which;
		document.getElementById(toFocus).select();

	}

	socket.on("show view", function(data)
	{
		$scope.$apply(function()
		{
			$scope["howManyViewing" + mostRecentModded] = "";

			if (!($scope.whichMonToShow === data.whichMon))
			{
				$scope["howManyViewing" + data.whichMon] = "being modified";
				$scope["viewing" + data.whichMon] = {'color' : data.color};
			}

			
		});
		
	})

	socket.on("removing viewing", function(data)
	{
		$scope.$apply(function()
		{
			$scope["howManyViewing" + data] = "";

		});
		
	})
	

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



	$scope.getAbs = function(num)
	{
		var mon = $scope.party["pokemon" + num].name;
		var abs = [];
		if (pokedex) 
		{
			var i = 0;
			for (i = 0; i < pokedex.length; i++)
			{
				if (pokedex[i].species === mon)
				{
					for (var abili in pokedex[i].abilities)
					{
						abs.push(pokedex[i].abilities[abili]);
					}
				}
			}
		}
		return abs;
	}

	$scope.selectAbility = function(num, whichAb, abName)
	{
		var dataToSend = {room: post._id, currentInput: currentInput, abName: abName, whichAb: whichAb};
		dex.updateParty(dataToSend);
		socket.emit("ability selection", dataToSend);
		$scope.refreshCalcs();
		$scope.refreshDefCalcs();
	}

	socket.on("update ability selection", function(data)
	{
		$scope.$apply(function()
		{
			$scope.party["pokemon" + currentInput.substring(0, 1)].ability = data.abName;
		});
	});

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
	
	function lessThan(x)
	{
		return function(element)
		{
			return element <= x;
		}
	}

	$scope.chooseEV = function(whichPoke, whichEV)
	{

		
		var amount = $scope.party["pokemon" + whichPoke].EVs[whichEV];
		// var totalEVs = 0;
		// for (var ev in $scope.evNums[whichPoke])
		// {
		// 	totalEVs += $scope.party["pokemon" + whichPoke].EVs[ev];
		// }
		// var max = 508 - totalEVs;
		
		// for (var ev in $scope.evNums[whichPoke])
		// {
		// 	if ($scope.party["pokemon" + whichPoke].EVs[ev] === 0)
		// 	{
		// 		$scope.evNums[whichPoke][ev] = $scope.fullEVs.filter(lessThan(max));
		// 	}
		// }
		
		filterEVlist(whichPoke);
		var dataToSend = {room: post._id, currentInput: currentInput, whichEV: whichEV, amount: amount};
		
		
		var data = {pokemonNumber: whichPoke, whichEV: whichEV, amount: amount};
		
		dex.updateParty(dataToSend);
		socket.emit("fill EVs", dataToSend);
		$scope.refreshCalcs();
		$scope.refreshDefCalcs();
		

	}

	socket.on("EVs filled", function(data)
	{
		
		$scope.$apply(function()
		{
			for (var ev in $scope.evNums[data.currentInput.substring(0, 1)])
			{
				$scope.evNums[ev] = $scope.fullEVs;
			}
			$scope.party["pokemon" + data.currentInput.substring(0, 1)].EVs[data.whichEV] = data.amount;
			filterEVlist(data.currentInput.substring(0, 1));

		});
	});

	$scope.fillEVs = function(whichPoke, whichEV)
	{
		var amount = $scope.party["pokemon" + whichPoke].EVs[whichEV];

		var dataToSend = {room: post._id, currentInput: currentInput, whichEV: whichEV, amount: amount};
		
		
		var data = {pokemonNumber: whichPoke, whichEV: whichEV, amount: amount};
		setTimeout(function()
		{
			socket.emit("fill EVs", data);
		}, 1000);
		
		if (parseInt(amount) % 4 === 0)
		{
			dex.updateParty(dataToSend);
		}

	}



	var howManyKeystrokes = 0;



	$scope.doNatures = function(whichPoke, nature)
	{
		var dataToSend = {room: post._id, currentInput: currentInput, nature: nature};
		dex.updateParty(dataToSend);
		socket.emit("nature selection", dataToSend);
		$scope.refreshCalcs();
		$scope.refreshDefCalcs();

	}

	socket.on("update nature selection", function(data)
	{
		$scope.$apply(function()
		{
			$scope.party["pokemon" + data.currentInput.substring(0, 1)].nature = data.nature;
		})
	})

	$scope.currentInput = [];


	$scope.findRelMons = function(index, event)
	{
		

		currentInput = "";
		currentInput = index;

		$scope.r.pokedex = [];

		var q = $scope.party["pokemon" + currentInput.substring(0, 1)].name;
		

		for (var i = 0; i < pokedex.length; i++)
		{
			if (pokedex[i].species.indexOf(q) > -1 || pokedex[i].species.toLowerCase().indexOf(q) > -1)
			{
				
				if (q.length >= 3)
				{
					$scope.r.pokedex.push(pokedex[i]);

				}
			}
		}

		if (event.keyCode === 13)
		{
			$scope.fillInput($scope.r.pokedex[0].species);
		}

	}

	$scope.findRelItems = function(index, event)
	{
		

		
		currentInput = "";
		currentInput = index;

		$scope.r.itemdex = [];

		var q = $scope.party["pokemon" + currentInput.substring(0, 1)].item;
		

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

		if (event.keyCode === 13)
		{
			$scope.fillInputItem($scope.r.itemdex[0].name);
		}

	}

	$scope.findRelMoves = function(index, event)
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

		if (event.keyCode === 13)
		{
			$scope.fillInputMove($scope.r.movedex[0].name);
		}

	}

	$scope.fillInput = function(name)
	{

		$scope.party["pokemon" + currentInput.substring(0, 1)].name = name;
		$scope.party["pokemon" + currentInput.substring(0, 1)].ability = "";
	
		// $scope.showMons($scope.selectedTier);
		$scope.r.pokedex = [];
		var data = {room: post._id, currentInput: currentInput, mon: name};
		dex.updateParty(data);
		socket.emit("mon selection", data);
		$scope.refreshCalcs();
		$scope.refreshDefCalcs();
	}

	$scope.fillInputItem = function(item)
	{
		$scope.party["pokemon" + currentInput.substring(0, 1)].item = item;
		
		$scope.r.itemdex = [];
		var data = {room: post._id, currentInput: currentInput, item: item};
		dex.updateParty(data);
		socket.emit("item selection", data);
		$scope.refreshCalcs();
		$scope.refreshDefCalcs();
	}

	$scope.fillInputMove = function(move)
	{
		$scope.party["pokemon" + currentInput.substring(0, 1)]["move" + currentInput.substring(1)] = move;
	
		$scope.r.movedex = [];
		var data = {room: post._id, currentInput: currentInput, move: move};
		dex.updateParty(data);

		socket.emit("move selection", data);
		$scope.refreshCalcs();
		$scope.refreshDefCalcs();
		
	}

	socket.on("update mon selection", function(data)
	{

		
		$scope.$apply(function()
		{
			$scope.party["pokemon" + data.currentInput.substring(0, 1)].name = data.mon;
		});
	});

	socket.on("update item selection", function(data)
	{
		$scope.$apply(function()
		{
			$scope.party["pokemon" + data.currentInput.substring(0, 1)].item = data.item;
		})
	})

	socket.on("update move selection", function(data)
	{
		$scope.$apply(function()
		{
			$scope.party["pokemon" + data.currentInput.substring(0, 1)]["move" + data.currentInput.substring(1)] = data.move;
		})
	})



	$scope.sendMessage = function(event)
	{
		if (event.keyCode === 13)
		{
			// $scope.messages += "<li>" + $scope.userNick + ": " + $scope.chatMessage + "</li>";
			var message = "<li>" + "<strong style='color:" + $scope.yourCol + "'>" + $scope.userNick + "</strong>" + ": " + $scope.chatMessage + "</li>";
			$scope.chatMessage = "";
			setTimeout(function()
			{
				socket.emit("send message", message);
			}, 100)
		}
	}

	socket.on("receive message", function(mes)
	{
		
		$scope.$apply(function()
		{
				$scope.messages += mes;
		});
		var el = document.getElementById("cheating");
		el.scrollTop = el.scrollHeight;
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