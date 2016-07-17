
var Users = mongoose.model('Users');

module.exports = (function(){

	return{
		//return all users
		index: function(req, res){
			Users.find({}, function(err, users){
		        if (err){
		          res.json(err);
		        }else{
		          res.json(users);
		        }
     		})
		},
		//create new user
		create: function(req, res){
			Users.findOne({username: req.body.username}, function(err, user){
				//check if user already exists before inserting new user
				if(user){
					res.json({errors:{username:{message: 'This username is already in use'}}});
				}
				else{
					if(req.body.password){
						//encrypt password
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
		//get user based on session token
		current_user: function(req, res){
			if(req.session.user){
				Users.findOne({_id: req.session.user._id}, function(err, user){
			        if (err){
	 					res.json(err);
			        }else{
			          res.json(user);
			        }
     			});
			}else{
				//if it finds no user with the session id -> destroy session
 				req.session.destroy();
 				res.json({error:{message: 'User not in session'}});
			}
		},
		//login user
		login: function(req, res){
			if(req.body.password){
				Users.findOne({username: req.body.username}, function(err, user){
					if(err){
						res.json(err);
					}
					else if(user){
						//compare hashes
						if(bcrypt.compareSync(req.body.password, user.password)){
							req.session.user = user;
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
		//get a user based on id passed as url param
		user_info: function(req, res){
			Users.findOne({_id: req.params.id}, function(err, user){
				if(err){
					res.json(err);
				}
				else{
					res.json(user);
				}
			})
		},
		//logout user and destroy session data
		logout: function(req, res){
 		 	req.session.destroy();
 		 	res.redirect('/');
 		}
	}
})();
