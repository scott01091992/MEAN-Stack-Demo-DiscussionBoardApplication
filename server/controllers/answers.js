
var Answers = mongoose.model('Answers');
var Comments = mongoose.model('Comments');
var Users = mongoose.model('Users');
var Topics = mongoose.model('Topics');

module.exports = (function(){

	return{
		//get all answers and populate objectids
		index: function(req, res){
			Answers.find({}).populate('_user')
							.populate('_topic')
							.populate('_comments')
							.exec(function(err, answers){
		        if(err){
		          res.json(err);
		        }else{
						//deep populate users for the populated comments
		        Comments.populate(answers, {path: '_comments._user', model:'Users'} ,function(err, popAnswers){
			        	if(err){
			        		res.json(err);
			        	}
			        	else{
									res.json(popAnswers);
			        	}
		        	});
		        }
     		})
		},
		//get answers for a topic by url param, then populate
		topics: function(req, res){
			Answers.find({_topic: req.params.id}).populate('_user')
							.populate('_comments')
							.exec(function(err, answers){
		        if (err){
		          res.json(err);
		        }else{
							//deep populate users for the populated comments
			        	Users.populate(answers, {path: '_comments._user', model: 'Users'}, function(err, popAnswers){
			        		if(err){
			        			res.json(err);
			        		}
			        		else{
		        				res.json(popAnswers);
			        		}
			        	});

		        }
     		})
		},
		//get answer based on url param
		answer_info: function(req, res){
			Answers.findOne({_id: req.params.id}, function(err, answer){
		        if (err){
		          res.json(err);
		        }else{
		          res.json(answer);
		        }
     		})
		},
		//create new answer
		create: function(req, res){
			var answer = new Answers(req.body);
			answer.save(function(err){
				if(err){
					res.json(err);
				}
				else{
					//update objectid array for User who created answer
					Users.findByIdAndUpdate(answer._user, {$push: {_answers: answer._id}}, function(err){
						if(err){
							res.json(err);
						}
						else{
							//update objectid array for Topic that the answer is attached to
							Topics.findByIdAndUpdate(answer._topic, {$push: {_answers: answer._id}}, function(err){
								if(err){
									res.json(err);
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
		//update answer by url param
		update: function(req, res){
			Answers.findByIdAndUpdate(req.params.id, {$set: {answer: req.body.answer}}, function(err){
				if(err){
					res.json(err);
				}
				else{
					res.redirect('/answers');
				}
			});
		},
		//remove answer from db by url param
		destroy: function(req, res){
			 Answers.findByIdAndRemove(req.params.id, function(err){
		        if (err){
		          res.json(err);
		        }else{
		          res.redirect('/');
		        }
      		});
		},
		//increase like counter by 1 by url param
		like: function(req, res){
			Answers.findOne({_id: req.params.id}, function(err, answer){
		        if (err){
		        	res.json(err);
		        }else{
							//set likes equal to current like int in db++
		        	likes = answer.likes + 1;
		          Answers.findByIdAndUpdate(req.params.id, {$set: {likes: likes}}, function(err){
						if(err){
							res.json(err);
						}else{
							res.redirect('/answers/'+req.body.tid);
						}
					});
		        }
     		});
		},
		//increase dislike counter by 1 by url param
		dislike: function(req, res){
			Answers.findOne({_id: req.params.id}, function(err, answer){
		        if (err){
		          res.json(err);
		        }else{
							//set dislikes equal to current dislike int in db++
		        	dislikes = answer.dislikes + 1;
		          Answers.findByIdAndUpdate(req.params.id, {$set: {dislikes: dislikes}}, function(err){
						if(err){
							res.json(err);
						}else{
							res.redirect('/answers/'+req.body.tid);
						}
					});
		        }
     		});
		}
	}

})();
