var mongoDBHelper = (function () {
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

	var db = new Db('fut-manager', new Server("ds049219.mongolab.com", 49219, {auto_reconnect: true}), 
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
					    db.authenticate('admin', 'Adm1nPa$5', function(err, result) {
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
	return mongoDBHelper.getInstance().getDB();   
};

exports.open = function() {
	return mongoDBHelper.getInstance().open();   
};