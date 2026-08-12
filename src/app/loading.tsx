export default function Loading() {
  return (
    <main className="loading-page" aria-busy="true" aria-label="Loading">
      <span className="loading-line loading-line-wide" />
      <span className="loading-line" />
      <span className="loading-line loading-line-short" />
    </main>
  );
}

