import express from 'express';
import studentsRouter from './routes/students.js';
import cors from 'cors';


const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

app.use('/', studentsRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
