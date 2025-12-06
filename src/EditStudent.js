import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './App.css';

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [stuClass, setStuClass] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:5000/api/students/${id}`)
      .then(res => {
          setName(res.data.name);
          setAge(res.data.age);
          setStuClass(res.data.class);
      })
      .catch(err => console.error("Lỗi load data:", err));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedInfo = { name, age: Number(age), class: stuClass };

    axios.put(`http://localhost:5000/api/students/${id}`, updatedInfo)
      .then(res => {
        console.log("Đã cập nhật:", res.data);
        navigate("/");
      })
      .catch(err => console.error("Lỗi khi cập nhật:", err));
  };

  return (
    <div className="container">
      <h2>Chỉnh Sửa Thông Tin</h2>
      
      <div className="form-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <form onSubmit={handleUpdate}>
          <div className="form-group" style={{ marginBottom: '15px' }}>
              <label>Họ tên:</label>
              <input 
                type="text" 
                value={name} 
                onChange={e => setName(e.target.value)} 
                required 
              />
          </div>
          
          <div className="form-group" style={{ marginBottom: '15px' }}>
              <label>Tuổi:</label>
              <input 
                type="number" 
                value={age} 
                onChange={e => setAge(e.target.value)} 
                required 
              />
          </div>
          
          <div className="form-group" style={{ marginBottom: '15px' }}>
              <label>Lớp:</label>
              <input 
                type="text" 
                value={stuClass} 
                onChange={e => setStuClass(e.target.value)} 
                required 
              />
          </div>

          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <button type="submit" className="btn btn-save">Lưu thay đổi</button>
            <button 
                type="button" 
                className="btn btn-cancel" 
                onClick={() => navigate("/")}
            >
                Hủy bỏ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditStudent;