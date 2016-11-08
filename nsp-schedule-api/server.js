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
  res.send('Schedules');
});

// Create a new meeting.
app.post('/meeting', function(req, res) {
  // Validate email
  if (!validator.isEmail(req.body.email)) {
    res.status(400).send("Invalid email");
  }
  // Validate address
  var isValidAddress = validateAddress(req.body.address);
  if (!isValidAddress) {
    res.status(400).send("Invalid address " + inexact);
  }
  if (!req.body.contact) {
    res.status(400).send("Missing contact name");
  }
  if (!req.body.datetime) {
    res.status(400).send("Missing meeting time");
  }

  res.send('New Schedule');
});

// Update an existing meeting.
app.put('/meeting/:id', function(req, res) {
  res.send('Update Schedule');
});


// Delete a meeting.
app.delete('/meeting/:id', function(req, res) {
  res.send('Schedule Deleted');
});

var validateAddress = function(address) {
  addressValidator.validate(address, addressValidator.match.streetAddress, function(err, exact, inexact){
    console.log('input: ', address.toString())
    console.log('match: ', _.map(exact, function(a) {
      return a.toString();
    }));
    console.log('did you mean: ', _.map(inexact, function(a) {
      return a.toString();
    }));
 
    //access some props on the exact match 
    var first = exact[0];
    console.log(first.streetNumber + ' '+ first.street);
  });
};