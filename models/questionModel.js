import mongoose from "mongoose";

const questionModel = mongoose.Schema({
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

export default mongoose.model("Question", questionModel);
