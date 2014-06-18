var AppRouter = Backbone.Router.extend({

    routes: {
        ""	      : "index"
    },

    initialize: function () {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.el);
    },

	index: function(page) {
        this.mainContentView = new MainContentView();
        $('.content').html(this.mainContentView.el);
        this.mainContentView.displayTable();
    }
});

utils.loadTemplate(['HeaderView', 'MainContentView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});
