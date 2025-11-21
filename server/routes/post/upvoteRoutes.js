import express from 'express';
import { toggleUpvote } from '../../controllers/post/upvoteController.js';
import { verifyToken } from '../../middlewares/auth.js';

const router = express.Router();

router.post("/:postId/upvote", verifyToken, toggleUpvote);

export default router