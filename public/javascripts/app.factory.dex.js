
angular.module("collabteambuilder").factory("dex", function($http)
{
	var obj = 
	{
		dex: [],
		moves: [],
		items: [],
		learnset: []
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

	obj.getLearnset = function(mon)
	{
		//do the parsing beforehand I guess
		return $http.get("/learnsets/" + mon).success(function(data)
		{
			obj.learnset = data;
		})
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