import express from "express";
import cors from "cors";
import session from "express-session";
import mongoose from "mongoose";
import "dotenv/config";

import UserRoutes from "./Users/routes.js";
import ModuleRoutes from "./Kanbas/modules/routes.js";
import CourseRoutes from "./Kanbas/courses/routes.js";
import AssignmentRoutes from "./Kanbas/assignments/routes.js";
import QuizRoutes from "./Kanbas/quizzes/routes.js";
import Hello from "./Hello.js";
import Lab5 from "./Lab5.js";

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Database connection
mongoose.connect("mongodb+srv://zixi:1L2z3x456@cluster0.jerqkvg.mongodb.net/kanbas?retryWrites=true&w=majority");
mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to db.");
});
mongoose.connection.on("error", err => {
  console.log("Mongoose connection error: ", err);
});

// Session configuration
const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {}
};

if (process.env.NODE_ENV === "production") {
  sessionOptions.cookie.secure = true; // Serve secure cookies
  sessionOptions.cookie.sameSite = 'none';
}

app.use(session(sessionOptions));

// Routes
UserRoutes(app);
ModuleRoutes(app);
CourseRoutes(app);
AssignmentRoutes(app);
QuizRoutes(app);
Hello(app);
Lab5(app);

// Start the server
app.listen(process.env.PORT || 4000, () => {
  console.log('Server is running on http://localhost:4000');
});
