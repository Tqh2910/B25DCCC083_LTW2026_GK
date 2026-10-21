import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import WorkTimer from '../components/WorkTimer';

const TaskDetail = ({ tasks }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Tìm công việc (Chuyển id từ URL sang kiểu Number)
  const task = tasks.find(t => t.id === Number(id));

  // Nếu người dùng gõ link bậy bạ (ví dụ /tasks/99)
  if (!task) {
    return <div><strong>Không tìm thấy công việc.</strong></div>;
  }

  return (
    <div>
      <h2>Chi tiết công việc</h2>
      <p><strong>Tên công việc:</strong> {task.title}</p>
      <p><strong>Người làm:</strong> {task.assignee}</p>
      <p><strong>Mức ưu tiên:</strong> {task.priority}</p>
      <p><strong>Số giờ:</strong> {task.hours}</p>
      <p><strong>Trạng thái:</strong> {task.done ? 'Đã xong' : 'Đang làm'}</p>
      
      {/* Hiện bộ đếm thời gian */}
      <WorkTimer />
      
      <button onClick={() => navigate(-1)} style={{ marginTop: '15px' }}>
        Quay lại
      </button>
    </div>
  );
};

export default TaskDetail;