import { useState, useEffect, useRef } from 'react'

const SERVICES = [
  { id: 'fine', tag: 'ยอดนิยม', title: 'Fine Line & Minimal', desc: 'เส้นเล็ก 0.3mm คมกริบ ตัวอักษร สัญลักษณ์ ลายแรกไม่เจ็บมาก', price: 'เริ่ม 1,000฿', time: '30–60 นาที', icon: '⌖' },
  { id: 'color', tag: 'สีสด', title: 'งานสีสด คัลเลอร์', desc: 'ลงสีแน่น ไม่ดรอป เทคนิคแพ็คสีเนียน สีนำเข้าปลอดภัย', price: 'เริ่ม 1,500฿', time: '60–120 นาที', icon: '◉' },
  { id: 'black', tag: 'เข้ม', title: 'Blackwork / Tribal', desc: 'งานดำดุดัน ถมดำ Tribal Maori งานใหญ่คุมโทนเท่', price: 'เริ่ม 1,500฿', time: '45–180 นาที', icon: '⬢' },
  { id: 'cover', tag: 'แก้ไข', title: 'แก้ลาย / สักทับ', desc: 'แก้รอยพัง คิดแบบใหม่ให้ฟรี ปรับจนชอบค่อยสัก', price: 'ประเมินฟรี', time: 'ปรึกษาฟรี', icon: '⬣' },
  { id: 'japan', tag: 'ญี่ปุ่น', title: 'Japanese / Old School', desc: 'ปลาคาร์พ มังกร ดอกโบตั๋น เส้นแข็งแรง เงาสวย', price: 'เริ่ม 2,000฿', time: '90–240 นาที', icon: '❖' },
  { id: 'care', tag: 'ดูแล', title: 'ดูแลหลังสัก & เจาะ', desc: 'ฟิล์มกันน้ำ ครีมดูแล คำแนะนำแผลแบบละเอียด', price: 'ฟรี', time: 'รับประกันเติม*', icon: '✦' },
]

const WORKS = [
  "1juqLfCJ8rMus2TWOjrvMi5-ScWqTFQ2i","1Y_UHXZKVVa-BeNGie6VZ1bZDsTKvaaEP","1AakBm6zRlxdU18-O0OZMsZBtXJec4cjy","1CJcz60zMz2FAsiTp8peXexBvckRR2Sje","1mvqnMOsuKOkkez-v_LwRXjESalyyQM6u","1wez5GHlEmSGPSGOFSGKv7TjZb33w2ay6","1JE7RvJS9z4mJnac6FTv7IbzNKl0xMgtT","18Sxx5C7vxdBdD1Vx2M7rB-dVeSmdf4wT","1UqICiJMIogflvg49LlN0aY5XIls7-9-u","1wRKLneJwNOqA6cMw-YgmfrQDJ2wod9oU","1p2t7M8TjgttoPjFLLZJQddmntVv127fK","1s3_oTYl2dsWPa-L6-04U3Ujq-B0e7LPW","1lj9O7B5YVODclQbytPDYdsDdWEx6FhbY","12b6gAAIKsFg8fYAqhGjlaTotcCO5P-LW","1mRemjlWbFPKVmoHxE8l2-ILXNiTpQEN6","1bZ_tiEF_w5g2CpCYvBFSQmJ7InH64zFi","1d55chDA5fq2GiW-OVFcik_Fb7uZFd_3u","1RGABkEBV_NKAzrhmSoILBIb0ntfMC4ka","1MmTWMflnMW1UBas_QM0MTffrBEle_YkD","1wabeadflb2uqkl6vCmUe00_yxcDdYMcN","1hwQi9k3-vuqcZp_BR0qasYe48ohPDSKY","12mQYgLHfDgodOQ49HncpDDU2UmfzE7Io","1eO87gXAGeA8phrPA_BGElyeyFxztsD3C","1L03vX6Gtgn4btn21SGZmbhFYj7doDoU6","1ABhsZCWhnAzmQk1Tc1HURcAJ67fvxyJb","1cl-hCX2gP8I9J31-Vxb8ZMoZOUgvJY7N","1KrAzbfZqZnnePKlZ-xRRty__wqg1Luxv","1jZ0ux5JtJYCeJpj7IZZufJ2B1Z6VrJ2W","1GUYMDjO5cKVRrWQiRF4cx79_4TTQxav8","1bf22cCZ8nkOQj4DTKkWehOqVqmDGwqZ6",
]
const SHOP_IMAGES = ["1uZSA_1RswqRn_pAMW9wQx62ORcIEG1_Y","1WyQ_jfm05gZY_ihhjDCIWuUS7LL65524","1QsuQgVxlhEjVYXTBZJGdULz_bf4M9cot","1G1AC0O5Ac3Ys5LvoL0bgUMjXI5bGyJdn"]
const TAGS = ["Fine line","Blackwork","Color","Minimal","Japanese","Cover up"]
const PORTFOLIO = WORKS.map((id, i) => ({
  id,
  src: `${import.meta.env.BASE_URL}images/works/${id}.jpg`,
  tag: TAGS[i % TAGS.length],
  label: `ผลงาน ${i + 1}`,
  h: i === 0 ? 'tall' : i === 11 ? 'wide' : i % 7 === 0 ? 'tall' : '',
}))

const STEPS = [
  { n: '01', t: 'ส่งแบบ', d: 'ทักเพจ/WhatsApp ส่งรูปที่อยากได้ บอกตำแหน่ง ขนาด' },
  { n: '02', t: 'ออกแบบ & ตีราคา', d: 'วาดแบบให้ดู ปรับจนถูกใจ บอกราคาชัดเจนก่อนเริ่ม' },
  { n: '03', t: 'สักจริง', d: 'เข็มใหม่แกะต่อหน้า ยาชา/พักได้ มือเบา คุยง่าย ไทย/อังกฤษ' },
  { n: '04', t: 'ดูแลหลังสัก', d: 'สอนล้างแผล ฟิล์ม/ครีม มีนัดเติมฟรีตามเงื่อนไข' },
]

const REVIEWS = [
  { name: 'Anna M. · UK', text: 'งานเนี๊ยบมาก พี่พลอยใส่ใจมาก สะอาด ปลอดภัย แนะนำดีสุดๆ 5 ดาวเต็ม', date: '2 สัปดาห์ที่แล้ว' },
  { name: 'Mark T. · Australia', text: 'Best tattoo in Pattaya! Clean, pro, fair price. Done fine line script perfect.', date: 'เมื่อวาน' },
  { name: 'คุณฟ้า · กรุงเทพ', text: 'สักครั้งแรกไม่เจ็บอย่างที่คิด ช่างมือเบา อธิบายดูแลละเอียด กลับมาซ้ำแน่นอนค่ะ', date: '3 วันที่แล้ว' },
  { name: 'Lisa K. · Germany', text: 'Cover up old tattoo — looks brand new! Design was adjusted 3 times until perfect.', date: '1 สัปดาห์ที่แล้ว' },
  { name: 'คุณเจมส์ · พัทยา', text: 'ราคาชัดเจน ไม่บวกเพิ่ม ทำตรงปก ใกล้วอล์กกิ้งสะดวกมาก Walk-in ได้เลย', date: '5 วันที่แล้ว' },
]

const FAQS = [
  { q: 'เจ็บไหม? สักครั้งแรกต้องเตรียมอะไร', a: 'เจ็บแบบแสบๆ ทนได้ ยิ่งเส้นเล็กยิ่งเจ็บน้อย นอนพักให้พอ งดแอลกอฮอล์ 24 ชม. กินข้าวมาก่อนสักได้' },
  { q: 'ราคาเท่าไหร่ คิดยังไง', a: 'Fine line เริ่ม 1,000฿ งานสี/ดำ เริ่ม 1,500฿ ส่งแบบมาให้ประเมินฟรี บอกราคาก่อนเริ่ม ไม่บวกหน้างาน' },
  { q: 'ใช้เวลากี่นาที ต้องจองไหม', a: 'งานเล็ก 30–60 นาที งานกลาง 1–2 ชม. แนะนำจองล่วงหน้า 1 วัน แต่ Walk-in ได้ถึง 20:00 ค่ะ' },
  { q: 'เข็มสะอาดไหม แพ้สีไหม', a: 'เข็มใหม่แกะต่อหน้า ถุงมือ/อุปกรณ์ฆ่าเชื้อมาตรฐานโรงพยาบาล สีนำเข้า ปลอดภัย มีทดสอบแพ้ได้' },
  { q: 'ดูแลหลังสักยังไง', a: 'ล้างน้ำเกลือ ทาครีมบางๆ ติดฟิล์ม 3 วัน งดว่ายน้ำ/แดดจัด 2 สัปดาห์ มีใบแนะนำให้กลับบ้าน' },
]

function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.opacity = '0'
    el.style.transform = 'translateY(14px)'
    el.style.transition = 'opacity .6s ease, transform .6s ease'
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          el.style.opacity = '1'
          el.style.transform = 'none'
          io.disconnect()
        }
      })
    }, { threshold: 0.12 })
    io.observe(el)
    const t = setTimeout(() => { el.style.opacity = '1'; el.style.transform = 'none' }, 1200)
    return () => { io.disconnect(); clearTimeout(t) }
  }, [])
  return ref
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [filter, setFilter] = useState('ทั้งหมด')
  const [lightbox, setLightbox] = useState(null)
  const [toast, setToast] = useState('')
  const [openFaq, setOpenFaq] = useState(0)
  const [drawer, setDrawer] = useState(false)
  const [active, setActive] = useState('top')
  const [reviewIdx, setReviewIdx] = useState(0)
  const heroRef = useReveal()
  const svcRef = useReveal()
  const portRef = useReveal()

  const filters = ['ทั้งหมด', 'Fine line', 'Blackwork', 'Color', 'Minimal']

  const scrollTo = (id) => {
    setMenuOpen(false)
    setDrawer(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const copyTel = async (num) => {
    try { await navigator.clipboard.writeText(num); setToast(`คัดลอก ${num} แล้ว`); setTimeout(() => setToast(''), 2000) } catch { window.location.href = `tel:${num}` }
  }

  useEffect(() => {
    const ids = ['top', 'services', 'works', 'process', 'reviews', 'contact']
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) })
    }, { rootMargin: '-50% 0px -50% 0px', threshold: 0 })
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [])

  const filtered = PORTFOLIO.filter(p => filter === 'ทั้งหมด' || p.tag === filter)

  useEffect(() => {
    if (lightbox === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(null)
      if (e.key === 'ArrowRight') setLightbox(v => (v + 1) % filtered.length)
      if (e.key === 'ArrowLeft') setLightbox(v => (v - 1 + filtered.length) % filtered.length)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [lightbox, filtered.length])

  return (
    <>
      <div className="marquee" aria-hidden>
        <div className="marquee-track">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i}> WALK-IN WELCOME ✦ FREE DESIGN ✦ STERILE NEEDLE EVERY TIME ✦ 5.0 ★ 43 REVIEWS ✦ OPEN 13:00–22:00 ✦ </span>
          ))}
        </div>
      </div>

      <header className="nav">
        <div className="nav-inner">
          <a className="logo" href="#top" onClick={(e) => { e.preventDefault(); scrollTo('top') }}>
            <span className="logo-badge">S</span>
            <span className="logo-text"><b>SOUTHSIDE</b> <em>INK</em> <small>PATTAYA · EST.2023</small></span>
          </a>
          <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
            {[
              ['services', 'บริการ & ราคา'],
              ['works', 'ผลงาน'],
              ['process', 'ขั้นตอน'],
              ['reviews', 'รีวิว'],
              ['contact', 'แผนที่'],
            ].map(([id, label]) => (
              <a key={id} href={`#${id}`} className={active === id ? 'is-active' : ''} onClick={(e) => { e.preventDefault(); scrollTo(id) }}>{label}</a>
            ))}
            <a className="btn btn-primary nav-cta" href="https://www.facebook.com/ploytattoopt" target="_blank" rel="noreferrer">จองคิว — ฟรีดีไซน์</a>
          </nav>
          <div className="nav-actions">
            <a className="icon-btn" href="tel:0656964693" aria-label="โทร 0656964693">☎</a>
            <button className="menu-toggle" aria-expanded={menuOpen} aria-label="เมนู" onClick={() => setMenuOpen(v => !v)}><span /><span /><span /></button>
          </div>
        </div>
        <div className="nav-progress" style={{ transform: `scaleX(${active === 'contact' ? 1 : 0.15})` }} />
      </header>

      <main id="top">
        {/* HERO */}
        <section className="hero" ref={heroRef}>
          <div className="hero-grid">
            <div className="hero-copy">
              <div className="eyebrow"><span className="eyebrow-dot" /> พัทยาใต้ · สาย 2 ซอย 14 · ใกล้วอล์กกิ้งสตรีท · เปิดทุกวัน 13:00</div>
              <h1>
                <span className="h1-line">สักให้<span className="h-yellow">คม</span></span>
                <span className="h1-line">สะอาด <span className="h-blue">ปลอดภัย</span></span>
                <span className="h1-line outline">ราคาชัดเจน</span>
              </h1>
              <p className="sub">Southside Ink — สตูดิโอสักมืออาชีพพัทยา ถนัด Fine line / สี / ดำ / แก้ลาย เข็มใหม่แกะต่อหน้า ปลอดเชื้อ 100% ปรับแบบจนถูกใจค่อยสัก</p>

              <div className="hero-cta">
                <button className="btn btn-primary btn-xl" onClick={() => setDrawer(true)}>ประเมินราคาฟรี →</button>
                <a className="btn btn-ghost" href="#works" onClick={(e) => { e.preventDefault(); scrollTo('works') }}>ดูผลงานจริง</a>
                <span className="cta-hint">ตอบไวใน 1 ชม. · ไม่สักก็ปรึกษาได้</span>
              </div>

              <div className="hero-proof">
                <div className="proof-stars">★★★★★ <b>5.0</b> <span>43 รีวิว Google</span> <a href="https://share.google/lUOdKhWmDRqsbYEMv" target="_blank" rel="noreferrer">ดูทั้งหมด →</a></div>
                <div className="proof-pills">
                  <button className="pill pill-yellow" onClick={() => copyTel('0656964693')}>📞 065-696-4693 <small>แตะคัดลอก</small></button>
                  <a className="pill" href="tel:0838153762">083-815-3762</a>
                  <a className="pill pill-blue" href="https://wa.me/66656964693" target="_blank" rel="noreferrer">WhatsApp</a>
                </div>
              </div>
            </div>

            <div className="hero-visual">
              <div className="visual-stack">
                <div className="visual-card main">
                  <img src={`${import.meta.env.BASE_URL}images/works/${SHOP_IMAGES[0]}.jpg`} alt="หน้าร้าน Southside Ink เหลืองน้ำเงิน" />
                  <div className="visual-badge">
                    <strong>SOUTHSIDE INK PATTAYA</strong>
                    <span>EXPERT TATTOOING · EST. 2023</span>
                    <span>OPEN DAILY 13:00–22:00 · WALK-IN WELCOME</span>
                  </div>
                </div>
                <div className="visual-card mini">
                  <img src={`${import.meta.env.BASE_URL}images/works/${WORKS[0]}.jpg`} alt="ผลงานสัก fine line" />
                  <span className="mini-label">Fine line · เส้นเล็ก 0.3mm</span>
                </div>
                <div className="visual-pattern" aria-hidden />
              </div>
              <div className="floating-note">
                <span className="note-ic">✓</span>
                <div><b>ปลอดเชื้อ 100%</b><br /><small>เข็มใหม่ + ถุงมือ + ฆ่าเชื้อทุกชิ้น</small></div>
              </div>
            </div>
          </div>
        </section>

        <section className="trust">
          <div className="trust-item"><b>100%</b><span>เข็มใหม่แกะต่อหน้า</span></div>
          <div className="trust-item"><b>ฟรี</b><span>ออกแบบจนถูกใจ</span></div>
          <div className="trust-item"><b>1 ชม.</b><span>ตอบประเมินไว</span></div>
          <div className="trust-item"><b>ไทย/EN</b><span>คุยง่าย เป็นกันเอง</span></div>
        </section>

        {/* SERVICES */}
        <section id="services" className="section" ref={svcRef}>
          <div className="section-head">
            <div>
              <div className="cmd">— Services · บอกราคาก่อนสัก</div>
              <h2>เลือกสไตล์ที่ใช่ <em>ราคาโปร่งใส</em></h2>
              <p>ปรับแบบฟรีจนกว่าจะชอบ ไม่บวกเพิ่มหน้างาน · งานเล็กเริ่ม 1,000฿ งานสี/ดำเริ่ม 1,500฿</p>
            </div>
            <button className="btn btn-blue" onClick={() => setDrawer(true)}>ส่งแบบประเมินราคาฟรี →</button>
          </div>
          <div className="svc-grid">
            {SERVICES.map(s => (
              <article key={s.id} className="svc-card" onClick={() => setDrawer(true)} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && setDrawer(true)}>
                <div className="svc-top">
                  <span className="svc-tag">{s.tag}</span>
                  <span className="svc-time">{s.time}</span>
                </div>
                <div className="svc-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <div className="svc-foot">
                  <span className="svc-price">{s.price}</span>
                  <span className="svc-cta">ประเมินฟรี →</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* PORTFOLIO */}
        <section id="works" className="section alt" ref={portRef}>
          <div className="section-head">
            <div>
              <div className="cmd">— Portfolio · ผลงานจริงจากร้าน</div>
              <h2>ดูใกล้ๆ <em>งานคมแค่ไหน</em></h2>
              <p>ผลงานจริงทั้งหมดจากร้าน Southside Ink — แตะเพื่อขยายดูชัดๆ</p>
            </div>
            <div className="filter-row" role="tablist" aria-label="กรองผลงาน">
              {filters.map(f => (
                <button key={f} role="tab" aria-selected={filter === f} className={`chip ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>{f}</button>
              ))}
            </div>
          </div>

          <div className="masonry">
            {filtered.map((it, idx) => (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events
              <div key={`${it.id}-${it.tag}`} className={`tile ${it.h || ''}`} onClick={() => setLightbox(idx)} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && setLightbox(idx)}>
                <img src={it.src} alt={it.label} loading="lazy" />
                <div className="tile-meta"><span>{it.tag}</span><b>{it.label}</b></div>
                <span className="tile-zoom">⤢ ขยาย</span>
              </div>
            ))}
          </div>

          <div className="portfolio-cta">
            <span>ชอบสไตล์ไหน? ส่งแบบมาประเมินฟรีได้เลย</span>
            <a className="btn btn-primary" href="https://www.facebook.com/ploytattoopt" target="_blank" rel="noreferrer">ดูผลงานเพิ่มใน Facebook →</a>
          </div>
        </section>

        {/* PROCESS */}
        <section id="process" className="section">
          <div className="cmd">— How it works · 4 ขั้นจบ</div>
          <h2>ง่าย ไม่เกร็ง <em>ครั้งแรกก็สบาย</em></h2>
          <div className="steps">
            {STEPS.map(s => (
              <div key={s.n} className="step">
                <div className="step-num">{s.n}</div>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
            ))}
            <div className="step cta">
              <h3>พร้อมแล้ว?</h3>
              <p>ส่งแบบมาได้เลย ตอบไวใน 1 ชม.</p>
              <button className="btn btn-primary" onClick={() => setDrawer(true)}>ทักเลย →</button>
            </div>
          </div>
          <div className="hygiene">
            <div className="hyg-item"><span>◎</span><b>เข็มใหม่ 100%</b><small>แกะให้ดูต่อหน้า</small></div>
            <div className="hyg-item"><span>⬡</span><b>ฆ่าเชื้อมาตรฐาน</b><small>โรงพยาบาล</small></div>
            <div className="hyg-item"><span>✦</span><b>สีนำเข้า</b><small>ปลอดภัย ผ่าน อย.</small></div>
            <div className="hyg-item"><span>♡</span><b>ฟิล์มกันน้ำ</b><small>หลังสักดูแลง่าย</small></div>
          </div>
        </section>

        {/* ARTIST + REVIEWS */}
        <section id="reviews" className="section alt">
          <div className="split">
            <div className="artist-card">
              <div className="artist-photo">
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=700&q=80&auto=format&fit=crop" alt="ช่างพลอย Southside Ink" />
                <div className="artist-badge">ช่างพลอย · ถนัด Fine line</div>
              </div>
              <div className="artist-body">
                <h3>ดูแลเองทุกเคส ตั้งแต่ดีไซน์จนสักเสร็จ</h3>
                <p>คุยง่าย ไทย/อังกฤษ ใส่ใจรายละเอียด ปรับแบบจนถูกใจ ไม่เร่ง ไม่กดดัน สักครั้งแรกก็ไม่เกร็ง</p>
                <div className="artist-actions">
                  <a className="btn btn-primary" href="https://www.facebook.com/ploytattoopt" target="_blank" rel="noreferrer">ดูผลงานช่างพลอย</a>
                  <a className="btn btn-ghost" href="https://wa.me/66656964693" target="_blank" rel="noreferrer">WhatsApp</a>
                </div>
                <div className="mini-stats"><span><b>1,000+</b> รอยสัก</span><span><b>5.0★</b> 43 รีวิว</span><span><b>EST.2023</b> พัทยา</span></div>
              </div>
            </div>

            <div className="reviews">
              <div className="cmd">— Reviews · ตัวจริงเสียงจริง</div>
              <h2>ลูกค้าพูดถึงเรา</h2>
              <div className="carousel" onMouseEnter={() => {}} onMouseLeave={() => {}}>
                <div className="carousel-track" style={{ transform: `translateX(-${reviewIdx * 100}%)` }}>
                  {REVIEWS.map((r) => (
                    <div key={r.name} className="review">
                      <div className="stars">★★★★★</div>
                      <p>“{r.text}”</p>
                      <div className="review-foot"><b>{r.name}</b><span>{r.date}</span></div>
                    </div>
                  ))}
                </div>
                <div className="carousel-dots">
                  {REVIEWS.map((_, i) => (
                    <button key={i} className={i === reviewIdx ? 'on' : ''} aria-label={`ไปรีวิว ${i + 1}`} onClick={() => setReviewIdx(i)} />
                  ))}
                </div>
                <div className="carousel-arrows">
                  <button aria-label="ก่อนหน้า" onClick={() => setReviewIdx(v => (v - 1 + REVIEWS.length) % REVIEWS.length)}>‹</button>
                  <button aria-label="ถัดไป" onClick={() => setReviewIdx(v => (v + 1) % REVIEWS.length)}>›</button>
                </div>
              </div>
              <a className="btn btn-ghost" href="https://share.google/lUOdKhWmDRqsbYEMv" target="_blank" rel="noreferrer">ดูทั้งหมดบน Google Maps →</a>
            </div>
          </div>
        </section>

        {/* FAQ + Aftercare */}
        <section className="section">
          <div className="split">
            <div>
              <div className="cmd">— FAQ · ตอบทุกข้อสงสัย</div>
              <h2>ถามบ่อย</h2>
              <div className="faq">
                {FAQS.map((f, i) => (
                  <div key={f.q} className={`faq-item ${openFaq === i ? 'open' : ''}`}>
                    <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? -1 : i)} aria-expanded={openFaq === i}>
                      <span>{f.q}</span><em>{openFaq === i ? '−' : '+'}</em>
                    </button>
                    <div className="faq-a"><p>{f.a}</p></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="aftercare">
              <h3>ดูแลหลังสัก <span>ให้สีติดทน</span></h3>
              <ol>
                <li><b>3 วันแรก</b> ติดฟิล์มกันน้ำ ห้ามแกะเกา</li>
                <li>ล้างน้ำเกลือ ซับแห้ง ทาครีมบางๆ วันละ 2 ครั้ง</li>
                <li>งดว่ายน้ำ ซาวน่า แดดจัด 2 สัปดาห์</li>
                <li>สะเก็ดลอกห้ามแกะ ปล่อยหลุดเอง</li>
                <li>ครบ 1 เดือน นัดดูแผล เติมฟรี* ตามเงื่อนไข</li>
              </ol>
              <div className="aftercare-note">* เติมฟรีภายใน 3 เดือน กรณีสีหลุดจากการดูแลตามคำแนะนำ</div>
              <button className="btn btn-blue" onClick={() => setDrawer(true)}>ปรึกษาการดูแล →</button>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="section alt">
          <div className="contact-grid">
            <div className="contact-card">
              <div className="cmd">— Visit us · มาเจอกันที่ร้าน</div>
              <h2>สาย 2 ซอย 14<br /><em>ใกล้วอล์กกิ้งสตรีท</em></h2>
              <p>พัทยาใต้ อ.บางละมุง ชลบุรี 20150 · เปิดทุกวัน 13:00–22:00 · Walk-in ได้ถึง 20:00</p>
              <div className="contact-actions">
                <a className="btn btn-primary" href="https://share.google/lUOdKhWmDRqsbYEMv" target="_blank" rel="noreferrer">เปิดใน Google Maps →</a>
                <button className="btn btn-ghost" onClick={() => copyTel('0656964693')}>คัดลอกที่อยู่</button>
              </div>
              <div className="contact-lines">
                <a href="tel:0656964693" className="line"><span>โทรหลัก</span><b>065-696-4693</b><small>แตะโทร</small></a>
                <a href="tel:0838153762" className="line"><span>สำรอง</span><b>083-815-3762</b></a>
                <a href="https://wa.me/66656964693" target="_blank" rel="noreferrer" className="line"><span>WhatsApp</span><b>0656964693</b><small>ทักแชท</small></a>
                <a href="https://www.facebook.com/ploytattoopt" target="_blank" rel="noreferrer" className="line"><span>Facebook</span><b>ploytattoopt</b><small>ตอบไว 1 ชม.</small></a>
              </div>
            </div>
            <div className="map-card">
              <iframe title="Southside Ink Map" src="https://www.google.com/maps?q=Southside+Ink+Tattoo+Pattaya+สาย2+ซอย14&z=16&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              <div className="map-overlay">
                <span>📍 Southside Ink Tattoo Pattaya</span>
                <a href="https://share.google/lUOdKhWmDRqsbYEMv" target="_blank" rel="noreferrer">นำทาง →</a>
              </div>
            </div>
          </div>

          <div className="booking-cta">
            <div>
              <h3>พร้อมสักแล้วหรือยัง?</h3>
              <p>ส่งแบบที่อยากได้มาได้เลย — ประเมินราคาฟรี ตอบไวใน 1 ชั่วโมง ไม่สักก็ปรึกษาได้</p>
            </div>
            <div className="cta-row">
              <button className="btn btn-primary btn-xl" onClick={() => setDrawer(true)}>ส่งแบบประเมินฟรี</button>
              <a className="btn btn-ghost" href="https://www.facebook.com/ploytattoopt" target="_blank" rel="noreferrer">ทักเพจ</a>
              <a className="btn btn-blue" href="tel:0656964693">โทรเลย</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-grid">
          <div>
            <div className="footer-logo"><span>SOUTHSIDE</span> INK PATTAYA</div>
            <p>สตูดิโอสักพัทยา งานคม สะอาด ปลอดภัย — สาย 2 ซอย 14 ใกล้วอล์กกิ้งสตรีท เปิดทุกวัน 13:00 เป็นต้นไป · เข็มใหม่ 100%</p>
            <div className="footer-social">
              <a href="https://www.facebook.com/ploytattoopt" target="_blank" rel="noreferrer" aria-label="Facebook">f</a>
              <a href="https://wa.me/66656964693" target="_blank" rel="noreferrer" aria-label="WhatsApp">WA</a>
              <a href="tel:0656964693" aria-label="โทร">☎</a>
            </div>
          </div>
          <div><h4>เมนู</h4><a href="#services" onClick={(e) => { e.preventDefault(); scrollTo('services') }}>บริการ</a><a href="#works" onClick={(e) => { e.preventDefault(); scrollTo('works') }}>ผลงาน</a><a href="#process" onClick={(e) => { e.preventDefault(); scrollTo('process') }}>ขั้นตอน</a><a href="#reviews" onClick={(e) => { e.preventDefault(); scrollTo('reviews') }}>รีวิว</a></div>
          <div><h4>ติดต่อ</h4><a href="tel:0656964693">065-696-4693</a><a href="tel:0838153762">083-815-3762</a><a href="https://wa.me/66656964693" target="_blank" rel="noreferrer">WhatsApp</a><a href="https://www.facebook.com/ploytattoopt" target="_blank" rel="noreferrer">Facebook</a></div>
          <div><h4>ที่อยู่</h4><p>สาย 2 ซอย 14<br />วอล์กกิ้งสตรีท พัทยา 20150<br /><a href="https://share.google/lUOdKhWmDRqsbYEMv" target="_blank" rel="noreferrer">ดูแผนที่ →</a></p></div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Southside Ink Tattoo Pattaya · Expert Tattooing EST. 2023</span><span>น้ำเงิน เหลือง ขาว ดำ · ปลอดเชื้อ 100%</span></div>
      </footer>

      <div className={`drawer ${drawer ? 'open' : ''}`} role="dialog" aria-modal="true" aria-label="จองคิว">
        <button className="drawer-backdrop" aria-label="ปิด" onClick={() => setDrawer(false)} />
        <div className="drawer-panel">
          <button className="drawer-close" aria-label="ปิด" onClick={() => setDrawer(false)}>×</button>
          <h3>ส่งแบบประเมินราคาฟรี</h3>
          <p>แนบรูป + บอกตำแหน่ง/ขนาด ตอบไวใน 1 ชม.</p>
          <div className="drawer-choices">
            <a className="choice primary" href="https://www.facebook.com/ploytattoopt" target="_blank" rel="noreferrer"><b>ทัก Facebook เพจ</b><span>ploytattoopt · ตอบไวสุด</span></a>
            <a className="choice blue" href="https://wa.me/66656964693?text=สวัสดีครับ ขอประเมินราคาสักครับ" target="_blank" rel="noreferrer"><b>ทัก WhatsApp</b><span>065-696-4693</span></a>
            <a className="choice" href="tel:0656964693"><b>โทรเลย</b><span>065-696-4693 / 083-815-3762</span></a>
          </div>
          <div className="drawer-tip">💡 ทิป: ส่งรูปตัวอย่าง 2–3 แบบ + จุดที่อยากสัก จะประเมินแม่นขึ้น</div>
        </div>
      </div>

      {lightbox !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="ดูผลงาน">
          <button className="lb-backdrop" aria-label="ปิด" onClick={() => setLightbox(null)} />
          <button className="lb-close" aria-label="ปิด" onClick={() => setLightbox(null)}>×</button>
          <button className="lb-prev" aria-label="ก่อนหน้า" onClick={() => setLightbox(v => (v - 1 + filtered.length) % filtered.length)}>‹</button>
          <div className="lb-main">
            <img src={filtered[lightbox].src} alt={filtered[lightbox].label} />
            <div className="lb-caption"><span>{filtered[lightbox].tag}</span> {filtered[lightbox].label} · {lightbox + 1}/{filtered.length}</div>
          </div>
          <button className="lb-next" aria-label="ถัดไป" onClick={() => setLightbox(v => (v + 1) % filtered.length)}>›</button>
        </div>
      )}

      <div className="mobile-bar">
        <a href="tel:0656964693" className="m-btn ghost">โทร</a>
        <button className="m-btn primary" onClick={() => setDrawer(true)}>จองคิว · ประเมินฟรี</button>
        <a href="https://wa.me/66656964693" target="_blank" rel="noreferrer" className="m-btn blue">WhatsApp</a>
      </div>

      {toast && <div className="toast" role="status">{toast}</div>}
    </>
  )
}
