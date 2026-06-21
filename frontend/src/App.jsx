import { useState, useEffect } from 'react';
import { fetchTasks, createTask, updateTask, deleteTask, toggleTask } from './services/api';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskFilter from './components/TaskFilter';
import '../styles/App.css';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState('all');
  const [sort, setSort] = useState('default');

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const taskData = await fetchTasks();
      setTasks(taskData);
    } catch (err) {
      setError('Failed to load tasks. Is the server running?');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const filteredTasks = tasks
    .filter(task => {
      if (filters === 'completed') return task.completed;
      if (filters === 'pending') return !task.completed;
      return true;
    })
    .sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      switch (sort) {
        case 'priority':
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        case 'date':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  const handleCreate = async (title, description, priority) => {
    try {
      await createTask(title, description, priority);
      await loadTasks();
    } catch (err) {
      setError('Failed to create task');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }
    try {
      await deleteTask(id);
      await loadTasks();
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  const handleUpdate = async (id, updates) => {
    try {
      await updateTask(id, updates);
      setEditingTask(null);
      await loadTasks();
    } catch (err) {
      setError('Failed to update task');
    }
  };

  const handleToggle = async (id) => {
    try {
      await toggleTask(id);
      await loadTasks();
    } catch (err) {
      setError('Failed to toggle task');
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  return (
    <div className="app">
      <h1>Task Manager</h1>

      {error && <p className="error">{error}</p>}

      <TaskForm onCreate={handleCreate} onUpdate={handleUpdate} onCancel={handleCancelEdit} editingTask={editingTask} />

      <TaskFilter filters={filters} onFilterChange={setFilters} sort={sort} onSortChange={setSort} />

      {loading ? (
        <p className="loading">Loading tasks...</p>
      ) : (
        <TaskList
          tasks={filteredTasks}
          onDelete={handleDelete}
          onToggle={handleToggle}
          onEdit={handleEdit}
        />
      )}
    </div>
  );
}
