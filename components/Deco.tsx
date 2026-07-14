/* Reusable decorative bits: pressed tulips, etc. */

export function Tulip({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      className={`tulip ${className}`}
      viewBox="0 0 60 96"
      width="60"
      height="96"
      style={style}
      aria-hidden="true"
    >
      {/* stem */}
      <path d="M30 44 C30 60 30 74 30 92" stroke="#7ca34a" strokeWidth="3.2" fill="none" strokeLinecap="round" />
      {/* leaves */}
      <path d="M30 72 C14 66 8 78 6 90 C22 90 30 82 30 72Z" fill="#8fb85a" />
      <path d="M30 62 C46 56 54 66 56 78 C40 80 30 72 30 62Z" fill="#7ca34a" />
      {/* bloom — three petals */}
      <path d="M30 8 C20 12 14 22 15 36 C15 42 22 46 30 46 C38 46 45 42 45 36 C46 22 40 12 30 8Z" fill="#f79ec0" />
      <path d="M16 30 C14 20 18 12 24 8 C22 20 24 34 30 44 C22 44 17 40 16 30Z" fill="#e2789c" />
      <path d="M44 30 C46 20 42 12 36 8 C38 20 36 34 30 44 C38 44 43 40 44 30Z" fill="#e2789c" />
      <path d="M30 10 C28 22 28 34 30 44 C32 34 32 22 30 10Z" fill="#c85f86" opacity=".7" />
    </svg>
  );
}
