import { useEffect, useRef } from 'react'
import Icon from './Icon'
import { VISUAL_BY_KEY } from './ServiceVisuals'
import { useDismiss } from './hooks'

// ─────────── ServiceModal: รายละเอียดแต่ละบริการ ───────────
// คลิกการ์ดบริการ → เปิดกล่องรายละเอียดแบบเต็ม
// เปิดได้ 3 ทาง: คลิกการ์ด / ปุ่ม "ดูรายละเอียด" / เปิดจากภายนอก (openServiceId)
// ปิดด้วย: Esc, คลิกพื้นหลัง, ปุ่มปิด — และคืนโฟกัสให้ปุ่มที่เปิดมา

export default function ServiceModal({ service, t, onClose, onQuote }) {
  const dialogRef = useRef(null)
  const restoreRef = useRef(null)
  const M = t.modal

  // บันทึกโฟกัสเดิมตอนเปิด เพื่อคืนให้หลังปิด (a11y)
  useEffect(() => {
    if (!service) return
    restoreRef.current = document.activeElement
    // ต้องรอให้ animation เปิด (opacity/transform) จบก่อน ไม่งั้นบางเบราว์เซอร์
    // (รวม Edge headless) จะไม่ยอมให้โฟกัส element ที่ยังไม่ "visible"
    // ใช้ document lookup ตรง ๆ แทน ref เพราะ StrictMode remount ทำให้ ref หลุดได้
    let tries = 0
    const focusTimer = window.setInterval(() => {
      const title = document.getElementById('svm-title')
      if (title) {
        title.focus()
        if (document.activeElement === title || document.activeElement?.closest('.svm')) {
          window.clearInterval(focusTimer)
        }
      }
      if (++tries > 12) window.clearInterval(focusTimer)
    }, 120)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.clearInterval(focusTimer)
      document.body.style.overflow = prevOverflow
      restoreRef.current?.focus?.()
    }
  }, [service])

  // Trap Tab อยู่ในกล่อง เพื่อไม่ให้โฟกัสหลุดไปเนื้อหาหน้าหลัง (a11y)
  useEffect(() => {
    if (!service) return
    const dialog = dialogRef.current
    const onKey = (e) => {
      if (e.key !== 'Tab') return
      const focusables = dialog?.querySelectorAll(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      if (!focusables || focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [service])

  // ปิดเมื่อกด Esc หรือคลิกนอกกล่อง (ฟังอยู่บน document)
  const panelRef = useRef(null)
  useDismiss(panelRef, !!service, onClose)

  if (!service) return null

  const Visual = VISUAL_BY_KEY[service.visual]

  return (
    <div className="svm-backdrop" role="presentation">
      <div
        ref={panelRef}
        className="svm"
        role="dialog"
        aria-modal="true"
        aria-labelledby="svm-title"
        aria-describedby="svm-desc"
      >
        <header className="svm-head">
          <div className="svm-visual" aria-hidden="true">
            {Visual && <Visual label={service.title} />}
          </div>
          <div className="svm-head-text">
            <p className="eyebrow">{service.short}</p>
            <h3 id="svm-title" tabIndex={-1}>
              {service.title}
            </h3>
          </div>
          <button type="button" className="svm-close" onClick={onClose} aria-label={M.close}>
            <Icon name="close" />
          </button>
        </header>

        <div className="svm-body">
          <p id="svm-desc" className="svm-desc">{service.desc}</p>

          {service.who && (
            <section className="svm-sec">
              <h4>{M.who}</h4>
              <p>{service.who}</p>
            </section>
          )}

          {service.how && service.how.length > 0 && (
            <section className="svm-sec">
              <h4>{M.how}</h4>
              <ol className="svm-how">
                {service.how.map((step, i) => (
                  <li key={step}>
                    <span className="svm-how-num">{String(i + 1).padStart(2, '0')}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {service.includes && service.includes.length > 0 && (
            <section className="svm-sec">
              <h4>{M.includes}</h4>
              <ul className="svc-includes svm-includes">
                {service.includes.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </section>
          )}

          <section className="svm-sec svm-gain">
            <h4>{M.gain}</h4>
            <p>{service.gain}</p>
          </section>

          {service.sample && (
            <section className="svm-sec">
              <h4>{M.sample}</h4>
              <p className="svm-sample">{service.sample}</p>
            </section>
          )}
        </div>

        <footer className="svm-foot">
          <p className="svm-quote">{M.quote}</p>
          <div className="svm-actions">
            <button type="button" className="btn btn-line" onClick={onClose}>
              {M.other}
            </button>
            <button type="button" className="btn btn-solid" onClick={onQuote}>
              {M.quoteBtn} <Icon name="arrow" />
            </button>
          </div>
        </footer>
      </div>
    </div>
  )
}