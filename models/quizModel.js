import mongoose from "mongoose";

const quizModel = mongoose.Schema({
  text: {
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
