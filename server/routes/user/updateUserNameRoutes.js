import express from "express";
import { updateUserName } from "../../controllers/user/updateUserNameController.js"
import { verifyToken } from "../../middlewares/auth.js";

const router = express.Router();

router.put("/", verifyToken, updateUserName);

export default router;