var ObjectID = require('mongodb').ObjectID,
    mongoDBHelper = require('./mongoDBHandler'),
    db = mongoDBHelper.getDB();

exports.findPlayers = function(req, res) {
    var objectId = new ObjectID.createFromHexString(req.params.id);
    
    db.collection('players', function(err, collection) {
        collection.find({'club': objectId}).toArray(function(err, items) {
            res.jsonp(items);
        });
    });
};

exports.saveOrUpdatePlayer = function(req, res) {
    var newPlayers = req.body.data;
    var clubId = req.body.clubId;
    
    if (newPlayers !== undefined && newPlayers.length > 0){
    	db.collection('players', function(err, collection) {
	    	for(var i=0,j=newPlayers.length; i<j; i++){
	    		if(newPlayers[i]._id != undefined){
	    			newPlayers[i]._id = new ObjectID.createFromHexString(newPlayers[i]._id);
	    		}
	    		if (newPlayers[i].club != undefined){
	    			newPlayers[i].club = new ObjectID.createFromHexString(clubId);
	    		}
			  	collection.save(newPlayers[i], function(err, result) {
	            	if (err) {
	              		res.send({'error':'An error has occurred- saving club' + err});
	           		} else {
	           			if(result!=undefined){
	               			res.send(JSON.stringify(result));
	               		} else {
	               			res.send(JSON.stringify(newPlayers));
	               		}
	               			
	           		}
	        	});
			};
		});
    }
};

exports.deletePlayer = function(req, res) {
    var objectId = new ObjectID.createFromHexString(req.body.id);
    db.collection('players', function(err, collection) {
        collection.remove({'_id': objectId}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred deleting player- ' + err});
            } else {
                res.jsonp(req.body);
            }
        });
    });
};