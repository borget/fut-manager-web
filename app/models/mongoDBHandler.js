var mongoDBHandler = (function () {
  var instance;

  function init() {
    var Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    ReplSetServers = require('mongodb').ReplSetServers,
    Binary = require('mongodb').Binary,
    GridStore = require('mongodb').GridStore,
    Code = require('mongodb').Code,
    BSON = require('mongodb').pure().BSON,
    assert = require('assert');

	var db = new Db('heroku_app26779779', new Server("ds027489.mongolab.com", 27489, {auto_reconnect: true}), 
					{w:0, native_parser: false});
 
    return {
     	getDB: function(){
     		return db;
     	},
     	
     	open: function (){
     		var db = this.getDB();
     		
     		return db.open(function(err, db) {
  						assert.equal(null, err);
					    // Authenticate
					    db.authenticate('fut-manager', 'Fut-m4nag3r', function(err, result) {
					      assert.equal(true, result);
					    });
					});
     	}
    };
 
  };
 
  return {
 
    getInstance: function () {
 
      if ( !instance ) {
        instance = init();
      }
 
      return instance;
    }
 
  };
 
})();

exports.getDB = function() {
	return mongoDBHandler.getInstance().getDB();   
};

exports.open = function() {
	return mongoDBHandler.getInstance().open();   
};