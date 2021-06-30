import passport from 'passport';
import { Strategy as GoogleStrategy} from 'passport-google-oauth2';

passport.use(new GoogleStrategy({
  clientID: '515502300212-s2ghn8cju5ro94s9v07a2rqkla65e65p.apps.googleusercontent.com',
  clientSecret: '5dRXKgAgrYfq0mX5CfjOzpuv',
  callbackURL: "http://localhost:9999/api/v1/auths/google/callback",
  passReqToCallback   : true
},
function(request:any, accessToken: string, refreshToken: string, profile: any, done: any) {
  // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    console.log('accessToken', accessToken)
    console.log('refreshToken', refreshToken)
    console.log('profile', profile)
    return done(null, profile);
  // });
}
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

export default passport;