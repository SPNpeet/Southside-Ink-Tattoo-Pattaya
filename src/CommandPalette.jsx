import { useEffect, useMemo, useRef, useState } from 'react'
import Icon from './Icon'

/**
 * Command palette แบบที่ Linear / Vercel / GitHub ใช้ กด Ctrl+K หรือ ⌘K
 * ใช้ <dialog> ของเบราว์เซอร์เอง เลยได้ focus trap กับปุ่ม Escape มาฟรี
 * ไม่ต้องพึ่งไลบรารีภายนอก บันเดิลไม่โต และไม่มีสคริปต์นอกให้ต้องเชื่อใจ
 */
export default function CommandPalette({ open, onClose, actions }) {
  const dialogRef = useRef(null)
  const inputRef = useRef(null)
  const listRef = useRef(null)
  const [q, setQ] = useState('')
  const [cursor, setCursor] = useState(0)

  const results = useMemo(() => {
    const term = q.trim().toLowerCase()
    if (!term) return actions
    return actions.filter((a) =>
      `${a.label} ${a.hint || ''} ${(a.keywords || []).join(' ')}`.toLowerCase().includes(term)
    )
  }, [q, actions])

  // เปิด/ปิด dialog ให้ตรงกับ state
  useEffect(() => {
    const el = dialogRef.current
    if (!el) return
    if (open && !el.open) {
      el.showModal()
      setQ('')
      setCursor(0)
      inputRef.current?.focus()
    } else if (!open && el.open) {
      el.close()
    }
  }, [open])

  // ปุ่ม Escape ของ <dialog> ยิง cancel ต้องส่งกลับให้ React รู้
  useEffect(() => {
    const el = dialogRef.current
    if (!el) return
    const onCancel = (e) => {
      e.preventDefault()
      onClose()
    }
    el.addEventListener('cancel', onCancel)
    el.addEventListener('close', onClose)
    return () => {
      el.removeEventListener('cancel', onCancel)
      el.removeEventListener('close', onClose)
    }
  }, [onClose])

  useEffect(() => {
    setCursor(0)
  }, [q])

  // เลื่อนรายการที่เลือกให้อยู่ในสายตาเสมอ
  useEffect(() => {
    if (!open) return
    const el = listRef.current?.querySelector(`[data-i="${cursor}"]`)
    el?.scrollIntoView({ block: 'nearest' })
  }, [cursor, open])

  const run = (action) => {
    onClose()
    // รอให้ dialog ปิดก่อน ไม่งั้น scroll กับ focus จะชนกัน
    // ห้ามใช้ requestAnimationFrame ตรงนี้ เพราะแท็บที่ไม่ได้อยู่หน้าจอจะไม่ยิง
    // แล้วคำสั่งที่ผู้ใช้เลือกจะหายเงียบ ๆ — setTimeout ยิงแน่นอนกว่า
    window.setTimeout(() => action.run(), 0)
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setCursor((c) => (results.length ? (c + 1) % results.length : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setCursor((c) => (results.length ? (c - 1 + results.length) % results.length : 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const a = results[cursor]
      if (a) run(a)
    }
  }

  return (
    <dialog className="cmdk" ref={dialogRef} aria-label="ค้นหาและลัดไปยังเมนู">
      <div className="cmdk-box" onKeyDown={onKeyDown}>
        <div className="cmdk-search">
          <span className="cmdk-prompt" aria-hidden="true">
            $
          </span>
          <input
            ref={inputRef}
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="พิมพ์เพื่อค้นหา เช่น บริการ ติดต่อ ธีม…"
            aria-label="ค้นหาเมนู"
            autoComplete="off"
            spellCheck="false"
          />
          <kbd>esc</kbd>
        </div>

        <ul className="cmdk-list" ref={listRef} role="listbox" aria-label="ผลการค้นหา">
          {results.map((a, i) => (
            <li key={a.id}>
              <button
                type="button"
                data-i={i}
                role="option"
                aria-selected={i === cursor}
                className={i === cursor ? 'on' : ''}
                onMouseMove={() => setCursor(i)}
                onClick={() => run(a)}
              >
                <Icon name={a.icon} />
                <span className="cmdk-label">{a.label}</span>
                {a.hint && <span className="cmdk-hint">{a.hint}</span>}
              </button>
            </li>
          ))}
          {results.length === 0 && <li className="cmdk-empty">ไม่พบรายการที่ค้นหา</li>}
        </ul>

        <footer className="cmdk-foot">
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd> เลื่อน
          </span>
          <span>
            <kbd>enter</kbd> เลือก
          </span>
        </footer>
      </div>
    </dialog>
  )
}
