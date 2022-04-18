import express from "express";
import { getRandomQuestion } from "../controllers/questionController.js";

const router = express.Router();

router.get("/", getRandomQuestion);

export default router;
