import express from 'express';
import fs from 'fs';

const app = express();
const port = 5000;

app.use(express.json());

// GET endpoint to retrieve all students
app.get('/students', (req, res) => {
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      const students = JSON.parse(data);
      res.json(students);
    }
  });
});

// POST endpoint to add a new student
app.post('/students', (req, res) => {
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      const students = JSON.parse(data);
      const newStudent = req.body;
      students.push(newStudent);
      fs.writeFile('data.json', JSON.stringify(students), (err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
        } else {
          res.status(201).send('Student added successfully');
        }
      });
    }
  });
});

// PUT endpoint to update a student
app.put('/students/:id', (req, res) => {
  const studentId = req.params.id;
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      const students = JSON.parse(data);
      const updatedStudent = req.body;
      const index = studentId - 1;
      if (index === -1) {
        res.status(404).send('Student not found');
      } else {
        students[index] = updatedStudent;
        fs.writeFile('data.json', JSON.stringify(students), (err) => {
          if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
          } else {
            res.send('Student updated successfully');
          }
        });
      }
    }
  });
});

// DELETE endpoint to delete a student
app.delete('/students/:id', (req, res) => {
  const studentId = req.params.id;
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      const students = JSON.parse(data);
      const index = studentId - 1;
      if (index === -1) {
        res.status(404).send('Student not found');
      } else {
        students.splice(index, 1);
        fs.writeFile('data.json', JSON.stringify(students), (err) => {
          if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
          } else {
            res.send('Student deleted successfully');
          }
        });
      }
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
