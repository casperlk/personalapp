const
createError = require('http-errors');
express = require('express');
path = require('path');
cookieParser = require('cookie-parser');
logger = require('morgan');
accountsController = require('./controllers/accountsController'),
// settingsController = require('./controllers/settingsController')
// usersController = require('./controllers/usersController'),
mongoose = require( 'mongoose' );
mongoose.connect( 'mongodb://localhost/skillmastery' );
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we are connected!")
});

var indexRouter = require('./routes/index');
var leaderboardRouter = require('./routes/leaderboard');
var cssdemoRouter = require('./routes/cssdemo');
var imagedemoRouter = require('./routes/imagedemo');
var formdemoRouter = require('./routes/formdemo');
var usersRouter = require('./routes/users');
var playRouter = require('./routes/play'); // nvm
var settingsRouter = require('./routes/settings');
var squareRouter = require('./routes/square');


var app = express();

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// here we set up authentication with passport
const session = require("express-session");
const passport = require('passport')
const configPassport = require('./config/passport')
configPassport(passport)



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(session({ secret: 'dn53dm99stkhlcdung3ntga4ly7c'}));
app.use(passport.initialize());
app.use(passport.session());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// here is where we check on their logged in status
app.use((req,res,next) => {
  res.locals.loggedIn = false
  console.log("user being authenticated")
  if (req.isAuthenticated()){
    console.log("user has been Authenticated")
    res.locals.user = req.user
    res.locals.loggedIn = true
    if (req.user){
      if (req.user.googleemail=='casperlk@brandeis.edu' || req.user.googleemail=='casperlesperancekerckhoff@gmail.com'){
        console.log("Owner has logged in")
        res.locals.status = 'owner'
      } else {
        console.log('User has logged in')
        res.locals.status = 'user'
      }
    }
  }
  next()
})

app.get('/accounts', accountsController.getAllAccounts );

app.post('/saveAccount', accountsController.saveAccount );

app.post('/deleteAccount', accountsController.deleteAccount );


app.use('/', indexRouter);
app.use('/leaderboard', leaderboardRouter);
app.use('/cssdemo', cssdemoRouter);
app.use('/imagedemo', imagedemoRouter);
app.use('/formdemo', formdemoRouter);
app.use('/users', usersRouter);
app.use('/play', playRouter);
// app.use('/settings', settingsController);
app.use('/settings', settingsRouter);
app.use('/square', squareRouter);
//Authentication roots




// here are the authentication routes

app.get('/loginerror', function(req,res){
  res.render('loginerror',{})
})

app.get('/login', function(req,res){
  res.render('login',{})
})



// route for logging out
app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});


// =====================================
// GOOGLE ROUTES =======================
// =====================================
// send to google to do the authentication
// profile gets us their basic information including their name
// email gets their emails
app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));


app.get('/login/authorized',
passport.authenticate('google', {
  successRedirect : '/leaderboard',
  failureRedirect : '/loginerror'
}));



// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  console.log("checking to see if they are authenticated!")
  // if user is authenticated in the session, carry on
  res.locals.loggedIn = false
  if (req.isAuthenticated()){
    console.log("user has been Authenticated")
    res.locals.loggedIn = true //this is just me trying things // delete test
    return next();
  } else {
    console.log("user has not been authenticated...")
    res.redirect('/login');
  }
}

// we require them to be logged in to see their profile
app.get('/profile', isLoggedIn, function(req, res) {
  res.render('profile', {
    user : req.user // get the user out of session and pass to template
  });
});

// app.get('/users',usersController.getAllUsers)
// app.get('/users/:id',
// usersController.attachUser,
// usersController.getUser)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
