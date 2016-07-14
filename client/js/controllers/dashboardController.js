myApp.controller('dashboardController', function($scope, $location, topicFactory, userFactory){

	// get user from session	
	userFactory.get_current_user(function(callback){
		if(callback.error){
			$location.path('/');
		}
		else{
			$scope.logged_in_user = callback;
		}
	});

	// get all topics
	topicFactory.getTopics(function(callback){
		$scope.topics = callback;
	});

	//create a new topic
	$scope.create_topic = function(){
		topicFactory.create_topic({topic: $scope.topic, description: $scope.description, catagory: $scope.catagory, _user: $scope.logged_in_user._id}, function(output){
			if(output.errors){
				//update view with errors
				$scope.topic_errors = output.errors;
				$scope.topic = '';
				$scope.description = '';
				$scope.catagory = '';
			}
			else{
				// update view with topics
				$scope.topics = output;
				$scope.topic = '';
				$scope.description = '';
				$scope.catagory = '';
				$scope.topic_errors = [];
			}
			
		});
	};

	//remove user from session
	$scope.logout = function(){
		userFactory.logout();
		$location.path('/');
	}

});