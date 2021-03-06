var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

//Routers
var solutionRouter = require('./routes/solution');

//middleware for parsing the body and turning into an object
app.use(bodyParser.urlencoded({extended: true}));

//middleware for serving static files
app.use(express.static('public'));

//send requests that start with /solution to the solutionRouter
app.use('/solution', solutionRouter);

// connecting to the index.html
app.get('/', function (req, res){
  var filename = path.join(__dirname, 'public/views/index.html');
  res.sendFile(filename);
});

app.listen(5000);
