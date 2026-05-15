const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Routes
const clientRoutes = require('./routes/clients');
const appointmentRoutes = require('./routes/appointments');
const followupRoutes = require('./routes/followups');

app.use('/api/clients', clientRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/followups', followupRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'WFG CRM API is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
