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

var db = new Db('sixdb', new Server("ds027738.mongolab.com", 27738,
 {auto_reconnect: true}), {w:0, native_parser: false});

// Establish connection to db
db.open(function(err, db) {
  assert.equal(null, err);

    // Authenticate
    db.authenticate('dev', 'Developer12', function(err, result) {
      assert.equal(true, result);
    });

});

exports.findById = function(req, res) {
    var id = parseInt(req.params.id);
    db.collection('employees', function(err, collection) {
        collection.findOne({'id': id}, function(err, item) {
            res.jsonp(item);
        });
    });
};

exports.findByManager = function(req, res) {
    var id = parseInt(req.params.id);
    db.collection('employees', function(err, collection) {
        collection.find({'managerId': id}).toArray(function(err, items) {
            res.jsonp(items);
        });
    });
};

exports.findAll = function(req, res) {
    var name = req.query["name"];
    db.collection('employees', function(err, collection) {
        if (name) {
            collection.find({"fullName": new RegExp(name, "i")}).toArray(function(err, items) {
                res.jsonp(items);
            });
        } else {
            collection.find().toArray(function(err, items) {
                res.jsonp(items);
            });
        }
    });
};
