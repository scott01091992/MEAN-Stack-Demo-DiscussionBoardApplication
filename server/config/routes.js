var users = require('./../controllers/users.js');

var topics = require('./../controllers/topics.js');

var answers = require('./../controllers/answers.js');

var comments = require('./../controllers/comments.js');

module.exports = function(app){
	//logout
	app.get('/logout', users.logout);

	//users requests
	//get all users
	app.get('/users', users.index);
	//get current user
	app.get('/user/current', users.current_user);
	//get user by id
	app.get('/user/:id', users.user_info);
	//create new user
	app.post('/user', users.create);
	//validate user login
	app.post('/user/login', users.login);

	//topics requests
	//get all topics
	app.get('/topics', topics.index);
	//get topic by id
	app.get('/topic/:id', topics.topic_info);
	//create new topic
	app.post('/topic', topics.create);
	//update topic by id
	app.post('/topic/edit/:id', topics.update);
	//destroy topic by id
	app.post('/topic/:id', topics.destroy);

	//answers requests
	app.get('/answers', answers.index);
	//get topic answer answers
	app.get('/answers/:id', answers.topics);
	//get answer by id
	app.get('/answer/:id', answers.answer_info);
	//create new answer
	app.post('/answer', answers.create);
	//update answer by id
	app.post('/answer/edit/:id', answers.update);
	//like by id
	app.post('/answer/like/:id', answers.like);
	//dislike by id
	app.post('/answer/dislike/:id', answers.dislike);
	//destroy answer by id
	app.post('/answer/:id', answers.destroy);
	

	//comments requests
	//get all comments
	app.get('/comments', comments.index);
	//get comment by id
	app.get('/comment/:id', comments.comment_info);
	//create new comment
	app.post('/comment', comments.create);
	//update comment by id
	app.post('/comment/edit/:id', comments.update);
	//destroy comment by id
	app.post('/comment/:id', comments.destroy);

}