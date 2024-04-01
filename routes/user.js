import express from "express"
import { protect } from "../middleware/authMiddleware.js";
import { authUser, decryptResponse, encryptResponse, registerUser } from "../controllers/user.js";

const router = express.Router()

router.post("/register", registerUser)
router.post("/auth", authUser)
router.post("/encrypt", encryptResponse)
router.post("/decrypt", decryptResponse)

export default router