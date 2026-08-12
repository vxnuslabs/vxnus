"use client";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body className="global-error-page">
        <main className="state-page">
          <p className="eyebrow">SYSTEM / UNAVAILABLE</p>
          <h1>Something went wrong.</h1>
          <p>VXNUS could not load this page.</p>
          <button type="button" onClick={() => reset()}>Try again</button>
        </main>
      </body>
    </html>
  );
}

