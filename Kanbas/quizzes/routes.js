import * as dao from "./dao.js";

export default function QuizRoutes(app) {
    const createQuiz = async (req, res) => {
        const { courseId } = req.params;
        const quiz = await dao.createQuiz({ ...req.body, courseId: courseId });
        res.json(quiz);
    };
    app.post("/api/courses/:courseId/quizzes", createQuiz);


    const deleteQuiz = async (req, res) => {
        const status = await dao.deleteQuiz(req.params.quizId);
        res.json(status);
    };  
    app.delete("/api/quizzes/:quizId", deleteQuiz);


     const findAllQuizzes = async (req, res) => {
        const quizzes = await dao.findAllQuizzes();
        res.json(quizzes);
    };
    app.get("/api/quizzes", findAllQuizzes);


    const findQuizById = async (req, res) => {
        const quiz = await dao.findQuizById(req.params.quizId);
        res.json(quiz);
    };    
    app.get("/api/quizzes/:quizId", findQuizById);

    const findQuizzeByCourseId = async (req, res) => {
        const quizzes = await dao.findAllCourseQuizzes(req.params.courseId);
        res.json(quizzes);
    };    
    app.get("/api/courses/:courseId/quizzes", findQuizzeByCourseId);


    const updateQuiz = async (req, res) => {
        const { quizId } = req.params;
        const status = await dao.updateQuiz(quizId, req.body);
        res.json(status);
    };
    app.put("/api/quizzes/:quizId", updateQuiz);
};