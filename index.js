import express from "express";
import cors from "cors";
import quizRouter from "./routes/quizRoute.js";
import randomQuizRouter from "./routes/randomQuizRoute.js";
import connectDB from "./configs/db.js";

const port = 5000;
const app = express();
connectDB();

app.use(express.json());
app.use(cors());

app.use("/api/quiz", quizRouter);
app.use("/api/random-quiz", randomQuizRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
