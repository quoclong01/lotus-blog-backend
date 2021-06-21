import express from 'express';
import characterRoutes from './character.routes';
import postRoutes from './post.routes';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../../../docs/swagger.json';

const router = express.Router();

/* API DOCS with swagger */
router.use('/apidocs', swaggerUi.serve);
router.get('/apidocs', swaggerUi.setup(swaggerDocument));

/* GET - Check service health */
router.get('/api', (req, res) =>
  res.send('API Server is running!')
);

router.use('/api/characters', characterRoutes);
router.use('/api/posts', postRoutes);

export default router;
