# Deployment Guide

## Local Development

\`\`\`bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
\`\`\`

## Docker Deployment

### Build and Run Locally

\`\`\`bash
# Build Docker image
docker build -t genspark-ai-browser:latest .

# Run container
docker run -p 3000:3000 \
  -e NODE_ENV=production \
  genspark-ai-browser:latest
\`\`\`

### Using Docker Compose

\`\`\`bash
# Build and start services
docker-compose up -d

# View logs
docker-compose logs -f app

# Stop services
docker-compose down
\`\`\`

## Vercel Deployment

### Prerequisites
- GitHub repository connected
- Vercel account

### Steps

1. **Connect Repository**
   - Go to vercel.com
   - Select "New Project"
   - Import this GitHub repository

2. **Configure Environment**
   - Add environment variables in Vercel dashboard
   - Set AI provider API keys
   - Configure custom domain (optional)

3. **Deploy**
   - Push to main branch to auto-deploy
   - Vercel builds and deploys automatically

### Vercel Environment Variables

Add these in Project Settings > Environment Variables:

\`\`\`
NEXT_PUBLIC_API_URL=https://your-domain.vercel.app
ANTHROPIC_API_KEY=<your_key>
GOOGLE_API_KEY=<your_key>
OPENAI_API_KEY=<your_key>
\`\`\`

## Container Registry (GHCR)

### GitHub Actions Deployment

The `.github/workflows/docker-build.yml` automatically:
- Builds Docker image on push to main
- Tags with version and commit SHA
- Pushes to GitHub Container Registry

### Pull from Registry

\`\`\`bash
docker pull ghcr.io/your-username/genspark-ai-browser:latest
\`\`\`

## Production Checklist

- [ ] Environment variables configured
- [ ] API rate limits set appropriately
- [ ] Error logging enabled
- [ ] Health checks configured
- [ ] Database backups scheduled (if applicable)
- [ ] CDN configured for static assets
- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] Rate limiting implemented
- [ ] Monitoring and alerts setup

## Scaling

### Horizontal Scaling (Docker Swarm/Kubernetes)

\`\`\`bash
# Scale Docker service
docker service scale app=3

# Or with Kubernetes
kubectl scale deployment/genspark-ai-browser --replicas=3
\`\`\`

### Load Balancing

Use Nginx or cloud provider load balancer to distribute traffic across instances.

## Monitoring

- Monitor CPU and memory usage
- Set up alerting for errors
- Track API response times
- Monitor scraping job status
- Set up log aggregation (ELK, CloudWatch, etc.)

## Troubleshooting

### Container fails to start
\`\`\`bash
docker logs genspark-ai-browser
\`\`\`

### Playwright browser issues
\`\`\`bash
# Reinstall browsers in container
docker exec genspark-ai-browser npx playwright install
\`\`\`

### High memory usage
- Reduce concurrent scraping jobs
- Increase container memory limit
- Optimize DOM processing
\`\`\`
</parameter>
