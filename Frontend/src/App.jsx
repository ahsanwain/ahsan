import "./App.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [rollNo, setRollNo] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const getStudents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/students");
      const students = response.data;
      setStudents(students);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  const handleAddStudent = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/students", {
        id: uuidv4(),
        rollNo: rollNo,
        name: name,
        age: age,
        email: email,
        address: address,
      });
      const newStudent = response.data;
      setStudents([...students, newStudent]);
      setRollNo("");
      setName("");
      setAge("");
      setEmail("");
      setAddress("");
    } catch (error) {
      console.log(error);
    }
  };
  const handleStudentClick = (student) => {
    setSelectedStudent(student);
    setRollNo(student.rollNo);
    setName(student.name);
    setAge(student.age);
    setEmail(student.email);
    setAddress(student.address);
  };
  const handleUpdateStudent = async (event) => {
    event.preventDefault();
    if (!selectedStudent) {
      return;
    }
    try {
      const response = await axios.put(
        `http://localhost:5000/students/${selectedStudent.id}`,
        {
          id: selectedStudent.id,
          rollNo: rollNo,
          name: name,
          age: age,
          email: email,
          address: address,
        }
      );
      const updatedStudent = response.data;
      console.log(updatedStudent);
      const updatedStudents = students.map((student) =>
        student.id === selectedStudent.id ? updatedStudent : student
      );
      setStudents(updatedStudents);
      setRollNo("");
      setName("");
      setAge("");
      setEmail("");
      setAddress("");
      setSelectedStudent(null);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (event, studentId) => {
    event.stopPropagation();
    try {
      await axios.delete(`http://localhost:5000/students/${studentId}`);

      const updatedStudents = students.filter(
        (student) => student.id !== studentId
      );
      setStudents(updatedStudents);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCancel = () => {
    setRollNo("");
    setName("");
    setAge("");
    setEmail("");
    setAddress("");
    setSelectedStudent(null);
  };

  return (
    <div>
      {console.log("Hello World")}
      <header className="app-header">Add & Drop Students</header>
      <div className="app-container">
        <div className="student-form">
          <form
            onSubmit={(event) =>
              selectedStudent
                ? handleUpdateStudent(event)
                : handleAddStudent(event)
            }
            method="POST"
          >
            <input
              value={rollNo}
              onChange={(event) => setRollNo(event.target.value)}
              placeholder="Roll No"
              type="number"
              id="rollNo"
              name="rollNo"
              required
            />
            <br />
            <br />
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Name"
              type="text"
              id="name"
              name="name"
              required
            />
            <br />
            <br />
            <input
              value={age}
              onChange={(event) => setAge(event.target.value)}
              placeholder="Age"
              type="number"
              id="age"
              name="age"
              required
            />
            <br />
            <br />
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="email"
              type="text"
              id="email"
              name="email"
              required
            />
            <br />
            <br />
            <input
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              placeholder="Address"
              type="text"
              id="address"
              name="address"
              required
            />
            <br />
            <br />
            {selectedStudent ? (
              <div className="edit-buttons">
                <button type="submit">Save</button>
                <button onClick={handleCancel}>Cancel</button>
              </div>
            ) : (
              <button type="submit">Add Note</button>
            )}
          </form>
        </div>

        <div className="students-grid">
          {students.map((student) => (
            <div
              key={student.id}
              className="student-item"
              onClick={() => handleStudentClick(student)}
            >
              <div className="student-header">
                <button onClick={(event) => handleDelete(event, student.id)}>
                  ❌
                </button>
              </div>
              <h1>{student.name}</h1>
              <p>{student.id}</p>
              <hr />
              <p>
                <strong>Student Details:</strong>
              </p>
              <br />
              <p>Roll No: {student.rollNo}</p>
              <p>Age: {student.age}</p>
              <p>Email: {student.email}</p>
              <p>Address: {student.address}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
