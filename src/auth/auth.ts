import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { User, Auth } from '../models';
import { RequestUser } from '../models/User';
import { ProviderType } from '../lib/enum';

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `${process.env.API_URL}/auths/google/callback`,
  passReqToCallback: true
},
async (request:any, accessToken: string, refreshToken: string, profile: any, done: any) => {
    const user = await User.findOne({
      where: { email: profile.email }
    });

    if (!user) {
      const dataTemp: any = new RequestUser({
        email: profile.email,
        firstName: profile.family_name,
        lastName: profile.given_name,
        picture: profile.picture
      })
      const userTemp = new User({ ...dataTemp });
      const user = await userTemp.save();
      const authTemp = new Auth({
        accessToken,
        refreshToken,
        providerType: ProviderType.GOOGLE,
        password: null,
        resetToken: null,
        userId: user.id
      });
      await authTemp.save();
      return done(null, {
        accessToken,
        providerType: ProviderType.GOOGLE,
        isNewUser: true
      });
    }

    const authTemp = await Auth.findOne({
      where: { userId: user.id, providerType: ProviderType.GOOGLE }
    });
    
    if (!authTemp) {
      const auth: any = {
        providerType: ProviderType.GOOGLE,
        accessToken,
        refreshToken,
        userId: user.id
      };
      await Auth.create(auth);
    } else {
      await authTemp.update({ accessToken, refreshToken });
      await user.update({ verifyAt: new Date() });
    }
    return done(null, {
      accessToken,
      providerType: ProviderType.GOOGLE,
      isNewUser: false
    });
  }
));

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: `${process.env.API_URL}/auths/github/callback`,
  scope: ['user:email']
},
async (accessToken:string, refreshToken:string, profile:any, done:any) => {
  const email = profile.emails.length > 0 && profile.emails[0].value || undefined;
  const picture = profile.photos.length > 0 && profile.photos[0].value || undefined;
  const user = await User.findOne({
    where: { email }
  });
  if (!user) {
    const dataTemp: any = new RequestUser({
      email,
      picture
    });
    const userTemp = new User({ ...dataTemp });
    const user = await userTemp.save();
    const authTemp = new Auth({
      accessToken,
      refreshToken,
      providerType: ProviderType.GITHUB,
      password: null,
      resetToken: null,
      userId: user.id
    });
    await authTemp.save();
    return done(null, {
      accessToken,
      providerType: ProviderType.GITHUB,
      isNewUser: true
    });
  }

  const authTemp = await Auth.findOne({
    where: { userId: user.id, providerType: ProviderType.GITHUB }
  });

  if (!authTemp) {
    const auth: any = {
      providerType: ProviderType.GITHUB,
      accessToken,
      refreshToken,
      userId: user.id
    };
    await Auth.create(auth);
  } else {
    await authTemp.update({ accessToken, refreshToken });
    await user.update({ verifyAt: new Date() });
  }
  return done(null, {
    accessToken,
    providerType: ProviderType.GITHUB,
    isNewUser: false
  });
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

export default passport;
