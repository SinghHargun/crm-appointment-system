const express = require('express');
const router = express.Router();

// In-memory store (replace with PostgreSQL in production)
let clients = [];
let nextId = 1;

// GET all clients
router.get('/', (req, res) => {
  res.json(clients);
});

// GET single client
router.get('/:id', (req, res) => {
  const client = clients.find(c => c.id === parseInt(req.params.id));
  if (!client) return res.status(404).json({ message: 'Client not found' });
  res.json(client);
});

// POST create client
router.post('/', (req, res) => {
  const { name, email, phone, preferred_contact } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' });
  }
  const newClient = {
    id: nextId++,
    name,
    email,
    phone: phone || '',
    preferred_contact: preferred_contact || 'email',
    consent_status: true,
    created_at: new Date().toISOString()
  };
  clients.push(newClient);
  res.status(201).json(newClient);
});

// PUT update client
router.put('/:id', (req, res) => {
  const index = clients.findIndex(c => c.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Client not found' });
  clients[index] = { ...clients[index], ...req.body };
  res.json(clients[index]);
});

// DELETE client
router.delete('/:id', (req, res) => {
  clients = clients.filter(c => c.id !== parseInt(req.params.id));
  res.json({ message: 'Client deleted successfully' });
});

module.exports = router;
