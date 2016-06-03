angular.module("collabteambuilder").controller("MainCtrl", function($scope, createRoom)
{

	


	$scope.createRoom = function()
	{
		var randID = Math.random().toString(24).slice(4);
		var date = new Date();
		$scope.roomID = randID + date.getFullYear() + date.getMonth() + date.getDate() + date.getHours() + date.getMinutes() + date.getSeconds();
		createRoom.create({_id: $scope.roomID, dateCreated: date});

	}

});