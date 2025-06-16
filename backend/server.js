const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
    res.json({ message: 'Server is working!', timestamp: new Date() });
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

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Test it at: http://localhost:${PORT}`);
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