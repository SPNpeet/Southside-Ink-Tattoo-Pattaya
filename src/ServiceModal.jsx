import { useEffect, useRef } from 'react'
import Icon from './Icon'
import { VISUAL_BY_KEY } from './ServiceVisuals'
import { useDismiss } from './hooks'

// ─────────── ServiceModal: รายละเอียดแต่ละบริการ ───────────
// คลิกการ์ดบริการ → เปิดกล่องรายละเอียดแบบเต็ม
// เปิดได้ 3 ทาง: คลิกการ์ด / ปุ่ม "ดูรายละเอียด" / เปิดจากภายนอก (openServiceId)
// ปิดด้วย: Esc, คลิกพื้นหลัง, ปุ่มปิด — และคืนโฟกัสให้ปุ่มที่เปิดมา

export default function ServiceModal({ service, onClose, onQuote }) {
  const dialogRef = useRef(null)
  const restoreRef = useRef(null)

  // บันทึกโฟกัสเดิมตอนเปิด เพื่อคืนให้หลังปิด (a11y)
  useEffect(() => {
    if (!service) return
    restoreRef.current = document.activeElement
    dialogRef.current?.querySelector('.svm-close')?.focus()
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prevOverflow
      restoreRef.current?.focus?.()
    }
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
      >
        <header className="svm-head">
          <div className="svm-visual" aria-hidden="true">
            {Visual && <Visual label={service.title} />}
          </div>
          <div className="svm-head-text">
            <p className="eyebrow">{service.short}</p>
            <h3 id="svm-title">{service.title}</h3>
          </div>
          <button type="button" className="svm-close" onClick={onClose} aria-label="ปิดรายละเอียด">
            <Icon name="close" />
          </button>
        </header>

        <div className="svm-body">
          <p className="svm-desc">{service.desc}</p>

          {service.who && (
            <section className="svm-sec">
              <h4>เหมาะกับใคร</h4>
              <p>{service.who}</p>
            </section>
          )}

          {service.how && service.how.length > 0 && (
            <section className="svm-sec">
              <h4>ทำงานกันยังไง</h4>
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
              <h4>ในแพ็คมีอะไรบ้าง</h4>
              <ul className="svc-includes svm-includes">
                {service.includes.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </section>
          )}

          <section className="svm-sec svm-gain">
            <h4>คุณจะได้</h4>
            <p>{service.gain}</p>
          </section>

          {service.sample && (
            <section className="svm-sec">
              <h4>ตัวอย่างที่ทำได้จริง</h4>
              <p className="svm-sample">{service.sample}</p>
            </section>
          )}
        </div>

        <footer className="svm-foot">
          <p className="svm-quote">ประเมินตามขอบเขตงาน · ปรึกษาและประเมินฟรี</p>
          <div className="svm-actions">
            <button type="button" className="btn btn-line" onClick={onClose}>
              ดูบริการอื่น
            </button>
            <button type="button" className="btn btn-solid" onClick={onQuote}>
              ขอใบเสนอราคา <Icon name="arrow" />
            </button>
          </div>
        </footer>
      </div>
    </div>
  )
}