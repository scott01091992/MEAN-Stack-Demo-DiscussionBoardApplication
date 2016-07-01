var AnswerSchema = new mongoose.Schema({

	answer: {type: String, required: true},
	_user: {type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true}, 
	_topic: {type: mongoose.Schema.Types.ObjectId, ref: 'Topics', required: true},
	_comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comments'}],
	likes: {type: Number, required: true},
	dislikes: {type: Number, required: true}

}, {timestamps: true});

mongoose.model('Answers', AnswerSchema);

