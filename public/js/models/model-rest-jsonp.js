window.Promo = Backbone.Model.extend({

    urlRoot:"http://six-mobile-app.herokuapp.com/promos",
	defaults: {
        promoName: "",
		promoStatus: "0",
        promoImg: null
    },
    
    initialize: function () {
		this.reports = new window.PromoCollection();
		
        this.validators = {};

        this.validators.promoName = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "Ingresa un nombre a tu promo."};
        };
    },

    validateItem: function (key) {
        return (this.validators[key]) ? this.validators[key](this.get(key)) : {isValid: true};
    },

    // TODO: Implement Backbone's standard validate() method instead.
    validateAll: function () {

        var messages = {};

        for (var key in this.validators) {
            if(this.validators.hasOwnProperty(key)) {
                var check = this.validators[key](this.get(key));
                if (check.isValid === false) {
                    messages[key] = check.message;
                }
            }
        }

        return _.size(messages) > 0 ? {isValid: false, messages: messages} : {isValid: true};
    }

});

window.PromoCollection = Backbone.Collection.extend({

    model: Promo,

    url:"http://six-mobile-app.herokuapp.com/promos"

});

var originalSync = Backbone.sync;
Backbone.sync = function (method, model, options) {
    if (method === "read") {
		//console.log("Backbone.sync:"+method);
        options.dataType = "jsonp";
        return originalSync.apply(Backbone, arguments);
    } else if (method === 'create' || method === 'delete' || method === 'update') {
		//console.log("Backbone.sync:"+method);
		options.dataType = "json";
        return originalSync.apply(Backbone, arguments);
	}	
};
