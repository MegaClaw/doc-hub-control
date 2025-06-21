const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
    res.json({ message: 'Server is working!', timestamp: new Date() });
});

// Database connection test route
app.get('/api/test-db', async (req, res) => {
  try {
    const db = require('./config/database');
    const [rows] = await db.execute('SELECT 1 as test, NOW() as current_time');
    res.json({ 
      success: true, 
      message: 'Database connected successfully',
      data: rows,
      host: process.env.DB_HOST 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Database connection failed',
      error: error.message 
    });
  }
});

// Test auth route
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    
    // Demo credentials check
    if (email === 'admin@dms.com' && password === 'admin123') {
        res.json({ success: true, message: 'Login successful' });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

// Routes (will be added when you create the route files)
app.use('/api/auth', require('./routes/auth'));
app.use('/api/documents', require('./routes/documents'));
app.use('/api/comments', require('./routes/comments'));

const server = app.listen(process.env.PORT || 3001, () => {
    console.log(`Server running on port ${process.env.PORT || 3001}`);
    console.log(`Test it at: http://localhost:${process.env.PORT || 3001}`);
    console.log('Server is now running and waiting for requests...');
});

// This is the key part - keep the process alive
process.stdin.resume(); // This prevents the process from exiting

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('\nReceived SIGINT, shutting down gracefully');
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});

process.on('SIGTERM', () => {
    console.log('Received SIGTERM, shutting down gracefully');
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});
