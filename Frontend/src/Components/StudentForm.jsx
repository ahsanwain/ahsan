import React from 'react'

function StudentForm({
    rollNo,
    name,
    age,
    email,
    address,
    handleInputChange,
    handleSubmit,
    handleCancel,
    selectedStudent}) {
  return (
    <div className="student-form">
          <form
            onSubmit={(event) => handleSubmit(event)}
            method="POST"
          >
            <input
              value={rollNo}
              onChange={(event) => handleInputChange(event)}
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
              onChange={(event) => handleInputChange(event)}
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
              onChange={(event) => handleInputChange(event)}
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
              onChange={(event) => handleInputChange(event)}
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
              onChange={(event) => handleInputChange(event)}
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

  )
}

export default StudentForm