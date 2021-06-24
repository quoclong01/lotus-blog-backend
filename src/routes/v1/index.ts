import express from 'express';
import userRoutes from './user.routes';
import postRoutes from './post.routes';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const router = express.Router();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Sharing News API docs",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Quan Do",
        email: "quan.do@spremetech.vn",
      },
    },
    servers: [
      {
        url: "https://vast-lowlands-08945.herokuapp.com/api/v1",
      },
    ],
  },
  apis: ["./src/routes/v1/**.routes.ts"],
};

const openapiSpecification = swaggerJsdoc(options);

/* API DOCS with swagger */
router.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

/* GET - Check service health */
router.get('/', (req, res) =>
  res.send('API Server is running!')
);

router.use('/posts', postRoutes);
router.use('/users', userRoutes);


export default router;
