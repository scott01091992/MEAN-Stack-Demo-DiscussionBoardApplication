myApp.factory('userFactory', function($http){

	var factory = {};

	factory.logout = function(){
		$http.get('/logout');
	}

	factory.get_user = function(id, callback){
		$http.get('/user/'+id).success(function(output){
			callback(output);
		});
	}

	factory.get_current_user = function(callback){
		$http.get('/user/current').success(function(output){
			callback(output);
		});
	}

	factory.register_user = function(user, callback){
		$http.post('/user', user).success(function(output){
			callback(output);
		});
	};

	factory.login_user = function(user, callback){
		$http.post('/user/login', user).success(function(output){
			callback(output);
		})
	}

	factory.getUsers = function(callback){
		$http.get('/users').success(function(output){
			callback(output);
		});
	};

	return factory;
});