var TopicSchema = new mongoose.Schema({

	topic: {type: String, required: [true, 'Topic field cannot be blank']},
	description: {type: String, required: [true, 'Description field cannot be blank']}, 
	catagory: {type: String, required: [true, 'Must select a catagory']}, 
	_answers: [{type: mongoose.Schema.Types.ObjectId, ref: 'Answers'}],
	_user: {type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true}
	
}, {timestamps: true});

mongoose.model('Topics', TopicSchema);

