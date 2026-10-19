import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid max-w-[65ch] gap-3">
      <h1 className="text-2xl font-semibold tracking-tight">Not Available</h1>
      <p className="text-muted">There’s no such document, text or queue. It may have been renamed by an assigned ID.</p>
      <p>
        <Link href="/documents" className="text-accent underline-offset-4 hover:underline">
          Search the documents
        </Link>{" "}
        or go back to the <Link href="/" className="text-accent underline-offset-4 hover:underline">Overview</Link>.
      </p>
    </div>
  );
}
