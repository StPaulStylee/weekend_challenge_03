var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

//Routers
var solutionRouter = require('./routes/solution');

//middleware for parsing the body and turning into an object
app.use(bodyParser.urlencoded({extended: true}));

//middleware for serving static files -- makes everything in the public folder accessible
app.use(express.static('public'));

//send requests that start with /solution to the solutionRouter
app.use('/solution', solutionRouter);

// connecting to the index.html
app.get('/', function (req, res){
  console.log('Received a request at', new Date());
  var filename = path.join(__dirname, 'public/views/index.html');
  console.log ('filename:', filename);
  res.sendFile(filename);
});

app.listen(5000);
