/** The DIVEST 7 mark: three peaks, a rising sun, seven points of light. */
export function SevenMark({
  className = 'h-8 w-8',
  strokeWidth = 1.4,
}: {
  className?: string
  strokeWidth?: number
}) {
  const dots = Array.from({ length: 7 }, (_, i) => {
    const angle = Math.PI - (i * Math.PI) / 6
    return { cx: 32 + Math.cos(angle) * 21, cy: 26 - Math.sin(angle) * 11 }
  })

  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" fill="none">
      <circle cx="32" cy="29" r="8.5" fill="url(#d7sun)" opacity="0.95" />
      {dots.map((d, i) => (
        <circle key={i} cx={d.cx} cy={d.cy} r="1.5" fill="#d0a04d" opacity={0.45 + i * 0.05} />
      ))}
      <path
        d="M4 50 L20 29 L32 50 M20.5 47 L32 24 L44 50 M32.5 47 L44.5 31 L60 50 M4 50 H60"
        stroke="url(#d7gold)"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id="d7gold" x1="4" y1="24" x2="60" y2="50" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f0d59a" />
          <stop offset="0.55" stopColor="#d0a04d" />
          <stop offset="1" stopColor="#ae7f35" />
        </linearGradient>
        <radialGradient id="d7sun" cx="0.5" cy="0.4" r="0.7">
          <stop stopColor="#f7e6bd" />
          <stop offset="1" stopColor="#d0a04d" />
        </radialGradient>
      </defs>
    </svg>
  )
}

export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`font-display tracking-[0.2em] uppercase ${className}`}>
      Divest<span className="ml-[0.35em] gold-text">7</span>
    </span>
  )
}
