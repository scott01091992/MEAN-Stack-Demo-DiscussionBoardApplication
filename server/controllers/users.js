
var Users = mongoose.model('Users');

module.exports = (function(){

	return{
		index: function(req, res){
			Customers.find({}, function(err, users){
		        if (err){
		          console.log(err);
		        }else{
		          res.json(users);
		        }
     		})
		}, 
		user_info: function(req, res){
			Users.findOne({_id: req.params.id}, function(err, user){
		        if (err){
		          console.log(err);
		        }else{
		          res.json(user);
		        }
     		})
		},
		create: function(req, res){
			var user = new Users(req.body);
			user.save(function(err){
				if(err){
					console.log(err);
				}
				else{
					console.log(user);
					res.json(user);
				}
			});
		}, 
		update: function(req, res){
			Users.findByIdAndUpdate(req.params.id, {$set: {username: req.body.username, password: req.body.password}}, function(err){
				if(err){
					console.log(err);
				}
				else{
					res.redirect('/');
				}
			})
		}, 
		login: function(req, res){
			Users.findOne({username: req.body.username, password: req.body.password}, function(err, user){
				if(err){
					console.log(err);
					res.redirect('/');
				}
				else{
					res.redirect('/topics');
				}
			})
		},
		destroy: function(req, res){
			 Users.findByIdAndRemove(req.params.id, function(err){
		        if (err){
		          console.log(err);
		        }else{
		          res.redirect('/');
		        }
      		})
		} 
	}

})();