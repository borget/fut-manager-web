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

exports.findAll = function(req, res) {
    db.collection('wines', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.jsonp(items);
        });
    });
};

exports.findById = function(req, res) {
    var objectId = new ObjectID.createFromHexString(req.params.id);
    
    db.collection('wines', function(err, collection) {
        collection.findOne({'_id': objectId}, function(err, item) {
            res.jsonp(item);
        });
    });
};

exports.addWine = function(req, res) {
    var wine = req.body;
    db.collection('wines', function(err, collection) {
        collection.insert(wine, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
				//res.type('application/json');
                res.send(JSON.stringify(result[0]));
            }
        });
    });
}

exports.updateWine = function(req, res) {
    var objectId = new ObjectID.createFromHexString(req.params.id);
    var wine = req.body;
    db.collection('wines', function(err, collection) {
        collection.update({'_id': objectId}, wine, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.jsonp(wine);
            }
        });
    });
}

exports.deleteWine = function(req, res) {
    var objectId = new ObjectID.createFromHexString(req.params.id);
    db.collection('wines', function(err, collection) {
        collection.remove({'_id': objectId}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                res.jsonp(req.body);
            }
        });
    });
}
