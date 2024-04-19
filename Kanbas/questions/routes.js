import * as dao from "./dao.js";

export default function QuestionRoutes(app) { 

     // create a new question
     const createQuestion = async (req, res) => {
        const question = await dao.createQuestion(req.body);
        res.json(question);
    };
    app.post("/api/questions", createQuestion);

    // delete an existing question
    const deleteQuestion = async (req, res) => {
        const status = await dao.deleteQuestion(req.params.questionId);
        res.json(status);
    };  
    app.delete("/api/questions/:questionId", deleteQuestion);

    // get a question by id 
    const findQuestionById = async (req, res) => {
        const question = await dao.findQuestionById(req.params.questionId);
        res.json(question);
    };    
    app.get("/api/questions/:questionId", findQuestionById);

    // get all questions for a given quiz
    const findAllQuizQuestions = async (req, res) => {
        try {
            const questions = await dao.findAllQuizQuestions(req.params.qid);
            if (!questions || questions.length === 0) {
                return res.status(404).send('No questions found for this quiz.');
            }
            res.json(questions);
        } catch (error) {
            console.error("Failed to fetch questions for quiz:", error);
            res.status(500).json({ error: error.message });
        }
    };
    app.get("/api/quizzes/:qid/questions", findAllQuizQuestions);
    
    // update a question
    const updateQuestion = async (req, res) => {
        console.log(req.body);
        const { questionId } = req.params;
        const status = await dao.updateQuestion(questionId, req.body);
        res.json(status);
    };
    app.put("/api/questions/:questionId", updateQuestion);
}