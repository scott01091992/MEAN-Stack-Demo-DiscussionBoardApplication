
var Answers = mongoose.model('Answers');
var Comments = mongoose.model('Comments');
var Users = mongoose.model('Users');
var Topics = mongoose.model('Topics');

module.exports = (function(){

	return{
		index: function(req, res){
			Answers.find({}).populate('_user')
							.populate('_topic')
							.populate('_comments')
							.exec(function(err, answers){
		        if (err){
		          console.log(err);
		        }else{
		        Comments.populate(answers, {path: '_comments._user', model:'Users'} ,function(err, popAnswers){
			        	if(err){
			        		console.log(err);
			        	}
			        	else{
							res.json(popAnswers);
			        	}
		        	});
		        }
     		})
		}, 
		topics: function(req, res){
			Answers.find({_topic: req.params.id}).populate('_user')
							.populate('_comments')
							.exec(function(err, answers){
		        if (err){
		          console.log(err);
		        }else{
			        	Users.populate(answers, {path: '_comments._user', model: 'Users'}, function(err, popAnswers){
			        		if(err){
			        			console.log(err);
			        		}
			        		else{
			        			console.log(popAnswers);
		        				res.json(popAnswers);
			        		}
			        	});
			        
		        }
     		})
		}, 
		answer_info: function(req, res){
			Answers.findOne({_id: req.params.id}, function(err, answer){
		        if (err){
		          console.log(err);
		        }else{
		          res.json(answer);
		        }
     		})
		},
		create: function(req, res){
			var answer = new Answers(req.body);
			answer.save(function(err){
				if(err){
					console.log(err);
				}
				else{
					//add this answer ID to the user who made it
					Users.findByIdAndUpdate(answer._user, {$push: {_answers: answer._id}}, function(err){
						if(err){
							console.log(err);
						}
						else{
							Topics.findByIdAndUpdate(answer._topic, {$push: {_answers: answer._id}}, function(err){
								if(err){
									console.log(err);
								}
								else{
									res.redirect('/answers/'+req.body._topic);
								}
							})
						}
					});
				}
			});
		}, 
		update: function(req, res){
			Answers.findByIdAndUpdate(req.params.id, {$set: {answer: req.body.answer}}, function(err){
				if(err){
					console.log(err);
				}
				else{
					res.redirect('/answers');
				}
			});
		}, 
		destroy: function(req, res){
			 Answers.findByIdAndRemove(req.params.id, function(err){
		        if (err){
		          console.log(err);
		        }else{
		          res.redirect('/');
		        }
      		});
		}, 
		like: function(req, res){
			Answers.findOne({_id: req.params.id}, function(err, answer){
		        if (err){
		          console.log(err);
		        }else{
		        	likes = answer.likes + 1;
		          	Answers.findByIdAndUpdate(req.params.id, {$set: {likes: likes}}, function(err){
						if(err){
							console.log(err);
						}
						else{
							res.redirect('/answers/'+req.body.tid);
						}
					});
		        }
     		});
		},
		dislike: function(req, res){
			Answers.findOne({_id: req.params.id}, function(err, answer){
		        if (err){
		          console.log(err);
		        }else{
		        	dislikes = answer.dislikes + 1;
		          	Answers.findByIdAndUpdate(req.params.id, {$set: {dislikes: dislikes}}, function(err){
						if(err){
							console.log(err);
						}
						else{
							res.redirect('/answers/'+req.body.tid);
						}
					});
		        }
     		});
		}
	}

})();