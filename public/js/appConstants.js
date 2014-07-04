( function(fut7) {
	fut7.constants = {
		//url : "http://localhost:5000/",
		url : "http://fut-manager.herokuapp.com/",
		telRegex: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
		emailRegex: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
		clubBadgeDefault: "http://res.cloudinary.com/hpydjd1cu/image/upload/v1404275976/clubBadge_x3rexl.png"
	};
}(window.fut7 = window.fut7 || {})); 