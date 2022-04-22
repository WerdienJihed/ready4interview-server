import QuizModel from "../models/quizModel.js";

export const getQuizzes = async (req, res) => {
  const quizzes = await QuizModel.find();
  res.json(quizzes);
};

export const getQuiz = async (req, res, next) => {
  try {
    const quiz = await QuizModel.findById(req.params.id);
    res.json(quiz);
  } catch (error) {
    next(error);
  }
};

export const getRandomQuiz = async (req, res, next) => {
  try {
    const quiz = await QuizModel.aggregate().sample(1);
    res.json(quiz[0]);
  } catch (error) {
    next(error);
  }
};

export const createQuiz = async (req, res) => {
  try {
    const quiz = new Quiz(req.body);
    await quiz.save();
    res.json(quiz);
  } catch (error) {
    next(error);
  }
};

export const updateQuiz = async (req, res) => {
  try {
    const quiz = await QuizModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.json(quiz);
  } catch (error) {
    next(error);
  }
};

export const deleteQuiz = async (req, res) => {
  try {
    await QuizModel.findByIdAndDelete(req.params.id);
    res.json({ id: req.params.id });
  } catch (error) {
    next(error);
  }
};
