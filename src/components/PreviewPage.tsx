// Preview page showing share card and shortened URL
import type { FC } from 'hono/jsx'
import type { MetaData } from '../types/graphql.js'

interface PreviewPageProps extends MetaData {
  shortUrl: string
}

export const PreviewPage: FC<PreviewPageProps> = (props) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <title>Link Created - Intuition URL Shortener</title>
        <link rel="stylesheet" href="/styles/output.css" />
        <style>{`
          .copied {
            background: #10b981 !important;
          }
          .copied::before {
            opacity: 0 !important;
          }
        `}</style>
      </head>
      <body className="p-8 sm:p-6 min-h-screen">
        <div className="container max-w-[640px] mx-auto animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-success-10 border border-success-30 rounded-md text-success text-sm font-medium mx-auto mb-16 animate-fade-in-up">
            <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
              <path d="M13.3337 4L6.00033 11.3333L2.66699 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Link created
          </div>

          <div className="mb-8 animate-fade-in-up" style="animation-delay: 100ms; animation-fill-mode: both;">
            <div className="text-xs font-semibold uppercase tracking-wider text-text-tertiary mb-4">Preview</div>
            <div className="bg-bg-card border border-border-base rounded-lg overflow-hidden transition-all duration-base ease-out-custom hover:-translate-y-0.5 hover:shadow-lg hover:border-border-hover">
              <img src={props.imageUrl} alt={props.title} className="w-full h-auto block bg-bg-elevated border-b border-border-base" />
              <div className="p-6 sm:p-5">
                <h1 className="text-xl font-semibold leading-tight m-0 mb-3 text-text-primary">{props.title}</h1>
                <p className="text-base leading-normal m-0 text-text-secondary">{props.description}</p>
              </div>
            </div>
          </div>

          <div className="mb-0 animate-fade-in-up" style="animation-delay: 200ms; animation-fill-mode: both;">
            <div className="flex gap-3 items-stretch sm:flex-col">
              <input
                type="text"
                id="short-url"
                className="flex-1 p-4 min-h-[52px] text-base bg-bg-input border border-border-base rounded-md text-brand-primary font-medium transition-all duration-base ease-out-custom select-all focus:outline-none focus:border-brand-primary focus:shadow-focus focus:bg-bg-base"
                value={props.shortUrl}
                readonly
                aria-label="Your shortened URL"
                aria-readonly="true"
              />
              <button
                className="btn-gradient-hover px-6 py-4 min-h-[52px] text-base font-semibold bg-brand-primary border-none rounded-md text-white cursor-pointer transition-all duration-fast ease-out-custom whitespace-nowrap hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:shadow-focus focus-visible:shadow-md active:scale-95 sm:w-full"
                id="copy-btn"
                onclick="copyToClipboard()"
                aria-label="Copy shortened URL to clipboard"
              >
                <span className="relative z-10">Copy Link</span>
              </button>
            </div>
          </div>

          <div className="flex gap-4 justify-center mt-12 pt-8 border-t border-border-base animate-fade-in-up sm:flex-col sm:gap-3" style="animation-delay: 300ms; animation-fill-mode: both;">
            <a
              href="/"
              className="px-6 py-3 min-h-[48px] text-base font-medium bg-transparent border border-border-base rounded-md text-text-secondary no-underline inline-flex items-center justify-center transition-all duration-fast ease-out-custom hover:border-brand-primary hover:text-brand-primary hover:bg-brand-primary-5 focus-visible:outline-2 focus-visible:outline-brand-primary focus-visible:outline-offset-2 sm:w-full"
              aria-label="Create another shortened URL"
            >
              Create Another Link
            </a>
            <a
              href={props.shortUrl}
              className="px-6 py-3 min-h-[48px] text-base font-medium bg-transparent border border-border-base rounded-md text-text-secondary no-underline inline-flex items-center justify-center transition-all duration-fast ease-out-custom hover:border-brand-primary hover:text-brand-primary hover:bg-brand-primary-5 focus-visible:outline-2 focus-visible:outline-brand-primary focus-visible:outline-offset-2 sm:w-full"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Preview shortened link in Portal"
            >
              Preview in Portal
            </a>
          </div>
        </div>

        <script dangerouslySetInnerHTML={{
          __html: `
            function copyToClipboard() {
              const input = document.getElementById('short-url');
              const button = document.getElementById('copy-btn');
              const originalText = button.querySelector('span').textContent;

              navigator.clipboard.writeText(input.value).then(function() {
                // Update button to show success
                button.querySelector('span').textContent = 'Copied ✓';
                button.classList.add('copied');
                button.setAttribute('aria-label', 'URL copied to clipboard');

                // Announce to screen readers
                const announcement = document.createElement('div');
                announcement.setAttribute('role', 'status');
                announcement.setAttribute('aria-live', 'polite');
                announcement.textContent = 'Shortened URL copied to clipboard';
                announcement.className = 'sr-only';
                document.body.appendChild(announcement);

                // Reset after 2.5 seconds
                setTimeout(function() {
                  button.querySelector('span').textContent = originalText;
                  button.classList.remove('copied');
                  button.setAttribute('aria-label', 'Copy shortened URL to clipboard');
                  if (announcement.parentNode) {
                    document.body.removeChild(announcement);
                  }
                }, 2500);
              }).catch(function(err) {
                console.error('Failed to copy: ', err);
                // Fallback: select the text
                input.select();
                try {
                  document.execCommand('copy');
                  button.querySelector('span').textContent = 'Copied ✓';
                  button.classList.add('copied');

                  setTimeout(function() {
                    button.querySelector('span').textContent = originalText;
                    button.classList.remove('copied');
                  }, 2500);
                } catch (err) {
                  console.error('Fallback copy failed:', err);
                }
              });
            }
          `
        }} />
      </body>
    </html>
  )
}
