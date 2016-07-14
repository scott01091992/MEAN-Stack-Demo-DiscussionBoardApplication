myApp.factory('topicFactory', function($http){
	var factory = {};

	factory.create_topic = function(topic, callback){
		$http.post('/topic', topic).success(function(output){
			callback(output);
		});
	};

	factory.getTopics = function(callback){
		$http.get('/topics').success(function(output){
			callback(output);
		});
	};

	factory.get_current_topic = function(id, callback){
		$http.get('/topic/'+id).success(function(output){
			callback(output);
		});
	}

	return factory;
});