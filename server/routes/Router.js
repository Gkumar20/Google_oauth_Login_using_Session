require('dotenv').config();
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/userSchema');
const router = express.Router();






// Add express-session middleware with updated options
const session = require('express-session');
router.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set it to true if you are using HTTPS
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 // Set the session cookie expiration time (e.g., 24 hours)
    }
  })
);





// Initialize Passport middleware
router.use(passport.initialize());
router.use(passport.session());







// Configure the Google OAuth strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if the user already exists in the database
        const user = await User.findOne({ email: profile.emails[0].value });

        if (user) {
          // User already exists, return the user
          console.log('Login is successful');
          return done(null, user);
        } else {
          // User doesn't exist, create a new user
          const newUser = new User({
            email: profile.emails[0].value,
            // Other user data from profile (name, etc.)
          });

          // Save the new user to the database
          await newUser.save();
          return done(null, newUser);
        }
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Set up the Google OAuth login route
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Set up the Google OAuth callback route
router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect or send response as needed
    res.redirect(process.env.ClIENT_URL);
  }
);


// Logout route
router.get('/logout', (req, res) => {
  // Clear the session and logout the user
  req.logout(() => {
    // Redirect or send response as needed
    res.redirect(process.env.ClIENT_URL);
  });
});


router.get('/authenticate', (req, res) => {
  if (req.isAuthenticated()) {
    const user = req.user;
    res.status(200).json({ user }); // Corrected the response syntax
  } else {
    res.status(401).json({ error: "Authentication error" }); // Corrected the response syntax
  }
});





module.exports = router;
