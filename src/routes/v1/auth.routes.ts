import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get('/google', (req, res, next) => {
  const { redirect_to } = req.query;

  if (!redirect_to) return res.send({mesage: 'Please provider callback URL.'});

  const state = redirect_to.toString();
  const authenticator = passport.authenticate('google', { scope: ['email', 'profile'], state });
  authenticator(req, res, next);
});

router.get('/google/callback', passport.authenticate('google',
  { failureRedirect: '/failure' }
), (req, res, next) => {
  const { accessToken, isNewUser, providerType, userInfo }: any = req.user;
  const redirect_to = req.query['state'];
  if (typeof redirect_to === 'string') {
    return res.redirect(`${redirect_to}?accessToken=${accessToken}&userInfo=${JSON.stringify(userInfo)}&isNewUser=${isNewUser}&providerType=${providerType}`)
  }
  res.redirect('/')
});

router.get('/github', (req, res, next) => {
  const { redirect_to } = req.query;

  if (!redirect_to) return res.send({mesage: 'Please provider callback URL.'});

  const state = redirect_to.toString();
  const authenticator = passport.authenticate('github', { state });
  authenticator(req, res, next);
});

router.get('/github/callback', passport.authenticate('github',
  { failureRedirect: '/failure' }
), (req, res, next) => {
  const { accessToken, isNewUser, providerType, userInfo }: any = req.user;
  const redirect_to = req.query['state'];
  if (typeof redirect_to === 'string') {
    return res.redirect(`${redirect_to}?accessToken=${accessToken}&userInfo=${JSON.stringify(userInfo)}&isNewUser=${isNewUser}&providerType=${providerType}`)
  }
  res.redirect('/')
});

export default router;
