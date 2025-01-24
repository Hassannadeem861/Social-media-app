import express from "express";
import {
  createMessage,
  getMessages
} from "../controllers/chat-controller.js";
import {
  verifyToken,
} from "../middlewares/auth-middleware.js";
const router = express.Router();
// import { upload } from "../middlewares/multer-middleware.js";

// const uploadMiddleware = upload.fields([
//   { name: "profilePicture", maxCount: 1 },
// ]);

router.post("/create-message", verifyToken, createMessage);
router.get("/get-messages", getMessages);


export default router;
