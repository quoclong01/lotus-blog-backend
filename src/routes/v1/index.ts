import express from 'express';
import characterRoutes from './character.routes';
import postRoutes from './post.routes';
import userRoutes from './user.routes';
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

router.use('/characters', characterRoutes);
router.use('/posts', postRoutes);

// USER API
router.use('/users', userRoutes);

export default router;
