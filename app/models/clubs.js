var Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    ReplSetServers = require('mongodb').ReplSetServers,
    ObjectID = require('mongodb').ObjectID,
    Binary = require('mongodb').Binary,
    GridStore = require('mongodb').GridStore,
    Code = require('mongodb').Code,
    BSON = require('mongodb').pure().BSON,
    assert = require('assert');

var db = new Db('fut-manager', new Server("ds049219.mongolab.com", 49219,
 {auto_reconnect: true}), {w:0, native_parser: false});

// Establish connection to db
db.open(function(err, db) {
  assert.equal(null, err);

    // Authenticate
    db.authenticate('admin', 'M0ng0labpa$5', function(err, result) {
      assert.equal(true, result);
    });

});

exports.findAllClubs = function(req, res) {
    db.collection('clubs', function(err, collection) {
        collection.find({}).toArray(function(err, items) {
            res.jsonp(items);
        });
    });
};