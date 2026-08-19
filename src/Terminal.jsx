import { useEffect, useState } from 'react'

// ─────────── Terminal: hero proof ───────────
// โชว์ให้เห็นว่า "agent ทำงานจริง" — ไม่ใช่แค่ข้อความโฆษณา
// scenes + ข้อความมาจาก i18n (App ส่ง prop มา)

// แสดงทีละบรรทัดด้วย typewriter effect
function useTypewriter(lines, resetKey) {
  const [shown, setShown] = useState([])
  const [done, setDone] = useState(false)
  useEffect(() => {
    let alive = true
    let timer = 0
    setShown([])
    setDone(false)
    // ผู้ใช้ที่ขอไม่ให้เคลื่อนไหว เห็นบทสนทนาครบในทันที ไม่ต้องรอพิมพ์ทีละบรรทัด
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(lines)
      setDone(true)
      return () => {
        alive = false
      }
    }
    let i = 0
    const tick = () => {
      if (!alive) return
      if (i >= lines.length) {
        setDone(true)
        return
      }
      const next = lines[i]
      const delay = next.who === 'in' ? 700 : 1100
      i++
      setShown((p) => [...p, next])
      timer = window.setTimeout(tick, delay)
    }
    tick()
    return () => {
      alive = false
      window.clearTimeout(timer)
    }
    // lines มาจาก prop และเปลี่ยนพร้อม resetKey เสมอ
  }, [resetKey, lines])
  return { shown, done }
}

export default function Terminal({ scenes, ui }) {
  const [sceneIdx, setSceneIdx] = useState(0)
  const scene = scenes[sceneIdx]
  const { shown, done } = useTypewriter(scene.lines, sceneIdx)

  // วน scene อัตโนมัติหลังจบ 8 วิ
  useEffect(() => {
    if (!done) return
    const t = setTimeout(() => setSceneIdx((i) => (i + 1) % scenes.length), 8000)
    return () => clearTimeout(t)
  }, [done, sceneIdx, scenes.length])

  return (
    <div className="terminal" aria-label={ui.termLabel} data-reveal>
      <div className="term-bar">
        <span className="term-dot" style={{ background: '#ff5f57' }} aria-hidden="true" />
        <span className="term-dot" style={{ background: '#febc2e' }} aria-hidden="true" />
        <span className="term-dot" style={{ background: '#28c840' }} aria-hidden="true" />
        <span className="term-title">● {scene.title}</span>
        <span className="term-sub">{scene.sub}</span>
      </div>
      <div className="term-body" role="log" aria-live="off">
        {shown.map((l, i) => (
          <p key={i} className={`term-line term-${l.who}`}>
            {l.who === 'in' && <span className="term-tag tag-in">{ui.termIn}</span>}
            {l.who === 'agent' && <span className="term-tag tag-agent">agent</span>}
            {l.who === 'sys' && <span className="term-tag tag-sys">{ui.termSys}</span>}
            <span className="term-text">{l.text}</span>
          </p>
        ))}
        {!done && (
          <p className="term-line term-typing" aria-hidden="true">
            <span className="term-cursor">▌</span>
          </p>
        )}
        {done && (
          <div className="term-foot">
            <span className="term-count" aria-hidden="true">
              {ui.count} {sceneIdx + 1}/{scenes.length}
            </span>
            <button
              type="button"
              className="term-replay"
              onClick={() => setSceneIdx((i) => (i + 1) % scenes.length)}
              aria-label={ui.replay}
            >
              {ui.replay}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
