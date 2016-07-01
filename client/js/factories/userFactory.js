myApp.factory('userFactory', function($http){

	var factory = {};

	factory.logged_in_user = {};

	factory.logout = function(){
		factory.logged_in_user = {};
	}

	factory.get_user = function(id, callback){
		$http.get('/user/'+id).success(function(output){
			callback(output);
		});
	}

	factory.get_current_user = function(callback){
		callback(factory.logged_in_user);
	}

	factory.create_user = function(user, callback){
		$http.post('/user', user).success(function(output){
			factory.logged_in_user = output;
			callback(output);
		});
	};

	factory.getUsers = function(callback){
		$http.get('/users').success(function(output){
			callback(output);
		});
	};

	factory.getUser = function(callback){
		$http.get('/user/'+factory.display_user).success(function(output){
			callback(output);
		});
	}

	return factory;
});