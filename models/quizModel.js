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
  options: {
    type: [
      {
        text: {
          type: String,
          required: [true, "Option text is required"],
        },
        correct: {
          type: Boolean,
          default: false,
        },
      },
    ],
    required: [true, "Options are required"],
    minLength: [4, "At least 4 Options are required"],
    validate: {
      validator: function (options) {
        return options.filter((option) => option.correct).length === 1;
      },
      message: "There must be exactly one correct option",
    },
  },
});

export default mongoose.model("Quiz", quizModel);
