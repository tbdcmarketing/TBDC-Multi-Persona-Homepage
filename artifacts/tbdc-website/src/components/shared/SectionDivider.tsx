export default function SectionDivider({ fromColor, toColor }: { fromColor: string; toColor: string }) {
  return (
    <div className="relative h-0" style={{ backgroundColor: fromColor }}>
      <svg
        className="absolute -bottom-[1px] left-0 w-full block"
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        style={{ height: '60px' }}
      >
        <path d="M0,60 C480,0 960,0 1440,60 L1440,60 L0,60 Z" fill={toColor} />
      </svg>
    </div>
  );
}
