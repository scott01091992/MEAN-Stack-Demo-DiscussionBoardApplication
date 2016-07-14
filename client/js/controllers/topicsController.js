myApp.controller('topicsController', function($routeParams, $scope, $location, topicFactory, userFactory, answerFactory, commentFactory){

	// get topic for view
	topicFactory.get_current_topic($routeParams.id, function(callback){
		$scope.current_topic = callback;
	});

	// get user info for view
	userFactory.get_current_user(function(callback){
		if(callback.error){
			$location.path('/');
		}
		else{
			$scope.logged_in_user = callback;
		}
	});

	// get answers for view
	answerFactory.getAnswers($routeParams.id, function(callback){
		$scope.answers = callback;
	});

	// get comments for view
	commentFactory.getComments(function(callback){
		$scope.comments = callback;
	});

	//clicked on dashboard route
	$scope.dashboard = function(){
		$location.path('/dashboard');
	}

	// create an answer
	$scope.create_answer = function(){
		answerFactory.create_answer({answer: $scope.answer, _user: $scope.logged_in_user, _topic: $scope.current_topic._id, likes: 0, dislikes: 0}, function(output){
			$scope.answers = output;
			$scope.answer = '';
		});
	};

	// update likes
	$scope.like = function(id, tid){
		answerFactory.like(id, tid, function(output){
			$scope.answers = output;
		});
	}

	// update dislikes
	$scope.dislike = function(id, tid){
		answerFactory.dislike(id, tid, function(output){
			$scope.answers = output;
		});
	}

	//set newComment as empty object to satisfy the ng-repeat in view
	$scope.newComment = {};

	//create a comment
	$scope.create_comment = function(answer, index){

		var newComment = {
			_answer: answer._id,
			_user: $scope.logged_in_user._id,
			comment: $scope.newComment[index], 
			tid: $scope.current_topic
		}

		commentFactory.create_comment(newComment, function(output){
			$scope.answers = output;
			$scope.newComment[index] = '';
		})
	}

	//remove user from session
	$scope.logout = function(){
		userFactory.logout();
		$location.path('/');
	}

});
