import React from 'react'
import StudentItem from './StudentItem'

function StudentList({ 
    students, 
    handleStudentClick, 
    handleDelete })
{
  return (
    
    <div className="students-grid">
      {students.map((student) => (
        <StudentItem
          key={student.id}
          student={student}
          handleStudentClick={handleStudentClick}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
}

export default StudentList