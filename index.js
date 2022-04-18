import express from "express";
import cors from "cors";
import questionRouter from "./routes/questionRoute.js";
import randomQuestionRouter from "./routes/randomQuestionRoute.js";
import connectDB from "./configs/db.js";

const port = 5000;
const app = express();
connectDB();

app.use(express.json());
app.use(cors());

app.use("/api/question", questionRouter);
app.use("/api/random-question", randomQuestionRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
