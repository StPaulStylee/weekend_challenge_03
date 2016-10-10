var express = require('express');
var router = express.Router();
// Do i need a global or local object variable because of the 4 different possibilities
// ... how do I ensure I am only sending the current calculation by itself and not
// with previous calculations?
var previousSolutions = [];
var solution = [];

// Sends the solution to client
router.get('/', function (req, res){
  console.log('Got a request for: ', solution);
  res.send(solution);
});
// For arithmetic, try using parseFloat or Number instead of parseInt.
// Addition calulation and send solution
router.post('/add', function(req, res){
console.log('Received a request: ', req.body);
solution.pop();
solution.push(parseInt(req.body.valueA) + parseInt(req.body.valueB));
console.log('Solution array: ', solution);
res.sendStatus(200);
});

// Subtraction calculation and send solution
router.post('/subtract', function(req, res){
  console.log('Received a request: ', req.body);
  solution.pop();
  solution.push(parseInt(req.body.valueA) - parseInt(req.body.valueB));
  console.log('Solution array: ', solution);
  res.sendStatus(200);
});

// Multiplication calculation and send solution
router.post('/multiply', function(req, res){
  console.log('Received a request: ', req.body);
  solution.pop();
  solution.push(parseInt(req.body.valueA) * parseInt(req.body.valueB));
  console.log('Solution array: ', solution);
  res.sendStatus(200);
});

// Division calucation and send solution
router.post('/divide', function(req, res){
  console.log('Received a request: ', req.body);
  solution.pop();
  if (req.body.valueB == 0) {
    res.sendStatus(422);
  } else {
  solution.push(parseInt(req.body.valueA) / parseInt(req.body.valueB));
  console.log('Solution array: ', solution);
  res.sendStatus(200);
  }
});

//Export the router to server
module.exports = router;
