/* Module Dependencies */
const ejs = require('ejs');
const config = require('./config');
const session = require('express-session');
const express = require('express');
const yelp = require('yelp-fusion');
const passport = require('passport');
require('./oauth');

const app = express();


app.use(session({ secret: config.secret, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


// API credentials
const apiKey = config.yelpKey;
const client = yelp.client(apiKey);


app.set('view engine', 'ejs');
app.use(express.static('views'));

// Parse URL-encoded bodies
app.use(express.urlencoded({extended: true}));

// Parse JSON bodies
app.use(express.json());


/* Routes */

// Homepage
app.get('/', (req, res) => {
    if (req.user) {
        res.render('index', {dispName: req.user.displayName});
    } else {
        res.render('index', {dispName: false});
    }
});

// Results page
app.post('/rquery', (req, res) => {
    // console.log(req.body.rname);
    const rname = req.body.rname;
    const pname = req.body.place;

    const searchRequest = {
        term: rname,
        location: pname
    };

    client.search(searchRequest).then(response => {
        const firstResult = response.jsonBody.businesses[0];
        const prettyJson = JSON.stringify(firstResult, null, 4);
        res.render('result', {
            json: prettyJson
        });
      }).catch(e => {
        console.log(e);
      });
});

// Auth scope set and initialized
app.get('/auth/google', 
    passport.authenticate('google', { scope: [ 'email', 'profile' ] }
));

// Checks if auth is successful
app.get('/auth/google/callback',
  passport.authenticate( 'google', { failureRedirect: '/auth/google/failure' }),
  (req, res) => {
    res.redirect('/');
});

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

const PORT = process.env.PORT || 5000;

app.listen(PORT)
