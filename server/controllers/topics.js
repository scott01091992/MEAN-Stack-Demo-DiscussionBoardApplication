
var Topics = mongoose.model('Topics');
var Users = mongoose.model('Users');

module.exports = (function(){

	return{
		//get all topics and populate objectids
		index: function(req, res){
			Topics.find({}).populate('_user').populate('_answers').exec(function(err, topics){
		        if (err){
		        	res.json(err);
		        }else{
		          res.json(topics);
		        }
     		});
		},
		//get single topic by url param
		topic_info: function(req, res){
			Topics.findOne({_id: req.params.id}).populate('_user').populate('_answers').exec(function(err, topic){
		        if (err){
		          res.json(err);
		        }else{
		          res.json(topic);
		        }
     		});
		},
		//create new topic
		create: function(req, res){
			var topic = new Topics(req.body);
			topic.save(function(err){
				if(err){
					res.json(err);
				}
				else{
					//update the objectid for user who created topic
					Users.findByIdAndUpdate({_id: req.body._user}, {$push: {_topics: topic._id}}, function(err){
						if(err){
							res.json(err);
						}
						else{
							res.redirect('/topics');
						}
					});
				}
			});
		},
		//update topic by url param
		update: function(req, res){
			Topics.findByIdAndUpdate(req.params.id, {$set: {topic: req.body.topic, description: req.body.description, catagory: req.body.catagory}}, function(err){
				if(err){
					res.json(err);
				}
				else{
					res.redirect('/');
				}
			});
		},
		//remove topic by url param from db
		destroy: function(req, res){
			 Topics.findByIdAndRemove(req.params.id, function(err){
		        if (err){
		          res.json(err);
		        }else{
		          res.redirect('/');
		        }
      		})
		}
	}

})();
