const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test users (in-memory for testing)
const testUsers = [
  {
    id: '1',
    email: 'admin@faculty.edu',
    password: '$2a$12$LQv3c1yqBWVHxkd0LQ4YCOdyOE4PkKfJ7/fA9HNiKk2Kla2/S8eS6', // Admin@123
    firstName: 'System',
    lastName: 'Administrator',
    role: 'ADMIN'
  },
  {
    id: '2', 
    email: 'faculty@faculty.edu',
    password: '$2a$12$LQv3c1yqBWVHxkd0LQ4YCOdyOE4PkKfJ7/fA9HNiKk2Kla2/S8eS6', // Faculty@123
    firstName: 'John',
    lastName: 'Doe',
    role: 'FACULTY'
  }
];

// Simple authentication test
app.post('/api/auth/test-login', (req, res) => {
  const { email, password } = req.body;
  
  const user = testUsers.find(u => u.email === email);
  
  if (!user) {
    return res.status(401).json({
      success: false,
      error: 'User not found'
    });
  }
  
  // Simple password check (in real app, we'd use bcrypt)
  const isValidPassword = password === 'Admin@123' || password === 'Faculty@123';
  
  if (!isValidPassword) {
    return res.status(401).json({
      success: false,
      error: 'Invalid password'
    });
  }
  
  const { password: userPassword, ...userWithoutPassword } = user;
  
  res.status(200).json({
    success: true,
    message: 'Authentication system is working!',
    data: {
      user: userWithoutPassword,
      token: 'test-jwt-token-' + user.id
    }
  });
});

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Authentication API is running',
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`
🔐 Authentication Test Server
📡 Server running on port ${PORT}
🧪 Test endpoint: POST http://localhost:${PORT}/api/auth/test-login
📧 Test credentials:
   - admin@faculty.edu / Admin@123
   - faculty@faculty.edu / Faculty@123
  `);
});

module.exports = app;
