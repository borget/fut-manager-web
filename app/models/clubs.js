var mongoDBHelper = require('./mongoDBHandler');
var db = mongoDBHelper.getDB();

exports.findAllClubs = function(req, res) {
    db.collection('clubs', function(err, collection) {
        collection.find({}).toArray(function(err, items) {
            res.jsonp(items);
        });
    });
};