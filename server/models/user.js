var UserSchema = new mongoose.Schema({

	username: {type: String, required: true}, 
	// password: {type: String, required: true}, 
	_topics: [{type: mongoose.Schema.Types.ObjectId, ref:'Topics'}], 
	_answers: [{type: mongoose.Schema.Types.ObjectId, ref: 'Answers'}], 
	_comment: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comments'}]

}, {timestamps: true});

mongoose.model('Users', UserSchema);

