import express from "express";
import { updatePassword } from "../../controllers/user/updatePasswordController.js";
import { verifyToken } from "../../middlewares/auth.js";

const router = express.Router();

router.put("/", verifyToken, updatePassword);

export default router;