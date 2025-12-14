const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const aiAgentRoutes = require('./routes/aiAgentRoutes');
const maintenanceTicketRoutes = require('./routes/maintenanceTicketsRoutes');
const assignMaintenanceTicketRoutes = require('./routes/assignMaintenanceTaskRoutes');
const assignEngineerRoutes = require('./routes/assignEngineerRoutes');

const app = express();

/* =========================
   CORS 
========================= */
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://backend-prevo.vercel.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// Handle preflight
app.options('*', cors());

app.use(express.json());

/* =========================
   ROUTES
========================= */
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

/* =========================
   404 HANDLER (TANPA err)
========================= */
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

/* =========================
   GLOBAL ERROR HANDLER
========================= */
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
});

module.exports = app;
