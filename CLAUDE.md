# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a URL shortening service for the Intuition protocol built with Hono framework. It serves HTML pages with Open Graph and Twitter Card meta tags for social media link unfurling, then redirects users to the full Intuition Portal.

**Purpose**: When users share shortened URLs (e.g., `/atom/:id`), social media platforms can properly preview the content with title, description, and image before the automatic redirect occurs.

## Essential Commands

### Development
```bash
npm run dev          # Start development server with hot reload (tsx watch)
npm run type-check   # Run TypeScript type checking without emitting files
npm run build        # Compile TypeScript to dist/ directory
npm start            # Run production server from dist/
```

### Testing Locally
- Health check: `http://localhost:3000/health`
- Test atom: `http://localhost:3000/atom/0x8c486fd3377cef67861f7137bcc89b188c7f1781314e393e22c1fa6fa24e520e`
- Test triple: `http://localhost:3000/triple/{triple-id}`
- Test 404: `http://localhost:3000/atom/invalid-id`

## Architecture

### Request Flow
1. User hits `/atom/:id` or `/triple/:id`
2. Route handler (`src/routes/atom.tsx` or `src/routes/triple.tsx`) calls `fetchTerm(id)`
3. `fetchTerm` in `src/services/graphql.ts` queries Intuition's GraphQL API
4. GraphQL query uses LIKE operator with prefix matching: `{ id: { _like: "${id}%" } }`
5. If query returns multiple results, return 404 (ambiguous match)
6. Route extracts metadata (title, description) from GraphQL response with fallbacks
7. Route renders JSX component (AtomPage/TriplePage) with meta tags
8. HTML includes three redirect methods (meta refresh, JavaScript, visible link)
9. Returns 404 error page if no data found

### Key Design Decisions

**GraphQL ID Prefix Matching**: The query uses prefix matching with trailing wildcard for LIKE operator:
```typescript
{ id: `${id}%` }  // Prefix match in fetchTerm()
```

This enables partial ID matching (e.g., `/atom/0x8c486fd3377` matches full ID starting with that prefix). If multiple terms match the prefix, a 404 is returned to prevent ambiguity.

**Meta Tag Priority**: The three-layer redirect strategy ensures social media crawlers see meta tags:
1. `<meta http-equiv="refresh">` - Browser fallback
2. JavaScript `window.location.href` - Immediate redirect
3. Visible link - Last resort for users

**Error Handling**: Returns `null` from `fetchTerm` on errors (no throwing), then routes return 404 pages. This treats missing data as valid 404 scenarios rather than 500 errors.

**Ambiguity Prevention**: Routes return 404 if the GraphQL query returns more than one result. This ensures that partial IDs must be unique enough to match exactly one term.

**Fallback Values**: Routes use fallbacks for nullable GraphQL fields:
- Title: `atom.label || 'Intuition'`
- Description: `atom.value?.json_object?.description || DEFAULT_DESCRIPTION`

### File Organization

**Routes** (`src/routes/`): Each route file exports a Hono app instance and handles a specific path pattern.

**Components** (`src/components/`): JSX components using Hono's built-in JSX renderer. Note the `jsxImportSource: "hono/jsx"` in tsconfig.json.

**Services** (`src/services/`): External API interactions. GraphQL query is embedded as string constant (copied from `plans/query.graphql`).

**Types** (`src/types/`): TypeScript interfaces matching GraphQL schema structure. The `LightAtom` fragment is reflected in the interface hierarchy.

## TypeScript Configuration

This project uses Hono JSX, which requires specific tsconfig settings:
- `jsx: "react-jsx"` with `jsxImportSource: "hono/jsx"`
- `moduleResolution: "bundler"` (required for graphql-request v7+)
- All `.tsx` files must be in `src/` directory

**Import convention**: Use `.js` extensions in imports (even for `.ts` files) because of ESM module resolution:
```typescript
import { GRAPHQL_ENDPOINT } from '../utils/env.js'  // .js not .ts
```

## Environment Variables

**Required**:
- `GRAPHQL_ENDPOINT` - Intuition GraphQL API URL (default: `https://mainnet.intuition.sh/v1/graphql`)

**Optional**:
- `PORT` - Server port (default: 3000, Render.com uses 10000)
- `NODE_ENV` - Environment mode (default: development)

Configuration is centralized in `src/utils/env.ts` with validation on startup.

## GraphQL API

The service queries Intuition's mainnet GraphQL endpoint. The query structure:

**GetTerm Query**: Returns both atom and triple data in a single query. A term can have either an atom OR a triple (not both).

**LightAtom Fragment**: Reusable fragment that fetches `label` and `value.json_object.description` fields.

**Response Structure**:
```typescript
{
  terms: [{
    id: string
    atom: LightAtom | null      // Populated for atoms
    triple: {                    // Populated for triples
      subject: LightAtom
      predicate: LightAtom
      object: LightAtom
    } | null
  }]
}
```

Routes check which field is populated (`atom` vs `triple`) to determine how to render.

## Deployment

Configured for Render.com via `render.yaml`:
- Free tier with Node.js runtime
- Build: `npm install && npm run build`
- Start: `npm start`
- Health check at `/health`

Cold starts on free tier take ~30 seconds after 15 minutes of inactivity.

## Social Media Testing

After making changes to meta tags, test with:
- Twitter Card Validator: https://cards-dev.twitter.com/validator
- Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/
- LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/

Note: Platforms cache meta tags aggressively. Use these tools to refresh cache.

## Common Modifications

**Adding new routes**: Create route file in `src/routes/`, export Hono instance, register in `src/index.ts` with `app.route()`.

**Changing GraphQL query**: Update both `src/services/graphql.ts` query string AND `src/types/graphql.ts` type definitions to match.

**Modifying meta tags**: Edit `src/components/MetaTags.tsx` (single source of truth for all meta tags).

**Changing portal URLs**: Update URL construction in route handlers (`src/routes/atom.tsx`, `src/routes/triple.tsx`).
