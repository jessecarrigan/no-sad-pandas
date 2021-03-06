var express = require('express');
var bodyParser = require('body-parser');
var validator = require('validator');
var moment = require('moment');
var config = require('./config');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var app = express();
app.use(bodyParser.json());

// Launch app server.
app.listen(config.port, function() {
  console.log('listening on ' + config.port);
});

// Set up a mongo client.
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
      res.status(500).send({error: err});      
    } else {
      res.status(200).send({meetings: results});
    }
  });
});

// Create a new meeting.
app.post('/meeting', function(req, res) {
  validate(req, res);
  // Parse to get a UTC timezone in minutes and store along with the meeting
  meeting = req.body;
  meeting.timezone = moment.parseZone(req.body.datetime).utcOffset();
  mongodb.collection('meetings').insertOne(meeting, function(err, result) {
    if (err) {
      console.log(err);
      return res.status(500).send({error: err});
    } else {
      return res.status(201).send({_id: result.ops[0]._id});
    }
  });
});

// Update an existing meeting.
app.put('/meeting/:id', function(req, res) {
  validate(req, res);
  // Parse to get a UTC timezone in minutes and store along with the meeting
  meeting = req.body;
  meeting.timezone = moment.parseZone(req.body.datetime).utcOffset();
  mongodb.collection('meetings').updateOne({_id: new ObjectId(req.params.id)}, {$set: meeting}, function(err, result) {
    if (err) {
      console.log(err);
      return res.status(500).send({error: err});
    } else {
      return res.status(200).send({updated: result.result.n});
    }
  });
});

// Delete a meeting.
app.delete('/meeting/:id', function(req, res) {
  mongodb.collection('meetings').deleteOne({_id: new ObjectId(req.params.id)}, function(err, result) {
    if (err) {
      console.log(err);
      return res.status(500).send({error: err});
    } else {
      return res.status(202).send({deleted: result.result.n});
    }
  });
});

// Basic validation for input.
var validate = function(req, res) {
  if (!req.body.email || !req.body.address || !req.body.contact || !req.body.datetime) {
    return res.status(400).send({error: 'Missing meeting information'});
  }
  // Validate email
  if (!validator.isEmail(req.body.email)) {
    return res.status(400).send({error: 'Invalid email'});
  }
  // Check valid date
  if (!moment().isValid(req.body.datetime)) {
    return res.status(400).send({error: 'Invalid date'});
  }
};