#!/bin/bash

echo "🚂 Railway Backend Deployment Setup"
echo "===================================="

# Create production environment file
echo "📝 Creating production environment template..."

cat > backend/.env.production << EOL
# Railway will auto-inject these:
# DATABASE_URL - PostgreSQL connection string
# PORT - Application port
# RAILWAY_ENVIRONMENT=production

# You need to set these in Railway dashboard:
NODE_ENV=production
JWT_SECRET=your-production-jwt-secret-min-32-chars
JWT_EXPIRES_IN=7d
FRONTEND_URL=https://your-app.vercel.app

# Optional: Email configuration
EMAIL_FROM=noreply@yourapp.com
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=
EMAIL_PASS=
EOL

echo "✅ Backend prepared for Railway deployment!"
echo ""
echo "📋 Next steps:"
echo "1. Push your code to GitHub"
echo "2. Connect Railway to your GitHub repo"
echo "3. Add PostgreSQL database"
echo "4. Set environment variables"
echo ""
