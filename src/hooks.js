import { useEffect, useState } from 'react'

const THEME_KEY = 'sc-theme'

/** ธีม 3 สถานะ: light | dark | system (system = ตามเครื่องผู้ใช้) */
export function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem(THEME_KEY) || 'system'
    } catch {
      return 'system'
    }
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'system') root.removeAttribute('data-theme')
    else root.setAttribute('data-theme', theme)
    try {
      localStorage.setItem(THEME_KEY, theme)
    } catch {
      /* โหมดส่วนตัวบางเบราว์เซอร์เขียนไม่ได้ ปล่อยผ่าน */
    }
  }, [theme])

  return [theme, setTheme]
}

/** ไฮไลต์เมนูตามหัวข้อที่กำลังอ่านอยู่ */
export function useScrollSpy(ids) {
  const key = ids.join(',')
  const [active, setActive] = useState(null)

  useEffect(() => {
    const els = key
      .split(',')
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!els.length || !('IntersectionObserver' in window)) return

    const seen = new Map()
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => seen.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0))
        let best = null
        let bestRatio = 0
        seen.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio
            best = id
          }
        })
        if (best) setActive(best)
      },
      { rootMargin: '-88px 0px -50% 0px', threshold: [0, 0.15, 0.4, 0.75, 1] }
    )

    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [key])

  return active
}

/**
 * ค่อย ๆ เผยเนื้อหาตอนเลื่อนถึง
 * ตั้งคลาสบน <html> จากใน effect เอง ถ้า JS หรือ IntersectionObserver ใช้ไม่ได้
 * เนื้อหาจะแสดงปกติทั้งหมด ไม่มีทางที่ลูกค้าจะเจอหน้าว่าง
 */
export function useReveal(deps = []) {
  useEffect(() => {
    const root = document.documentElement
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // คลาสถูกใส่ไว้ตั้งแต่ก่อนวาดใน index.html
    // ถ้ามาถึงตรงนี้แล้วใช้ไม่ได้ ต้องถอดคืน ไม่งั้นเนื้อหาจะซ่อนถาวร
    if (reduced || !('IntersectionObserver' in window)) {
      root.classList.remove('js-reveal')
      return
    }

    let fired = false

    const io = new IntersectionObserver(
      (entries) => {
        fired = true
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('revealed')
            io.unobserve(e.target)
          }
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.06 }
    )

    document.querySelectorAll('[data-reveal]:not(.revealed)').forEach((el) => io.observe(el))

    // ตัวกันพลาด: ปกติ IntersectionObserver ต้องยิงรอบแรกทันทีที่ observe()
    // ถ้าเงียบเกินเวลานี้ แปลว่าเบราว์เซอร์นั้นใช้ไม่ได้จริง ให้ถอดคลาสทิ้ง
    // ยอมเสียแอนิเมชัน ดีกว่าปล่อยให้ลูกค้าเจอหน้าเปล่าเพราะเนื้อหาซ่อนถาวร
    const watchdog = window.setTimeout(() => {
      if (!fired) {
        root.classList.remove('js-reveal')
        io.disconnect()
      }
    }, 1200)

    return () => {
      window.clearTimeout(watchdog)
      io.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

/** ปิดเมื่อคลิกนอกกล่อง หรือกด Escape */
export function useDismiss(ref, open, onClose) {
  useEffect(() => {
    if (!open) return

    const onDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose()
    }
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [ref, open, onClose])
}
