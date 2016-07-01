myApp.controller('userDisplayController', function($routeParams, $scope, userFactory, $location){

	console.log($routeParams);

	userFactory.get_user($routeParams.id, function(callback){
		$scope.displayUser = callback;
	});
	
	$scope.logout = function(){
		userFactory.logout();
	}

});