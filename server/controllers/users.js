
var Users = mongoose.model('Users');

module.exports = (function(){

	return{
		index: function(req, res){
			Users.find({}, function(err, users){
		        if (err){
		          console.log(err);
		        }else{
		          res.json(users);
		        }
     		})
		},
		create: function(req, res){
			Users.findOne({username: req.body.username}, function(err, user){
				if(user){
					res.json({errors:{username:{message: 'This username is already in use'}}});
				}
				else{
					if(req.body.password){
						req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8));
					}
					var user = new Users(req.body);
					user.save(function(err){
						if(err){
							res.json(err);
						}
						else{
							res.json(user);
						}
					});
				}
			})
		}, 
		current_user: function(req, res){
			console.log(req.session);
			console.log('i am here');
			if(req.session.user){
				Users.findOne({_id: req.session.user._id}, function(err, user){
			        if (err){
	 					res.json(err);
			        }else{
			          res.json(user);
			        }
     			});
			}else{
				console.log('logging out and redirecting to login');
 				req.session.destroy();
 				res.json({error:{message: 'User not in session'}});
			}
			
		},
		login: function(req, res){
			console.log(req.body);
			if(req.body.password){
				Users.findOne({username: req.body.username}, function(err, user){
					if(err){
						res.json(err);
					}
					else if(user){
						if(bcrypt.compareSync(req.body.password, user.password)){
							req.session.user = user;
							console.log('here is the session user' + req.session.user);
							res.json({success: true});
						}
						else{
							res.json({message:'Authentication failed'});
						}
					}
					else{
						res.json({message: 'No account found'});
					}
				})
			}else{
				res.json({message: 'Must have Username and Password'});
			}
			
		}, 
		user_info: function(req, res){
			Users.findOne({_id: req.params.id}, function(err, user){
				if(err){
					console.log(err);
				}
				else{
					res.json(user);
				}
			})
		}, 
		logout: function(req, res) {
 		 	req.session.destroy();
 		 	res.redirect('/');
 		}
	}

})();