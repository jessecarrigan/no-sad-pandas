const express = require('express');
const bodyParser = require('body-parser');
const validator = require('validator');
const addressValidator = require('address-validator');
const Address = addressValidator.Address;
const _ = require('underscore');
const config = require('./config');
const mongodb = require('./mongo');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

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

// Create a new meeting.
app.post('/meeting', function(req, res) {
  if (!req.body.email || !req.body.address || !req.body.contact || !req.body.datetime) {
      res.status(400).send({error: 'Missing meeting information'});
  }
  // Validate email
  if (!validator.isEmail(req.body.email)) {
    res.status(400).send({error: 'Invalid email'});
  }
  // Validate address
  var address = validateAddress(req.body.address);
  if (!address.exact) {
    res.status(400).send({error: 'Invalid address. Inexact matches: ' + inexact});
  }
  mongodb.collection('meetings').save(req.body, function(err, result) {
    if (err) {
      console.log(err);
      res.status(500).send({error: 'Internal server error'});
    } else {
      res.status(201).send(result);
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

var validateAddress = function(address) {
  addressValidator.validate(address, addressValidator.match.streetAddress, function(err, exact, inexact){
    result = {};
    result.input = address.toString();
    result.exact = _.map(exact, function(a) {
      return a.toString();
    });
    result.inexact = _.map(inexact, function(a) {
      return a.toString();
    });
    return result;
  });
};