import React from 'react';

const Home = ({ tasks, loading, error }) => {
  if (loading) return <div>Đang tải...</div>;
  if (error) return <div className="error">{error}</div>;

  const totalTasks = tasks.length;
  const doneTasks = tasks.filter(t => t.done).length;
  
  // Dùng reduce để tính tổng số giờ còn lại (của các việc chưa xong)
  const remainingHours = tasks.reduce((total, task) => {
    return !task.done ? total + task.hours : total;
  }, 0);

  return (
    <div>
      <h2>Công việc nhóm</h2>
      <p><strong>Tổng số công việc:</strong> {totalTasks}</p>
      <p><strong>Số công việc đã xong:</strong> {doneTasks}</p>
      <p><strong>Tổng số giờ còn lại:</strong> {remainingHours}</p>
    </div>
  );
};

export default Home;