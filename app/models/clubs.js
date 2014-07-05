var mongoDBHandler = require('./mongoDBHandler'),
               db = mongoDBHandler.getDB(),
         ObjectID = require('mongodb').ObjectID;

exports.findAllClubs = function(req, res) {
    db.collection('clubs', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.jsonp(items);
        });
    });
};

exports.saveOrUpdateClub = function(req, res) {
    var newClubs = req.body.data;
    if (newClubs !== undefined && newClubs.length > 0){
    	db.collection('clubs', function(err, collection) {
	    	for(var i=0,j=newClubs.length; i<j; i++){
	    		if(newClubs[i]._id != undefined){
	    			newClubs[i]._id = new ObjectID.createFromHexString(newClubs[i]._id);
	    		}
			  	collection.save(newClubs[i], function(err, result) {
	            	if (err) {
	              		res.send({'error':'An error has occurred- saving club' + err});
	           		} else {
	           			if(result!=undefined){
	               			res.send(JSON.stringify(result));
	               		} else {
	               			res.send(JSON.stringify(newClubs));
	               		}
	               			
	           		}
	        	});
			};
		});
    }
};

exports.deleteClub = function(req, res) {
    var objectId = new ObjectID.createFromHexString(req.body.id);
    db.collection('clubs', function(err, collection) {
        collection.remove({'_id': objectId}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred deleting club- ' + err});
            } else {
                res.jsonp(req.body);
            }
        });
    });
};