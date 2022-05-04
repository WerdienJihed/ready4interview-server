import QuizModel from "../models/quizModel.js";
import mongoose from "mongoose";

export const getQuizzes = async (req, res, next) => {
  const page = req.query.page || 0;
  const limit = req.query.limit || 0;

  const quizzes = await QuizModel.find()
    .skip(page * limit)
    .limit(limit)
    .catch((err) => {
      return next(err);
    });

  res.json(quizzes);
};

export const getQuiz = async (req, res, next) => {
  const valid = mongoose.isValidObjectId(req.params.id);

  if (!valid) {
    const error = new Error(`Invalid id: ${req.params.id}`);
    return next(error);
  }

  const quiz = await QuizModel.findById(req.params.id).catch((err) => {
    next(err);
  });

  res.json(quiz);
};

export const getRandomQuiz = async (req, res, next) => {
  const quiz = await QuizModel.aggregate()
    .sample(1)
    .catch((err) => {
      return next(err);
    });

  res.json(quiz[0]);
};

export const getRandomQuizzes = async (req, res, next) => {
  const filter = {};

  if (req.query.difficulty) {
    filter.difficulty = req.query.difficulty;
  }
  if (req.query.topic) {
    filter.topic = req.query.topic;
  }

  const quiz = await QuizModel.aggregate()
    .match(filter)
    .sample(Number(req.params.count))
    .catch((err) => {
      return next(err);
    });

  res.json(quiz);
};

export const createQuiz = async (req, res, next) => {
  const valid = await QuizSchema.isValid(req.body);

  if (!valid) {
    const error = new Error(`Invalid quiz!`);
    res.status(400);
    return next(error);
  }

  const quiz = new QuizModel(req.body);
  await quiz.save().catch((err) => {
    next(err);
  });

  res.json(quiz);
};

export const updateQuiz = async (req, res, next) => {
  const validId = mongoose.isValidObjectId(req.params.id);
  const validQuiz = await QuizSchema.isValid(req.body);

  if (!validId) {
    const error = new Error(`Invalid id: ${req.params.id}`);
    res.status(400);
    return next(error);
  }

  if (!validQuiz) {
    const error = new Error(`Invalid quiz!`);
    res.status(400);
    return next(error);
  }

  const quiz = await QuizModel.findByIdAndUpdate(req.params.id, req.body).catch(
    (err) => {
      next(err);
    }
  );
  res.json(quiz);
};

export const deleteQuiz = async (req, res, next) => {
  const valid = mongoose.isValidObjectId(req.params.id);

  if (!valid) {
    const error = new Error(`Invalid id: ${req.params.id}`);
    res.status(400);
    return next(error);
  }

  await QuizModel.findByIdAndDelete(req.params.id).catch((err) => {
    next(err);
  });

  res.json({ id: req.params.id });
};
