import mongoose from "mongoose";

const quizModel = mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  answers: {
    type: [
      {
        text: {
          type: String,
          required: true,
        },
        correct: {
          type: Boolean,
          required: true,
        },
      },
    ],
    required: true,
  },
});

export default mongoose.model("Quiz", quizModel);
