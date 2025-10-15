const express = require('express');
const router = express.Router();

let tasks = [
  { id: 1, title: "Learn CI/CD", completed: false },
  { id: 2, title: "Build small Node app", completed: true }
];

// GET all tasks
router.get('/', (req, res) => res.json(tasks));

// POST new task
router.post('/', (req, res) => {
  const { title } = req.body;
  const newTask = { id: tasks.length + 1, title, completed: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT update task
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  const task = tasks.find(t => t.id == id);
  if (!task) return res.status(404).send('Task not found');
  task.completed = completed;
  res.json(task);
});

// DELETE task
router.delete('/:id', (req, res) => {
  tasks = tasks.filter(t => t.id != req.params.id);
  res.sendStatus(204);
});

module.exports = router;
