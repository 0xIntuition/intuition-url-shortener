# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a URL shortening service for the Intuition protocol built with Hono framework. It provides two main features:

1. **URL Shortener Form**: A web interface at `/` where users can paste Intuition Portal URLs to generate shortened links
2. **Smart Redirects**: Shortened URLs (e.g., `/:id`) serve HTML pages with Open Graph and Twitter Card meta tags for social media link unfurling, then redirect users to the full Intuition Portal

**Purpose**: When users share shortened URLs, social media platforms can properly preview the content with title, description, and image before the automatic redirect occurs. The system automatically detects whether the ID represents an atom or triple and generates appropriate metadata.

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
- Homepage (URL shortener form): `http://localhost:3000/`
- Test atom redirect: `http://localhost:3000/0x8c486fd3377cef67861f7137bcc89b188c7f1781314e393e22c1fa6fa24e520e`
- Test triple redirect: `http://localhost:3000/{triple-id}`
- Test 404: `http://localhost:3000/invalid-id`
- Test form submission: POST to `http://localhost:3000/short` with form data `url=...`

## Architecture

### Request Flow

**URL Shortening Flow** (Form Submission):
1. User visits `/` and sees the URL shortener form
2. User pastes an Intuition Portal URL (e.g., `https://portal.intuition.systems/explore/atom/0x...`)
3. Form POSTs to `/short` route handler (`src/routes/shortener.tsx`)
4. Handler extracts ID from URL using regex patterns (`src/utils/urlParser.ts`)
5. Handler calls `fetchTerm(id)` to query GraphQL
6. Handler calls `extractMetadata(term)` to get metadata with automatic type detection
7. Preview page displays: share card preview, shortened URL, and copy button
8. User can copy the short URL (e.g., `http://localhost:3000/0x...`)

**Redirect Flow** (Shortened URL Access):
1. User hits `/:id` with any atom or triple ID
2. Route handler (`src/routes/term.tsx`) calls `fetchTerm(id)`
3. `fetchTerm` in `src/services/graphql.ts` queries Intuition's GraphQL API
4. GraphQL query uses LIKE operator with prefix matching: `{ id: { _like: "${id}%" } }`
5. If query returns multiple results, return 404 (ambiguous match)
6. Route calls `extractMetadata(term)` which automatically detects atom vs triple
7. `extractMetadata` utility (`src/utils/metadata.ts`) extracts type-specific metadata:
   - Atoms: uses `atom.label` for title
   - Triples: constructs title from `subject - predicate - object`
8. Route renders unified `RedirectPage` component with meta tags
9. HTML includes three redirect methods (meta refresh, JavaScript, visible link)
10. Returns 404 error page if no data found or if data is malformed

### Key Design Decisions

**Unified Routing with Automatic Type Detection**: The system uses a single `/:id` route that automatically detects whether an ID is an atom or triple by checking the GraphQL response. The `extractMetadata()` utility (`src/utils/metadata.ts`) handles both types:
- Checks `term.atom` → extracts atom metadata
- Checks `term.triple` → extracts triple metadata
- Returns `null` if neither (malformed data → 404)

This eliminates the need for separate `/atom/:id` and `/triple/:id` routes, simplifying the URL structure for end users.

**GraphQL ID Prefix Matching**: The query uses prefix matching with trailing wildcard for LIKE operator:
```typescript
{ id: `${id}%` }  // Prefix match in fetchTerm()
```

This enables partial ID matching (e.g., `/0x8c486fd3377` matches full ID starting with that prefix). If multiple terms match the prefix, a 404 is returned to prevent ambiguity.

**URL Parsing Flexibility**: The `extractIdFromUrl()` utility (`src/utils/urlParser.ts`) extracts IDs from various URL formats using regex patterns:
- Portal URLs: `https://portal.intuition.systems/explore/atom/{id}`
- Portal URLs: `https://portal.intuition.systems/explore/triple/{id}`
- Plain IDs: `0x...`
- Any URL containing a 0x-prefixed hex ID

**Meta Tag Priority**: The three-layer redirect strategy ensures social media crawlers see meta tags:
1. `<meta http-equiv="refresh">` - Browser fallback
2. JavaScript `window.location.href` - Immediate redirect
3. Visible link - Last resort for users

**Error Handling**: Returns `null` from `fetchTerm` on errors (no throwing), then routes return 404 pages. This treats missing data as valid 404 scenarios rather than 500 errors.

**Ambiguity Prevention**: Routes return 404 if the GraphQL query returns more than one result. This ensures that partial IDs must be unique enough to match exactly one term.

**Fallback Values**: Metadata extraction uses fallbacks for nullable GraphQL fields:
- Atom title: `atom.label || 'Intuition'`
- Triple title: `${subject.label || 'Unknown'} - ${predicate.label || 'Unknown'} - ${object.label || 'Unknown'}`
- Description: `atom.value?.json_object?.description || DEFAULT_DESCRIPTION` (atoms)
- Description: `subject.value?.json_object?.description || predicate.value?.json_object?.description || DEFAULT_DESCRIPTION` (triples)

### File Organization

**Routes** (`src/routes/`): Each route file exports a Hono app instance and handles a specific path pattern.
- `home.tsx` - Homepage with URL shortener form (GET `/`)
- `shortener.tsx` - Form submission handler (POST `/short`)
- `term.tsx` - Unified redirect handler for atoms and triples (GET `/:id`)
- `error.tsx` - 404 error handler

**Components** (`src/components/`): JSX components using Hono's built-in JSX renderer. Note the `jsxImportSource: "hono/jsx"` in tsconfig.json.
- `HomePage.tsx` - URL shortener form interface
- `PreviewPage.tsx` - Preview page showing share card and shortened URL
- `RedirectPage.tsx` - Unified redirect page (replaces AtomPage/TriplePage)
- `MetaTags.tsx` - Shared meta tags component
- `ErrorPage.tsx` - 404 error page

**Utils** (`src/utils/`): Utility functions for common operations.
- `metadata.ts` - Extracts metadata from terms with automatic type detection
- `urlParser.ts` - Parses IDs from various URL formats
- `env.ts` - Environment variable configuration

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

**Changing portal URLs**: Update URL construction in `src/utils/metadata.ts` (single source of truth for both atoms and triples).

**Modifying URL parsing**: Edit regex patterns in `src/utils/urlParser.ts` to support additional URL formats.
