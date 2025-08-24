const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getMe,
  refreshToken,
  changePassword,
  logout
} = require('../controllers/authController');
const { authenticate } = require('../middleware/auth');

// Test endpoint (temporary for development)
router.post('/test-login', (req, res) => {
  const { email, password } = req.body;
  
  // Simple test users
  const testUsers = [
    {
      id: '1',
      email: 'admin@faculty.edu',
      firstName: 'System',
      lastName: 'Administrator',
      role: 'ADMIN'
    },
    {
      id: '2', 
      email: 'faculty@faculty.edu',
      firstName: 'John',
      lastName: 'Doe',
      role: 'FACULTY'
    }
  ];
  
  const user = testUsers.find(u => u.email === email);
  
  if (!user) {
    return res.status(401).json({
      success: false,
      error: 'User not found'
    });
  }
  
  // Simple password check for testing
  const isValidPassword = password === 'Admin@123' || password === 'Faculty@123';
  
  if (!isValidPassword) {
    return res.status(401).json({
      success: false,
      error: 'Invalid password'
    });
  }
  
  res.status(200).json({
    success: true,
    message: 'Authentication system is working!',
    data: {
      user,
      token: 'test-jwt-token-' + user.id
    }
  });
});

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refreshToken);

// Protected routes
router.get('/me', authenticate, getMe);
router.put('/change-password', authenticate, changePassword);
router.post('/logout', authenticate, logout);

module.exports = router;
