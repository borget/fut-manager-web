var express = require("express"),
	path = require('path'),
	wine = require('./routes/wines'),
	promo = require('./routes/promos'),
	employee = require('./routes/employees');
	var app = express();
	
var mongoose = require('mongoose');
var passport = require('passport');
var flash 	 = require('connect-flash');


var configDB = require('./config/database.js');

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

    var upload = require('jquery-file-upload-middleware');

    // configure upload middleware
    upload.configure({
        uploadDir: __dirname + '/public/pics',
        uploadUrl: '/pics',
        imageVersions: {
            thumbnail: {
                width: 80,
                height: 80
            }
        }
    });

// Deprecated Auth =============================================================
//var auth = express.basicAuth(function(user, pass) {
// return user === 'cochi' && pass === 'S1xp@55w0rd';
//});

var cloudinary = require('cloudinary'),
	        fs = require('fs');

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

app.configure(function () {
    // set up our express application
	app.use(express.logger('dev')); // log every request to the console
	app.use(express.cookieParser()); // read cookies (needed for auth)
	app.use('/upload', upload.fileHandler());
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
	cloudinary.config({ cloud_name: 'hwzj2ywl6', api_key: '716411813974227', api_secret: 'agoEYzHJR5cTbk928SAbXgwWKjg' });
});

app.get('/promos', promo.findAll);
app.get('/promos/:id', promo.findById);
app.post('/promos', promo.addPromo);
app.put('/promos/:id', promo.updatePromo);
app.delete('/promos/:id', promo.deletePromo);
//Deprecated Auth
//app.post('/promos', auth, promo.addPromo);
//app.put('/promos/:id', auth, promo.updatePromo);
//app.delete('/promos/:id', auth, promo.deletePromo);
//app.get('/auth', auth, promo.auth);

/*var fs = require('fs');

/// Post files
app.post('/upload', function(req, res) {

	fs.readFile(req.files.image.path, function (err, data) {

		var imageName = req.files.image.name

		/// If there's an error
		if(!imageName){

			console.log("There was an error")
			res.redirect("/");
			res.end();

		} else {

		  var newPath = __dirname + "/public/pics/" + imageName;

		  /// write file to uploads/fullsize folder
		  fs.writeFile(newPath, data, function (err) {
			console.log("file uploaded at:"+ newPath)
		  	/// let's see it
		  	res.end();

		  });
		}
	});
});

app.get('/upload/:file', function (req, res){
	file = req.params.file;
	var img = fs.readFileSync(__dirname + "/public/pics/" + file);
	res.writeHead(200, {'Content-Type': 'image/png' });
	res.end(img, 'binary');

});*/

app.post('/cloudinary', function(req, res, next) {
  stream = cloudinary.uploader.upload_stream(function(result) {
    res.send(result.url);
  }, { public_id: req.body.title } );
  
  fs.createReadStream(req.files.image.path, {encoding: 'binary'}).on('data', stream.write).on('end', stream.end);
});


// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});
