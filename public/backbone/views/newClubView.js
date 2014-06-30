window.NewClubView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        $(this.el).html(this.template());
        return this;
    },
    
    displayTable: function () {
		 function getNew(dataSource){
            	var model = {};
            	$.each( dataSource.data(), function( i, dataItem ) {
            		if (dataItem.dirty){
            			model = dataItem.toJSON();
            			return false;	
            		}
				}); 
				if ($.isEmptyObject(model)){
					alert("No se registran cambios");
					throw new Error("Cannot save empty model");
				}
				
            	return model;
            }
                $(document).ready(function () {
                	var deleteId;
                    var dataSource = new kendo.data.DataSource({
							  transport: {
							    read: function(options) {
							      $.ajax({
							        url: "http://fut-manager.herokuapp.com/clubs",
							        dataType: "jsonp",
							        success: function(result) {
							          options.success(result);
							        }
							      });
							    },
							    create: function(options) {
							      $.ajax({
							        url: "http://fut-manager.herokuapp.com/clubs",
							        type: "POST",
							        dataType: "jsonp", // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
							        // send the created data items as the "models" service parameter encoded in JSON
							        data: getNew(dataSource),
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
							    },
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
                                       contactMobile:{type:"string", defaultValue: "(442)"},
                                       contactEmail:{type:"tring", defaultValue: "@.com"},
                                       isActive:{type:"boolean", defaultValue: true}
                                    }
                                }
                            }
                        });

                    $("#kendo-clubs-grid").kendoGrid({
                        dataSource: dataSource,
                        navigatable: true,
                        pageable: true,
                        height: 400,
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
                        	{ field: "contactMobile", title: "Cel"},
                        	{ field: "contactEmail", title: "Email"},
                        	{ field: "isActive", title: "Activo?"},
                        	{ command: [
						            { name: "destroy", text: "Borrar"}
						        ],
						        title: "&nbsp;"
						    }
                            ],
                        editable: {
					    	confirmation: "Deseas chutarte esto?"
                        },
                        remove: function (e){
                        	deleteID = e.model.toJSON()._id; 
                        	$.ajax({
							        url: "http://fut-manager.herokuapp.com/clubs",
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
