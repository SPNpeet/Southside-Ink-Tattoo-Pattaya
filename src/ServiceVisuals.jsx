// ─────────── Visual: small SVG mock per service ───────────
// ใช้แทนรูปถ่าย (ไม่มีรูปผลงานจริง) — สื่อสารให้คนเข้าใจงานใน 1 วิ
// แต่ละอันเป็น self-contained SVG ~80x80 สีเน้นของแต่ละบริการ

const S = ({ children, label, ...p }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label={label} {...p}>
    {children}
  </svg>
)

export function VMarketing({ label }) {
  return (
    <S label={label}>
      <rect x="8" y="44" width="10" height="28" rx="2" fill="var(--accent-2)" opacity="0.45" />
      <rect x="22" y="32" width="10" height="40" rx="2" fill="var(--accent-2)" opacity="0.7" />
      <rect x="36" y="22" width="10" height="50" rx="2" fill="var(--accent)" />
      <rect x="50" y="14" width="10" height="58" rx="2" fill="var(--accent-2)" />
      <path d="M 10 46 L 24 34 L 38 24 L 52 16 L 66 8" stroke="var(--ink)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <circle cx="66" cy="8" r="3" fill="var(--ink)" />
      <text x="40" y="74" textAnchor="middle" fontSize="6" fontFamily="ui-monospace" fill="var(--ink-2)" fontWeight="700">ROAS ↑</text>
    </S>
  )
}

export function VWeb({ label }) {
  return (
    <S label={label}>
      <rect x="6" y="14" width="68" height="50" rx="4" fill="var(--bg)" stroke="var(--rule-strong)" strokeWidth="1.5" />
      <rect x="6" y="14" width="68" height="10" rx="4" fill="var(--bg-2)" />
      <circle cx="12" cy="19" r="1.5" fill="var(--ink-2)" />
      <circle cx="17" cy="19" r="1.5" fill="var(--ink-2)" />
      <circle cx="22" cy="19" r="1.5" fill="var(--ink-2)" />
      <rect x="40" y="17" width="28" height="4" rx="2" fill="var(--ink-2)" opacity="0.5" />
      <rect x="12" y="30" width="22" height="3" rx="1.5" fill="var(--ink)" />
      <rect x="12" y="36" width="34" height="3" rx="1.5" fill="var(--ink-2)" />
      <rect x="12" y="42" width="28" height="3" rx="1.5" fill="var(--ink-2)" />
      <rect x="12" y="50" width="18" height="8" rx="2" fill="var(--accent)" />
      <rect x="32" y="50" width="18" height="8" rx="2" fill="var(--accent-2)" opacity="0.4" />
    </S>
  )
}

export function VAI({ label }) {
  return (
    <S label={label}>
      <path d="M 14 22 L 24 12 L 36 12 L 46 22 L 46 36 L 36 46 L 24 46 L 14 36 Z" stroke="var(--ink)" strokeWidth="1.5" fill="var(--bg-2)" />
      <circle cx="30" cy="29" r="4" fill="var(--accent)" />
      <circle cx="30" cy="29" r="2" fill="var(--bg)" />
      <path d="M 22 56 Q 30 48 38 56" stroke="var(--ink-2)" strokeWidth="1" fill="none" strokeDasharray="2 2" />
      <rect x="56" y="40" width="18" height="10" rx="5" fill="var(--accent-2)" opacity="0.3" stroke="var(--accent-2)" />
      <circle cx="60" cy="45" r="1" fill="var(--accent-2)" />
      <circle cx="65" cy="45" r="1" fill="var(--accent-2)" />
      <circle cx="70" cy="45" r="1" fill="var(--accent-2)" />
      <text x="30" y="74" textAnchor="middle" fontSize="6" fontFamily="ui-monospace" fill="var(--ink-2)" fontWeight="700">24/7</text>
    </S>
  )
}

export function VIoT({ label }) {
  return (
    <S label={label}>
      <rect x="24" y="20" width="32" height="44" rx="3" fill="var(--bg-2)" stroke="var(--rule-strong)" strokeWidth="1.5" />
      <circle cx="40" cy="32" r="5" fill="var(--accent)" />
      <path d="M 40 32 L 40 26" stroke="var(--ink)" strokeWidth="1.5" />
      <path d="M 40 32 L 46 35" stroke="var(--ink)" strokeWidth="1.5" />
      <path d="M 40 32 L 34 35" stroke="var(--ink)" strokeWidth="1.5" />
      <rect x="28" y="42" width="24" height="3" rx="1.5" fill="var(--ink-2)" />
      <rect x="28" y="48" width="20" height="3" rx="1.5" fill="var(--ink-2)" />
      <circle cx="34" cy="56" r="1.5" fill="var(--ok)" />
      <circle cx="46" cy="56" r="1.5" fill="var(--ink-2)" opacity="0.4" />
      <path d="M 60 22 Q 70 22 70 32" stroke="var(--accent)" strokeWidth="1.5" fill="none" strokeDasharray="2 2" />
      <path d="M 20 22 Q 10 22 10 32" stroke="var(--accent)" strokeWidth="1.5" fill="none" strokeDasharray="2 2" />
    </S>
  )
}

export function VAudit({ label }) {
  return (
    <S label={label}>
      <path d="M 40 8 L 60 16 L 60 36 Q 60 54 40 66 Q 20 54 20 36 L 20 16 Z" fill="var(--bg-2)" stroke="var(--ink)" strokeWidth="1.5" />
      <path d="M 30 36 L 37 43 L 52 28" stroke="var(--accent)" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="26" y="50" width="28" height="2" rx="1" fill="var(--ink-2)" opacity="0.4" />
      <rect x="26" y="54" width="22" height="2" rx="1" fill="var(--ink-2)" opacity="0.3" />
    </S>
  )
}

export function VFull({ label }) {
  return (
    <S label={label}>
      <circle cx="40" cy="40" r="6" fill="var(--accent)" />
      <circle cx="20" cy="20" r="4" fill="var(--accent-2)" />
      <circle cx="60" cy="20" r="4" fill="var(--accent-2)" />
      <circle cx="20" cy="60" r="4" fill="var(--accent-2)" />
      <circle cx="60" cy="60" r="4" fill="var(--accent-2)" />
      <path d="M 40 40 L 20 20" stroke="var(--ink-2)" strokeWidth="1" strokeDasharray="2 2" />
      <path d="M 40 40 L 60 20" stroke="var(--ink-2)" strokeWidth="1" strokeDasharray="2 2" />
      <path d="M 40 40 L 20 60" stroke="var(--ink-2)" strokeWidth="1" strokeDasharray="2 2" />
      <path d="M 40 40 L 60 60" stroke="var(--ink-2)" strokeWidth="1" strokeDasharray="2 2" />
      <circle cx="40" cy="40" r="14" stroke="var(--ink)" strokeWidth="1" strokeDasharray="3 2" fill="none" opacity="0.5" />
    </S>
  )
}

export const VISUAL_BY_KEY = {
  marketing: VMarketing,
  web: VWeb,
  ai: VAI,
  iot: VIoT,
  audit: VAudit,
  full: VFull,
}
