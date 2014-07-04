var players = require('./models/players');
var clubs = require('./models/clubs');
module.exports = function(app, passport) {
	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	app.get('/', function(req, res) {
		res.redirect('/login');
	});

	// =====================================
	// LOGIN ===============================
	// =====================================
	// show the login form
	app.get('/login', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('login.ejs', { message: req.flash('loginMessage') }); 
	});
	
	// =====================================
	// ADMIN LOGIN ===============================
	// =====================================
	// show the login form for Administrators
	app.get('/admin', function(req, res) {
		res.render('admin-login.ejs', { message: req.flash('loginMessage') }); 
	});

	// ADMIN HOME	
	app.get('/admin-home', isLoggedInAsAdmin, function(req, res) {
		res.render('admin-home.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});
	
	// HOME	
	app.get('/home', isLoggedIn, function(req, res) {
		res.render('home.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});
	
	// =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	app.get('/signup', function(req, res) {
		// render the page and pass in any flash data if it exists
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});
	
	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
	
	// process the login form
	app.post('/login', passport.authenticate('user-login', {
		successRedirect : '/home', // redirect to the secure profile section
		failureRedirect : '/login', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));
	
	// process the login form
	app.post('/admin', passport.authenticate('admin-login', {
		successRedirect : '/admin-home', // redirect to the secure profile section
		failureRedirect : '/admin', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));
	
	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/home', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));
	
	
	// RESTful SERVICES ====================
	// =====================================
	app.get('/players/:id', isLoggedIn, players.findPlayers);
	
	app.get('/clubs', isLoggedIn, clubs.findAllClubs);
	app.post('/clubs', isLoggedInAsAdmin, clubs.saveOrUpdateClub);
	app.delete('/clubs', isLoggedInAsAdmin, clubs.deleteClub);
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
	// if user is authenticated in the session, carry on 
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/login');
}

function isLoggedInAsAdmin(req, res, next) {
	// if user is authenticated in the session as admin, carry on 
	if (req.isAuthenticated() && req.user.local.userType === 'admin')
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/admin');
}