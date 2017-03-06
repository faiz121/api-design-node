 // TODO: create a basic server with express
// that will send back the index.html file on a GET request to '/'
// it should then send back jsonData on a GET to /data
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var _ = require('lodash');
var morgan = require('morgan');

var jsonData = {count: 12, message: 'hey'};


/*  1st Example to just return back index.html on root and jsonData on /data
app.get('/', function(req, res) {

  // does fs.readFile under the hood and we have to set Headers and send file.
  res.sendFile(__dirname + '/client/index.html', function(err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.get('/data', function (req, res) {
  res.json(jsonData);
});
*/

// Example 2
 var lions = [
     { id: 1, age : 3, name: 'lion1', gender : 'male' },
     { id: 2, age : 6, name: 'lion2', gender : 'female' }
     ];

 app.use(morgan('dev'));
 app.use(express.static('client'));  // to load up index.html from client
 // when root directory is hit

 app.use(bodyParser.urlencoded({extended: true}));
 app.use(bodyParser.json());

app.param('id', function(req, res, next, id) {
  var lion = _.find(lions, {id: parseInt(id)});
  req.lion = lion;
  next();
});
app.get('/lions', function(req, res) {
  res.json(lions);
});

app.get('/lions/:id', (req, res) => {
  // let lion = _.find(lions, {id: parseInt(req.params.id)});
  // res.json()
  var lion = req.lion;
  res.json(lion);
  console.dir(lion);
});

app.post('/lions', function(req, res) {
  let newLion = req.body;
  lions.push(newLion);
  res.json(newLion);
});

app.put('/lions/:id', (req, res) => {
  var index = _.findIndex(lions, {id: parseInt(req.params.id)});
  var updatedLion = _.assign(lions[index], req.body); // Take a modified object and updates it
  // in lions array with the modified one. req.body is going to replace lion[index]
  // and returns the modified object.
 res.json(updatedLion);
});

var port = 3000;
// app.listen(port);
console.log('listening on port' +port);

module.exports = app;