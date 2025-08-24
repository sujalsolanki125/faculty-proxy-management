const { PrismaClient } = require('@prisma/client');
const { asyncHandler } = require('../middleware/errorHandler');
const { hashPassword, comparePassword } = require('../utils/password');
const { generateTokens, verifyRefreshToken } = require('../utils/jwt');
const { registerSchema, loginSchema, refreshTokenSchema, changePasswordSchema } = require('../utils/validation');

const prisma = new PrismaClient();

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const register = asyncHandler(async (req, res) => {
  // Validate input
  const { error, value } = registerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      error: error.details[0].message
    });
  }

  const { email, password, firstName, lastName, phoneNumber, role, departmentId } = value;

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email }
  });

  if (existingUser) {
    return res.status(400).json({
      success: false,
      error: 'User with this email already exists'
    });
  }

  // Validate department if provided
  if (departmentId) {
    const department = await prisma.department.findUnique({
      where: { id: departmentId }
    });

    if (!department) {
      return res.status(400).json({
        success: false,
        error: 'Invalid department ID'
      });
    }
  }

  // Hash password
  const hashedPassword = await hashPassword(password);

  // Create user
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      firstName,
      lastName,
      phoneNumber,
      role,
      departmentId
    },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      phoneNumber: true,
      role: true,
      isActive: true,
      createdAt: true,
      department: {
        select: {
          id: true,
          name: true,
          code: true
        }
      }
    }
  });

  // Create leave balance for faculty
  if (role === 'FACULTY') {
    const currentYear = new Date().getFullYear();
    await prisma.leaveBalance.create({
      data: {
        userId: user.id,
        year: currentYear
      }
    });
  }

  // Generate tokens
  const { accessToken, refreshToken } = generateTokens(user.id);

  // Log the registration
  await prisma.auditLog.create({
    data: {
      action: 'REGISTER',
      entity: 'User',
      entityId: user.id,
      newData: { email, role },
      userId: user.id,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    }
  });

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: {
      user,
      tokens: {
        accessToken,
        refreshToken
      }
    }
  });
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = asyncHandler(async (req, res) => {
  // Validate input
  const { error, value } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      error: error.details[0].message
    });
  }

  const { email, password } = value;

  // Find user
  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      department: {
        select: {
          id: true,
          name: true,
          code: true
        }
      },
      subjects: {
        include: {
          subject: {
            select: {
              id: true,
              name: true,
              code: true
            }
          }
        }
      }
    }
  });

  if (!user) {
    return res.status(401).json({
      success: false,
      error: 'Invalid credentials'
    });
  }

  // Check if user is active
  if (!user.isActive) {
    return res.status(401).json({
      success: false,
      error: 'Account is deactivated. Please contact administrator'
    });
  }

  // Verify password
  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({
      success: false,
      error: 'Invalid credentials'
    });
  }

  // Generate tokens
  const { accessToken, refreshToken } = generateTokens(user.id);

  // Remove password from response
  const { password: userPassword, ...userWithoutPassword } = user;

  // Log the login
  await prisma.auditLog.create({
    data: {
      action: 'LOGIN',
      entity: 'User',
      entityId: user.id,
      userId: user.id,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    }
  });

  res.status(200).json({
    success: true,
    message: 'Login successful',
    data: {
      user: userWithoutPassword,
      tokens: {
        accessToken,
        refreshToken
      }
    }
  });
});

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      phoneNumber: true,
      role: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
      department: {
        select: {
          id: true,
          name: true,
          code: true
        }
      },
      subjects: {
        include: {
          subject: {
            select: {
              id: true,
              name: true,
              code: true,
              credits: true
            }
          }
        }
      },
      leaveBalance: {
        where: {
          year: new Date().getFullYear()
        },
        select: {
          casualLeaves: true,
          sickLeaves: true,
          earnedLeaves: true,
          usedCasualLeaves: true,
          usedSickLeaves: true,
          usedEarnedLeaves: true
        }
      }
    }
  });

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Refresh access token
// @route   POST /api/auth/refresh
// @access  Public
const refreshToken = asyncHandler(async (req, res) => {
  // Validate input
  const { error, value } = refreshTokenSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      error: error.details[0].message
    });
  }

  const { refreshToken: token } = value;

  try {
    // Verify refresh token
    const decoded = verifyRefreshToken(token);
    
    // Check if user exists and is active
    const user = await prisma.user.findUnique({
      where: { id: decoded.id }
    });

    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        error: 'Invalid refresh token'
      });
    }

    // Generate new tokens
    const tokens = generateTokens(user.id);

    res.status(200).json({
      success: true,
      data: {
        tokens
      }
    });

  } catch (error) {
    return res.status(401).json({
      success: false,
      error: 'Invalid refresh token'
    });
  }
});

// @desc    Change password
// @route   PUT /api/auth/change-password
// @access  Private
const changePassword = asyncHandler(async (req, res) => {
  // Validate input
  const { error, value } = changePasswordSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      error: error.details[0].message
    });
  }

  const { currentPassword, newPassword } = value;

  // Get user with password
  const user = await prisma.user.findUnique({
    where: { id: req.user.id }
  });

  // Verify current password
  const isCurrentPasswordValid = await comparePassword(currentPassword, user.password);
  if (!isCurrentPasswordValid) {
    return res.status(400).json({
      success: false,
      error: 'Current password is incorrect'
    });
  }

  // Hash new password
  const hashedNewPassword = await hashPassword(newPassword);

  // Update password
  await prisma.user.update({
    where: { id: req.user.id },
    data: { password: hashedNewPassword }
  });

  // Log password change
  await prisma.auditLog.create({
    data: {
      action: 'CHANGE_PASSWORD',
      entity: 'User',
      entityId: user.id,
      userId: user.id,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    }
  });

  res.status(200).json({
    success: true,
    message: 'Password changed successfully'
  });
});

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
const logout = asyncHandler(async (req, res) => {
  // Log the logout
  await prisma.auditLog.create({
    data: {
      action: 'LOGOUT',
      entity: 'User',
      entityId: req.user.id,
      userId: req.user.id,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    }
  });

  res.status(200).json({
    success: true,
    message: 'Logout successful'
  });
});

module.exports = {
  register,
  login,
  getMe,
  refreshToken,
  changePassword,
  logout
};
