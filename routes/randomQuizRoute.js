import express from "express";
import { getRandomQuiz } from "../controllers/quizController.js";

const router = express.Router();

router.get("/", getRandomQuiz);

export default router;
