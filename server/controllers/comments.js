
var Comments = mongoose.model('Comments');
var Answers = mongoose.model('Answers');
var Users = mongoose.model('Users');

module.exports = (function(){

	return{
		index: function(req, res){
			Comments.find({}).populate('_user')
							 .populate('_answer')
							 .exec(function(err, comments){
		        if (err){
		          console.log(err);
		        }else{
		          res.json(comments);
		        }
     		})
		},
		comment_info: function(req, res){
			Comments.findOne({_id: req.params.id}, function(err, comment){
		        if (err){
		          console.log(err);
		        }else{
		          res.json(comment);
		        }
     		})
		},
		create: function(req, res){
			var comment = new Comments({_answer: req.body._answer, _user: req.body._user, comment: req.body.comment});
			comment.save(function(err){
				if(err){
					console.log(err);
				}
				else{
					Answers.findByIdAndUpdate({_id: req.body._answer}, {$push: {_comments: comment._id}}, function(err){
						if(err){
							console.log(err);
						}
						else{
							Users.findByIdAndUpdate({_id: req.body._user}, {$push: {_comment: comment._id}}, function(err){
								if(err){
									console.log(err);
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
		update: function(req, res){
			Comments.findByIdAndUpdate(req.params.id, {$set: {comment: req.body.comment}}, function(err){
				if(err){
					console.log(err);
				}
				else{
					res.redirect('/');
				}
			});
		},
		destroy: function(req, res){
			 Comments.findByIdAndRemove(req.params.id, function(err){
		        if (err){
		          console.log(err);
		        }else{
		          res.redirect('/');
		        }
      		});
		}
	}

})();
