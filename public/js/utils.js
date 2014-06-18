window.utils = {

    // Asynchronously load templates located in separate .html files
    loadTemplate: function(views, callback) {

        var deferreds = [];

        $.each(views, function(index, view) {
            if (window[view]) {
                deferreds.push($.get('templates/' + view + '.html', function(data) {
                window[view].prototype.template = _.template(data);
            }, "text"));
            } else {
                console.log(view + " not found");
            }
        });

        $.when.apply(null, deferreds).done(callback);
    },
	
	toggleSidebar: function (){
		//If window is small enough, enable sidebar push menu
        if ($(window).width() <= 992) {
            $('.row-offcanvas').toggleClass('active');
            $('.left-side').removeClass("collapse-left");
            $(".right-side").removeClass("strech");
            $('.row-offcanvas').toggleClass("relative");
        } else {
            //Else, enable content streching
            $('.left-side').toggleClass("collapse-left");
            $(".right-side").toggleClass("strech");
        }
	}
};
