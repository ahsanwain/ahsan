import express from 'express';
import studentsRouter from './routes/students.js';
import authRouter from './routes/auth.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import mongoose from 'mongoose';


const app = express();
const port = 5000;
import './Database/index.js';

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(
  session({
    secret: "SDJWOD328UD8W37DO12876DNAJSDHU327EPKLKAJSDH",
    resave: false,
    saveUninitialized: true,
  })
);

app.use('/', authRouter);

app.use( (req, res, next) => {
  if(req.session.user){
    next();
  } else {
    res.send(401);
  }
});


app.use('/', studentsRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
