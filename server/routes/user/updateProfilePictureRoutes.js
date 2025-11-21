import express from "express";
import multer from "multer";
import { updateProfilePicture } from "../../controllers/user/updateProfilePictureController.js";
import { verifyToken } from "../../middlewares/auth.js";

const router = express.Router();


const upload = multer({ dest: "uploads/" });

router.put("/", verifyToken, upload.single("image"), updateProfilePicture);

export default router;