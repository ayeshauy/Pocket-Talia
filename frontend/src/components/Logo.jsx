const Logo = ({ size = 36 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="pt-lg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#D35400" />
        <stop offset="1" stopColor="#8B0032" />
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="60" height="60" rx="16" fill="#121217" stroke="url(#pt-lg)" strokeWidth="2.5" />
    <circle cx="32" cy="32" r="15" stroke="url(#pt-lg)" strokeWidth="3" />
    <line x1="32" y1="17" x2="32" y2="29" stroke="url(#pt-lg)" strokeWidth="3" strokeLinecap="round" />
    <line x1="32" y1="17" x2="32" y2="29" stroke="url(#pt-lg)" strokeWidth="3" strokeLinecap="round" transform="rotate(120 32 32)" />
    <line x1="32" y1="17" x2="32" y2="29" stroke="url(#pt-lg)" strokeWidth="3" strokeLinecap="round" transform="rotate(240 32 32)" />
    <circle cx="32" cy="32" r="5" fill="url(#pt-lg)" />
  </svg>
);

export default Logo;
