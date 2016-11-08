const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

/**
 * Launch the app server.
 */
app.listen(3000, function() {
  console.log('listening on 3000');
});

/**
 * Get the currently scheduled meetings.
 */
app.get('/meetings', function(req, res) {
  res.send('Schedules');
});

/**
 * Create a new meeting.
 */
app.post('/meeting', function(req, res) {
  res.send('New Schedule');
});

/**
 * Update an existing meeting.
 */
app.put('/meeting/{id}', function(req, res) {
  res.send('Update Schedule');
});

/**
 * Delete a meeting.
 */
app.delete('/meeting/{id}', function(req, res) {
  res.send('Schedule Deleted');
});