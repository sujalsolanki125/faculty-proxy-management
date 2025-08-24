#!/bin/bash

echo "🚀 Going Live: Faculty Proxy Management System"
echo "==============================================="
echo ""

# Get GitHub repository URL
read -p "📝 Enter your GitHub repository URL (https://github.com/username/repo.git): " REPO_URL

if [ -z "$REPO_URL" ]; then
    echo "❌ Repository URL is required!"
    exit 1
fi

echo ""
echo "📤 Pushing to GitHub..."
git remote add origin $REPO_URL
git branch -M main
git push -u origin main

echo ""
echo "✅ Code pushed to GitHub successfully!"
echo ""
echo "🚂 RAILWAY DEPLOYMENT"
echo "===================="
echo ""
echo "1. 🌐 Go to: https://railway.app"
echo "2. 🔗 Sign up/Login with your GitHub account"
echo "3. ➕ Click 'New Project'"
echo "4. 📦 Select 'Deploy from GitHub repo'"
echo "5. 🔍 Choose: faculty-proxy-management"
echo "6. ⚙️  Click 'Deploy' on the backend folder"
echo ""
echo "🗄️  ADD DATABASE:"
echo "7. 🗄️  Click 'Add Database' → 'PostgreSQL'"
echo "8. 🔗 Railway will auto-inject DATABASE_URL"
echo ""
echo "🔧 ADD ENVIRONMENT VARIABLES:"
echo "9. ⚙️  Go to your service → Variables tab"
echo "10. ➕ Add these variables:"
echo ""
echo "   NODE_ENV=production"
echo "   JWT_SECRET=$(openssl rand -base64 32 | tr -d '\\n')"
echo "   JWT_EXPIRES_IN=7d"
echo "   FRONTEND_URL=https://faculty-proxy.vercel.app"
echo ""

read -p "Press Enter when Railway backend is deployed and you have the URL..."

read -p "📋 Enter your Railway backend URL (https://xxx.railway.app): " RAILWAY_URL

if [ -z "$RAILWAY_URL" ]; then
    echo "❌ Railway URL is required!"
    exit 1
fi

echo ""
echo "🌐 VERCEL DEPLOYMENT"
echo "==================="
echo ""
echo "1. 🌐 Go to: https://vercel.com"
echo "2. 🔗 Sign up/Login with your GitHub account"
echo "3. 📦 Click 'Import Project'"
echo "4. 🔍 Choose: faculty-proxy-management"
echo "5. ⚙️  Configure:"
echo "   - Root Directory: frontend"
echo "   - Framework: Vite"
echo "   - Build Command: npm run build"
echo "   - Output Directory: dist"
echo ""
echo "🔧 ADD ENVIRONMENT VARIABLES:"
echo "6. ⚙️  Before deploying, add these environment variables:"
echo ""
echo "   VITE_API_URL=$RAILWAY_URL"
echo "   VITE_APP_NAME=Faculty Proxy Management System"
echo "   VITE_ENVIRONMENT=production"
echo ""
echo "7. 🚀 Click 'Deploy'"
echo ""

read -p "Press Enter when Vercel deployment is complete..."

read -p "📋 Enter your Vercel frontend URL (https://xxx.vercel.app): " VERCEL_URL

echo ""
echo "🔄 FINAL CONFIGURATION"
echo "====================="
echo ""
echo "📝 Update Railway FRONTEND_URL variable to: $VERCEL_URL"
echo ""
echo "✅ DEPLOYMENT COMPLETE!"
echo "======================"
echo ""
echo "🎉 Your Faculty Proxy Management System is now LIVE!"
echo ""
echo "🌐 Frontend: $VERCEL_URL"
echo "🚂 Backend:  $RAILWAY_URL"
echo ""
echo "🧪 TEST YOUR APP:"
echo "1. 🌐 Visit: $VERCEL_URL"
echo "2. 🔑 Login with demo accounts:"
echo "   Faculty: john.doe@university.edu / password123"
echo "   HOD: jane.smith@university.edu / password123" 
echo "   Admin: admin@university.edu / admin123"
echo ""
echo "🎯 Your web application is ready for real users!"
echo ""
