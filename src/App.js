import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:5000/api/students')
      .then(response => setStudents(response.data))
      .catch(error => console.error("Lỗi khi fetch danh sách:", error));
  }, []);
  return (
    <div className="App" style={{ padding: "20px" }}>
      <h1>Danh sách học sinh</h1>
      
      {/* Kiểm tra nếu chưa có dữ liệu */}
      {students.length === 0 ? (
        <p>Chưa có học sinh nào trong danh sách.</p>
      ) : (
        <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th>Họ tên</th>
              <th>Tuổi</th>
              <th>Lớp</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{student.age}</td>
                <td>{student.class}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
