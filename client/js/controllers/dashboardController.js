myApp.controller('dashboardController', function($scope, $location, topicFactory, userFactory){

	
	userFactory.get_current_user(function(callback){
		$scope.logged_in_user = callback;
	});

	topicFactory.getTopics(function(callback){
		$scope.topics = callback;
	});

	$scope.create_topic = function(){
		topicFactory.create_topic({topic: $scope.topic, description: $scope.description, catagory: $scope.catagory, _user: $scope.logged_in_user._id}, function(output){
			$scope.topics = output;
			$scope.topic = '';
			$scope.description = '';
			$scope.catagory = '';
		});
	};

	$scope.topic_view = function(id){
		topicFactory.viewTopic(id, function(callback){
			$location.path('/topic');
		});
	};

});