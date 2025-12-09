# Intuition URL Shortener

A lightweight URL shortening service built with [Hono](https://hono.dev/) that provides a web interface for creating shortened links and serves HTML pages with Open Graph and Twitter Card meta tags for proper social media link unfurling. The service fetches data from the Intuition protocol's GraphQL API and dynamically generates SEO-optimized pages for atoms and triples with automatic type detection.

## Features

- 🚀 **Fast & Lightweight**: Built with Hono framework (5KB)
- 📝 **Web Interface**: User-friendly form for creating shortened URLs
- 🔗 **Social Media Optimized**: Proper Open Graph and Twitter Card meta tags
- 🎨 **Dynamic Content**: Meta tags populated from GraphQL data
- 🤖 **Auto Type Detection**: Automatically detects atoms vs triples
- 🔄 **Auto-redirect**: Seamless redirect to Intuition Portal
- 📦 **TypeScript**: Full type safety with TypeScript
- ☁️ **Deploy Ready**: Configured for Render.com deployment

## Routes

- `GET /` - URL shortener form homepage
- `GET /health` - Health check endpoint
- `POST /short` - Create shortened URL (accepts form data with portal URL)
- `GET /:id` - Unified redirect for atoms and triples with social meta tags

## Tech Stack

- **Framework**: Hono v4.x
- **Runtime**: Node.js via @hono/node-server
- **GraphQL Client**: graphql-request
- **Templates**: Hono JSX
- **Language**: TypeScript

## Local Development

### Prerequisites

- Node.js >= 18.0.0
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd intuition-url-shortener
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file (optional):
```bash
cp .env.example .env
```

Edit `.env` if you need to customize:
```env
GRAPHQL_ENDPOINT=https://mainnet.intuition.sh/v1/graphql
PORT=3000
NODE_ENV=development
```

4. Start development server:
```bash
npm run dev
```

The server will start at `http://localhost:3000` with hot reload enabled.

### Testing

Visit these URLs to test:
- Homepage form: `http://localhost:3000/`
- Health check: `http://localhost:3000/health`
- Direct atom link: `http://localhost:3000/0x8c486fd3377cef67861f7137bcc89b188c7f1781314e393e22c1fa6fa24e520e`
- Direct triple link: `http://localhost:3000/{triple-id}`

To test the URL shortener form:
1. Visit `http://localhost:3000/`
2. Paste a portal URL (e.g., `https://portal.intuition.systems/explore/atom/0x8c486fd3377cef67861f7137bcc89b188c7f1781314e393e22c1fa6fa24e520e`)
3. Click "Shorten URL"
4. View the preview and copy the shortened link

## Building for Production

```bash
npm run build
```

This compiles TypeScript to JavaScript in the `dist/` directory.

To run the production build:
```bash
npm start
```

## Deployment

### Render.com

This project includes a `render.yaml` configuration file for easy deployment to Render.com.

**Option 1: Deploy via Dashboard**

1. Create a new Web Service on Render.com
2. Connect your GitHub repository
3. Render will automatically detect the `render.yaml` file
4. Click "Apply" to deploy

**Option 2: Deploy via Blueprint**

1. Click the "Deploy to Render" button (if available)
2. Connect your GitHub account
3. Render will automatically configure everything from `render.yaml`

**Environment Variables**

The following environment variables are pre-configured in `render.yaml`:
- `NODE_ENV=production`
- `GRAPHQL_ENDPOINT=https://mainnet.intuition.sh/v1/graphql`
- `PORT=10000`

You can override these in the Render dashboard if needed.

## Project Structure

```
intuition-url-shortener/
├── src/
│   ├── index.ts                 # Main Hono application
│   ├── server.ts                # Node.js server entry point
│   ├── routes/
│   │   ├── home.tsx            # GET / - Homepage form
│   │   ├── shortener.tsx       # POST /short - Form handler
│   │   ├── term.tsx            # GET /:id - Unified redirect
│   │   └── error.tsx           # 404 handler
│   ├── services/
│   │   └── graphql.ts          # GraphQL client & queries
│   ├── components/
│   │   ├── MetaTags.tsx        # Meta tag component
│   │   ├── HomePage.tsx        # URL shortener form
│   │   ├── PreviewPage.tsx     # Preview with copy button
│   │   ├── RedirectPage.tsx    # Unified redirect template
│   │   └── ErrorPage.tsx       # Error page template
│   ├── types/
│   │   └── graphql.ts          # GraphQL response types
│   └── utils/
│       ├── env.ts              # Environment config
│       ├── metadata.ts         # Type detection & extraction
│       └── urlParser.ts        # URL parsing utility
├── plans/                       # Reference files
│   ├── example.html
│   └── query.graphql
├── package.json
├── tsconfig.json
├── render.yaml                  # Render.com config
├── .env.example
├── .gitignore
└── README.md
```

## How It Works

### URL Shortening Flow

1. User visits `/` and sees the URL shortener form
2. User pastes an Intuition Portal URL
3. Form submits to `/short` which extracts the ID using regex patterns
4. Server queries Intuition's GraphQL API for the term data
5. Server displays a preview page showing:
   - Share card preview (title, description, image)
   - Shortened URL (e.g., `http://localhost:3000/0x...`)
   - Copy button for easy sharing

### Redirect Flow

1. User or social media bot visits shortened URL (e.g., `/:id`)
2. Server queries Intuition's GraphQL API for the term data
3. Server automatically detects whether it's an atom or triple
4. Server extracts appropriate metadata (title, description)
5. Server renders HTML with Open Graph and Twitter Card meta tags
6. Social media crawlers see the meta tags for link previews
7. User is automatically redirected to the full portal URL

## Meta Tag Strategy

The service uses three redirect methods to ensure compatibility:

1. **Meta refresh**: `<meta http-equiv="refresh">` (browser fallback)
2. **JavaScript redirect**: `window.location.href` (immediate)
3. **Visible link**: Clickable link as last resort

This ensures social media crawlers can read meta tags before the redirect executes.

## API Reference

### GraphQL Query

The service uses the following GraphQL query:

```graphql
query GetTerm($id: String!) {
  terms(where: { id: { _like: $id } }) {
    id
    atom {
      label
      value {
        json_object {
          description: data(path:"description")
        }
      }
    }
    triple {
      subject { label, value { ... } }
      predicate { label, value { ... } }
      object { label, value { ... } }
    }
  }
}
```

## Testing Social Media Previews

Use these tools to validate link unfurling:

- **Twitter**: [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- **Facebook**: [Sharing Debugger](https://developers.facebook.com/tools/debug/)
- **LinkedIn**: [Post Inspector](https://www.linkedin.com/post-inspector/)

## Troubleshooting

### Cold Start on Free Tier

Render.com's free tier apps sleep after 15 minutes of inactivity. First request may take ~30 seconds. Consider upgrading to a paid tier for always-on service.

### Social Media Cache

Social media platforms cache meta tags. Use the validation tools above to refresh the cache during testing.

### TypeScript Build Errors

Ensure all `.tsx` files are in the `src/` directory and `jsxImportSource` is set to `hono/jsx` in `tsconfig.json`.

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run production server
- `npm run type-check` - Run TypeScript type checking without emitting files

## License

MIT

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

For issues and questions:
- GitHub Issues: [Create an issue](https://github.com/0xIntuition/intuition-url-shortener/issues)
- Intuition Portal: [Visit portal.intuition.systems](https://portal.intuition.systems)
