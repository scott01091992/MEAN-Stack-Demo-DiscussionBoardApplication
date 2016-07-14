myApp.controller('usersController', function($scope, userFactory, $location){

	// Bring back all users 
	$scope.getUsers = function(){
		userFactory.getUsers(function(callback){
			$scope.user = callback;
		});
	};
	
	// Register User + validations
	$scope.register = function(){
		//check password input == confirm input
		if($scope.register_password == $scope.register_password_confirm){
			// request user be registered to server
			userFactory.register_user({username: $scope.register_username, password: $scope.register_password}, function(output){
				//errors returned
				if(output.errors){
					//update view with errors
					$scope.new_errors = output.errors;
					$scope.confirm_error = '';
					$scope.register_username = '';
					$scope.register_password = '';
					$scope.register_password_confirm = '';
					$scope.success = '';
				}
				//no errors
				else{
					//update view with success message
					$scope.confirm_error = '';
					$scope.new_errors = [];
					$scope.register_username = '';
					$scope.register_password = '';
					$scope.register_password_confirm = '';
					$scope.success = 'Successfully registered';
				}
			});	
		}
		else{
			// update view with password == confirm error
			$scope.new_errors = [];
			$scope.register_username = '';
			$scope.register_password = '';
			$scope.register_password_confirm = '';
			$scope.confirm_error = 'The passwords do not match';
			$scope.success = '';
		}
	};

	//login user
	$scope.login = function(){
		//request for user to login
		userFactory.login_user({username: $scope.login_username, password: $scope.login_password}, function(callback){
			//successfully logged in
			if(callback.success == true){
				$location.path('/dashboard');
			}
			else{
			//update view with log_error
				$scope.log_error = callback;
				$scope.login_username = '';
				$scope.login_password = '';
			}
		});

	}


});