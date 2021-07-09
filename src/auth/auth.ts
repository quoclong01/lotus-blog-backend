import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { User, Auth } from '../models';
import { RequestUser } from '../models/User';
import { ProviderType } from '../lib/enum';
import { generateAccessToken } from '../lib/utils';

export const handleUrlCallback = async (accessToken: string, refreshToken: string, profile: any, providerType: string, done: any) => {
  let newAccessToken;
  const user = await User.findOne({
    where: { email: profile.email }
  });

  if (!user) {
    const dataTemp: any = new RequestUser({
      email: profile.email,
      firstName: profile.firstName,
      lastName: profile.lastName,
      picture: profile.picture
    });
    const user = await User.create(dataTemp);
    newAccessToken = await generateAccessToken(user.id);

    const authTemp = new Auth({
      accessToken: newAccessToken,
      refreshToken,
      providerType,
      password: null,
      resetToken: null,
      idToken: accessToken,
      userId: user.id
    });
    await authTemp.save();
    return done(null, {
      accessToken: newAccessToken,
      providerType,
      isNewUser: true
    });
  }

  newAccessToken = await generateAccessToken(user.id);
  const authTemp = await Auth.findOne({
    where: { userId: user.id, providerType }
  });
    
  if (!authTemp) {
    const auth: any = {
      providerType,
      accessToken: newAccessToken,
      refreshToken,
      idToken: accessToken,
      userId: user.id
    };
    await Auth.create(auth);
    await user.update({ verifyAt: new Date() });
  } else {
    await authTemp.update({ accessToken: newAccessToken, refreshToken, idToken: accessToken });
  }
  return done(null, {
    accessToken: newAccessToken,
    providerType,
    isNewUser: false
  });
}

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `${process.env.API_URL}/auth/google/callback`,
  passReqToCallback: true
},
async (request:any, accessToken: string, refreshToken: string, profile: any, done: any) => {
  const profileTemp = {
    email: profile.email,
    firstName: profile.family_name,
    lastName: profile.given_name,
    picture: profile.picture
  };
  handleUrlCallback(accessToken, refreshToken, profileTemp, ProviderType.GOOGLE, done);
}));

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: `${process.env.API_URL}/auth/facebook/callback`,
  passReqToCallback: true,
  profileFields: ['id', 'emails', 'name']
},
async (request:any, accessToken: string, refreshToken: string, profile: any, done: any) => {
  const email = profile.emails && profile.emails.length > 0 && profile.emails[0].value || undefined;
  const picture = profile.photos && profile.photos.length > 0 && profile.photos[0].value || undefined;
  console.log('profile', profile);
  const profileTemp = {
    email,
    firstName: profile.name.familyName,
    lastName: profile.name.givenName,
    picture
  };
  if (!email) return done(null, { error: 'this account does not have email.', statusCode: 400 });
  handleUrlCallback(accessToken, refreshToken, profileTemp, ProviderType.FACEBOOK, done);
}));

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: `${process.env.API_URL}/auth/github/callback`,
  scope: ['user:email']
},
async (accessToken:string, refreshToken:string, profile:any, done:any) => {
  const email = profile.emails.length > 0 && profile.emails[0].value || undefined;
  const picture = profile.photos.length > 0 && profile.photos[0].value || undefined;
  const profileTemp = {
    email,
    picture
  };
  handleUrlCallback(accessToken, refreshToken, profileTemp, ProviderType.GITHUB, done);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

export default passport;
