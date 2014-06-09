window.PromoView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },

    events: {
        "click .save"   : "savePromo"
    },
    
    savePromo: function() {
		this.model.set({
			promoName: $('#promoName').val(),
			promoHeader: $('#promoHeader').val(),
			promoP1: $('#promoP1').val(),
			promoP2: $('#promoP2').val(),
			promoStatus: $('input[name=promoStatus]:checked', '#promoForm').val(),
			promoImg: $('#promoImg').val()
		});
			
			
		this.model.save(null, {
            success: function (model) {
                //app.navigate('promo/' + model.id, false);
                //utils.showAlert('Listo!', ' El promo ha sido publicado correctamente.', 'alert-success');
                alert('El promo ha sido publicado exitosamente.');
                window.history.back();
            },
            error: function () {
                utils.showAlert('Error:', 'Ha ocurrido un error al publicar el promo, intenta nuevamente.', 'alert-error');
            }
        });

		return false;
	}

});
