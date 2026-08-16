// ─────────── Visual: illustration SVG per service ───────────
// วาดเองทั้งหมด สไตล์เดียวกับเว็บ (terminal/tech, mono, ส้ม)
// ใช้ var() ทุกจุดเพื่อให้เข้ากับทั้งธีมสว่าง/มืด
// ทุกแบบมีฉาก dot-grid blueprint + องค์ประกอบเฉพาะบริการ
import { useId } from 'react'

const S = ({ children, label, ...p }) => {
  const uid = useId()
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label={label} {...p}>
      <defs>
        <pattern id={`dots-${uid}`} width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.8" fill="var(--rule)" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="80" height="80" fill={`url(#dots-${uid})`} opacity="0.6" />
      {children}
    </svg>
  )
}

const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace'

/* การตลาดดิจิทัล — terminal window กราฟยอดพุ่ง + เป้ายิงแอด */
export function VMarketing({ label }) {
  return (
    <S label={label}>
      <rect x="4" y="4" width="72" height="52" rx="6" fill="var(--bg)" stroke="var(--rule-strong)" strokeWidth="1.5" />
      <rect x="4" y="4" width="72" height="14" rx="6" fill="var(--bg-2)" />
      <rect x="4" y="12" width="72" height="6" fill="var(--bg-2)" />
      <circle cx="12" cy="11" r="2" fill="var(--accent-2)" opacity="0.7" />
      <circle cx="18" cy="11" r="2" fill="var(--accent)" opacity="0.85" />
      <circle cx="24" cy="11" r="2" fill="var(--ok)" />
      <text x="26" y="13.5" fontSize="5" fontFamily={MONO} fill="var(--ink-2)" fontWeight="700">แคมเปญ ▸ auto</text>
      <rect x="12" y="44" width="8" height="8" rx="1.5" fill="var(--accent-2)" opacity="0.45" />
      <rect x="24" y="40" width="8" height="12" rx="1.5" fill="var(--accent-2)" opacity="0.7" />
      <rect x="36" y="34" width="8" height="18" rx="1.5" fill="var(--accent)" />
      <rect x="48" y="27" width="8" height="25" rx="1.5" fill="var(--accent-2)" opacity="0.85" />
      <path d="M 14 47 L 27 42 L 40 35 L 53 28 L 64 20" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 64 20 L 58 20 M 64 20 L 64 26" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="66" cy="48" r="7" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="3 2" />
      <circle cx="66" cy="48" r="2" fill="var(--accent)" />
      <path d="M 66 36 L 66 40 M 66 56 L 66 60 M 54 48 L 58 48 M 74 48 L 78 48" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" />
    </S>
  )
}

/* เว็บ & แอป — browser window + มือถือ responsive */
export function VWeb({ label }) {
  return (
    <S label={label}>
      <rect x="4" y="8" width="50" height="52" rx="6" fill="var(--bg)" stroke="var(--rule-strong)" strokeWidth="1.5" />
      <rect x="4" y="8" width="50" height="12" rx="6" fill="var(--bg-2)" />
      <rect x="4" y="14" width="50" height="6" fill="var(--bg-2)" />
      <circle cx="12" cy="14" r="1.8" fill="var(--ink-2)" />
      <circle cx="17" cy="14" r="1.8" fill="var(--ink-2)" opacity="0.7" />
      <circle cx="22" cy="14" r="1.8" fill="var(--ink-2)" opacity="0.45" />
      <rect x="30" y="11.5" width="18" height="5" rx="2.5" fill="var(--bg)" stroke="var(--rule)" />
      <path d="M 32 14 L 40 14" stroke="var(--ink-2)" strokeWidth="1.2" strokeLinecap="round" />
      <rect x="10" y="26" width="38" height="12" rx="2" fill="var(--bg-2)" stroke="var(--rule)" />
      <rect x="10" y="26" width="20" height="12" rx="2" fill="var(--accent)" opacity="0.85" />
      <circle cx="20" cy="32" r="3" stroke="var(--bg)" strokeWidth="1" opacity="0.7" />
      <rect x="34" y="28" width="12" height="2.5" rx="1.25" fill="var(--ink)" />
      <rect x="34" y="32" width="10" height="2.5" rx="1.25" fill="var(--ink-2)" />
      <rect x="34" y="36" width="8" height="2.5" rx="1.25" fill="var(--ink-2)" opacity="0.6" />
      <rect x="10" y="43" width="14" height="3" rx="1.5" fill="var(--ink)" />
      <rect x="10" y="48" width="30" height="2.5" rx="1.25" fill="var(--ink-2)" />
      <rect x="10" y="52" width="24" height="2.5" rx="1.25" fill="var(--ink-2)" />
      <rect x="10" y="56.5" width="16" height="2.5" rx="1.25" fill="var(--accent-2)" opacity="0.55" />
      <rect x="56" y="18" width="18" height="34" rx="4" fill="var(--bg-2)" stroke="var(--rule-strong)" strokeWidth="1.5" />
      <rect x="59" y="22" width="12" height="24" rx="2" fill="var(--bg)" stroke="var(--rule)" />
      <circle cx="65" cy="24.5" r="1.2" fill="var(--accent)" />
      <rect x="61" y="30" width="8" height="2" rx="1" fill="var(--ink)" />
      <rect x="61" y="34" width="8" height="2" rx="1" fill="var(--ink-2)" />
      <rect x="61" y="38" width="6" height="2" rx="1" fill="var(--accent)" opacity="0.8" />
      <path d="M 54 22 Q 55 17 59 18" stroke="var(--ink-2)" strokeWidth="1.2" strokeDasharray="2 2" fill="none" />
      <path d="M 65 56 L 65 60" stroke="var(--ink-2)" strokeWidth="1.5" strokeLinecap="round" />
    </S>
  )
}

/* AI & Automation — โครงข่ายประสาท + แชทบับเบิลตอบอัตโนมัติ */
export function VAI({ label }) {
  return (
    <S label={label}>
      <circle cx="22" cy="20" r="10" stroke="var(--rule-strong)" strokeWidth="1.5" fill="var(--bg-2)" strokeDasharray="4 2" />
      <circle cx="22" cy="20" r="3.5" fill="var(--accent)" />
      <circle cx="22" cy="20" r="1.5" fill="var(--bg)" />
      <circle cx="11" cy="12" r="1.5" fill="var(--ink-2)" />
      <circle cx="33" cy="10" r="1.5" fill="var(--ink-2)" />
      <circle cx="35" cy="27" r="1.5" fill="var(--ink-2)" />
      <circle cx="9" cy="29" r="1.5" fill="var(--ink-2)" />
      <path d="M 22 20 L 11 12 M 22 20 L 33 10 M 22 20 L 35 27 M 22 20 L 9 29" stroke="var(--ink-2)" strokeWidth="1" strokeDasharray="2 2" />
      <text x="40" y="42" textAnchor="middle" fontSize="6" fontFamily={MONO} fill="var(--ink-2)" fontWeight="700">24/7</text>
      <rect x="5" y="46" width="31" height="17" rx="8" fill="var(--bg-2)" stroke="var(--rule-strong)" strokeWidth="1.5" />
      <circle cx="11" cy="54.5" r="3" fill="var(--accent)" />
      <path d="M 18 52.5 L 25 52.5 M 18 56.5 L 27 56.5" stroke="var(--ink-2)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 13 61 L 9 63 L 11 59.5 Z" fill="var(--bg-2)" stroke="var(--rule-strong)" strokeWidth="1.5" strokeLinejoin="round" />
      <rect x="45" y="57" width="25" height="13" rx="8" fill="var(--accent)" opacity="0.9" />
      <path d="M 50 61 L 62 61 M 50 65 L 58 65" stroke="var(--bg)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 67 68 L 71 70 L 69 66.5 Z" fill="var(--accent)" opacity="0.9" />
    </S>
  )
}

/* IoT & ฮาร์ดแวร์ — อุปกรณ์ + คลื่นสัญญาณ + ใบไม้อัตโนมัติ */
export function VIoT({ label }) {
  return (
    <S label={label}>
      <path d="M 62 12 A 8 8 0 0 1 67 18" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 58 7 A 14 14 0 0 1 70 16" stroke="var(--accent)" strokeWidth="1.5" opacity="0.55" strokeLinecap="round" />
      <circle cx="64" cy="20" r="2" fill="var(--accent)" />
      <path d="M 24 24 C 19 15 22 9 30 7 C 32 14 30 21 24 24 Z" fill="var(--accent)" opacity="0.85" />
      <path d="M 30 7 C 37 11 39 20 32 24" stroke="var(--bg)" strokeWidth="1" strokeLinecap="round" />
      <rect x="17" y="24" width="44" height="32" rx="5" fill="var(--bg-2)" stroke="var(--rule-strong)" strokeWidth="1.5" />
      <rect x="21" y="28" width="36" height="10" rx="2" fill="var(--bg)" stroke="var(--rule)" />
      <circle cx="26" cy="33" r="2" fill="var(--ok)" />
      <circle cx="32" cy="33" r="2" fill="var(--accent)" />
      <circle cx="38" cy="33" r="2" fill="var(--ink-2)" />
      <rect x="21" y="43" width="26" height="2.5" rx="1.25" fill="var(--ink)" />
      <rect x="21" y="47.5" width="20" height="2.5" rx="1.25" fill="var(--ink-2)" />
      <rect x="50" y="42" width="8" height="8" rx="2" fill="var(--accent)" opacity="0.8" />
      <path d="M 22 56 L 17 63 M 39 56 L 39 63" stroke="var(--ink-2)" strokeWidth="1.5" strokeLinecap="round" />
    </S>
  )
}

/* IT Audit — โล่ผ่านตรวจ + checklist สถานะ */
export function VAudit({ label }) {
  return (
    <S label={label}>
      <path d="M 40 8 L 62 16 L 62 36 Q 62 54 40 68 Q 18 54 18 36 L 18 16 Z" fill="var(--bg-2)" stroke="var(--ink)" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="40" cy="16" r="1.5" fill="var(--ok)" />
      <path d="M 31 40 L 37 46 L 50 30" stroke="var(--accent)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="22" y="53" width="36" height="13" rx="3" fill="var(--bg)" stroke="var(--rule-strong)" strokeWidth="1.5" />
      <rect x="25" y="56" width="5" height="5" rx="1" fill="var(--accent)" />
      <path d="M 26.3 58.5 L 27.7 59.8 L 29.8 56.8" stroke="var(--bg)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="33" y="57" width="14" height="2.5" rx="1.25" fill="var(--ink)" />
      <rect x="25" y="63" width="5" height="5" rx="1" fill="none" stroke="var(--ink-2)" strokeWidth="1" />
      <rect x="33" y="64" width="11" height="2.5" rx="1.25" fill="var(--ink-2)" />
      <rect x="58" y="20" width="10" height="8" rx="2" fill="var(--accent-2)" opacity="0.3" stroke="var(--accent-2)" strokeWidth="1.2" />
      <path d="M 61 21 V 18 A 2 2 0 0 1 65 18 V 21" stroke="var(--accent-2)" strokeWidth="1.4" fill="none" />
    </S>
  )
}

/* วางระบบครบวงจร — hub กลางเชื่อมทุกโมดูล */
export function VFull({ label }) {
  return (
    <S label={label}>
      <circle cx="40" cy="40" r="20" stroke="var(--ink)" strokeWidth="1" strokeDasharray="3 3" fill="none" opacity="0.55" />
      <circle cx="40" cy="40" r="8" fill="var(--accent)" />
      <path d="M 36.5 40 L 39 42.5 L 44 37.5" stroke="var(--bg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="12" y="12" width="13" height="11" rx="2" fill="var(--bg-2)" stroke="var(--rule-strong)" strokeWidth="1.5" />
      <rect x="14" y="14" width="9" height="2.5" rx="1.25" fill="var(--accent)" />
      <rect x="14" y="18" width="7" height="2.5" rx="1.25" fill="var(--ink-2)" />
      <circle cx="67" cy="12" r="5" fill="var(--bg-2)" stroke="var(--rule-strong)" strokeWidth="1.5" />
      <circle cx="67" cy="12" r="1.5" fill="var(--accent)" />
      <rect x="12" y="57" width="5" height="9" rx="1" fill="var(--accent-2)" opacity="0.6" />
      <rect x="19" y="61" width="5" height="5" rx="1" fill="var(--accent)" />
      <circle cx="67" cy="66" r="4.5" fill="var(--bg-2)" stroke="var(--rule-strong)" strokeWidth="1.5" />
      <circle cx="67" cy="66" r="1.5" fill="var(--ok)" />
      <path d="M 25 18 L 32 32 M 62 16 L 48 32 M 23 57 L 32 48 M 62 62 L 48 48" stroke="var(--ink-2)" strokeWidth="1" strokeDasharray="2 2" />
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