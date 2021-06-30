import passport from 'passport';
import { Request, Response, NextFunction } from 'express';
import { responseMiddleware } from '../lib/utils';

const authController = {
  googleSignIn: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    return passport.authenticate('google', { scope: ['email', 'profile'] });
    // return 'sign method';
  }),
  googleSignInCallback: responseMiddleware(async (req: Request, res: Response, next: NextFunction) => {
    return passport.authenticate('google', {
      successRedirect: '/protected',
      failureRedirect: '/auth/failure'
    })
  })
}

export default authController;
