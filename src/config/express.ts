import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import routes from '../routes/v1';
import session from 'express-session';
import passport from '../auth/auth';
/*
 * Express instance
 * @public
 */
const app = express();

// request logging. dev: console | production: file
// app.use(morgan(logs));
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET' 
}));
// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// gzip compression
// app.use(compress());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

app.use(session({ secret: 'cats' }));
app.use(passport.initialize());
app.use(passport.session());

// mount api v1 routes
app.use('/api/v1', routes);

app.use('**', (req, res, next) => {
  res.status(404).json({ message: 'Route not found!' });
});

export default app;
