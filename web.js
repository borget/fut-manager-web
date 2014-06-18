var  express = require("express"),
	    path = require('path'),
	     app = express(),
	mongoose = require('mongoose'),
	passport = require('passport'),
	flash 	 = require('connect-flash');

var configDB = require('./config/database.js');

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

app.configure(function () {
    // set up our express application
	app.use(express.logger('dev')); // log every request to the console
	app.use(express.cookieParser()); // read cookies (needed for auth)
    app.use(allowCrossDomain);
	app.use(express.bodyParser()); // get information from html forms
	app.set('views',__dirname + '/public/views');
	app.set('view engine', 'ejs'); // set up ejs for templating
	app.use(express.static(path.join(__dirname, 'public')));
	// required for passport
	app.use(express.session({ secret: 'achaeloYauro' })); // session secret
	app.use(passport.initialize());
	app.use(passport.session()); // persistent login sessions
	app.use(flash()); // use connect-flash for flash messages stored in session
    
    app.use(express.errorHandler());
});

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});
