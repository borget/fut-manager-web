window.MainContentView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        $(this.el).html(this.template());
        return this;
    },
    
	displayTable: function () {
		 $(document).ready(function() {
					
					var datasource = [
						{"clubID":1,"pos":1,"clubName":"Kellogs","jj":18,"jg":39,"je":1, "jp":2, "gf":30,"gc":30,"dif":30,"pts":30},
						{"clubID":2,"pos":2,"clubName":"Argentina","jj":19,"jg":17,"je":3, "jp":2, "gf":30,"gc":30,"dif":30,"pts":30},
						{"clubID":3,"pos":3,"clubName":"Borussia","jj":10,"jg":13,"je":2, "jp":2, "gf":30,"gc":30,"dif":30,"pts":30},
						{"clubID":4,"pos":4,"clubName":"RealBañil","jj":22,"jg":53,"je":5, "jp":2, "gf":30,"gc":30,"dif":30,"pts":30},
						{"clubID":5,"pos":5,"clubName":"AS Roma","jj":18,"jg":39,"je":1, "jp":2, "gf":30,"gc":30,"dif":30,"pts":30},
						{"clubID":6,"pos":6,"clubName":"Leon","jj":19,"jg":17,"je":3, "jp":2, "gf":30,"gc":30,"dif":30,"pts":30},
						{"clubID":7,"pos":7,"clubName":"Alemania","jj":10,"jg":13,"je":2, "jp":2, "gf":30,"gc":30,"dif":30,"pts":30},
						{"clubID":8,"pos":8,"clubName":"Galacticos","jj":22,"jg":53,"je":5, "jp":2, "gf":30,"gc":30,"dif":30,"pts":30},
						{"clubID":9,"pos":9,"clubName":"Monterrey","jj":18,"jg":39,"je":1, "jp":2, "gf":30,"gc":30,"dif":30,"pts":30},
						{"clubID":10,"pos":10,"clubName":"Manchester United","jj":19,"jg":17,"je":3, "jp":2, "gf":30,"gc":30,"dif":30,"pts":30},
						{"clubID":11,"pos":11,"clubName":"Dep El Rocio","jj":10,"jg":13,"je":2, "jp":2, "gf":30,"gc":30,"dif":30,"pts":30},
						{"clubID":12,"pos":12,"clubName":"Supercampeones","jj":22,"jg":53,"je":5, "jp":2, "gf":30,"gc":30,"dif":30,"pts":30}
					];
                    $("#kendo-grid").kendoGrid({
                        dataSource: {
                            data: datasource,
                            schema: {
                                model: {
                                    fields: {
										pos: { type: "number" },
                                        clubName: { type: "string" },
                                        jj: { type: "number" },
                                        jg: { type: "number" },
                                        je: { type: "number" },
                                        jp: { type: "number" },
                                        gf: { type: "number" },
                                        gc: { type: "number" },
                                        dif: { type: "number" },
                                        pts: { type: "number" }
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
							{ field: "pos", title: "Pos."},
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
