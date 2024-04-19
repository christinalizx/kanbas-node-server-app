import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
    title: { type: String, required: true, default: 'New Quiz' },
    quizType: {
        type: String,
        enum: ["Graded Quiz", "Practice Quiz", "Graded Survey", "Ungraded Survey"],
        default: "Graded Quiz",
    },
    points: { type: Number, default: 0 },
    assignmentGroup: { 
        type: String, 
        enum: ['Quizzes', 'Exams', 'Assignments', 'Projects'], 
        default: 'Quizzes' 
    },
    shuffleAnswers: { type: Boolean, default: true },
    timeLimit: { type: Number, default: 20 },
    multipleAttempts: { type: Boolean, default: false },
    showCorrectAnswers: { type: Boolean, default: false },
    accessCode: { type: String, default: '' },
    oneQuestionAtATime: { type: Boolean, default: true },
    webcamRequired: { type: Boolean, default: false },
    lockQuestionsAfterAnswering: { type: Boolean, default: false },
    dueDate: { type: Date },
    availableDate: { type: Date },
    untilDate: { type: Date },
    courseId: { type: String, required: true },
    published: { type: Boolean, default: false },
}, {
    collection: "quizzes"
});

export default quizSchema;