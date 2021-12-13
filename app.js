/* Module Dependencies */
const config = require('./config');
const session = require('express-session');
const express = require('express');
const yelp = require('yelp-fusion');
const passport = require('passport');

require('./oauth');
const db = require('./mongodb');

const app = express();
const cors = require('cors');

app.use(session({ secret: config.secret, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });

// Parse URL-encoded bodies
app.use(express.urlencoded({extended: true}));

// Parse JSON bodies
app.use(express.json());


/* Routes */

// Homepage
app.get('/', (req, res) => {
    res.redirect(`http://localhost:3000`);
});

// Retrieves and sends display name if user logged in
app.get('/userinfo', (req, res) => {
    if (req.user) {
        const displayName = [req.user.displayName];
        res.json(displayName);
    } else {
        res.json([]);
    }
})

// Auth scope set and initialized
app.get('/auth/google', 
    passport.authenticate('google', { scope: [ 'email', 'profile' ] }
));

// Checks if auth is successful
app.get('/auth/google/callback',
  passport.authenticate( 'google', { failureRedirect: '/auth/google/failure', successRedirect: '/' }));

// Logout handler
app.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/');
});

// Failed auth handler
app.get('/auth/google/failure', (req, res) => {
    res.send('Failed to authenticate..'); 
});


/* Server */

db.connect(() => {
    app.listen(5000)
});
