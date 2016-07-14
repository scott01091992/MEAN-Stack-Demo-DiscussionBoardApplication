//modules
var express = require('express');
mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var session = require('express-session');
bcrypt = require('bcryptjs');

var app = express();

app.use(express.static(path.join(__dirname,'./client')));

app.use(bodyParser.json());

app.use(session({
	secret: 'brandonisthebest',
	resave: false,
	saveUninitialized: true
}));

require('./server/config/mongoose.js');

require('./server/config/routes.js')(app);

app.listen(6789, function(){
 console.log("listening on port 6789");
});