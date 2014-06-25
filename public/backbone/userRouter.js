var AppRouter = Backbone.Router.extend({

    routes: {
        ""	      : "index"
    },

    initialize: function () {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.el);
    },

	index: function(page) {
		var clubsList = new ClubsCollection(); 
        clubsList.fetch({success: function(){
        	var mainContentView = new MainContentView({model: clubsList});
            $(".content").html(mainContentView.el);
        	mainContentView.displayTable(clubsList);    
        }});   	
   }
});

utils.loadTemplate(['HeaderView', 'MainContentView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});
