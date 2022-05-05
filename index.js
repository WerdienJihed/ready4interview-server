import express from "express";
import cors from "cors";
import "dotenv/config";
import errorHandler from "./middlewares/errorHandler.js";
import quizRouter from "./routes/quizRoute.js";
import randomQuizRouter from "./routes/randomQuizRoute.js";
import connectDB from "./configs/db.js";

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL }));

app.use("/api/quiz", quizRouter);
app.use("/api/random-quiz", randomQuizRouter);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
