import express from "express";
import { verifyUser } from "../../controllers/auth/meController.js";

const router = express.Router();

router.get("/", verifyUser);

export default router;