import mongoose from "mongoose";

const quizModel = mongoose.Schema({
  question: {
    type: String,
    required: [true, "Question is required"],
    min: [5, "Question must be at least 3 characters long"],
  },
  difficulty: {
    type: String,
    required: [true, "Difficulty is required"],
    enum: {
      values: ["easy", "medium", "hard"],
      message: "{VALUE} is not a valid difficulty value",
    },
  },
  topic: {
    type: String,
    required: [true, "Topic is required"],
  },
  answers: {
    type: [
      {
        text: {
          type: String,
          required: [true, "Answer text is required"],
        },
        correct: {
          type: Boolean,
          default: false,
        },
      },
    ],
    required: [true, "Answers are required"],
    minLength: [4, "At least 4 answers are required"],
    validate: {
      validator: function (answers) {
        return answers.filter((answer) => answer.correct).length === 1;
      },
      message: "There must be exactly one correct answer",
    },
  },
});

export default mongoose.model("Quiz", quizModel);
