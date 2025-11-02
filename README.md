# Open Genspark AI Browser

A sophisticated web scraping and automation platform powered by local AI models. Browse, analyze, and extract data from websites with intelligent agent automation.

## Features

- **Local AI Processing**: Run Llama 3, Llama 2, and Mistral models locally
- **Web Scraping**: Automated web crawling with Playwright
- **DOM Inspection**: Analyze page structure and content
- **Data Extraction**: Extract text, links, images, and structured data
- **Real-time Logging**: Monitor agent execution with live logs
- **Multi-provider Support**: Switch between AI providers
- **Production Ready**: Docker, Kubernetes, and Vercel deployment support

## Quick Start

### Local Development

\`\`\`bash
git clone https://github.com/your-username/genspark-ai-browser.git
cd genspark-ai-browser
npm install
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Docker

\`\`\`bash
docker-compose up -d
\`\`\`

### Kubernetes

\`\`\`bash
kubectl apply -f kubernetes/
\`\`\`

## Configuration

Copy `.env.example` to `.env.local`:

\`\`\`bash
cp .env.example .env.local
\`\`\`

Configure AI provider API keys as needed.

## Project Structure

\`\`\`
├── app/
│   ├── api/              # API routes
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Main page
│   └── globals.css       # Global styles
├── components/           # React components
├── lib/                  # Utilities and helpers
├── public/               # Static assets
├── docker-compose.yml    # Docker Compose config
├── Dockerfile            # Production Docker image
└── kubernetes/           # Kubernetes manifests
\`\`\`

## API Endpoints

- `POST /api/browser/scrape` - Scrape a URL
- `POST /api/chat/stream` - Stream AI responses
- `GET /api/models/list` - List available models
- `GET /api/providers/list` - List AI providers
- `GET /api/health` - Health check
- `GET /api/status` - System status

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Vercel
- Connect GitHub repository
- Configure environment variables
- Auto-deploy on push to main

### Docker
\`\`\`bash
docker build -t genspark-ai-browser:latest .
docker run -p 3000:3000 genspark-ai-browser:latest
\`\`\`

### Kubernetes
\`\`\`bash
kubectl apply -f kubernetes/namespace.yaml
kubectl apply -f kubernetes/
\`\`\`

## Technologies

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes
- **Scraping**: Playwright
- **AI**: Vercel AI SDK, Local LLMs
- **Deployment**: Docker, Kubernetes, Vercel

## Performance

- Optimized for production deployments
- Horizontal scaling support
- Health checks and auto-recovery
- Memory-efficient processing
- Rate limiting and error handling

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## License

MIT License - see LICENSE file for details

## Support

- GitHub Issues: Report bugs and request features
- Discussions: Ask questions and share ideas
- Email: support@example.com

## Roadmap

- [ ] Advanced filtering and search
- [ ] Scheduled scraping jobs
- [ ] Data pipeline integration
- [ ] Custom agent behaviors
- [ ] Webhook support
- [ ] GraphQL API
- [ ] Analytics dashboard

## Acknowledgments

Built with:
- [Next.js](https://nextjs.org)
- [Vercel AI SDK](https://sdk.vercel.ai)
- [Playwright](https://playwright.dev)
- [shadcn/ui](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)
