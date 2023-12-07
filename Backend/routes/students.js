import { Router } from "express";
import { students } from "../data.js";

const router = Router();


// GET endpoint to retrieve all students
router.get('/students', (req, res) => {
    res.json(students);
  });
  
  // POST endpoint to add a new student
  router.post('/students', (req, res) => {
    const newStudent = req.body;
    students.push(newStudent);
    res.send(newStudent);
  });
  
  // PUT endpoint to update a student
  router.put('/students/:id', (req, res) => {
    const studentId = req.params.id;
    const index = students.findIndex((student) => student.id === studentId);
    const updatedStudent = req.body;

    if(index !== -1){
      students[index] = updatedStudent;
      res.send(updatedStudent);
    } else {
      res.status(404).send('Student not found');
    }
  });
  
  // DELETE endpoint to delete a student
  router.delete('/students/:id', (req, res) => {
    const studentId = req.params.id;
    const index = students.findIndex((student) => student.id === studentId);
        if (index === -1) {
          res.status(404).send('Student not found');
        } else {
              students.splice(index, 1);
              res.send(students);
            }
  });
    
  
  export default router;