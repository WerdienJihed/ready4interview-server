import QuestionModel from "../models/questionModel.js";

export const getQuestions = async (req, res) => {
  const questions = await QuestionModel.find();
  res.json(questions);
};

export const getQuestion = async (req, res, next) => {
  try {
    const question = await QuestionModel.findById(req.params.id);
    res.json(question);
  } catch (error) {
    next(error);
  }
};

export const getRandomQuestion = async (req, res, next) => {
  try {
    const question = await QuestionModel.aggregate().sample(1);
    res.json(question[0]);
  } catch (error) {
    next(error);
  }
};

export const createQuestion = async (req, res) => {
  try {
    const question = new Question(req.body);
    await question.save();
    res.json(question);
  } catch (error) {
    next(error);
  }
};

export const updateQuestion = async (req, res) => {
  try {
    const question = await QuestionModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.json(question);
  } catch (error) {
    next(error);
  }
};

export const deleteQuestion = async (req, res) => {
  try {
    await QuestionModel.findByIdAndDelete(req.params.id);
    res.json({ id: req.params.id });
  } catch (error) {
    next(error);
  }
};
