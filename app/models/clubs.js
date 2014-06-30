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
    var newClubs = req.body.data;
    if (newClubs !== undefined && newClubs.length > 0){
    	for(var i=0,j=newClubs.length; i<j; i++){
		  	db.collection('clubs', function(err, collection) {
          		collection.save(newClubs[i], function(err, result) {
            		if (err) {
                		res.send({'error':'An error has occurred- ' + err});
            		} else {
                		res.send(JSON.stringify(result[0]));
            		}
        		});
    		});	
		};
    }
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