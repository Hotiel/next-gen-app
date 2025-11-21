import express from 'express';
import { getAllPosts } from '../../controllers/post/getAllPostsController.js';
import { verifyToken } from '../../middlewares/auth.js';

const router = express.Router();

router.get("/", verifyToken, getAllPosts);

export default router