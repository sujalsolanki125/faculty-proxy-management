@echo off
echo.
echo 🚀 Faculty Proxy Management System - Quick Setup
echo ================================================

:: Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js (v16 or higher) from https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js version: 
node --version

echo.
echo 📦 Installing root dependencies...
call npm install

echo.
echo 📦 Installing backend dependencies...
cd backend
call npm install
cd ..

echo.
echo 📦 Installing frontend dependencies...
cd frontend
call npm install
cd ..

echo.
echo ⚙️ Setting up environment files...

if not exist "backend\.env" (
    copy "backend\.env.example" "backend\.env" >nul
    echo Created backend\.env from example
    echo Please update the database credentials in backend\.env
) else (
    echo backend\.env already exists
)

if not exist "frontend\.env" (
    copy "frontend\.env.example" "frontend\.env" >nul
    echo Created frontend\.env from example
) else (
    echo frontend\.env already exists
)

echo.
echo 🎉 Setup completed successfully!
echo.
echo 📋 Next Steps:
echo 1. Update database credentials in backend\.env
echo 2. Create the PostgreSQL database
echo 3. Run: cd backend ^&^& npx prisma migrate dev
echo 4. Run: npm run dev (to start both backend and frontend)
echo.
echo 📖 For detailed instructions, see docs\DEVELOPMENT_GUIDE.md
echo.
pause
