import React from 'react'

const Table = () => {
  const data = [
    { name: 'John Doe', email: 'john@example.com', age: 30, contact: '123-456-7890' },
    { name: 'Jane Smith', email: 'jane@example.com', age: 25, contact: '098-765-4321' },
    { name: 'Bob Johnson', email: 'bob@example.com', age: 35, contact: '555-123-4567' },
  ]

  return (
    <table border={1} style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Age</th>
          <th>Contact</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td>{row.name}</td>
            <td>{row.email}</td>
            <td>{row.age}</td>
            <td>{row.contact}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table
