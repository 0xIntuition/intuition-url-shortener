// Homepage with URL shortener form
import type { FC } from 'hono/jsx'

export const HomePage: FC = () => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <title>Intuition URL Shortener</title>
        <link rel="stylesheet" href="/styles/output.css" />
      </head>
      <body className="flex items-center justify-center min-h-screen p-8 sm:p-6 bg-gradient-radial">
        <div className="container max-w-[540px] w-full animate-fade-in-up">
          <h1 className="title-accent text-4xl sm:text-2xl font-bold leading-tight text-center m-0 mb-4 text-text-primary tracking-tighter">
            Compress Blockchain IDs Into Shareable Links
          </h1>
          <p className="text-lg sm:text-base leading-normal text-text-secondary text-center m-0 mb-6 font-normal">
            256-bit identifiers → from 3-character URLs. No database, just math.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-text-tertiary mb-16 sm:mb-10 flex-wrap">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-success" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.3337 4L6.00033 11.3333L2.66699 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              95% compression
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-success" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.3337 4L6.00033 11.3333L2.66699 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              Zero collisions
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-success" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.3337 4L6.00033 11.3333L2.66699 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              Open source
            </span>
          </div>

          <form method="get" action="/short" role="search" aria-label="URL shortener form" className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <label htmlFor="url" id="url-label" className="text-sm font-medium text-text-secondary tracking-wide">
                Intuition Portal URL
              </label>
              <input
                type="text"
                id="url"
                name="url"
                aria-labelledby="url-label"
                aria-required="true"
                placeholder="portal.intuition.systems/explore/atom/0x..."
                required
                autofocus
                className="w-full p-4 min-h-[52px] text-base bg-bg-input border border-border-base rounded-md text-text-primary transition-all duration-base ease-out-custom placeholder:text-text-tertiary shadow-inner hover:border-border-hover hover:bg-bg-hover focus:outline-none focus:border-brand-primary focus:shadow-focus-refined focus:bg-bg-base appearance-none"
              />
            </div>
            <button
              type="submit"
              aria-label="Generate shortened link"
              className="btn-gradient-hover p-4 px-8 min-h-[52px] text-base font-semibold bg-brand-primary border-none rounded-md text-white cursor-pointer transition-all duration-fast ease-out-custom hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:shadow-focus focus-visible:shadow-md active:translate-y-0"
            >
              <span className="relative z-10">Generate Short Link</span>
            </button>
          </form>

          <nav className="footer flex justify-center items-center gap-4 mt-20 sm:mt-12 pt-8 text-center text-sm text-text-tertiary border-t border-border-base sm:flex-col sm:gap-2" aria-label="Footer navigation">
            <a
              href="/about"
              aria-label="Learn how this URL shortener works"
              className="link-underline-animated text-text-secondary no-underline p-2 px-3 min-h-[44px] inline-flex items-center transition-colors duration-fast ease-out-custom font-medium hover:text-brand-primary focus-visible:outline-2 focus-visible:outline-brand-primary focus-visible:outline-offset-2 focus-visible:rounded-sm"
            >
              Learn More
            </a>
            <span className="separator text-border-base select-none sm:hidden" aria-hidden="true">·</span>
            <a
              href="https://portal.intuition.systems"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Intuition Portal (opens in new tab)"
              className="link-underline-animated text-text-secondary no-underline p-2 px-3 min-h-[44px] inline-flex items-center transition-colors duration-fast ease-out-custom font-medium hover:text-brand-primary focus-visible:outline-2 focus-visible:outline-brand-primary focus-visible:outline-offset-2 focus-visible:rounded-sm"
            >
              Visit Portal
            </a>
          </nav>
        </div>
      </body>
    </html>
  )
}
