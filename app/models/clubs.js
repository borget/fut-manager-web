var mongoDBHelper = require('./mongoDBHandler'),
               db = mongoDBHelper.getDB(),
         ObjectID = require('mongodb').ObjectID;

exports.findAllClubs = function(req, res) {
    db.collection('clubs', function(err, collection) {
        collection.find({}).toArray(function(err, items) {
            res.jsonp(items);
        });
    });
};

exports.insertClub = function(req, res) {
    var club = req.body;
    db.collection('clubs', function(err, collection) {
        collection.save(club, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred- ' + err});
            } else {
                res.send(JSON.stringify(result[0]));
            }
        });
    });
};

exports.deleteClub = function(req, res) {
    var objectId = new ObjectID.createFromHexString(req.body.id);
    db.collection('clubs', function(err, collection) {
        collection.remove({'_id': objectId}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                res.jsonp(req.body);
            }
        });
    });
};