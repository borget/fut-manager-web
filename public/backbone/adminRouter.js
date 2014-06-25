var AppRouter = Backbone.Router.extend({

    routes: {
        ""	      : "index",
        "club"	  : "club"
    },

    initialize: function () {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.el);
    },

	index: function(page) {
		var clubsList = new ClubsCollection(); 
        clubsList.fetch({success: function(){
        	var mainContentView = new MainContentView();
            $(".content").html(mainContentView.el);
        	mainContentView.displayTable(clubsList);    
        }});   
   },
   
   club: function (){

        this.newClubView = new NewClubView();
        $('.content').html(this.newClubView.el);
   }
});

utils.loadTemplate(['HeaderView', 'MainContentView', 'NewClubView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});
