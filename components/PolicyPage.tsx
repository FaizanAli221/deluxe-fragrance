export default function PolicyPage({
  title,
  paragraphs,
}: {
  title: string;
  paragraphs: string[];
}) {
  return (
    <div className="container-page max-w-2xl py-16 sm:py-24">
      <h1 className="font-display text-3xl italic text-ink">{title}</h1>
      <div className="mt-6 space-y-4">
        {paragraphs.map((p, i) => (
          <p key={i} className="text-sm leading-relaxed text-ink/80">
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}
