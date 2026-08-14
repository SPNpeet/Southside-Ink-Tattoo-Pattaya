import { useCallback, useEffect, useRef, useState } from 'react'
import Icon from './Icon'
import CommandPalette from './CommandPalette'
import FloatingContact from './FloatingContact'
import { useDismiss, useReveal, useScrollSpy, useTheme } from './hooks'

// ───────────── ช่องทางติดต่อ ─────────────
// ช่องไหนเว้นว่าง = ปุ่มนั้นจะไม่ขึ้นบนเว็บ (กันปุ่มกดแล้วไม่ไปไหน)
const CONTACT = {
  messenger: 'https://m.me/61590190966678',
  facebook: 'https://www.facebook.com/profile.php?id=61590190966678',
  email: 'sudocoffee.home@gmail.com',
  // ใส่ลิงก์ LINE OA เช่น 'https://lin.ee/xxxxxxx'
  line: '',
  // ใส่เบอร์จริงแบบสากล เช่น '+66811234567'
  phone: '',
  // สมัครฟรีที่ web3forms.com แล้ววาง Access Key ตรงนี้ (ต้องเป็นรูปแบบ UUID)
  // ยังไม่ใส่ = ฟอร์มจะไม่ขึ้น เพื่อไม่ให้ลูกค้ากรอกแล้วข้อมูลหาย
  web3formsKey: '',
}

const CHANNELS = [
  { key: 'messenger', icon: 'chat', label: 'ทักผ่าน Messenger', href: CONTACT.messenger },
  { key: 'line', icon: 'line', label: 'แอดไลน์', href: CONTACT.line },
  { key: 'phone', icon: 'phone', label: CONTACT.phone, href: `tel:${CONTACT.phone}` },
  { key: 'email', icon: 'mail', label: CONTACT.email, href: `mailto:${CONTACT.email}` },
].filter((c) => CONTACT[c.key])

const SERVICES = [
  {
    id: 'svc-accounting',
    icon: 'ledger',
    title: 'ระบบบัญชีอัตโนมัติ',
    short: 'ปิดงบไม่ต้องคีย์มือ',
    desc: 'ปิดงบไม่ต้องคีย์มือ ออกเอกสารขาย อ่านสลิป จับคู่รายการ และดึงรายงานได้เอง สำหรับ SME และสำนักงานบัญชี',
  },
  {
    id: 'svc-ai',
    icon: 'ai',
    title: 'AI Assistant',
    short: 'ตอบลูกค้าแทนได้ 24 ชม.',
    desc: 'แชทบอทและ AI Agent บน LINE, Facebook, Instagram ตอบลูกค้าได้ 24 ชั่วโมง เชื่อมกับข้อมูลธุรกิจจริงของคุณ',
  },
  {
    id: 'svc-web',
    icon: 'web',
    title: 'Web App และเว็บไซต์',
    short: 'เว็บธุรกิจและระบบหลังบ้าน',
    desc: 'เว็บธุรกิจ ร้านค้าออนไลน์ และระบบหลังบ้าน พร้อมแดชบอร์ดดูตัวเลขได้แบบเรียลไทม์',
  },
  {
    id: 'svc-graphic',
    icon: 'layers',
    title: 'งานกราฟิก',
    short: 'โลโก้ แบรนดิ้ง สื่อโฆษณา',
    desc: 'โลโก้ แบรนดิ้ง สื่อโฆษณา และคอนเทนต์โซเชียล คุมโทนให้เป็นชุดเดียวกันทั้งแบรนด์',
  },
  {
    id: 'svc-3d',
    icon: 'cube',
    title: 'งาน 3D',
    short: 'โมเดลและภาพเรนเดอร์สินค้า',
    desc: 'โมเดล ภาพเรนเดอร์สินค้า และอนิเมชัน สำหรับนำเสนอสินค้าและงานโฆษณา',
  },
  {
    id: 'svc-system',
    icon: 'grid',
    title: 'วางระบบครบวงจร',
    short: 'ดูแลตั้งแต่ต้นจนส่งมอบ',
    desc: 'ดูแลตั้งแต่คอนเซ็ปต์ ออกแบบ พัฒนา ติดตั้ง จนถึงเทรนทีมและซัพพอร์ตต่อเนื่อง',
  },
]

const STEPS = [
  {
    title: 'คุยกันก่อน',
    desc: 'เล่ามาแบบบ้าน ๆ ได้เลย ไม่ต้องเตรียมอะไรมา ที่เหลือเราถามต่อเอง',
  },
  {
    title: 'เราสรุปให้ดู',
    desc: 'ทำแบบและประมาณการมาให้ดูก่อน เห็นราคาแล้วค่อยตัดสินใจว่าจะเริ่มไหม',
  },
  {
    title: 'ลงมือทำ',
    desc: 'ระหว่างทางมีความคืบหน้าอะไรบอกให้รู้ตลอด อยากปรับตรงไหนบอกได้',
  },
  {
    title: 'ส่งมอบแล้วอยู่ต่อ',
    desc: 'ติดตั้งให้ สอนทีมคุณจนใช้เป็น แล้วยังตามดูแลให้หลังจากนั้น',
  },
]

// คำถามที่เจ้าของธุรกิจมักลังเลแต่ไม่กล้าถาม ตอบไว้ก่อนเลยจะได้กล้าทัก
// ทุกข้อต้องตอบจากสิ่งที่ทำจริงเท่านั้น ห้ามสัญญาสิ่งที่ยังไม่รู้ว่าทำได้ไหม
const FAQS = [
  {
    q: 'ไม่มีความรู้ด้านเทคนิคเลย คุยกันรู้เรื่องไหม',
    a: 'รู้เรื่องแน่นอน คุณเล่าว่าติดปัญหาอะไรในการทำงานก็พอ เรื่องศัพท์เทคนิคเป็นหน้าที่เราที่ต้องแปลให้เข้าใจ ไม่ใช่หน้าที่คุณ',
  },
  {
    q: 'อยากทำแค่บางส่วน ไม่เอาทั้งหมด ได้ไหม',
    a: 'ได้ครับ แนะนำให้เริ่มจากจุดที่เจ็บที่สุดก่อนด้วยซ้ำ พอเห็นผลแล้วค่อยขยายทีหลังก็ยังทัน',
  },
  {
    q: 'ราคาประมาณเท่าไหร่',
    a: 'ขึ้นกับขอบเขตงาน เราจะทำแบบและประมาณการมาให้ดูก่อนเริ่มเสมอ ได้เห็นตัวเลขแล้วค่อยตัดสินใจ ช่วงคุยและประเมินไม่มีค่าใช้จ่าย',
  },
  {
    q: 'อยู่ต่างจังหวัด ทำงานด้วยกันได้ไหม',
    a: 'ได้ครับ เรารับงานทั่วประเทศและทำงานออนไลน์เต็มรูปแบบอยู่แล้ว',
  },
  {
    q: 'ทำเสร็จแล้วใช้ไม่เป็น จะทำยังไง',
    a: 'เราสอนทีมคุณจนใช้เป็นก่อนถึงจะถือว่าจบงาน และมีคู่มือให้ไว้ดูย้อนหลัง ติดตรงไหนหลังจากนั้นก็ทักมาได้',
  },
  {
    q: 'เริ่มต้นต้องทำอะไรบ้าง',
    a: 'ทักมาเล่าให้ฟังอย่างเดียวเลยครับ ไม่ต้องเตรียมเอกสารหรือข้อมูลอะไรมาก่อน เราตอบกลับภายใน 24 ชั่วโมง',
  },
]

const SPEC = [
  ['ขอบเขตงาน', 'บัญชี · AI · Web App · กราฟิก · 3D'],
  ['รูปแบบ', 'End-to-End ตั้งแต่คอนเซ็ปต์ถึงซัพพอร์ต'],
  ['ตอบกลับ', 'ภายใน 24 ชั่วโมง'],
  ['ฐานที่ตั้ง', 'บางมด กรุงเทพฯ'],
]

// ───────────── ผลงาน ─────────────
// เว้นว่างไว้ = ส่วนผลงานจะไม่ขึ้นเลย
// ห้ามใส่งานที่ไม่ได้ทำจริงหรือตัวเลขที่พิสูจน์ไม่ได้ ลูกค้าจับได้แล้วเสียเครดิตทั้งเว็บ
// รูปแบบ 1 ชิ้น:
//   { title: 'ชื่องาน', client: 'ประเภทลูกค้า', tags: ['Web App', 'LINE OA'],
//     desc: 'ทำอะไรให้เขา 1-2 บรรทัด', image: '/work/ชื่อไฟล์.jpg' }
// รูปวางไว้ในโฟลเดอร์ public/work/
const WORKS = []

const THEMES = [
  { id: 'light', icon: 'sun', label: 'ธีมสว่าง' },
  { id: 'dark', icon: 'moon', label: 'ธีมมืด' },
  { id: 'system', icon: 'monitor', label: 'ตามระบบ' },
]

function SectionHead({ num, title, note }) {
  return (
    <header className="sec-head" data-reveal>
      <span className="sec-num">{num}</span>
      <h2>{title}</h2>
      {note && <p className="sec-note">{note}</p>}
    </header>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [ddOpen, setDdOpen] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [status, setStatus] = useState('idle') // idle | sending | ok | error
  const [toast, setToast] = useState('')
  const [theme, setTheme] = useTheme()

  const ddRef = useRef(null)
  const ddBtnRef = useRef(null)

  const order = ['services', ...(WORKS.length ? ['work'] : []), 'process', 'faq', 'contact']
  const numOf = (id) => String(order.indexOf(id) + 1).padStart(2, '0')
  const active = useScrollSpy(order)
  useReveal([WORKS.length, CONTACT.web3formsKey])

  const closeDd = useCallback(() => setDdOpen(false), [])
  useDismiss(ddRef, ddOpen, closeDd)

  // คีย์บอร์ดใน dropdown: ArrowDown/ArrowUp เลื่อนเลือก, Enter เลือก, Esc ปิด
  const onDdKeyDown = useCallback(
    (e) => {
      const links = [...(ddRef.current?.querySelectorAll('a') || [])]
      if (!links.length) return
      const idx = links.indexOf(document.activeElement)

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        const next = idx === -1 ? 0 : (idx + 1) % links.length
        links[next].focus()
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        const prev = idx <= 0 ? links.length - 1 : idx - 1
        links[prev].focus()
      } else if (e.key === 'Home' || e.key === 'End') {
        e.preventDefault()
        links[e.key === 'Home' ? 0 : links.length - 1].focus()
      }
    },
    [],
  )

  const goto = useCallback((id) => {
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    el.focus({ preventScroll: true })
  }, [])

  const nav = (id) => (e) => {
    e.preventDefault()
    setMenuOpen(false)
    setDdOpen(false)
    goto(id)
  }

  const flash = useCallback((msg) => {
    setToast(msg)
    window.clearTimeout(flash._t)
    flash._t = window.setTimeout(() => setToast(''), 2600)
  }, [])

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.email)
      flash(`คัดลอกอีเมลแล้ว — ${CONTACT.email}`)
    } catch {
      flash('คัดลอกไม่สำเร็จ ลองกดที่อีเมลในหน้าติดต่อแทน')
    }
  }, [flash])

  // Ctrl+K / ⌘K เปิด command palette
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen((v) => !v)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const openExternal = (url) => () => window.open(url, '_blank', 'noopener,noreferrer')

  const actions = [
    ...SERVICES.map((s) => ({
      id: s.id,
      icon: s.icon,
      label: s.title,
      hint: s.short,
      keywords: ['บริการ', 'service', s.short],
      run: () => goto(s.id),
    })),
    ...(WORKS.length
      ? [
          {
            id: 'go-work',
            icon: 'layers',
            label: 'ดูผลงานที่ผ่านมา',
            keywords: ['work', 'portfolio', 'ผลงาน'],
            run: () => goto('work'),
          },
        ]
      : []),
    {
      id: 'go-process',
      icon: 'grid',
      label: 'วิธีทำงาน',
      hint: '4 ขั้นตอน',
      keywords: ['process', 'ขั้นตอน'],
      run: () => goto('process'),
    },
    {
      id: 'go-faq',
      icon: 'search',
      label: 'คำถามที่พบบ่อย',
      hint: 'ราคา ขั้นตอน การดูแลหลังส่งมอบ',
      keywords: ['faq', 'คำถาม', 'ราคา', 'สงสัย'],
      run: () => goto('faq'),
    },
    {
      id: 'go-contact',
      icon: 'arrow',
      label: 'ไปที่หน้าติดต่อ',
      keywords: ['contact', 'ติดต่อ'],
      run: () => goto('contact'),
    },
    {
      id: 'messenger',
      icon: 'chat',
      label: 'ทักผ่าน Messenger',
      hint: 'เปิดแท็บใหม่',
      keywords: ['contact', 'ติดต่อ', 'แชท', 'facebook'],
      run: openExternal(CONTACT.messenger),
    },
    ...(CONTACT.line
      ? [
          {
            id: 'line',
            icon: 'line',
            label: 'แอดไลน์',
            hint: 'เปิดแท็บใหม่',
            keywords: ['contact', 'ติดต่อ', 'line'],
            run: openExternal(CONTACT.line),
          },
        ]
      : []),
    ...(CONTACT.phone
      ? [
          {
            id: 'phone',
            icon: 'phone',
            label: `โทร ${CONTACT.phone}`,
            keywords: ['contact', 'ติดต่อ', 'โทร', 'call'],
            run: () => {
              window.location.href = `tel:${CONTACT.phone}`
            },
          },
        ]
      : []),
    {
      id: 'copy-email',
      icon: 'mail',
      label: 'คัดลอกอีเมล',
      hint: CONTACT.email,
      keywords: ['contact', 'ติดต่อ', 'email', 'copy'],
      run: copyEmail,
    },
    {
      id: 'facebook',
      icon: 'chat',
      label: 'เปิดเพจ Facebook',
      keywords: ['facebook', 'เพจ', 'page'],
      run: openExternal(CONTACT.facebook),
    },
    ...THEMES.map((t) => ({
      id: `theme-${t.id}`,
      icon: t.icon,
      label: t.label,
      hint: theme === t.id ? 'กำลังใช้อยู่' : undefined,
      keywords: ['theme', 'ธีม', 'สี', 'มืด', 'สว่าง'],
      run: () => setTheme(t.id),
    })),
  ]

  const sendForm = async (e) => {
    e.preventDefault()
    const form = e.target
    setStatus('sending')

    const data = new FormData(form)
    data.append('access_key', CONTACT.web3formsKey)
    data.append('subject', 'ลูกค้าใหม่จากเว็บ Sudo Command')

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
      })
      const json = await res.json()
      if (json.success) {
        setStatus('ok')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <a className="skip" href="#main">
        ข้ามไปเนื้อหาหลัก
      </a>

      <header className="site-head">
        <div className="wrap head-inner">
          <a className="brand" href="#top" onClick={nav('top')}>
            <span className="brand-mark" aria-hidden="true">
              SC
            </span>
            <span className="brand-name">
              Sudo Command
              <span className="brand-sub">Tech &amp; Creative Agency</span>
            </span>
          </a>

          <nav className={`site-nav ${menuOpen ? 'open' : ''}`} aria-label="เมนูหลัก">
            <div className="dd" ref={ddRef}>
              <button
                type="button"
                ref={ddBtnRef}
                className={`dd-btn ${active === 'services' ? 'is-active' : ''}`}
                aria-expanded={ddOpen}
                onClick={() => setDdOpen((v) => !v)}
              >
                บริการ
                <Icon name="chevron" className={`dd-caret ${ddOpen ? 'up' : ''}`} />
              </button>

              <div className="dd-panel" hidden={!ddOpen} onKeyDown={onDdKeyDown}>
                <ul>
                  {SERVICES.map((s) => (
                    <li key={s.id}>
                      <a href={`#${s.id}`} onClick={nav(s.id)}>
                        <span className="dd-ic">
                          <Icon name={s.icon} />
                        </span>
                        <span className="dd-text">
                          <strong>{s.title}</strong>
                          <small>{s.short}</small>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
                <a className="dd-all" href="#services" onClick={nav('services')}>
                  ดูบริการทั้งหมด
                  <Icon name="arrow" />
                </a>
              </div>
            </div>

            {WORKS.length > 0 && (
              <a
                href="#work"
                className={active === 'work' ? 'is-active' : ''}
                aria-current={active === 'work' ? 'true' : undefined}
                onClick={nav('work')}
              >
                ผลงาน
              </a>
            )}
            <a
              href="#process"
              className={active === 'process' ? 'is-active' : ''}
              aria-current={active === 'process' ? 'true' : undefined}
              onClick={nav('process')}
            >
              วิธีทำงาน
            </a>
            <a
              href="#faq"
              className={active === 'faq' ? 'is-active' : ''}
              aria-current={active === 'faq' ? 'true' : undefined}
              onClick={nav('faq')}
            >
              คำถามที่พบบ่อย
            </a>
            <a
              href="#contact"
              className={active === 'contact' ? 'is-active' : ''}
              aria-current={active === 'contact' ? 'true' : undefined}
              onClick={nav('contact')}
            >
              ติดต่อ
            </a>

            <div className="theme-switch" role="group" aria-label="เลือกธีมสีของเว็บ">
              {THEMES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className={theme === t.id ? 'on' : ''}
                  aria-pressed={theme === t.id}
                  title={t.label}
                  onClick={() => setTheme(t.id)}
                >
                  <Icon name={t.icon} />
                  <span className="sr-only">{t.label}</span>
                </button>
              ))}
            </div>

            <a className="btn btn-solid nav-cta" href="#contact" onClick={nav('contact')}>
              ปรึกษาฟรี
            </a>
          </nav>

          <button
            type="button"
            className="cmdk-trigger"
            onClick={() => setPaletteOpen(true)}
            title="ค้นหาเมนู (Ctrl+K)"
          >
            <Icon name="search" />
            <span className="cmdk-trigger-label">ค้นหา</span>
            <kbd>Ctrl K</kbd>
          </button>

          <button
            type="button"
            className="menu-btn"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? 'ปิด' : 'เมนู'}
          </button>
        </div>
      </header>

      <main id="main" tabIndex={-1}>
        <section className="hero" id="top" tabIndex={-1}>
          <div className="wrap hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">ปรึกษาก่อนได้ ไม่มีค่าใช้จ่าย · รับงานทั่วประเทศ</p>
              <h1>
                งานจุกจิกที่กินเวลาคุณอยู่
                <br />
                <em>ให้เราช่วยดูให้ไหม</em>
              </h1>
              <p className="lede">
                ไม่ต้องรู้ศัพท์เทคนิคก็คุยกับเรารู้เรื่อง เล่ามาว่าตอนนี้ติดอะไรอยู่
                เดี๋ยวเราช่วยดูว่าอะไรพอทำให้อัตโนมัติได้บ้าง แล้วค่อยหาทางที่พอดีกับ
                ขนาดธุรกิจและงบของคุณไปด้วยกัน
              </p>
              <div className="cta">
                <a className="btn btn-solid" href="#contact" onClick={nav('contact')}>
                  เล่าให้เราฟังหน่อย
                  <Icon name="arrow" />
                </a>
                <button type="button" className="btn btn-line" onClick={() => setPaletteOpen(true)}>
                  <Icon name="search" />
                  ค้นหาสิ่งที่ต้องการ
                  <kbd className="btn-kbd">Ctrl K</kbd>
                </button>
              </div>
              <p className="hero-note">
                ยังไม่รู้ว่าอยากได้อะไรก็ทักมาได้ เราช่วยคิดตั้งแต่ต้นให้
              </p>
            </div>

            <dl className="spec" aria-label="ข้อมูลบริการโดยสรุป">
              {SPEC.map(([k, v]) => (
                <div className="spec-row" key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="band" aria-label="จุดเด่นของบริการ">
          <div className="wrap band-grid">
            <p>
              <strong>ไม่ต้องนั่งคีย์เอง</strong>
              ออกเอกสาร อ่านสลิป ลงรายการ ให้ระบบทำแทน คุณเอาเวลาไปทำอย่างอื่นได้
            </p>
            <p>
              <strong>ลูกค้าทักมาทางไหนก็ไม่ตกหล่น</strong>
              LINE, Facebook, Instagram รวมมาที่เดียว ตอบได้แม้ตอนคุณไม่ว่าง
            </p>
            <p>
              <strong>ส่งมอบแล้วเราไม่หายไปไหน</strong>
              มีคู่มือ สอนทีมคุณจนใช้เป็น แล้วติดตรงไหนทักมาได้เลย
            </p>
          </div>
        </section>

        <section className="sec" id="services" tabIndex={-1}>
          <div className="wrap">
            <SectionHead
              num={numOf('services')}
              title="เราช่วยอะไรได้บ้าง"
              note="ไม่ต้องทำทั้งหมดพร้อมกันก็ได้ เริ่มจากจุดที่เจ็บที่สุดก่อน แล้วค่อยขยายทีหลัง"
            />
            <ul className="svc-list">
              {SERVICES.map((s) => (
                <li className="svc" id={s.id} key={s.id} tabIndex={-1} data-reveal>
                  <span className="svc-icon">
                    <Icon name={s.icon} />
                  </span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {WORKS.length > 0 && (
          <section className="sec" id="work" tabIndex={-1}>
            <div className="wrap">
              <SectionHead num={numOf('work')} title="ผลงานที่ผ่านมา" />
              <ul className="work-list">
                {WORKS.map((w) => (
                  <li className="work" key={w.title} data-reveal>
                    {w.image && (
                      <img src={w.image} alt={w.title} loading="lazy" width="640" height="400" />
                    )}
                    <div className="work-body">
                      {w.client && <p className="work-client">{w.client}</p>}
                      <h3>{w.title}</h3>
                      <p>{w.desc}</p>
                      {w.tags?.length > 0 && (
                        <ul className="tags">
                          {w.tags.map((t) => (
                            <li key={t}>{t}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <section className="sec sec-alt" id="process" tabIndex={-1}>
          <div className="wrap">
            <SectionHead
              num={numOf('process')}
              title="ทำงานกันยังไง"
              note="ไม่มีขั้นตอนซับซ้อน และไม่มีอะไรที่คุณต้องรู้มาก่อน"
            />
            <ol className="steps">
              {STEPS.map((s, i) => (
                <li key={s.title} data-reveal>
                  <span className="step-num">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="sec" id="faq" tabIndex={-1}>
          <div className="wrap">
            <SectionHead
              num={numOf('faq')}
              title="เรื่องที่หลายคนสงสัย"
              note="ถ้ายังมีข้อไหนค้างใจอยู่ ทักมาถามได้เลย ไม่ต้องเกรงใจ"
            />
            <ul className="faq">
              {FAQS.map((f) => (
                <li key={f.q} data-reveal>
                  <details>
                    <summary>
                      <span>{f.q}</span>
                      <Icon name="chevron" className="faq-caret" />
                    </summary>
                    <p>{f.a}</p>
                  </details>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="sec" id="contact" tabIndex={-1}>
          <div className="wrap">
            <SectionHead
              num={numOf('contact')}
              title="ทักมาคุยกันก่อนได้"
              note="ไม่ต้องเตรียมอะไรมาก่อน เล่าสั้น ๆ ว่าตอนนี้ติดอะไรอยู่ก็พอ เราตอบกลับภายใน 24 ชั่วโมง และยังไม่ต้องตัดสินใจอะไรทั้งนั้น"
            />

            <div className="contact-grid">
              <div data-reveal>
                <ul className="channels">
                  {CHANNELS.map((c) => {
                    const external = c.href.startsWith('http')
                    return (
                      <li key={c.key}>
                        <a
                          className="channel"
                          href={c.href}
                          target={external ? '_blank' : undefined}
                          rel={external ? 'noopener noreferrer' : undefined}
                        >
                          <Icon name={c.icon} />
                          <span>{c.label}</span>
                          <Icon name="arrow" className="channel-go" />
                        </a>
                      </li>
                    )
                  })}
                </ul>

                <p className="fine">
                  สะดวกช่องทางไหนเลือกได้เลย หรือแวะดูงานใหม่ ๆ ที่เพจ{' '}
                  <a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer">
                    Sudo Command
                  </a>
                </p>
              </div>

              {CONTACT.web3formsKey ? (
                <form className="form" onSubmit={sendForm} data-reveal>
                  <div className="field">
                    <label htmlFor="f-name">ชื่อ หรือ ชื่อบริษัท</label>
                    <input id="f-name" name="name" type="text" required />
                  </div>
                  <div className="field">
                    <label htmlFor="f-email">อีเมล</label>
                    <input id="f-email" name="email" type="email" required />
                  </div>
                  <div className="field">
                    <label htmlFor="f-contact">
                      เบอร์โทร หรือ LINE <span className="opt">(ไม่บังคับ)</span>
                    </label>
                    <input id="f-contact" name="contact" type="text" />
                  </div>
                  <div className="field">
                    <label htmlFor="f-msg">อยากให้ช่วยเรื่องอะไร</label>
                    <textarea id="f-msg" name="message" rows="4" required />
                  </div>

                  <button type="submit" className="btn btn-solid" disabled={status === 'sending'}>
                    {status === 'sending' ? 'กำลังส่ง…' : 'ส่งข้อความ'}
                    {status !== 'sending' && <Icon name="arrow" />}
                  </button>

                  <p className="form-msg" role="status" aria-live="polite">
                    {status === 'ok' && (
                      <span className="ok">ส่งเรียบร้อยแล้ว เราจะติดต่อกลับภายใน 24 ชั่วโมง</span>
                    )}
                    {status === 'error' && (
                      <span className="err">ส่งไม่สำเร็จ รบกวนทักมาทางช่องทางด้านซ้ายแทนได้เลย</span>
                    )}
                  </p>
                </form>
              ) : (
                <p className="fine">
                  ทักมาได้ตลอดครับ เห็นเมื่อไหร่ตอบทันที
                </p>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-foot">
        <div className="wrap">
          <p className="foot-say">
            อ่านมาถึงตรงนี้แล้ว ถ้ายังลังเลอยู่ ทักมาถามเฉย ๆ ก็ได้ครับ
            เราไม่ได้ตื๊อขายของ แค่อยากรู้ว่าพอช่วยอะไรได้บ้าง
          </p>
          <div className="foot-inner">
            <p>Sudo Command — Tech &amp; Creative Agency</p>
            <p>© {new Date().getFullYear()} บางมด กรุงเทพฯ</p>
          </div>
        </div>
      </footer>

      <FloatingContact channels={CHANNELS} />

      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        actions={actions}
      />

      <div className="toast" role="status" aria-live="polite">
        {toast && <span>{toast}</span>}
      </div>
    </>
  )
}

export default App
