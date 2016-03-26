var app = angular.module("collabteambuilder", ["ui.router", "ngSanitize", "sticky", "ngclipboard", "angular-clipboard"]);


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


	
	

	var pokedex = dex.dex;
	var movedex = dex.moves;
	var itemdex = dex.items;



	var currentInput = "";
	$scope.spriteBaseURL = "https://play.pokemonshowdown.com/sprites/bw/";
	$scope.tiers = ["Uber", "OU", "BL", "UU", "BL2", "RU", "BL3", "NU", "BL4", "PU", "LC", "NFE"];
	
	//[{name: "Uber"}, {name: "OU"}, {name: "BL"}, {name: "UU"}, {name: "BL2"}, {name: "RU"}, {name: "BL3"}, {name: "NU"}, {name: "BL4"}, {name: "PU"}, {name: "LC"}, {name: "NFE"}];
	$scope.natures = ["Adamant", "Jolly", "Modest", "Timid", "Bold", "Calm"];
	//$scope.party = [];

	$scope.colors = ["aqua", "purple", "green", "red", "orange", "gray", "cyan", "black", "magenta", "violet", "darkorchid", "darkturquoise"];
	$scope.yourCol = $scope.colors[Math.floor(Math.random() * $scope.colors.length)];

	$scope.randCol = function()
	{
		return {'color' : $scope.yourCol};
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
			toExport += $scope.party[poke].nature + " Nature \n";
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

	function calcStat(base, EV, level, nature)
	{
		return Math.floor(((2 * base + 31 + EV / 4) * level) / 100 + 5) * nature;
	}

	function damageCalc(level, offense, defense, bp, modifier)
	{
		var res = ((((2 * level) / 5 + 2) * offense / defense * bp) / 50 + 2);
		var min = (85 / 100 * res);
		for (var i = 0; i < modifier.length; i++)
		{
			min = Math.floor(min * modifier[i])
			res = Math.floor(res * modifier[i]);
		}
		return [Math.floor(min), Math.floor(res)];
		//return Math.floor(((((((2 * level) + 10) / 250) * offense) / defense) * bp + 2)) * modifier;
	}


	$scope.natureBoost = 1;

	$scope.defNatureBoost = 1;
	$scope.defHPEVs = 0;
	$scope.dEVs = 0;

	$scope.howEffective = [0.25, 0.5, 1, 2, 4];
	$scope.effectiveness = 1;

	$scope.itemEff = [1, 1.2, 1.3, 1.5];
	$scope.itemEffectiveness = 1;

	$scope.abEff = [1, 1.3, 1.33, 1.5];
	$scope.abilityEffectiveness = 1;

	$scope.refreshCalcs = function()
	{
		var mon = $scope.party["pokemon" + currentInput.substring(0, 1)].name;

		var moves =
		{

			move1:
			{
				name: [],
				bp: [],
				cat: [],
				type: []
			},
			move2:
			{
				name: [],
				bp: [],
				cat: [],
				type: []
			},
			move3:
			{
				name: [],
				bp: [],
				cat: [],
				type: []
			},
			move4:
			{
				name: [],
				bp: [],
				cat: [],
				type: []
			}
		}

		moves.move1.name = $scope.party["pokemon" + currentInput.substring(0, 1)].move1;
		moves.move2.name = $scope.party["pokemon" + currentInput.substring(0, 1)].move2;
		moves.move3.name = $scope.party["pokemon" + currentInput.substring(0, 1)].move3;
		moves.move4.name = $scope.party["pokemon" + currentInput.substring(0, 1)].move4;
		var AtkEV = $scope.party["pokemon" + currentInput.substring(0, 1)].EVs.Atk;
		var SpAEV = $scope.party["pokemon" + currentInput.substring(0, 1)].EVs.SpA;
		var baseAtk = 0;
		var baseSpA = 0;
		var types = [];
		for (var poke in pokedex)
		{
			if (mon === pokedex[poke].species)
			{
				baseAtk = pokedex[poke].baseStats.atk;
				baseSpA = pokedex[poke].baseStats.spa;
				types = pokedex[poke].types;
			}
		}
		var level = 100;
		if ($scope.selectedTier === "LC") level = 5;

		var AtkStat = Math.floor(calcStat(baseAtk, AtkEV, level, $scope.natureBoost));
		var SpAStat = Math.floor(calcStat(baseSpA, SpAEV, level, $scope.natureBoost));
		
		for (var move in movedex)
		{
			for (var i in moves)
			{
				if (moves[i].name === movedex[move].name)
				{
					moves[i].bp = movedex[move].basePower;
					moves[i].cat = movedex[move].category;
					moves[i].type = movedex[move].type;
				}
			}

			// if (moves.move1.name === movedex[move].name)
			// {
			// 	moves.move1.bp = movedex[move].basePower;
			// 	moves.move1.cat = movedex[move].category;

			// }
			// if (moves.move2.name === movedex[move].name)
			// {
			// 	moves.move2.bp = movedex[move].basePower;
			// 	moves.move2.cat = movedex[move].category;
			// }
			// if (moves.move3.name === movedex[move].name)
			// {
			// 	moves.move3.bp = movedex[move].basePower;
			// 	moves.move3.cat = movedex[move].category;
			// }
			// if (moves.move4.name === movedex[move].name)
			// {
			// 	moves.move4.bp = movedex[move].basePower;
			// 	moves.move4.cat = movedex[move].category;
			// }
		}

		//$scope.damageCalculations = "Typing: " + types + " Atk stat: " + AtkStat + "<br />";
		//$scope.damageCalculations += "moves: " + move1.name + " " + move2.name + " " + move3.name + " " + move4.name;
		var baseDef = 0;
		var baseSpD = 0;
		var baseHP = 0;
		if ($scope.defenderName.length >= 3)
		{
			
			for (var poke in pokedex)
			{
				if ($scope.defenderName === pokedex[poke].species || $scope.defenderName === pokedex[poke].species.toLowerCase())
				{
					baseDef = pokedex[poke].baseStats.def;
					baseSpD = pokedex[poke].baseStats.spd;
					baseHP = pokedex[poke].baseStats.hp;
					//types = pokedex[poke].types;
				}
			}
			
			var defenderHP = Math.floor(calcHP(baseHP, parseInt($scope.defHPEVs), level));
			var DefStat = Math.floor(calcStat(baseDef, parseInt($scope.dEVs), level, $scope.defNatureBoost));
			var SpDStat = Math.floor(calcStat(baseSpD, parseInt($scope.dEVs), level, $scope.defNatureBoost));
			var damage = "";
			
			
			for (var mov in moves)
			{

				var mod = [1];
				//random roll here
				//D' = (D * (100-R)) ÷ 100
				if (types.indexOf(moves[mov].type) > -1)
				{
					mod.push(1.5);
				}
				mod.push($scope.effectiveness);
				mod.push($scope.itemEffectiveness);
				mod.push($scope.abilityEffectiveness);
				
				if (moves[mov].cat === "Physical")
				{

					
					damage += moves[mov].name + ": " + 
					(Math.floor(damageCalc(level, AtkStat, DefStat, moves[mov].bp, mod)[0]) / defenderHP * 100).toFixed(2) + " to " + 
					(Math.floor(damageCalc(level, AtkStat, DefStat, moves[mov].bp, mod)[1]) / defenderHP * 100).toFixed(2) + " <br />";

				}
				else
				{
					
					damage += moves[mov].name + ": " + 
					(Math.floor(damageCalc(level, SpAStat, SpDStat, moves[mov].bp, mod)[0]) / defenderHP * 100).toFixed(2) + " to " + 
					(Math.floor(damageCalc(level, SpAStat, SpDStat, moves[mov].bp, mod)[1]) / defenderHP * 100).toFixed(2) + " <br />";

				}
			}
			$scope.damageCalculations = damage;
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
			// for (var ev in $scope.evNums[data.currentInput.substring(0, 1)])
			// {
			// 	if ($scope.party["pokemon" + data.currentInput.substring(0, 1)].EVs[ev] === 0)
			// 	{
			// 		$scope.evNums[data.currentInput.substring(0, 1)][ev] = $scope.fullEVs.filter(lessThan(max));
			// 	}
			// }
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

	}

	socket.on("update nature selection", function(data)
	{
		$scope.$apply(function()
		{
			$scope.party["pokemon" + data.currentInput.substring(0, 1)].nature = data.nature;
		})
	})

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
		

		currentInput = "";
		currentInput = index;

		$scope.r.pokedex = [];

		var q = $scope.party["pokemon" + currentInput.substring(0, 1)].name;
		

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

		$scope.party["pokemon" + currentInput.substring(0, 1)].name = name;
		$scope.party["pokemon" + currentInput.substring(0, 1)].ability = "";
		// $scope.showMons($scope.selectedTier);
		$scope.r.pokedex = [];
		var data = {room: post._id, currentInput: currentInput, mon: name};
		dex.updateParty(data);
		socket.emit("mon selection", data);
	}

	$scope.fillInputItem = function(item)
	{
		$scope.party["pokemon" + currentInput.substring(0, 1)].item = item;
		$scope.r.itemdex = [];
		var data = {room: post._id, currentInput: currentInput, item: item};
		dex.updateParty(data);
		socket.emit("item selection", data);
	}

	$scope.fillInputMove = function(move)
	{
		$scope.party["pokemon" + currentInput.substring(0, 1)]["move" + currentInput.substring(1)] = move;
		$scope.r.movedex = [];
		var data = {room: post._id, currentInput: currentInput, move: move};
		dex.updateParty(data);
		socket.emit("move selection", data);
		$scope.refreshCalcs();
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