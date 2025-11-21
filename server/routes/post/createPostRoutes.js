import express from 'express';
import { createPost } from '../../controllers/post/createPostController.js';
import { verifyToken } from '../../middlewares/auth.js';

const router = express.Router();

router.post("/", verifyToken, createPost);

export default router