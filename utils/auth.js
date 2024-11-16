
// import axios from 'axios';
// import UserModel from '../models/UserModel'; // Adjust the path based on your file structure

// export const googleAuth = async (req, res) => {
//   try {
//     const { credential } = req.body;

//     if (!credential) {
//       return res.status(400).json({ error: 'Google credential is required' });
//     }

//     // Verify the Google token
//     const response = await axios.get(
//       `https://oauth2.googleapis.com/tokeninfo?id_token=${credential}`
//     );

//     // Destructure relevant user data
//     const { email, name, picture } = response.data;

//     if (!email || !name || !picture) {
//       return res.status(400).json({ error: 'Invalid Google token data' });
//     }

//     // Check if the user exists in the database
//     let user = await UserModel.findOne({ email });

//     if (!user) {
//       // Create a new user if not found
//       user = new UserModel({
//         email,
//         firstName: name.split(' ')[0], // First part of name as firstName
//         lastName: name.split(' ')[1] || '', // Second part as lastName, if it exists
//         avatar: picture,
//       });

//       // Save the new user to the database
//       await user.save();
//     }

//     // Send user info back to the frontend
//     res.status(200).json({ user });
//   } catch (error) {
//     console.error('Error during Google authentication:', error.message);
//     res.status(500).json({ error: 'Authentication failed' });
//   }
// };


// var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

import GoogleStrategy from 'passport-google-oauth2';
import passport from 'passport';


const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.use(new GoogleStrategy({
    clientID:     GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) 
      return done(err, profile);
  }
));
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});
  