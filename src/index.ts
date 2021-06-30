import vars from './config/vars';
import app from './config/express';
import db  from './config/database';
import passport from './auth/auth';
import session from 'express-session';

const {port, env} = vars;

// open mongoose connection
const start = async () => {
  try {
    await db.sequelize.authenticate();
    console.log('Connected to SQL database:', db.database);
  }
  catch(e) {
    console.error('Unable to connect to SQL database:', e);
  }
  await db.sequelize.sync();
  app.use(session({ secret: 'cats' }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.listen(port);

  // listen to requests
  app.on('listening', () => {
    console.log(`===================================`);
    console.log(`Server start at port ${port}`);
    console.log(`===================================`);
  });

  // throw error if can not listen
  app.on('error', (e) => {
    console.error(`ERROR: ${e}`);
  });
};

start();

export default app;

