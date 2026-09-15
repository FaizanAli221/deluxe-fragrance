import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="font-display text-4xl italic text-ink">404</h1>
      <p className="mt-3 text-sm text-ink/70">
        We couldn&apos;t find the page you were looking for.
      </p>
      <Link
        href="/"
        className="mt-6 border border-ink px-6 py-2.5 text-xs tracking-widest2 text-ink hover:bg-ink hover:text-parchment"
      >
        BACK TO HOME
      </Link>
    </div>
  );
}
