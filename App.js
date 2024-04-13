import express from "express";
import cors from "cors";
import session from "express-session";
import mongoose from "mongoose";
import "dotenv/config";

import UserRoutes from "./Users/routes.js";
import ModuleRoutes from "./Kanbas/modules/routes.js";
import CourseRoutes from "./Kanbas/courses/routes.js";
import AssignmentRoutes from "./Kanbas/assignments/routes.js";
import Hello from "./Hello.js";
import Lab5 from "./Lab5.js";

const app = express();

const whitelist = ['http://localhost:3000', "https://661aba5ae725fd0008fc7cdc--stalwart-faun-996db6.netlify.app"];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};


app.use(cors(corsOptions));
app.use(express.json());

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas";
mongoose.connect(CONNECTION_STRING);
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

UserRoutes(app);
ModuleRoutes(app);
CourseRoutes(app);
AssignmentRoutes(app);
Hello(app);
Lab5(app);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

