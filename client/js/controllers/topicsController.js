myApp.controller('topicsController', function($scope, $location, topicFactory, userFactory, answerFactory, commentFactory){

	topicFactory.get_current_topic(function(callback){
		$scope.current_topic = callback;
		console.log($scope.current_topic);
	});

	userFactory.get_current_user(function(callback){
		$scope.logged_in_user = callback;
	});

	answerFactory.getAnswers($scope.current_topic._id, function(callback){
		$scope.answers = callback;
	});

	commentFactory.getComments(function(callback){
		$scope.comments = callback;
	});

	$scope.create_answer = function(){
		answerFactory.create_answer({answer: $scope.answer, _user: $scope.logged_in_user, _topic: $scope.current_topic._id, likes: 0, dislikes: 0}, function(output){
			$scope.answers = output;
			$scope.answer = '';
		});
	};

	$scope.like = function(id, tid){
		answerFactory.like(id, tid, function(output){
			$scope.answers = output;
		});
	}

	$scope.dislike = function(id, tid){
		answerFactory.dislike(id, tid, function(output){
			$scope.answers = output;
		});
	}
	$scope.newComment = {};

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

	$scope.logout = function(){
		userFactory.logout();
	}

});
