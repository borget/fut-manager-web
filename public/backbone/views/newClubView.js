window.NewClubView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        $(this.el).html(this.template());
        return this;
    },
    
    displayClubsGrid: function () {
		$(document).ready(function () {
                	var deleteId;
                    var dataSource = new kendo.data.DataSource({
							  transport: {
							    read: function(options) {
							      $.ajax({
							        url: window.fut7.constants.url+'clubs',
							        dataType: "jsonp",
							        success: function(result) {
							          options.success(result);
							        }
							      });
							    },
							    create: function(options) {
							      $.ajax({
							        url: window.fut7.constants.url+'clubs',
							        type: "POST",
							        dataType: "jsonp", // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
							        // send the created data items as the "models" service parameter encoded in JSON
							        data: {data:kendoDatasourceHelper.getInstance().getNewItems(dataSource)},
							        success: function(result) {
							          // notify the data source that the request succeeded
							          options.success(result);
							           dataSource.read();
							        },
							        error: function(result) {
							          // notify the data source that the request failed
							          options.error(result);
							          dataSource.read();
							        }
							      });
							    }
							  },
                            batch: true,
                            pageSize: 8,
                            schema: {
                                model: {
                                    //id: "_id",
                                    fields: {
                                       clubName: { validation: { required: true } },
                                       jj:{type:"number"},
                                       jg:{type:"number"},
                                       je:{type:"number"},
                                       jp:{type:"number"},
                                       gf:{type:"number"},
                                       gc:{type:"number"},
                                       dif:{type:"number"},
                                       pe:{type:"number"},
                                       pts:{type:"number"},
                                       contactMobile:{type:"string", defaultValue: "(000)-000-0000",
                                       				validation: {
		                                                required: false,
		                                                contactMobileValidation: function (input) {
		                                                    if (input.is("[name='contactMobile']") && input.val() != "") {
		                                                        input.attr("data-contactMobileValidation-msg", "Número no válido.");
		                                                        return window.fut7.constants.telRegex.test(input.val());
		                                                    }
		
		                                                    return true;
		                                                }
		                                            }},
                                       contactEmail:{type:"tring", defaultValue: "ejemplo@mail.com", width:50,
                                       				validation: {
		                                                required: false,
		                                                contactEmailValidation: function (input) {
		                                                    if (input.is("[name='contactEmail']") && input.val() != "") {
		                                                        input.attr("data-contactEmailValidation-msg", "Email no válido.");
		                                                        return window.fut7.constants.emailRegex.test(input.val());
		                                                    }
		
		                                                    return true;
		                                                }
		                                            }
                                       },
                                       clubBadge:{type:"string", defaultValue: window.fut7.constants.clubBadgeDefault},
                                       isActive:{type:"boolean", defaultValue: true}
                                    }
                                }
                            }
                        });

                    $("#kendo-clubs-grid").kendoGrid({
                        dataSource: dataSource,
                        navigatable: true,
                        sortable: {
                        	mode: "single",
                            allowUnsort: true
                        },
                        pageable: true,
                        resizable: true,
                        scrollable: false,
                        toolbar: [
						    //name - name of the available commands, text - text to be set on the button
						    { name: "create", text: "Nuevo" },
						    { name: "save", text: "Guardar" },
						    { name: "cancel", text: "Cancelar" }
						],
	                        columns: [
                        	{ field: "clubName", title: "Club"},
                        	{ field: "jj", title: "JJ"},
                        	{ field: "jg", title: "JG"},
                        	{ field: "je", title: "JE"},
                        	{ field: "jp", title: "JP"},
                        	{ field: "gf", title: "GF"},
                        	{ field: "gc", title: "GC"},
                        	{ field: "dif", title: "DIF"},
                        	{ field: "pe", title: "PE"},
                        	{ field: "pts", title: "PTS"},
                        	{ field: "contactMobile", title: "Tel"},
                        	{ field: "contactEmail", title: "Email"},
                        	{ field: "isActive", title: "Activo?"},
                        	{ command: [
						            { name: "destroy", text: "Borrar"}
						        ],
						        title: "&nbsp;"
						    }
                            ],
                        editable: {
					    	confirmation: function(e) {
					        	return  "En verdad te quieres chutar "+ e.clubName +"?";
					     	}
					   	},
                        remove: function (e){
                        	deleteID = e.model.toJSON()._id; 
                        	$.ajax({
							        url: window.fut7.constants.url+'clubs',
							        type: "DELETE",
							        dataType: "jsonp",
							        data: {id:deleteID},
							        success: function(result) {
							           dataSource.read();
							        },
							        error: function(result) {
							          dataSource.read();
							        }
							});                    	
                        }
                    });
                });
	}
});
