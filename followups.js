const express = require('express');
const router = express.Router();

let followups = [];
let nextId = 1;

// GET all follow-ups
router.get('/', (req, res) => {
  res.json(followups);
});

// GET overdue follow-ups
router.get('/overdue', (req, res) => {
  const now = new Date();
  const overdue = followups.filter(
    f => new Date(f.due_date) < now && f.task_status !== 'Completed'
  );
  res.json(overdue);
});

// POST create follow-up task
router.post('/', (req, res) => {
  const { appointment_id, client_id, description, priority, due_date } = req.body;
  if (!appointment_id || !description || !due_date) {
    return res.status(400).json({ message: 'appointment_id, description, and due_date are required' });
  }

  const newFollowup = {
    id: nextId++,
    appointment_id,
    client_id,
    description,
    priority: priority || 'Medium', // Low, Medium, High
    due_date,
    task_status: 'Pending', // Pending, In Progress, Completed
    created_at: new Date().toISOString()
  };

  followups.push(newFollowup);
  res.status(201).json(newFollowup);
});

// PUT update follow-up status
router.put('/:id', (req, res) => {
  const index = followups.findIndex(f => f.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Follow-up not found' });
  followups[index] = { ...followups[index], ...req.body };
  res.json(followups[index]);
});

module.exports = router;
