var TopicSchema = new mongoose.Schema({

	topic: {type: String, required: true},
	description: {type: String, required: true}, 
	catagory: {type: String, required: true}, 
	_answers: [{type: mongoose.Schema.Types.ObjectId, ref: 'Answers'}],
	_user: {type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true}
	
}, {timestamps: true});

mongoose.model('Topics', TopicSchema);

