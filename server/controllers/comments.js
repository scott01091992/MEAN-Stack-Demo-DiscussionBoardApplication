
var Comments = mongoose.model('Comments');
var Answers = mongoose.model('Answers');
var Users = mongoose.model('Users');

module.exports = (function(){

	return{
		//get all comments and populate objectids
		index: function(req, res){
			Comments.find({}).populate('_user')
							 .populate('_answer')
							 .exec(function(err, comments){
		        if (err){
		          res.json(err);
		        }else{
		          res.json(comments);
		        }
     		})
		},
		//get a topic by url param
		comment_info: function(req, res){
			Comments.findOne({_id: req.params.id}, function(err, comment){
		        if (err){
		          res.json(err);
		        }else{
		          res.json(comment);
		        }
     		})
		},
		//create a new topic
		create: function(req, res){
			var comment = new Comments({_answer: req.body._answer, _user: req.body._user, comment: req.body.comment});
			comment.save(function(err){
				if(err){
					res.json(err);
				}
				else{
					//update the answer objectid array
					Answers.findByIdAndUpdate({_id: req.body._answer}, {$push: {_comments: comment._id}}, function(err){
						if(err){
							res.json(err);
						}
						else{
							//update the user objectid array
							Users.findByIdAndUpdate({_id: req.body._user}, {$push: {_comment: comment._id}}, function(err){
								if(err){
									res.json(err);
								}
								else{
									res.redirect('/answers/'+req.body.tid._id);
								}
							});
						}
					});
				}
			});
		},
		//update a comment by url param
		update: function(req, res){
			Comments.findByIdAndUpdate(req.params.id, {$set: {comment: req.body.comment}}, function(err){
				if(err){
					res.json(err);
				}
				else{
					res.redirect('/');
				}
			});
		},
		//remove a comment from db by url param
		destroy: function(req, res){
			 Comments.findByIdAndRemove(req.params.id, function(err){
		        if (err){
		          res.json(err);
		        }else{
		          res.redirect('/');
		        }
      		});
		}
	}
})();
