import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import { UserModel } from '../model/user.js';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3000/google/callback';

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: CALLBACK_URL,
  passReqToCallback: true
},
  async function (request, accessToken, refreshToken, profile, done) {
    try {
      // Check if user exists in database
      let user = await UserModel.findOne({ email: profile.email });

      if (!user) {
        // Create new user if doesn't exist
        user = new UserModel({
          email: profile.email,
          firstName: profile.given_name,
          lastName: profile.family_name,
          avatar: profile.picture,
          googleId: profile.id
        });
        await user.save();
      }

      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserModel.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Middleware to check if user is authenticated
export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized' });
};

export default passport;