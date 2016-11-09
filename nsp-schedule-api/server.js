var express = require('express');
var bodyParser = require('body-parser');
var validator = require('validator');
var config = require('./config');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var app = express();
app.use(bodyParser.json());

// Launch app server
app.listen(3000, function() {
  console.log('listening on 3000');
});

var mongodb;
MongoClient.connect(config.mongoConnection, function(err, database) {
  if (err) {
    return console.log(err);
  }
  mongodb = database;
});

// Get scheduled meetings.
app.get('/meetings', function(req, res) {
  mongodb.collection('meetings').find().toArray(function(err, results) {
    if (err) {
      console.log(err);
      res.status(500).send({error: 'Internal server error'});      
    } else {
      res.status(200).send({meetings: results});
    }
  });
});

// Create a new meeting.
app.post('/meeting', function(req, res) {
  if (!req.body.email || !req.body.address || !req.body.contact || !req.body.datetime) {
    return res.status(400).send({error: 'Missing meeting information'});
  }
  // Validate email
  if (!validator.isEmail(req.body.email)) {
    return res.status(400).send({error: 'Invalid email'});
  }
  // Check valid date
  var datetime = new Date(req.body.datetime);
  if (isNaN(datetime)) {
    return res.status(400).send({error: 'Invalid date'});
  }
  // Parse to get a UTC timezone in hours and store along with the meeting
  meeting = req.body;
  meeting.timezone = datetime.getTimezoneOffset() / 60;
  mongodb.collection('meetings').save(meeting, function(err, result) {
    if (err) {
      console.log(err);
      return res.status(500).send({error: 'Internal server error'});
    } else {
      return res.status(201).send(result);
    }
  });
});

// Update an existing meeting.
app.put('/meeting/:id', function(req, res) {
  
});

// Delete a meeting.
app.delete('/meeting/:id', function(req, res) {
  mongodb.collection('meetings').deleteOne({_id: new ObjectId(req.params.id)}, function(err, result) {
    if (err) {
      console.log(err);
      return res.status(500).send({error: 'Internal server error'});
    } else {
      return res.status(202).send(result);
    }
  });
});