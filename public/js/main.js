var AppRouter = Backbone.Router.extend({

    routes: {
        ""                  : "list",
        "promo/page/:page"	: "list",
        "promo/add"         : "addPromo",
        "promo/ntfs"        : "notifications",
        "promo/:id"         : "editPromo",
        "about"             : "about"
    },

    initialize: function () {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.el);
    },

	list: function(page) {
        var p = page ? parseInt(page, 10) : 1;
        var promoList = new PromoCollection();
        promoList.fetch({success: function(){
            $("#content").html(new PromoListView({model: promoList, page: p}).el);
        }});
        this.headerView.selectMenuItem('home-menu');
    },

    editPromo: function (id) {
        var promo = new Promo({id: id});
        promo.fetch({success: function(){
            $("#content").html(new EditPromoView({model: promo}).el);
        }});
        this.headerView.selectMenuItem();
    },
	
	addPromo: function() {
		
        var promo = new Promo();
        $('#content').html(new PromoView({model: promo}).el);
        this.headerView.selectMenuItem('add-menu');
        
        $('#legend2').hide();
		$('#step2').hide();
		$('#step2-1').hide();
		$('#step2-2').hide();
		$('#step2-3').hide();
		$('#step3').hide();
		$('#finalstep').hide();
        
        $.getScript('lib/extjs/file-upload.js', function() {
			//loading ext-js script that uploads imgs.
		});
	},
	
	notifications: function() {
		
        $('#content').html(new NotificationsView().el);
        this.headerView.selectMenuItem('ntfs-menu');
	},

    about: function () {
        if (!this.aboutView) {
            this.aboutView = new AboutView();
        }
        $('#content').html(this.aboutView.el);
        this.headerView.selectMenuItem('about-menu');
    }

});

utils.loadTemplate(['HeaderView','PromoView', 'NotificationsView', 'EditPromoView', 'PromoListItemView', 'AboutView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});
