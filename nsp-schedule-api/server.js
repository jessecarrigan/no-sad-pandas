var express = require('express');
var bodyParser = require('body-parser');
var validator = require('validator');
var addressValidator = require('address-validator');
var Address = addressValidator.Address;
var _ = require('underscore');
var config = require('./config');
var mongodb = require('./mongo');
var app = express();

app.use(bodyParser.json());

// Launch app server
app.listen(3000, function() {
  console.log('listening on 3000');
});

// Get scheduled meetings.
app.get('/meetings', function(req, res) {
  db.collection('meetings').find().toArray(function(err, results) {
    if (err) {
      console.log(err);
      res.status(500).send({error: 'Internal server error'});      
    } else {
      res.status(200).send(results);
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
  mongodb.collection('meetings').save(req.body, function(err, result) {
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
  mongodb.collection('meetings').save(req.body, function(err, result) {
    if (err) {
      console.log(err);
      res.status(500).send({error: 'Internal server error'});
    } else {
      res.status(201).send(result);
    }
  });
});

// Delete a meeting.
app.delete('/meeting/:id', function(req, res) {
  res.send('Schedule Deleted');
});