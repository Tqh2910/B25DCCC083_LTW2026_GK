import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PRIORITIES } from '../data';

const AddTask = ({ onAdd, currentTasks }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [assignee, setAssignee] = useState('');
  const [priority, setPriority] = useState('Trung bình'); // Mặc định Trung bình
  const [hours, setHours] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Chặn load lại trang
    
    // 1. Kiểm tra ô trống
    if (!title.trim() || !assignee.trim() || !hours) {
      setError('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    // 2. Kiểm tra số giờ (từ 1 đến 40)
    const numHours = Number(hours);
    if (!Number.isInteger(numHours) || numHours < 1 || numHours > 40) {
      setError('Số giờ phải từ 1 đến 40');
      return;
    }

    // Lấy ID lớn nhất hiện tại cộng 1 (nếu mảng rỗng thì ID = 1)
    const maxId = currentTasks.length > 0 ? Math.max(...currentTasks.map(t => t.id)) : 0;

    const newTask = {
      id: maxId + 1,
      title: title.trim(),
      assignee: assignee.trim(),
      priority,
      hours: numHours,
      done: false // Mặc định Đang làm
    };

    onAdd(newTask);
    
    // Chuyển về trang Danh sách (dùng replace: true để ngăn nút Back quay lại form)
    navigate('/tasks', { replace: true });
  };

  return (
    <div>
      <h2>Thêm công việc mới</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="title">Tên công việc: </label>
          <input id="title" type="text" value={title} onChange={e => setTitle(e.target.value)} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="assignee">Người làm: </label>
          <input id="assignee" type="text" value={assignee} onChange={e => setAssignee(e.target.value)} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="priority">Mức ưu tiên: </label>
          <select id="priority" value={priority} onChange={e => setPriority(e.target.value)}>
            {PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="hours">Số giờ ước tính: </label>
          <input id="hours" type="number" value={hours} onChange={e => setHours(e.target.value)} />
        </div>
        
        {error && <div className="error" style={{ marginBottom: '10px' }}>{error}</div>}
        
        <button type="submit">Thêm</button>
      </form>
    </div>
  );
};

export default AddTask;