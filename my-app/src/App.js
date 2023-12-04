import './App.css';
import {useState} from 'react';


function App() {
  
  const [students, setStudents] = useState([
  {
    id: 1,
    rollNo: 12,
    name: "Dawood",
    age: 18,
    grade: "12th",
    address: "Shoukat Town, Ghakhar Mandi"
  },
  {
    id: 2,
    rollNo: 14,
    name: "Ahmad",
    age: 20,
    grade: "12th",
    address: "Small Industrial Area, Model Town"
  },
  {
    id: 3,
    rollNo: 13,
    name: "Huzaifa",
    age: 21,
    grade: "14th",
    address: "Main Bazaar, Khayli Bypass Rd"
  },
  {
    id: 4,
    rollNo: 9,
    name: "Ahsan",
    age: 22,
    grade: "14th",
    address: "Iqbal Town, Rahwali"
  },
  {
    id: 5,
    rollNo: 4,
    name: "Usama",
    age: 19,
    grade: "11th",
    address: "7th Street, Gill Road"
  },
  {
    id: 6,
    rollNo: 8,
    name: "Maarij",
    age: 19,
    grade: "13th",
    address: "6th Street, Gill Road"
  }
]);
const [selectedStudent, setSelectedStudent] = useState(null);
const [rollNo, setRollNo] = useState("");
const [name, setName] = useState("");
const [age, setAge] = useState("");
const [grade, setGrade] = useState("");
const [address, setAddress] = useState("");

const handleAddStudent = (event) => {
  event.preventDefault();
  const newStudent = {
    id: students.length +1,
    rollNo: rollNo,
    name: name,
    age: age,
    grade: grade,
    address: address
  }
  setStudents([...students, newStudent]);
  setRollNo("");
  setName("");
  setAge("");
  setGrade("");
  setAddress("");

};
const handleStudentClick = (student) => {
  setSelectedStudent(student);
  setRollNo(student.rollNo);
  setName(student.name);
  setAge(student.age);
  setGrade(student.grade);
  setAddress(student.address);
};
const handleUpdateStudent = (event) => {
  event.preventDefault();
  if(!selectedStudent){
    return;
  }
  const updatedStudent = {
    id: selectedStudent.id,
    rollNo: rollNo,
    name: name,
    age: age,
    grade: grade,
    address: address
  };
  const updatedStudents = students.map((student) => (student.id === selectedStudent.id ? updatedStudent : student));

  setStudents(updatedStudents);
  setRollNo("");
  setName("");
  setAge("");
  setGrade("");
  setAddress("");
  setSelectedStudent(null);
};
const handleDelete = (event, studentId) => {
 event.stopPropagation();
 const updatedStudents = students.filter((student) => student.id !== studentId);
 setStudents(updatedStudents);
};
const handleCancel = () => {
  setRollNo("");
  setName("");
  setAge("");
  setGrade("");
  setAddress("");
  setSelectedStudent(null);
};


  return (
    <div>
    <header className="app-header">
        Add & Drop Students
    </header>
    <div className="app-container">
      <div className="student-form">
        <form onSubmit={(event) => (selectedStudent? handleUpdateStudent(event) : handleAddStudent(event))}>
          <input value={rollNo} onChange={(event) => setRollNo(event.target.value)} placeholder="Roll No" type="number" id="rollNo" name="rollNo" required/><br/><br/>
          <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Name" type="text" id="name" name="name" required/><br/><br/>
          <input value={age} onChange={(event) => setAge(event.target.value)} placeholder="Age" type="number" id="age" name="age" required/><br/><br/>
          <input value={grade} onChange={(event) => setGrade(event.target.value)} placeholder="Grade" type="text" id="grade" name="grade" required/><br/><br/>
          <input value={address} onChange={(event) => setAddress(event.target.value)} placeholder="Address" type="text" id="address" name="address" required/><br/><br/>
          {selectedStudent ? (
            <div className="edit-buttons">
              <button type="submit">Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
            ) : (<button type="submit">Add Note</button>)}
        </form>
      </div>

      <div className="students-grid">
        {students.map((student) => (
          <div key={student.id} className="student-item" onClick={() => handleStudentClick(student)}>
            <div className="student-header">
            <button onClick={(event) => handleDelete(event, student.id)}>❌</button>
            </div>
            <h2>{student.name}</h2>
            <hr/>
            <p><strong>Student Details:</strong></p><br/>
            <p>Roll No: {student.rollNo}</p>
            <p>Age: {student.age}</p>
            <p>Grade: {student.grade}</p>
            <p>Address: {student.address}</p>
          </div>
        ))}
    </div>
    </div>
    </div>
  );
}

export default App;
