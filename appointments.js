const express = require('express');
const router = express.Router();

let appointments = [];
let nextId = 1;

// GET all appointments
router.get('/', (req, res) => {
  res.json(appointments);
});

// GET upcoming appointments
router.get('/upcoming', (req, res) => {
  const now = new Date();
  const upcoming = appointments
    .filter(a => new Date(a.date_time) > now && a.status === 'Scheduled')
    .sort((a, b) => new Date(a.date_time) - new Date(b.date_time));
  res.json(upcoming);
});

// POST create appointment
router.post('/', (req, res) => {
  const { client_id, date_time, meeting_type, notes } = req.body;
  if (!client_id || !date_time || !meeting_type) {
    return res.status(400).json({ message: 'client_id, date_time, and meeting_type are required' });
  }

  // Conflict detection: check if appointment exists within 1 hour
  const newTime = new Date(date_time);
  const conflict = appointments.find(a => {
    const existingTime = new Date(a.date_time);
    const diff = Math.abs(newTime - existingTime) / (1000 * 60); // minutes
    return diff < 60 && a.status === 'Scheduled';
  });

  if (conflict) {
    return res.status(409).json({ message: 'Time conflict: another appointment exists within 1 hour' });
  }

  const newAppointment = {
    id: nextId++,
    client_id,
    date_time,
    meeting_type, // 'New Client', 'Follow-up', 'Policy Review'
    notes: notes || '',
    status: 'Scheduled', // Scheduled, Completed, No-show, Rescheduled
    created_at: new Date().toISOString()
  };

  appointments.push(newAppointment);
  console.log(`[Reminder] Confirmation email would be sent for appointment #${newAppointment.id}`);
  res.status(201).json(newAppointment);
});

// PUT update appointment status
router.put('/:id', (req, res) => {
  const index = appointments.findIndex(a => a.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Appointment not found' });
  appointments[index] = { ...appointments[index], ...req.body };
  res.json(appointments[index]);
});

// DELETE appointment
router.delete('/:id', (req, res) => {
  appointments = appointments.filter(a => a.id !== parseInt(req.params.id));
  res.json({ message: 'Appointment cancelled' });
});

module.exports = router;
