import express from 'express';
import { getUserInfo } from '../../controllers/user/getUserInfoController.js'
import { verifyToken } from '../../middlewares/auth.js';

const router = express.Router();

router.get('/', verifyToken, getUserInfo);

export default router;