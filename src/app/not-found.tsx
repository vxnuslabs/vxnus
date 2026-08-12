import Link from "next/link";

export default function NotFound() {
  return (
    <main className="state-page">
      <p className="eyebrow">404 / NOT FOUND</p>
      <h1>That page is not here.</h1>
      <p>The address may have changed, or the work has not been published.</p>
      <Link href="/">Return to VXNUS</Link>
    </main>
  );
}

