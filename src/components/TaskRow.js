import React from 'react';
import { Link } from 'react-router-dom';

const TaskRow = ({ task, onUpdate, onDelete }) => {
  const toggleStatus = () => {
    onUpdate({ ...task, done: !task.done });
  };

  return (
    <tr>
      <td className={task.done ? 'done' : ''}>
        <Link to={`/tasks/${task.id}`}>{task.title}</Link>
      </td>
      <td>{task.assignee}</td>
      <td>{task.priority}</td>
      <td>{task.hours}</td>
      <td>{task.done ? 'Đã xong' : 'Đang làm'}</td>
      <td>
        <button onClick={toggleStatus}>
          {task.done ? 'Làm lại' : 'Hoàn thành'}
        </button>
        <button onClick={() => onDelete(task.id)} style={{ marginLeft: '5px' }}>
          Xóa
        </button>
      </td>
    </tr>
  );
};

export default TaskRow;