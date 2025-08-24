#!/bin/bash

echo "🚀 Railway + Vercel Production Deployment"
echo "=========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo -e "${YELLOW}📝 Initializing Git repository...${NC}"
    git init
    git add .
    git commit -m "Initial commit: Faculty Proxy Management System"
fi

echo -e "${GREEN}🚂 RAILWAY BACKEND DEPLOYMENT${NC}"
echo "================================"
echo ""
echo "1. 🌐 Go to https://railway.app"
echo "2. 🔗 Sign up/Login with GitHub"
echo "3. ➕ Click 'New Project'"
echo "4. 📦 Select 'Deploy from GitHub repo'"
echo "5. 🔍 Choose this repository"
echo "6. ⚙️  Select 'backend' as root directory"
echo ""
echo -e "${YELLOW}📊 Add PostgreSQL Database:${NC}"
echo "7. 🗄️  Click 'Add Service' → 'PostgreSQL'"
echo "8. 🔗 Railway will auto-connect DATABASE_URL"
echo ""
echo -e "${YELLOW}🔧 Environment Variables to add in Railway:${NC}"
echo "   NODE_ENV=production"
echo "   JWT_SECRET=$(openssl rand -base64 32)"
echo "   JWT_EXPIRES_IN=7d"
echo "   FRONTEND_URL=https://your-frontend.vercel.app"
echo ""

read -p "Press Enter when Railway backend is deployed..."
RAILWAY_URL=$(read -p "Enter your Railway backend URL (https://xxx.railway.app): ")

echo ""
echo -e "${GREEN}🌐 VERCEL FRONTEND DEPLOYMENT${NC}"
echo "================================"
echo ""
echo "1. 🌐 Go to https://vercel.com"
echo "2. 🔗 Sign up/Login with GitHub"
echo "3. 📦 Import your GitHub repository"
echo "4. ⚙️  Configure build settings:"
echo "   - Framework Preset: Vite"
echo "   - Build Command: npm run build"
echo "   - Output Directory: dist"
echo "   - Install Command: npm install"
echo "   - Root Directory: frontend"
echo ""
echo -e "${YELLOW}🔧 Environment Variables to add in Vercel:${NC}"
echo "   VITE_API_URL=$RAILWAY_URL"
echo "   VITE_APP_NAME=Faculty Proxy Management System"
echo "   VITE_ENVIRONMENT=production"
echo ""

# Update frontend environment for local development
if [ -n "$RAILWAY_URL" ]; then
    echo "🔄 Updating frontend environment..."
    cat > frontend/.env << EOL
VITE_API_URL=$RAILWAY_URL
VITE_APP_NAME=Faculty Proxy Management System
VITE_ENVIRONMENT=production
EOL
fi

echo ""
echo -e "${GREEN}✅ DEPLOYMENT COMPLETE!${NC}"
echo "========================"
echo ""
echo -e "${GREEN}🎉 Your Faculty Proxy Management System is now live!${NC}"
echo ""
echo -e "${YELLOW}📋 Final Steps:${NC}"
echo "1. ✅ Test your deployed backend API"
echo "2. ✅ Test your frontend application"
echo "3. ✅ Update CORS settings if needed"
echo "4. ✅ Set up custom domains (optional)"
echo ""
echo -e "${GREEN}🔗 Your URLs:${NC}"
echo "   Backend:  $RAILWAY_URL"
echo "   Frontend: https://your-app.vercel.app"
echo ""
echo -e "${GREEN}🎯 Test the deployment:${NC}"
echo "   $RAILWAY_URL/api/auth/test"
echo ""
