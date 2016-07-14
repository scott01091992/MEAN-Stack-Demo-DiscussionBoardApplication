var CommentSchema = new mongoose.Schema({

	_user: {type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true},
	_answer: {type: mongoose.Schema.Types.ObjectId, ref: 'Answers', required: true},
	comment: {type: String, required: [true, 'Comment field cannot be empty']}

}, {timestamps: true});

mongoose.model('Comments', CommentSchema);

