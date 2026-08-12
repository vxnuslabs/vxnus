export default function AdminLoading() {
  return (
    <main className="admin-main admin-loading" aria-busy="true" aria-label="Loading admin workspace">
      <span className="loading-line loading-line-wide" />
      <span className="loading-line" />
      <span className="loading-line loading-line-short" />
    </main>
  );
}

