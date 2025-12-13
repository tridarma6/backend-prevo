const express = require('express');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const aiAgentRoutes = require('./routes/aiAgentRoutes');
const maintenanceTicketRoutes = require('./routes/maintenanceTicketsRoutes');
const assignMaintenanceTicketRoutes = require('./routes/assignMaintenanceTaskRoutes');
const assignEngineerRoutes = require('./routes/assignEngineerRoutes');
const app = express();

// CORS middleware
app.use((err, req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/chatbot', aiAgentRoutes);
app.use('/maintenance-tickets', maintenanceTicketRoutes);
app.use('/assign-maintenance-tasks', assignMaintenanceTicketRoutes);
app.use('/assign-engineer-tasks', assignEngineerRoutes);

app.get('/db-test', async (req, res) => {
  try {
    const db = require('./config/db');
    const result = await db.query('SELECT NOW()');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Global Error Handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

// 404 handler
app.use((err, req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

module.exports = app;

// this testing