// 404 Error page component
import type { FC } from 'hono/jsx'

export const ErrorPage: FC = () => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <title>404 - Not Found | Intuition</title>
        <link rel="stylesheet" href="/styles/output.css" />
      </head>
      <body className="flex items-center justify-center min-h-screen p-8 sm:p-6 text-center bg-gradient-radial">
        <div className="container max-w-[540px] w-full animate-fade-in-up">
          <div className="inline-flex items-center px-4 py-2 bg-bg-elevated border border-border-base rounded-md text-text-tertiary text-sm font-medium mb-8 shadow-card">
            404 Not Found
          </div>

          <h1 className="text-4xl sm:text-2xl font-bold leading-tight m-0 mb-4 text-text-primary tracking-tighter">
            This link doesn't exist
          </h1>
          <p className="text-lg sm:text-base leading-normal m-0 mb-12 text-text-secondary">
            The ID you're looking for might have been removed, shortened incorrectly, or never existed.
          </p>

          <div className="flex flex-col gap-3 items-center sm:w-full">
            <a
              href="/"
              className="btn-gradient-hover inline-flex items-center justify-center px-8 py-4 min-h-[52px] text-base font-semibold bg-brand-primary rounded-md text-white no-underline cursor-pointer transition-all duration-fast ease-out-custom hover:-translate-y-0.5 hover:shadow-card-hover focus-visible:outline-none focus-visible:shadow-focus-refined sm:w-full"
              aria-label="Go to homepage"
            >
              <span className="relative z-10">Go Home</span>
            </a>
            <a
              href="https://portal.intuition.systems"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 min-h-[48px] text-base font-medium bg-transparent border border-border-base rounded-md text-text-secondary no-underline cursor-pointer transition-all duration-fast ease-out-custom hover:border-brand-primary hover:text-brand-primary hover:bg-brand-primary-5 hover:shadow-card focus-visible:outline-2 focus-visible:outline-brand-primary focus-visible:outline-offset-2 sm:w-full"
              aria-label="Browse Intuition Portal (opens in new tab)"
            >
              Browse Portal
            </a>
          </div>

          <div className="mt-12 pt-8 border-t border-border-base text-sm text-text-tertiary">
            Need help?{' '}
            <a
              href="/about"
              aria-label="View documentation"
              className="text-brand-primary no-underline transition-colors duration-fast ease-out-custom hover:text-brand-secondary focus-visible:outline-2 focus-visible:outline-brand-primary focus-visible:outline-offset-2 focus-visible:rounded-sm"
            >
              Check our documentation →
            </a>
          </div>
        </div>
      </body>
    </html>
  )
}
