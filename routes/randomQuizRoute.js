import express from "express";
import {
  getRandomQuiz,
  getRandomQuizzes,
} from "../controllers/quizController.js";

const router = express.Router();

router.get("/", getRandomQuiz);
router.get("/:count", getRandomQuizzes);

export default router;
