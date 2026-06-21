const express = require('express');
const router = express.Router();

let tasks = [];
let nextId = 1;

router.get('/', (req, res) => {
  res.json(tasks);
});

router.post('/', (req, res) => {
  const { title, description, priority } = req.body;

  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });
  }

  const validPriorities = ['High', 'Medium', 'Low'];
  if (priority && !validPriorities.includes(priority)) {
    return res.status(400).json({ error: 'Invalid priority: must be Low, Medium or High' });
  }

  const newTask = {
    id: nextId++,
    title: title.trim(),
    description: (description || '').trim(),
    completed: false,
    createdAt: new Date(),
    priority: priority || 'Medium'
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const { title, description, completed, priority } = req.body;

  if (title !== undefined) {
    if (title.trim() === '') {
      return res.status(400).json({ error: 'Title cant be empty' });
    }
    task.title = title.trim();
  }

  if (description !== undefined) {
    if (description.trim() === '') {
      return res.status(400).json({ error: 'Description cant be empty' });
    }
    task.description = description.trim();
  }

  if (completed !== undefined) {
    task.completed = completed;
  }

  if (priority !== undefined) {
    const validPriorities = ['High', 'Medium', 'Low'];
    if (!validPriorities.includes(priority)) {
      return res.status(400).json({ error: 'Invalid priority: must be Low, Medium or High' });
    }
    task.priority = priority;
  }

  res.json(task);
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(t => t.id === id);
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  tasks.splice(taskIndex, 1);
  res.status(204).end();
});

router.patch('/:id/toggle', (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  task.completed = !task.completed;
  res.json(task);
});

router.resetTasks = () => {
  tasks = [];
  nextId = 1;
};

module.exports = router;
