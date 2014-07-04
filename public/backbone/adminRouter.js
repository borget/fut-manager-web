var AppRouter = Backbone.Router.extend({

    routes: {
        ""	      : "index",
        "club"	  : "club",
        "players" : "players"
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
        this.newClubView.displayClubsGrid();
   },
   
   players: function () {
   		this.playersView = new PlayersView();
        $('.content').html(this.playersView.el);
        this.playersView.displayClubsList();
   }
});

utils.loadTemplate(['HeaderView', 'MainContentView', 'NewClubView', 'PlayersView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});
