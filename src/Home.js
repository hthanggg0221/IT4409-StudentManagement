import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [stuClass, setStuClass] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/students')
      .then(response => setStudents(response.data))
      .catch(error => console.error("Lỗi khi fetch danh sách:", error));
  }, []);

  const handleAddStudent = (e) => {
    e.preventDefault();
    const newStu = { name, age: Number(age), class: stuClass };
    axios.post('http://localhost:5000/api/students', newStu)
      .then(res => {
        setStudents(prev => [...prev, res.data]);
        setName(""); setAge(""); setStuClass("");
      })
      .catch(err => console.error("Lỗi khi thêm:", err));
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa học sinh này?")) {axios.delete(`http://localhost:5000/api/students/${id}`)
            .then(res => {
                console.log(res.data.message);
                setStudents(prevList => prevList.filter(s => s._id !== id));
            })
            .catch(err => console.error("Lỗi khi xóa:", err));
    }
  };

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedStudents = [...filteredStudents].sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();

      if (nameA < nameB) return sortAsc ? -1 : 1;
      if (nameA > nameB) return sortAsc ? 1 : -1;
      return 0;
  });

  return (
    <div className="container">
      <h1>Hệ Thống Quản Lý Học Sinh</h1>

      <div className="form-card">
        <h3>Thêm Học Sinh Mới</h3>
        <form onSubmit={handleAddStudent} className="form-row">
          <input 
            type="text" 
            placeholder="Họ tên" 
            value={name} 
            onChange={e => setName(e.target.value)} 
            required 
            style={{flex: 2}}
          />
          <input 
            type="number" 
            placeholder="Tuổi" 
            value={age} 
            onChange={e => setAge(e.target.value)} 
            required 
            style={{flex: 0.5}}
          />
          <input 
            type="text" 
            placeholder="Lớp" 
            value={stuClass} 
            onChange={e => setStuClass(e.target.value)} 
            required 
            style={{flex: 1}}
          />
          <button type="submit" className="btn btn-add">Thêm mới</button>
        </form>
      </div>

      <div className="tools-container">
        <input 
            className="search-input"
            type="text" 
            placeholder="🔍 Nhập tên để tìm kiếm..." 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
        />
        
        <button 
            className="btn btn-sort"
            onClick={() => setSortAsc(prev => !prev)}
        >
            Sắp xếp: {sortAsc ? "A ➜ Z" : "Z ➜ A"}
        </button>
      </div>

      <table className="student-table">
        <thead>
          <tr>
            <th>Họ tên</th>
            <th>Tuổi</th>
            <th>Lớp</th>
            <th style={{width: '180px'}}>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {sortedStudents.length > 0 ? (
            sortedStudents.map((student) => (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{student.age}</td>
                <td>{student.class}</td>
                <td>
                  <Link to={`/edit/${student._id}`}>
                    <button className="btn btn-edit">Sửa</button>
                  </Link>
                  <button 
                      className="btn btn-delete"
                      onClick={() => handleDelete(student._id)} 
                  >
                      Xóa
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
                <td colSpan="4" className="empty-message">
                    Không tìm thấy dữ liệu phù hợp
                </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Home;