var config = require('./config');
var MongoClient = require('mongodb').MongoClient;

var mongo;
MongoClient.connect(config.mongoConnection, function(err, database) {
  if (err) {
    return console.log(err);
  }
  mongo = database;
});

module.exports = mongo;