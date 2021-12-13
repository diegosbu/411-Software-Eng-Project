const passport = require('passport');
const config = require('./config');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const client = require('./mongodb');

passport.use(new GoogleStrategy({
    clientID: config.googleClientID,
    clientSecret: config.googleClientSecret,
    callbackURL: 'http://localhost:5000/auth/google/callback',
    passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, done) {
    // User info collection
    coll = client.get().db('411_Web_App').collection('users');

    // Only inserts if user doesn't already exist in DB
    coll.updateOne(
      { googleId: profile.id },
      { $setOnInsert: { googleId: profile.id, displayName: profile.displayName, email: profile.email } },
      { upsert: true });
      
    return done(null, profile);
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});