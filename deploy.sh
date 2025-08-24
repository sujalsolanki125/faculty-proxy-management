#!/bin/bash

echo "🚀 Faculty Proxy Management System - Quick Deploy Script"
echo "========================================================"

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📝 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit: Faculty Proxy Management System"
fi

# Deploy options
echo ""
echo "Choose deployment option:"
echo "1. 🌐 Vercel (Frontend + Backend)"
echo "2. 🚂 Railway (Backend) + Vercel (Frontend)"
echo "3. 🐳 Docker Build"
echo "4. 📦 Build for manual deployment"

read -p "Enter option (1-4): " choice

case $choice in
    1)
        echo "🌐 Deploying to Vercel..."
        npm install -g vercel
        vercel --prod
        ;;
    2)
        echo "🚂 Railway + Vercel deployment..."
        echo "1. Push to GitHub first"
        echo "2. Connect Railway to your GitHub repo"
        echo "3. Add PostgreSQL database"
        echo "4. Set environment variables"
        echo "5. Deploy frontend to Vercel"
        ;;
    3)
        echo "🐳 Building Docker image..."
        docker build -t faculty-proxy-system .
        docker run -p 3000:3000 faculty-proxy-system
        ;;
    4)
        echo "📦 Building for manual deployment..."
        cd frontend && npm run build
        echo "✅ Frontend built in frontend/dist/"
        echo "📁 Backend ready in backend/"
        ;;
    *)
        echo "❌ Invalid option"
        ;;
esac

echo ""
echo "✅ Deployment preparation complete!"
echo "📝 Check DEPLOYMENT.md for detailed instructions"
