var UserSchema = new mongoose.Schema({

	username: {type: String, required: [true, 'Username field cannot be empty'], minlength: [5, 'Username must be at least 5 characters long']}, 
	password: {type: String, required: [true, 'Password field cannot be empty'], minlength: [8, 'Password must be at least 8 characters long']}, 
	_topics: [{type: mongoose.Schema.Types.ObjectId, ref:'Topics'}], 
	_answers: [{type: mongoose.Schema.Types.ObjectId, ref: 'Answers'}], 
	_comment: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comments'}]

}, {timestamps: true});

mongoose.model('Users', UserSchema);

