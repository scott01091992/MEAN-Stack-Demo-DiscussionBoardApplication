myApp.factory('answerFactory', function($http){
	var factory = {};

	factory.create_answer = function(answer, callback){
		$http.post('/answer', answer).success(function(output){
			callback(output);
		});
	};

	factory.getAnswers = function(id, callback){
		$http.get('/answers/'+id).success(function(output){
			callback(output);
		});
	};

	factory.like = function(id, tid, callback){
		$http.post('/answer/like/' + id, {tid: tid}).success(function(output){
			callback(output);
		});
	}

	factory.dislike = function(id, tid, callback){
		$http.post('/answer/dislike/' + id, {tid: tid}).success(function(output){
			callback(output);
		});
	}

	return factory;
});