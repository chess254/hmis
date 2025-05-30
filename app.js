const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const config = require('./config');
const authMiddleware = require('./middleware/auth');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(cors());
app.use(express.json());

// Database connection
const pool = new Pool(config.db);
app.set('db', pool);

// Routes
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/patients', authMiddleware, require('./routes/patients'));
// app.use('/api/v1/visits', authMiddleware, require('./routes/visits'));
// app.use('/api/v1/services', authMiddleware, require('./routes/services'));
// app.use('/api/v1/invoices', authMiddleware, require('./routes/invoices'));
// app.use('/api/v1/payments', authMiddleware, require('./routes/payments'));
// app.use('/api/v1/staff', authMiddleware, require('./routes/staff'));
// app.use('/api/v1/departments', authMiddleware, require('./routes/departments'));
// app.use('/api/v1/roles', authMiddleware, require('./routes/roles'));
// app.use('/api/v1/wards', authMiddleware, require('./routes/wards'));
// app.use('/api/v1/beds', authMiddleware, require('./routes/beds'));
// app.use('/api/v1/admissions', authMiddleware, require('./routes/admissions'));
// app.use('/api/v1/triage', authMiddleware, require('./routes/triage'));
// app.use('/api/v1/medical-alerts', authMiddleware, require('./routes/medical-alerts'));
// app.use('/api/v1/patient-tags', authMiddleware, require('./routes/patient-tags'));
// app.use('/api/v1/metrics', authMiddleware, require('./routes/metrics'));

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));