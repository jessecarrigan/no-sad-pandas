const config = require('./config');
const MongoClient = require('mongodb').MongoClient;

var mongo = MongoClient.connect(config.mongoConnection, function(err, database) {
  if (err) {
    return console.log(err);
  }
  return database;
});

module.exports = mongo;