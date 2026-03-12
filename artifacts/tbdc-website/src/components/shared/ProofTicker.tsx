export default function ProofTicker({ items }: { items: string[] }) {
  const doubled = [...items, ...items];

  return (
    <div className="bg-navy-light overflow-hidden py-3">
      <div className="logo-runner flex whitespace-nowrap gap-12">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="text-white/60 text-sm shrink-0 flex items-center gap-3"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-teal shrink-0" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
