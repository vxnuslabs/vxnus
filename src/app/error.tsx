"use client";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="state-page">
      <p className="eyebrow">500 / UNAVAILABLE</p>
      <h1>Something went wrong.</h1>
      <p>We could not load this page. Please try again.</p>
      <button type="button" onClick={() => reset()}>
        Try again
      </button>
    </main>
  );
}

