#!/bin/bash

# Vercel CLI Deployment Script
# Makes deploying super easy!

echo "🚀 Deploying Genspark AI Browser to Vercel..."
echo ""

cd /home/kutti/genspark-linux

# Step 1: Login to Vercel
echo "Step 1: Login to Vercel (this will open your browser)"
vercel login

# Step 2: Deploy!
echo ""
echo "Step 2: Deploying..."
vercel --prod

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📝 Next steps:"
echo "1. Go to your Vercel dashboard: https://vercel.com/dashboard"
echo "2. Find your project and go to Settings > Environment Variables"
echo "3. Add: NEON_DATABASE_URL=your_database_url"
echo "4. Redeploy if needed"
echo ""
echo "Your app is LIVE! 🎉"
