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
   *       Let use this endpoint with HttpRequest, that means you open this link with browser, make sure your redirect_to params is correct. After sso authenticated, you will go back with that redirect link.
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
   *       Let use this endpoint with HttpRequest, that means you open this link with browser, make sure your redirect_to params is correct. After sso authenticated, you will go back with that redirect link.
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
    const { accessToken, isNewUser, providerType, error, statusCode }: any = req.user;
    const redirect_to = req.query['state'];
    if (typeof redirect_to === 'string') {
      const redirectLink = error
            ? `${redirect_to}?error=${error}&stateCode=${statusCode}`
            : `${redirect_to}?accessToken=${accessToken}&isNewUser=${isNewUser}&providerType=${providerType}`
      return res.redirect(redirectLink);
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
   *       Let use this endpoint with HttpRequest, that means you open this link with browser, make sure your redirect_to params is correct. After sso authenticated, you will go back with that redirect link.
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
