import model from "./model.js";


export const createQuestion = (question) => model.create(question);
export const findAllQuizQuestions = (quizId) => model.find({quizId: quizId});
export const findQuestionById = (questionId) => model.findById(questionId);
export const updateQuestion = (questionId, question) =>  model.updateOne({ _id: questionId }, { $set: question });
export const deleteQuestion = (questionId) => model.deleteOne({ _id: questionId });