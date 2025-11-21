import express from 'express';
import { addComment } from '../../controllers/post/addCommentController.js';
import { verifyToken } from '../../middlewares/auth.js';

const router = express.Router();

router.post("/:postId/addComment", verifyToken, addComment);

export default router