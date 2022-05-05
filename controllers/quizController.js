import QuizModel from "../models/quizModel.js";
import mongoose from "mongoose";

export const getQuizzes = async (req, res, next) => {
  const page = req.query.page || 0;
  const limit = req.query.limit || 0;
  try {
    const quizzes = await QuizModel.find()
      .skip(page * limit)
      .limit(limit);
    res.json(quizzes);
  } catch (error) {
    next(error);
  }
};

export const getQuiz = async (req, res, next) => {
  const valid = mongoose.isValidObjectId(req.params.id);

  if (!valid) {
    const error = new Error(`Invalid id: ${req.params.id}`);
    res.status(400);
    return next(error);
  }

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

export const getRandomQuizzes = async (req, res, next) => {
  const filter = {};

  if (req.query.difficulty) {
    filter.difficulty = req.query.difficulty;
  }
  if (req.query.topic) {
    filter.topic = req.query.topic;
  }

  try {
    const quiz = await QuizModel.aggregate()
      .match(filter)
      .sample(Number(req.params.count));
    res.json(quiz);
  } catch (error) {
    next(error);
  }
};

export const createQuiz = async (req, res, next) => {
  const quiz = new QuizModel(req.body);

  try {
    await quiz.save();
    res.json(quiz);
  } catch (error) {
    next(error);
  }
};

export const updateQuiz = async (req, res, next) => {
  const validId = mongoose.isValidObjectId(req.params.id);

  if (!validId) {
    const error = new Error(`Invalid id: ${req.params.id}`);
    res.status(400);
    return next(error);
  }

  try {
    const quiz = await QuizModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(quiz);
  } catch (error) {
    next(error);
  }
};

export const deleteQuiz = async (req, res, next) => {
  const valid = mongoose.isValidObjectId(req.params.id);

  if (!valid) {
    const error = new Error(`Invalid id: ${req.params.id}`);
    res.status(400);
    return next(error);
  }

  try {
    await QuizModel.findByIdAndDelete(req.params.id);
    res.json({ id: req.params.id });
  } catch (error) {
    next(err);
  }
};
