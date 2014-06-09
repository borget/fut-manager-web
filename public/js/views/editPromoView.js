window.EditPromoView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },

    events: {
        "click .update"   : "updatePromo",
        "click .delete"   : "deletePromo"
    },
    
    updatePromo: function() {
		this.model.set({
			
			promoName: $('#promoName').val(),
			promoHeader: $('#promoHeader').val(),
			promoP1: $('#promoP1').val(),
			promoP2: $('#promoP2').val(),
			promoStatus: $('input[name=promoStatus]:checked', '#editPromoForm').val()
			
		});

		this.model.save(null, {
            success: function (model) {
                //app.navigate('promo/' + model.id, false);
                //utils.showAlert('Success!', 'Promo actualizado correctamente.', 'alert-success');
                alert('El promo ha sido modificado correctamente.');
                window.history.back();
            },
            error: function () {
                utils.showAlert('Error', 'Ha ocurrido un error al intentar actualizar el promo.', 'alert-error');
            }
        });

		return false;
	},
	
	deletePromo: function () {
        this.model.destroy({	
            success: function () {
                alert('El promo ha sido borrado.');
                window.history.back();
            }
        });
        return false;
    },

});
