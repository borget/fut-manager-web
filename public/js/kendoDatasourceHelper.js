var kendoDatasourceHelper = (function () {
  var instance;
 
  function init() { 
    return {
     	getNewItems: function(dataSource){
            	var modelItems = [];
            	$.each( dataSource.data(), function( i, dataItem ) {
            		if (dataItem.dirty){
            			modelItems.push(dataItem.toJSON());
            		}
				}); 
				if (modelItems.length == 0){
					alert("No se registran cambios");
					throw new Error("Save an empty model is not allowed.");
				}
            	return modelItems;
        }
    };
 
  };
 
  return {
 
    getInstance: function () {
 
      if ( !instance ) {
        instance = init();
      }
 
      return instance;
    }
 
  };
 
})();