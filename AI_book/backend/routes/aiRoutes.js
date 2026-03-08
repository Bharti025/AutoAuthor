import express from "express";
import {generateOutline, generateChapterContent} from "../controller/aiController.js"
import {protect} from "../middleware/authMiddleware.js"
const AiRouter=express.Router();
AiRouter.use(protect);
AiRouter.post("/generateoutline",generateOutline);
AiRouter.post("/generatechaptercontent",generateChapterContent);
export default AiRouter;