myApp.factory('commentFactory', function($http){
	var factory = {};

	factory.create_comment = function(comment, callback){
		$http.post('/comment', comment).success(function(output){
			callback(output);
		});
	};

	factory.getComments = function(callback){
		$http.get('/comments').success(function(output){
			callback(output);
		});
	};

	return factory;
});
