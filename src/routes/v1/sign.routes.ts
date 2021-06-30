import express from 'express';
import expressjwt from 'express-jwt';
import s3Controller from '../../controllers/s3.controller';

const router = express.Router();
const jwtCheck = expressjwt({
  secret: 'RANDOM_TOKEN_SECRET',
  algorithms: ['HS256']
}); 

router
  .route('/')
  .get(jwtCheck, s3Controller.getSignedUrl)
  /**
   * @swagger
   * /signatures:
   *   get:
   *     summary: Get sign url for upload file
   *     tags:
   *       - Signatures
   *     parameters:
   *       - in: path
   *         name: type_upload
   *         required: true
   *         description: the type upload you want. if you want to upload avatar, this should be "avatar"
   *         schema:
   *           type: string
   *           example: avatar
   *       - in: path
   *         name: file_name
   *         required: true
   *         description: the name of file you want to upload
   *         schema:
   *           type: string
   *           example: abc
   *       - in: path
   *         name: file_type
   *         required: true
   *         description: the type of file you want to upload
   *         schema:
   *           type: string
   *           example: image/jpg
   *     produces:
   *       - application/json
   *     security:
   *       - jwt: []
   *     responses:
   *       200:
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               example: { "signedRequest": "https://dev-sharing-news-project.s3.amazonaws.com/abc?AWSAcc....", "url": "https://dev-sharing-news-project.s3.amazonaws.com/abc" }
   */
 
export default router;
