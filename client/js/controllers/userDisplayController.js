myApp.controller('userDisplayController', function($routeParams, $scope, userFactory, $location){

	userFactory.get_current_user(function(callback){
		if(callback.error){
			$location.path('/');
		}
		else{
			$scope.logged_in_user = callback;
		}
	});
	
	//get and display user from id in route
	userFactory.get_user($routeParams.id, function(callback){
		$scope.displayUser = callback;
	});
	
	//logout button clicked -> remove user from session
	$scope.logout = function(){
		userFactory.logout();
		$location.path('/');
	}

	//get user from session
		userFactory.get_current_user(function(callback){
		$scope.logged_in_user = callback;
	});


});