window.MainContentView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        $(this.el).html(this.template());
        return this;
    },
    
	displayTable: function (clubsList) {
		 $(document).ready(function() {
		 			var clubItems = new Array();
		 			if (clubsList.models !== undefined && clubsList.models.length > 0){
		 				for (var i=0; i < clubsList.models.length; i++) {
							clubItems.push(clubsList.models[i].attributes);
						}
		 			}
		 	
                    $("#kendo-grid").kendoGrid({
                        dataSource: {
                            data: clubItems,
                            schema: {
                                model: {
                                    fields: {
                                    	pos: {type: "number"},
                                        clubName: { type: "string" },
                                        jj: { type: "number" },
                                        jg: { type: "number" },
                                        je: { type: "number" },
                                        jp: { type: "number" },
                                        gf: { type: "number" },
                                        gc: { type: "number" },
                                        dif: { type: "number" },
                                        pe: { type: "number" },
                                        pts: { type: "number" },
                                        contactMobile: { type: "string" },
                                        contactEmail: { type: "string" },
                                    }
                                }
                            },
                            pageSize: 8
                        },
                        height: 350,
                        resizable: false,
                        scrollable: false,
                        sortable: true,
                        filterable: false,
                        pageable: {
                            input: false,
                            numeric: false
                        },
                        columns: [
							{ field: "pos", title: "Pos.", width:"23px"},
                            { field: "clubName", title: "Club"},
                            { field: "jj", title: "JJ"},
                            { field: "jg", title: "G" },
                            { field: "je", title:"E" },
                            { field: "jp", title:"P" },
                            { field: "gf", title:"GF" },
                            { field: "gc", title:"GC" },
                            { field: "dif", title:"DIF" },
                            { field: "pts", title:"PTS" }
                        ]
                    });
                });
	}
});
