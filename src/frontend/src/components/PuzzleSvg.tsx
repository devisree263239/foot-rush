export function PuzzlePiece({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="currentColor"
      aria-hidden="true"
      role="img"
    >
      <title>Puzzle piece decoration</title>
      <path d="M35 10 L35 25 Q25 25 25 35 Q15 35 15 45 Q15 55 25 55 Q25 65 35 65 L35 90 L65 90 L65 75 Q75 75 75 65 Q85 65 85 55 Q85 45 75 45 Q75 35 65 35 L65 10 Z" />
    </svg>
  );
}
