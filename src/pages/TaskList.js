import React, { useState } from 'react';
import FilterBar from '../components/FilterBar';
import TaskTable from '../components/TaskTable';

const TaskList = ({ tasks, loading, error, onUpdate, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState('Tất cả');

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div className="error">{error}</div>;

  // Logic gộp chung 2 điều kiện: Lọc theo tên và Lọc theo mức ưu tiên
  const filteredTasks = tasks.filter(task => {
    const matchSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchPriority = filterPriority === 'Tất cả' || task.priority === filterPriority;
    return matchSearch && matchPriority;
  });

  return (
    <div>
      <h2>Danh sách công việc</h2>
      <FilterBar 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm} 
        filterPriority={filterPriority} 
        onFilterChange={setFilterPriority} 
      />
      
      {filteredTasks.length > 0 ? (
        <>
          <p>Tìm thấy {filteredTasks.length} công việc</p>
          <TaskTable tasks={filteredTasks} onUpdate={onUpdate} onDelete={onDelete} />
        </>
      ) : (
        <p><strong>Không có dữ liệu</strong></p>
      )}
    </div>
  );
};

export default TaskList;