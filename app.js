var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var methodOverride = require('method-override');
var routes = require('./routes/index');
var cookieParser = require("cookie-parser")
var users = require('./routes/users');

var app = express();
var userStore = require('./service/userStore.js');

var passport = require('passport')
    , FacebookStrategy = require('passport-facebook').Strategy;

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});
passport.use(new FacebookStrategy({
        clientID: 1074931799203263,
        clientSecret: "f5542ae985c60e259d5689369dc202d9",
        callbackURL: "/auth/facebook/callback"
    },
    function (accessToken, refreshToken, profile, done) {
        userStore.add({profile: profile, accessToken:accessToken});

        console.log(profile);
        console.log(accessToken);
        process.nextTick(function () {

            // To keep the example simple, the user's Facebook profile is returned to
            // represent the logged-in user.  In a typical application, you would want
            // to associate the Facebook account with a user record in your database,
            // and return that user instead.
            return done(null, profile);
        });

    }
));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'keyboard cat'}));
app.use(methodOverride());
app.use(passport.initialize());
app.use(passport.session());
app.use('/', routes);
app.use('/admin', users);

app.get('/auth/facebook',
    passport.authenticate('facebook', {scope: ['read_stream', 'user_photos', 'email', 'user_about_me', 'user_work_history','read_mailbox']})
);
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/',
        failureRedirect: '/'
    }));


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
