import * as dao from "./dao.js";

export default function QuizRoutes(app) {
    app.post("/api/courses/:courseId/quizzes", async (req, res) => {
        console.log("Creating new quiz with data:", req.body);  // Log incoming data
        try {
            const { courseId } = req.params;
            const quiz = await dao.createQuiz({ ...req.body, courseId });
            res.status(201).json(quiz);  // 201 Created
        } catch (error) {
            console.error("Error creating quiz: ", error);
            res.status(500).json({ error: error.message });
        }
    });

    app.delete("/api/quizzes/:quizId", async (req, res) => {
        try {
            const { quizId } = req.params;
            const status = await dao.deleteQuiz(quizId);
            if (status) {
                res.sendStatus(204);
            } else {
                res.sendStatus(404);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.get("/api/quizzes", async (req, res) => {
        try {
            const quizzes = await dao.findAllQuizzes();
            res.json(quizzes);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.get("/api/quizzes/:quizId", async (req, res) => {
        try {
            const { quizId } = req.params;
            const quiz = await dao.findQuizById(quizId);
            if (quiz) {
                res.json(quiz);
            } else {
                res.sendStatus(404);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.get("/api/courses/:courseId/quizzes", async (req, res) => {
        try {
            const { courseId } = req.params;
            const quizzes = await dao.findAllCourseQuizzes(courseId);
            res.json(quizzes);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.put("/api/quizzes/:quizId", async (req, res) => {
        try {
            const { quizId } = req.params;
            const status = await dao.updateQuiz(quizId, req.body);
            if (status) {
                res.sendStatus(204);
            } else {
                res.sendStatus(404);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
};