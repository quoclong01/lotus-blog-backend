import express from 'express';
import passport from 'passport';

const router = express.Router();

router
  /**
   * @swagger
   *
   * /auth/google:
   *   get:
   *     tags:
   *       - Auth
   *     produces:
   *       - application/json
   *     summary:
   *       Sign in with google account
   *     description:
   *       This api will access Google OAuth then open Google Login diaglo
   *     parameters:
   *       - name: redirect_to
   *         in: query
   *         description: URL need to callback after successfully
   *         required: true
   *         example: http://localhost:9999/api/v1
   *     responses:
   *       200:
   *         content:
   *           application/json:
   *             schema:
   *               type: string
   *               example: http://localhost:9999/api/v1?accessToken=test&isNewUser=true&providerType=google
  */
  .get('/google', (req, res, next) => {
    const { redirect_to } = req.query;

    if (!redirect_to) return res.send({mesage: 'Please provider callback URL.'});

    const state = redirect_to.toString();
    const authenticator = passport.authenticate('google', { scope: ['email', 'profile'], state });
    authenticator(req, res, next);
  });

router
  .get('/google/callback', passport.authenticate('google',
    { failureRedirect: '/failure' }
  ), (req, res, next) => {
    const { accessToken, isNewUser, providerType }: any = req.user;
    const redirect_to = req.query['state'];
    if (typeof redirect_to === 'string') {
      return res.redirect(`${redirect_to}?accessToken=${accessToken}&isNewUser=${isNewUser}&providerType=${providerType}`)
    }
    res.redirect('/')
  });

router
  /**
   * @swagger
   *
   * /auth/facebook:
   *   get:
   *     tags:
   *       - Auth
   *     produces:
   *       - application/json
   *     summary:
   *       Sign in with facebook account
   *     description:
   *       This api will access Facebook OAuth then open Facebook Login diaglo
   *     parameters:
   *       - name: redirect_to
   *         in: query
   *         description: URL need to callback after successfully
   *         required: true
   *         example: http://localhost:9999/api/v1
   *     responses:
   *       200:
   *         content:
   *           application/json:
   *             schema:
   *               type: string
   *               example: http://localhost:9999/api/v1?accessToken=test&isNewUser=true&providerType=google
  */
  .get('/facebook', (req, res, next) => {
    const { redirect_to } = req.query;

    if (!redirect_to) return res.send({mesage: 'Please provider callback URL.'});

    const state = redirect_to.toString();
    const authenticator = passport.authenticate('facebook', { scope: ['email', 'public_profile'], state });
    authenticator(req, res, next);
  });

router
  .get('/facebook/callback', passport.authenticate('facebook',
    { failureRedirect: '/failure' }
  ), (req, res, next) => {
    const { accessToken, isNewUser, providerType }: any = req.user;
    const redirect_to = req.query['state'];
    if (typeof redirect_to === 'string') {
      return res.redirect(`${redirect_to}?accessToken=${accessToken}&isNewUser=${isNewUser}&providerType=${providerType}`)
    }
    res.redirect('/')
  });

router
  /**
   * @swagger
   *
   * /auth/github:
   *   get:
   *     tags:
   *       - Auth
   *     produces:
   *       - application/json
   *     summary:
   *       Sign in with github account
   *     description:
   *       This api will access GitHub OAuth then open GitHub Login diaglo
   *     parameters:
   *       - name: redirect_to
   *         in: query
   *         description: URL need to callback after successfully
   *         required: true
   *         example: http://localhost:9999/api/v1
   *     responses:
   *       200:
   *         content:
   *           application/json:
   *             schema:
   *               type: string
   *               example: http://localhost:9999/api/v1?accessToken=test&isNewUser=true&providerType=github
  */
  .get('/github', (req, res, next) => {
    const { redirect_to } = req.query;

    if (!redirect_to) return res.send({mesage: 'Please provider callback URL.'});

    const state = redirect_to.toString();
    const authenticator = passport.authenticate('github', { state });
    authenticator(req, res, next);
  });

router
  .get('/github/callback', passport.authenticate('github',
    { failureRedirect: '/failure' }
  ), (req, res, next) => {
    const { accessToken, isNewUser, providerType }: any = req.user;
    const redirect_to = req.query['state'];
    if (typeof redirect_to === 'string') {
      return res.redirect(`${redirect_to}?accessToken=${accessToken}&isNewUser=${isNewUser}&providerType=${providerType}`)
    }
    res.redirect('/')
  });

export default router;
