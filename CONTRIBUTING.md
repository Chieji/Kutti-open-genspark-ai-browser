# Contributing Guide

## Development Setup

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/your-username/genspark-ai-browser.git
   cd genspark-ai-browser
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Configure environment**
   \`\`\`bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   \`\`\`

4. **Start development server**
   \`\`\`bash
   npm run dev
   \`\`\`

## Code Standards

- Use TypeScript for type safety
- Follow ESLint configuration
- Format code with Prettier
- Keep components small and focused
- Add JSDoc comments for complex functions

## Testing

\`\`\`bash
# Run tests
npm test

# Run tests in watch mode
npm test -- --watch

# Generate coverage report
npm test -- --coverage
\`\`\`

## Pull Request Process

1. Create feature branch: `git checkout -b feature/your-feature`
2. Make changes and commit: `git commit -m "feat: description"`
3. Push to branch: `git push origin feature/your-feature`
4. Create Pull Request with description

## Commit Messages

Follow conventional commits:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Code formatting
- `refactor:` Code refactoring
- `perf:` Performance improvement
- `test:` Test additions/changes
- `chore:` Build/tool changes

## Reporting Issues

Use GitHub Issues with:
- Clear title
- Detailed description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots/logs if applicable

## Performance Guidelines

- Monitor bundle size
- Optimize API requests
- Use React.memo for expensive components
- Implement proper error boundaries
- Profile with Chrome DevTools

## Security

- Never commit API keys or secrets
- Validate all user input
- Sanitize output in DOM operations
- Keep dependencies updated
- Report security issues responsibly
