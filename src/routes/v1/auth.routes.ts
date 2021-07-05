import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get('/google/callback', passport.authenticate('google',
  { successRedirect: '/success', failureRedirect: '/failure' }
));

router.get('/success', (req, res, next) => {
  res.send('OK');
});
router.get('/failure', (req, res, next) => {
  res.send('failure');
})

export default router;
