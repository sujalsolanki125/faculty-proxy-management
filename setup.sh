#!/bin/bash

# Faculty Proxy Management System - Quick Setup Script
# This script will help you get started quickly

echo "🚀 Faculty Proxy Management System - Quick Setup"
echo "================================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js (v16 or higher) from https://nodejs.org/"
    exit 1
fi

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "⚠️  PostgreSQL is not detected. Please ensure PostgreSQL is installed and running."
    echo "   You can download it from https://www.postgresql.org/"
fi

echo "✅ Node.js version: $(node --version)"

# Install root dependencies
echo ""
echo "📦 Installing root dependencies..."
npm install

# Install backend dependencies
echo ""
echo "📦 Installing backend dependencies..."
cd backend
npm install
cd ..

# Install frontend dependencies
echo ""
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
cd ..

# Create environment files
echo ""
echo "⚙️  Setting up environment files..."

if [ ! -f "backend/.env" ]; then
    cp backend/.env.example backend/.env
    echo "✅ Created backend/.env from example"
    echo "⚠️  Please update the database credentials in backend/.env"
else
    echo "ℹ️  backend/.env already exists"
fi

if [ ! -f "frontend/.env" ]; then
    cp frontend/.env.example frontend/.env
    echo "✅ Created frontend/.env from example"
else
    echo "ℹ️  frontend/.env already exists"
fi

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "📋 Next Steps:"
echo "1. Update database credentials in backend/.env"
echo "2. Create the PostgreSQL database"
echo "3. Run: cd backend && npx prisma migrate dev"
echo "4. Run: npm run dev (to start both backend and frontend)"
echo ""
echo "📖 For detailed instructions, see docs/DEVELOPMENT_GUIDE.md"
