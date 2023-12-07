import React from "react";

function StudentItem({ student, handleStudentClick, handleDelete })
{
  return (
    <div className="student-item" onClick={() => handleStudentClick(student)}>
      <div className="student-header">
        <button onClick={(event) => handleDelete(event, student.id)}>❌</button>
      </div>
      <div>
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
    </div>
  );
};

export default StudentItem;
