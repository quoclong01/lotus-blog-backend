import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get('/google', (req, res, next) => {
  const { redirectTo } = req.query;
  const state = redirectTo ? redirectTo.toString() : undefined;

  const authenticator = passport.authenticate('google', { scope: ['email', 'profile'], state });
  authenticator(req, res, next);
});

router.get('/google/callback', passport.authenticate('google',
  { failureRedirect: '/failure' }
), (req, res, next) => {
  const { accessToken, isNewUser, providerType}: any = req.user;
  const redirectTo = req.query['state'];
  if (typeof redirectTo === 'string') {
    return res.redirect(`${redirectTo}?accessToken=${accessToken}&isNewUser=${isNewUser}&providerType=${providerType}`)
  }
  res.redirect('/')
});

router.get('/github', (req, res, next) => {
  const { redirectTo } = req.query;
  const state = redirectTo ? redirectTo.toString() : undefined;

  const authenticator = passport.authenticate('github', { state });
  authenticator(req, res, next);
});

router.get('/github/callback', passport.authenticate('github',
  { failureRedirect: '/failure' }
), (req, res, next) => {
  const { accessToken, isNewUser, providerType}: any = req.user;
  const redirectTo = req.query['state'];
  if (typeof redirectTo === 'string') {
    return res.redirect(`${redirectTo}?accessToken=${accessToken}&isNewUser=${isNewUser}&providerType=${providerType}`)
  }
  res.redirect('/')
});

export default router;
