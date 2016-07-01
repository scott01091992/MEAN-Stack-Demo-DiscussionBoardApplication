myApp.controller('usersController', function($scope, userFactory, $location){

	$scope.getUsers = function(){
		userFactory.getUsers(function(callback){
			$scope.user = callback;
		});
	};
	
	$scope.create_user = function(){
		userFactory.create_user({username: $scope.username}, function(output){
			$location.path('/dashboard');
		});	
		
	};

});