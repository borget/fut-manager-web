window.Clubs = Backbone.Model.extend({

    urlRoot:"http://localhost:5000/clubs",
	defaults: {
        //promoName: "",
	//promoStatus: "0",
    //    promoImg: null
    },
    
    initialize: function () {
		this.reports = new window.ClubsCollection();
		
        this.validators = {};
    }

});

window.ClubsCollection = Backbone.Collection.extend({

    model: Clubs,

    url:"http://localhost:5000/clubs"

});

var originalSync = Backbone.sync;
Backbone.sync = function (method, model, options) {
    if (method === "read") {
        options.dataType = "jsonp";
        return originalSync.apply(Backbone, arguments);
    } else if (method === 'create' || method === 'delete' || method === 'update') {
		options.dataType = "json";
        return originalSync.apply(Backbone, arguments);
	}	
};