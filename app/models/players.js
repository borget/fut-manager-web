var ObjectID = require('mongodb').ObjectID,
    mongoDBHelper = require('./mongoDBHandler'),
    db = mongoDBHelper.getDB();

exports.findPlayers = function(req, res) {
    var objectId = new ObjectID.createFromHexString(req.params.id);
    
    db.collection('player', function(err, collection) {
        collection.find({'club': objectId}).toArray(function(err, items) {
            res.jsonp(items);
        });
    });
};