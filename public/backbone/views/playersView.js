window.PlayersView = Backbone.View.extend({
//TODO 1.sort data by clubName
	
    initialize: function () {
        this.render();
        this.selectedClub = undefined;
    },

    render: function () {
        $(this.el).html(this.template());
        return this;
    },
    
    displayClubsList: function () {
    	function displayPlayersGrid() {
    		$(document).ready(function() {
                	var deleteId;
                    var dataSource = new kendo.data.DataSource({
							  transport: {
							    read: function(options) {
							      $.ajax({
							        url: window.fut7.constants.url+'players/'+window.PlayersView.selectedClub.clubId,
							        dataType: "jsonp",
							        success: function(result) {
							          options.success(result);
							        }
							      });
							    },
							    create: function(options) {
							      $.ajax({
							        url: window.fut7.constants.url+'players',
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
                                       playerName: {type:"string", validation: { required: true } },
                                       playerNumber:{type:"number"},
                                       goalsCount:{type:"number"},
                                       yellowCard:{type:"number"},
                                       redCard:{type:"number"},
                                       email:{type:"tring", defaultValue: "ejemplo@mail.com", width:50,
                                       				validation: {
		                                                required: false,
		                                                contactEmailValidation: function (input) {
		                                                    if (input.is("[name='email']") && input.val() != "") {
		                                                        input.attr("data-emailValidation-msg", "Email no válido.");
		                                                        return window.fut7.constants.emailRegex.test(input.val());
		                                                    }
		
		                                                    return true;
		                                                }
		                                            }
                                       },
                                       mobile:{type:"string", defaultValue: "(000)-000-0000",
                                       				validation: {
		                                                required: false,
		                                                contactMobileValidation: function (input) {
		                                                    if (input.is("[name='mobile']") && input.val() != "") {
		                                                        input.attr("data-mobileValidation-msg", "Número no válido.");
		                                                        return window.fut7.constants.telRegex.test(input.val());
		                                                    }
		
		                                                    return true;
		                                                }
		                                            }},
                                       club:{type:"number"}
                                    }
                                }
                            }
                        });

                    $("#kendo-players-grid").kendoGrid({
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
                        	{ field: "playerName", title: "Nombre"},
                        	{ field: "playerNumber", title: "Número"},
                        	{ field: "goalsCount", title: "Goles"},
                        	{ field: "yellowCard", title: "Amarillas"},
                        	{ field: "redCard", title: "Rojas"},
                        	{ field: "email", title: "Email"},
                        	{ field: "mobile", title: "Tel."},
                        	{ command: [
						            { name: "destroy", text: "Borrar"}
						        ],
						        title: "&nbsp;"
						    }
                            ],
                        editable: {
					    	confirmation: function(e) {
					        	return  "En verdad te quieres chutar "+ e.playerName +"?";
					     	}
					   	},
                        remove: function (e){
                        	deleteID = e.model.toJSON()._id; 
                        	$.ajax({
							        url: window.fut7.constants.url+'players',
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
    	
    	$(document).ready(function() {
            var dataSource = new kendo.data.DataSource({
                    transport: {
                        read: {
                            url: window.fut7.constants.url+'clubs',
                            dataType: "jsonp"
                        }
                    },
                    pageSize: 8
                });

            $("#pager").kendoPager({
                dataSource: dataSource
            });

            $("#kendo-clubs-list").kendoListView({
                dataSource: dataSource,
                selectable: "single",
                resizable: true,
                scrollable: false,
                dataBound: onDataBound,
                change: onChange,
                template: kendo.template($("#club-template").html())
            });

            function onDataBound() {
                var listView = $("#kendo-clubs-list").data("kendoListView");
				listView.select(listView.element.children().first());
				getSelectedItemAndDisplayGrid(this);
            }

            function onChange() {
                getSelectedItemAndDisplayGrid(this);
            }
            
            function getSelectedItemAndDisplayGrid(listView){
            	window.PlayersView.selectedClub = getSelectedItem(listView);
                if (window.PlayersView.selectedClub != undefined){
                	displayPlayersGrid();	
                }
            }
            
            function getSelectedItem(listView){
            	var data = dataSource.view(),
                    selected = $.map(listView.select(), function(item) {
                        return {id:data[$(item).index()]._id,name:data[$(item).index()].clubName};
                    });
				var selectedItem = {clubId:selected[0].id};

                return selectedItem;
            }
        });
    }
    
    
});