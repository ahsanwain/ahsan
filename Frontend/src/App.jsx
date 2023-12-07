import "./App.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import StudentForm from "./Components/StudentForm";
import StudentList from "./Components/StudentList";

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
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "rollNo":
        setRollNo(value);
        break;
      case "name":
        setName(value);
        break;
      case "age":
        setAge(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "address":
        setAddress(value);
        break;
      default:
        break;
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedStudent) {
      handleUpdateStudent(event);
    } else {
      handleAddStudent(event);
    }
  };

  return (
    <div>
      <header className="app-header">Add & Drop Students</header>
      <div className="app-container">
        <StudentForm
          rollNo={rollNo}
          name={name}
          age={age}
          email={email}
          address={address}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
          selectedStudent={selectedStudent}
        />
        <StudentList
          students={students}
          handleStudentClick={handleStudentClick}
          handleDelete={handleDelete}
        />
      </div>

    </div>
  );
}

export default App;
