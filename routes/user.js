import express from "express"
import { protect } from "../middleware/authMiddleware.js";
import { authUser, registerUser } from "../controllers/user.js";

const router = express.Router()

router.post("/register", registerUser)
router.post("/auth", authUser)

export default router