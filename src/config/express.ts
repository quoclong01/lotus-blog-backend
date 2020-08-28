import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
// import morgan from 'morgan';
// import compress from 'compression';
import routes from '../routes/v1';
// import { logs } from './vars';
// import strategies from './passport';
// import error from '../api/middlewares/error';

/*
* Express instance
* @public
*/
const app = express();

// request logging. dev: console | production: file
// app.use(morgan(logs));

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// gzip compression
// app.use(compress());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// mount api v1 routes
app.use('/v1', routes);

// // if error is not an instanceOf APIError, convert it.
// app.use(error.converter);

// // catch 404 and forward to error handler
// app.use(error.notFound);

// // error handler, send stacktrace only during development
// app.use(error.handler);

export default app;
