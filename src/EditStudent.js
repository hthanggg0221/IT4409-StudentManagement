import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditStudent() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [stuClass, setStuClass] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:5000/api/students/${id}`)
            .then(res => {
                const student = res.data.find(s => s._id === id);
                if (student) {
                    setName(student.name);
                    setAge(student.age);
                    setStuClass(student.class);
                }
            })
            .catch(err => console.error(err));
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
        <div style={{ padding: "20px" }}>
            <h2>Chỉnh sửa thông tin học sinh</h2>
            <form onSubmit={handleUpdate}>
                <div>
                    <label>Họ tên: </label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} required />
                </div>
                <div style={{ marginTop: "10px" }}>
                    <label>Tuổi: </label>
                    <input type="number" value={age} onChange={e => setAge(e.target.value)} required />
                </div>
                <div style={{ marginTop: "10px" }}>
                    <label>Lớp: </label>
                    <input type="text" value={stuClass} onChange={e => setStuClass(e.target.value)} required />
                </div>
                <button type="submit" style={{ marginTop: "20px" }}>Lưu thay đổi</button>
            </form>
        </div>
    );
}

export default EditStudent;