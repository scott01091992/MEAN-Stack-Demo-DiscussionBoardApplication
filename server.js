//modules
var express = require('express');
mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

app.use(express.static(path.join(__dirname,'./client')));

app.use(bodyParser.json());

require('./server/config/mongoose.js');

require('./server/config/routes.js')(app);

var port = process.env.PORT || 5000;

app.get('/', function(request, response){
 response.render('index.html');
});

app.listen(port, function(){
 console.log("listening on port "+ port);
});