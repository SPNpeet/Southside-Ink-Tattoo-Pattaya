import { useEffect, useState } from 'react'

// ─────────── Terminal: hero proof ───────────
// โชว์ให้เห็นว่า "agent ทำงานจริง" — ไม่ใช่แค่ข้อความโฆษณา
// สลับระหว่าง 3 สถานการณ์ (LOOP) เพื่อให้ดูมีชีวิต ไม่ใช่ภาพนิ่ง
const SCENES = [
  {
    title: 'กล่าวถึงหน้าร้าน · LINE OA',
    sub: '23:47',
    lines: [
      { who: 'in', text: 'สวัสดีค่ะ ร้านเปิดกี่โมงคะ' },
      { who: 'agent', text: 'สวัสดีค่ะ เปิด 11:00-21:00 น. วันนี้จองโต๊ะไหมคะ' },
      { who: 'in', text: 'จอง 2 คน คืนนี้ 19:00 ได้ไหม' },
      { who: 'agent', text: 'ได้ค่ะ จองให้แล้วนะคะ ✓' },
      { who: 'sys', text: '✓ ปิดงาน 23:52' },
    ],
  },
  {
    title: 'เพจร้านกาแฟ · Messenger',
    sub: '14:03',
    lines: [
      { who: 'in', text: 'เมนู oat latte ยังมีอยู่ไหมครับ' },
      { who: 'agent', text: 'มีค่ะ ราคา 95 บาท จะสั่งเลยไหมคะ' },
      { who: 'in', text: 'เอา 1 แก้ว รับที่ร้าน 15 นาที' },
      { who: 'agent', text: 'รับทราบค่ะ รอสักครู่นะคะ ☕' },
      { who: 'sys', text: '✓ ส่งต่อให้บาริสต้า' },
    ],
  },
  {
    title: 'หลังร้าน POS · บัญชี',
    sub: '02:14',
    lines: [
      { who: 'in', text: 'ส่งสลิปค่ะ [ภาพแนบ]' },
      { who: 'agent', text: 'อ่านสลิปแล้ว · 950 บาท · จับคู่รายการให้แล้วค่ะ' },
      { who: 'agent', text: 'บันทึกบัญชี: รายได้ 950 / ลูกค้า #A124' },
      { who: 'sys', text: '✓ ปิดงบรายวัน 02:15' },
    ],
  },
]

// แสดงทีละบรรทัดด้วย typewriter effect
function useTypewriter(lines, resetKey) {
  const [shown, setShown] = useState([])
  const [done, setDone] = useState(false)
  useEffect(() => {
    let alive = true
    let timer = 0
    setShown([])
    setDone(false)
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
    // lines มาจากค่าคงที่ระดับโมดูลและเปลี่ยนพร้อม resetKey เสมอ
    // ใส่ไว้ใน deps ให้ตรงตามจริง จะได้ไม่ต้องปิดคำเตือนด้วย eslint-disable
  }, [resetKey, lines])
  return { shown, done }
}

export default function Terminal() {
  const [sceneIdx, setSceneIdx] = useState(0)
  const scene = SCENES[sceneIdx]
  const { shown, done } = useTypewriter(scene.lines, sceneIdx)

  // วน scene อัตโนมัติหลังจบ 8 วิ
  useEffect(() => {
    if (!done) return
    const t = setTimeout(() => setSceneIdx((i) => (i + 1) % SCENES.length), 8000)
    return () => clearTimeout(t)
  }, [done, sceneIdx])

  return (
    <div className="terminal" aria-label="ตัวอย่างการทำงานของ AI agent" data-reveal>
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
            {l.who === 'in' && <span className="term-tag tag-in">ลูกค้า</span>}
            {l.who === 'agent' && <span className="term-tag tag-agent">agent</span>}
            {l.who === 'sys' && <span className="term-tag tag-sys">ระบบ</span>}
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
            <button
              type="button"
              className="term-replay"
              onClick={() => setSceneIdx((i) => (i + 1) % SCENES.length)}
              aria-label="ดูตัวอย่างอื่น"
            >
              ดูตัวอย่างอื่น →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
