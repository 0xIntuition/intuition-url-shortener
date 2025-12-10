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
- Test atom redirect (hex): `http://localhost:3000/0x8c486fd3377cef67861f7137bcc89b188c7f1781314e393e22c1fa6fa24e520e`
- Test atom redirect (base62): `http://localhost:3000/9LE`
- Test partial hex ID: `http://localhost:3000/0x8c486fd3377`
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
6. Handler validates uniqueness: returns 404 if multiple results found (prevents ambiguous matches)
7. Handler calls `extractMetadata(term)` to get metadata with automatic type detection
8. **Shortest Prefix Algorithm**: Handler calls `findShortestPrefix(term.id)` to find the shortest hex prefix that uniquely identifies the term as the first search result (`src/utils/prefixFinder.ts`)
   - Starts with 2-character hex prefix, increments by 2 when collisions occur
   - Uses smart character-by-character comparison to jump to needed length
   - Minimizes API calls (typically 1-3 queries)
   - Falls back to full 64-char ID if no unique prefix found
9. Handler encodes the shortest hex prefix to base62 using `hexToBase62()` (`src/utils/base62.ts`)
10. Preview page displays: share card preview, shortened URL, and copy button
11. User can copy the short URL in base62 format (e.g., `http://localhost:3000/9LE`)

**Redirect Flow** (Shortened URL Access):
1. User hits `/:id` with hex ID (e.g., `0x8c486...`) or base62 ID (e.g., `9LE`)
2. Route handler (`src/routes/term.tsx`) detects ID format using `detectIdFormat()` (`src/utils/idDetector.ts`)
3. If base62, decode to hex using `base62ToHex()` (`src/utils/base62.ts`)
4. If invalid format, return 404 error page
5. Route calls `fetchTerm(hexId)` with the hex ID (supports partial matching)
6. `fetchTerm` in `src/services/graphql.ts` queries Intuition's GraphQL API
7. GraphQL query uses LIKE operator with prefix matching: `{ id: { _like: "${id}%" } }` and sorts by `created_at: asc`
8. If multiple results, takes the first one (oldest term by creation date) - **no ambiguity check**
9. Route calls `extractMetadata(term)` which automatically detects atom vs triple
10. `extractMetadata` utility (`src/utils/metadata.ts`) extracts type-specific metadata:
    - Atoms: uses `atom.label` for title
    - Triples: constructs title from `subject - predicate - object`
11. Route renders unified `RedirectPage` component with meta tags
12. HTML includes three redirect methods (meta refresh, JavaScript, visible link)
13. Returns 404 error page if no data found or if data is malformed

### Key Design Decisions

**Unified Routing with Automatic Type Detection**: The system uses a single `/:id` route that automatically detects whether an ID is an atom or triple by checking the GraphQL response. The `extractMetadata()` utility (`src/utils/metadata.ts`) handles both types:
- Checks `term.atom` → extracts atom metadata
- Checks `term.triple` → extracts triple metadata
- Returns `null` if neither (malformed data → 404)

This eliminates the need for separate `/atom/:id` and `/triple/:id` routes, simplifying the URL structure for end users.

**Shortest Prefix Algorithm with Base62 Encoding**: The system finds the shortest unique hex prefix and encodes it to base62 for maximum URL compression:
- **Why**: Dramatically reduces URL length. A 256-bit hex ID like `0x8c486fd3377cef67861f7137bcc89b188c7f1781314e393e22c1fa6fa24e520e` becomes just `9LE` (shortest prefix `0x8c48` encoded to base62).
- **How**:
  - **Shortest Prefix**: `findShortestPrefix()` algorithm (`src/utils/prefixFinder.ts`) finds the minimal hex prefix that uniquely identifies the term
  - **Base62 Encoding**: Uses BigInt for arbitrary precision arithmetic. The alphabet is `0-9A-Za-z` (62 characters).
  - **No Zero-Padding**: Decoded hex values preserve short prefixes (e.g., `9LE` → `0x8c48`, not `0x0000...8c48`)
- **Format Detection** (`src/utils/idDetector.ts`): Automatically detects ID format based on structure:
  - **Hex**: Starts with `0x` prefix + hexadecimal characters (supports partial matching)
  - **Base62**: Alphanumeric only, minimum 1 character (supports shortest prefixes)
  - Priority: hex > base62 (for backwards compatibility with existing hex URLs)
- **Backwards Compatibility**: The redirect route still accepts full or partial hex IDs (e.g., `/0x8c486...`) alongside base62 IDs.
- **Implementation**:
  - Shortest prefix finding happens during URL shortening (`src/routes/shortener.tsx:116-125`)
  - Decoding happens during redirect if base62 detected (`src/routes/term.tsx:27-34`)
  - Base62 decoder preserves short prefixes without zero-padding (`src/utils/base62.ts:87-90`)

**GraphQL ID Prefix Matching**: The query uses prefix matching with trailing wildcard for LIKE operator and sorts results by creation date:
```typescript
// In fetchTerm()
query GetTerm($id: String!) {
  terms(
    order_by: [{ created_at: asc }]
    where: { id: { _like: $id } }
  ) { ... }
}

// Called with: { id: `${id}%` }
```

This enables partial ID matching (e.g., `/0x8c486fd3377` matches full IDs starting with that prefix). The `order_by: [{created_at: asc}]` ensures deterministic ordering - if multiple terms match, the oldest term (by creation date) is selected. This behavior differs between routes:
- **Redirect route** (`/:id`): Takes first result, enabling convenient partial hex IDs
- **Shortener route** (`/short`): Returns 404 if multiple results to enforce uniqueness

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

**Multiple Results Handling**: The two main routes handle multiple GraphQL results differently:
- **Shortener route** (`/short`): Returns 404 if multiple results found. This enforces that full URLs from form submissions must uniquely identify one term.
- **Redirect route** (`/:id`): Takes the first result sorted by `created_at: asc` (oldest term). This enables convenient partial hex IDs while maintaining deterministic behavior. For example, `/0x8c486fd3377` will always return the same term (the oldest one matching that prefix).

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
- `prefixFinder.ts` - Shortest prefix algorithm with smart character comparison to minimize API calls
- `metadata.ts` - Extracts metadata from terms with automatic type detection
- `urlParser.ts` - Parses IDs from various URL formats
- `base62.ts` - Base62 encoding/decoding with BigInt support (preserves short prefixes without zero-padding)
- `idDetector.ts` - ID format detection and validation (hex vs base62, supports 1+ char base62 IDs)
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

**Adjusting prefix algorithm**: Modify constants in `src/utils/prefixFinder.ts` to tune performance:
- `MIN_PREFIX_LEN` (default: 2) - Starting hex prefix length
- `INCREMENT` (default: 2) - How much to increase prefix length on collisions
- `MAX_ATTEMPTS` (default: 32) - Maximum API calls before falling back to full ID
