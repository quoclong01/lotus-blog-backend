import express from 'express';
import userRoutes from './user.routes';
import postRoutes from './post.routes';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../../../docs/swagger.json';

const router = express.Router();

/* API DOCS with swagger */
router.use('/docs', swaggerUi.serve);
router.get('/docs', swaggerUi.setup(swaggerDocument));

/* GET - Check service health */
router.get('/', (req, res) =>
  res.send('API Server is running!')
);

router.use('/posts', postRoutes);
router.use('/users', userRoutes);


export default router;
