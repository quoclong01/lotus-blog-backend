import passport from 'passport';
import { Strategy as GoogleStrategy} from 'passport-google-oauth2';
import { User, Auth } from '../models';
import { RequestUser } from '../models/User';
import { ProviderType } from '../lib/enum';

passport.use(new GoogleStrategy({
  clientID: '515502300212-s2ghn8cju5ro94s9v07a2rqkla65e65p.apps.googleusercontent.com',
  clientSecret: '5dRXKgAgrYfq0mX5CfjOzpuv',
  callbackURL: `${process.env.API_URL}/auths/google/callback`,
  passReqToCallback: true
},
async (request:any, accessToken: string, refreshToken: string, profile: any, done: any) => {
  // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    console.log('profile', profile)
    const user = await User.findOne({
      where: { email: profile.email },
      include: { model: Auth, where: {providerType: ProviderType.GOOGLE} }
    });

    if (!user) {
      const dataTemp: any = new RequestUser({
        email: profile.email,
        firstName: profile.family_name,
        lastName: profile.given_name,
        displayName: profile.displayName,
        picture: profile.picture,
        verifyAt: new Date()
      });
      const userTemp = new User({ ...dataTemp });
      const user = await userTemp.save();
      const authTemp = new Auth({
        providerType: ProviderType.GOOGLE,
        accessToken: accessToken,
        refreshToken: refreshToken,
        password: null,
        resetToken: null,
        userId: user.id
      });
      await authTemp.save();
    }
    console.log('user', user)
    // console.log('refreshToken', refreshToken)
    // console.log('profile', profile)
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