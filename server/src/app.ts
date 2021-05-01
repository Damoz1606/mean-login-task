import express from 'express';
import morgan from  'morgan';
import cors from 'cors';
import mongoose from 'mongoose';

import { mongoURL } from './config/database';
import UserRouter from './app/routes/user.routes';
import TaskRouter from './app/routes/task.routes';

const app = express();

//database
mongoose.connect(mongoURL(), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(() => { console.log("Mongo server ready") })
.catch(error => console.log(error));

//settings
app.set("port", process.env.PORT || 3000);

//middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//routes
app.use("/api/user", UserRouter);
app.use("/api/task", TaskRouter);

//static

export default app;