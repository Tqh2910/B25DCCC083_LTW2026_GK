import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Layout from './components/Layout';
import Home from './pages/Home';
import TaskList from './pages/TaskList';
import AddTask from './pages/AddTask';
import TaskDetail from './pages/TaskDetail';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Tải dữ liệu API theo chuẩn đề bài
  useEffect(() => {
    const controller = new AbortController();
    const localTasks = localStorage.getItem('gk_tasks');

    if (localTasks) {
      setTasks(JSON.parse(localTasks));
      setLoading(false);
    } else {
      axios.get('/data/tasks.json', { signal: controller.signal })
        .then(res => {
          setTasks(res.data);
          setLoading(false);
        })
        .catch(err => {
          if (!axios.isCancel(err)) {
            setError('Không tải được dữ liệu.');
            setLoading(false);
          }
        });
    }
    return () => controller.abort(); // Cleanup unmounting
  }, []);

  // Cập nhật LocalStorage mỗi khi tasks thay đổi
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('gk_tasks', JSON.stringify(tasks));
    }
  }, [tasks, loading]);

  // Các hàm xử lý
  const addTask = (newTask) => setTasks([...tasks, newTask]);
  const updateTask = (updatedTask) => setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
  const deleteTask = (id) => setTasks(tasks.filter(t => t.id !== id));

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home tasks={tasks} loading={loading} error={error} />} />
        <Route path="tasks" element={<TaskList tasks={tasks} onUpdate={updateTask} onDelete={deleteTask} loading={loading} error={error} />} />
        <Route path="tasks/new" element={<AddTask onAdd={addTask} currentTasks={tasks} />} />
        <Route path="tasks/:id" element={<TaskDetail tasks={tasks} />} />
      </Route>
    </Routes>
  );
};

export default App;