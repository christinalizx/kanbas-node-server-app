import express from 'express';
import cors from 'cors';
import Hello from './Hello.js';
import Lab5 from './Lab5.js';
import CourseRoutes from "./Kanbas/courses/routes.js";
import ModuleRoutes from "./Kanbas/modules/routes.js";
import AssignmentRoutes from "./Kanbas/assignments/routes.js";
import mongoose from "mongoose";
import UserRoutes from "./Users/routes.js";

const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect("mongodb://127.0.0.1:27017/kanbas");
mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to db.');
  });
  
  mongoose.connection.on('error', (err) => {
    console.log('Mongoose connection error: ', err);
  });
  
UserRoutes(app);
ModuleRoutes(app);
CourseRoutes(app);
AssignmentRoutes(app);
Hello(app);
Lab5(app);
app.listen(4000);