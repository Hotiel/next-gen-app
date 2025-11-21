import express from 'express';
import { getPostById } from "../../controllers/post/getPostByIdController.js";
import { verifyToken } from '../../middlewares/auth.js';


const router = express.Router();

router.get("/post/:postId", verifyToken, getPostById);

export default router;