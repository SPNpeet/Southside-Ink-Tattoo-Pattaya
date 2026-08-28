import { useState, useEffect } from 'react'

const SERVICES = [
  { id: 'fine', tag: 'most popular', title: 'Fine Line & Minimal', desc: 'เส้นเล็ก 0.3mm คมกริบ ตัวอักษร สัญลักษณ์ ลายแรกไม่เจ็บมาก', price: 'เริ่ม 1,000฿', meta: '30–60 นาที' },
  { id: 'color', tag: 'color', title: 'งานสีสด คัลเลอร์', desc: 'ลงสีแน่น ไม่ดรอป เทคนิคแพ็คสีเนียน สีนำเข้าปลอดภัย', price: 'เริ่ม 1,500฿', meta: '60–120 นาที' },
  { id: 'black', tag: 'blackwork', title: 'Blackwork / Tribal', desc: 'งานดำดุดัน ถมดำ Tribal Maori งานใหญ่คุมโทนเท่', price: 'เริ่ม 1,500฿', meta: '45–180 นาที' },
  { id: 'cover', tag: 'cover up', title: 'แก้ลาย / สักทับ', desc: 'แก้รอยพัง คิดแบบใหม่ให้ฟรี ปรับจนชอบค่อยสัก', price: 'ประเมินฟรี', meta: 'ปรึกษาฟรี' },
  { id: 'japan', tag: 'japanese', title: 'Japanese / Old School', desc: 'ปลาคาร์พ มังกร ดอกโบตั๋น เส้นแข็งแรง เงาสวย', price: 'เริ่ม 2,000฿', meta: '90–240 นาที' },
  { id: 'care', tag: 'aftercare', title: 'ดูแลหลังสัก & เจาะ', desc: 'ฟิล์มกันน้ำ ครีมดูแล คำแนะนำแผลแบบละเอียด', price: 'ฟรี', meta: 'รับประกันเติม*' },
]

const WORKS = [
  "1juqLfCJ8rMus2TWOjrvMi5-ScWqTFQ2i","1Y_UHXZKVVa-BeNGie6VZ1bZDsTKvaaEP","1AakBm6zRlxdU18-O0OZMsZBtXJec4cjy","1CJcz60zMz2FAsiTp8peXexBvckRR2Sje","1mvqnMOsuKOkkez-v_LwRXjESalyyQM6u","1wez5GHlEmSGPSGOFSGKv7TjZb33w2ay6","1JE7RvJS9z4mJnac6FTv7IbzNKl0xMgtT","18Sxx5C7vxdBdD1Vx2M7rB-dVeSmdf4wT","1UqICiJMIogflvg49LlN0aY5XIls7-9-u","1wRKLneJwNOqA6cMw-YgmfrQDJ2wod9oU","1p2t7M8TjgttoPjFLLZJQddmntVv127fK","1s3_oTYl2dsWPa-L6-04U3Ujq-B0e7LPW","1lj9O7B5YVODclQbytPDYdsDdWEx6FhbY","12b6gAAIKsFg8fYAqhGjlaTotcCO5P-LW","1mRemjlWbFPKVmoHxE8l2-ILXNiTpQEN6","1bZ_tiEF_w5g2CpCYvBFSQmJ7InH64zFi","1d55chDA5fq2GiW-OVFcik_Fb7uZFd_3u","1RGABkEBV_NKAzrhmSoILBIb0ntfMC4ka","1MmTWMflnMW1UBas_QM0MTffrBEle_YkD","1wabeadflb2uqkl6vCmUe00_yxcDdYMcN","1hwQi9k3-vuqcZp_BR0qasYe48ohPDSKY","12mQYgLHfDgodOQ49HncpDDU2UmfzE7Io","1eO87gXAGeA8phrPA_BGElyeyFxztsD3C","1L03vX6Gtgn4btn21SGZmbhFYj7doDoU6","1ABhsZCWhnAzmQk1Tc1HURcAJ67fvxyJb","1cl-hCX2gP8I9J31-Vxb8ZMoZOUgvJY7N","1KrAzbfZqZnnePKlZ-xRRty__wqg1Luxv","1jZ0ux5JtJYCeJpj7IZZufJ2B1Z6VrJ2W","1GUYMDjO5cKVRrWQiRF4cx79_4TTQxav8","1bf22cCZ8nkOQj4DTKkWehOqVqmDGwqZ6",
]
const TAGS = ["Fine line","Blackwork","Color","Minimal","Japanese","Cover up"]
const PORTFOLIO = WORKS.map((id, i) => ({
  id,
  src: `${import.meta.env.BASE_URL}images/works/${id}.jpg`,
  tag: TAGS[i % TAGS.length],
  label: `ผลงาน ${String(i+1).padStart(2,'0')}`,
}))

const STEPS = [
  { n: '01', t: 'ส่งแบบ', d: 'ทักเพจ/WhatsApp ส่งรูป บอกตำแหน่ง ขนาด' },
  { n: '02', t: 'ออกแบบ & ตีราคา', d: 'วาดให้ดู ปรับจนถูกใจ บอกราคาก่อนเริ่ม' },
  { n: '03', t: 'สักจริง', d: 'เข็มใหม่แกะต่อหน้า มือเบา ไทย/อังกฤษ' },
  { n: '04', t: 'ดูแลหลังสัก', d: 'สอนล้างแผล ฟิล์ม/ครีม นัดเติมฟรี*' },
]

const REVIEWS = [
  { name: 'Anna M. · UK', text: 'งานเนี๊ยบมาก พี่ช่างใส่ใจมาก สะอาด ปลอดภัย แนะนำดีสุดๆ', date: '2 สัปดาห์ที่แล้ว' },
  { name: 'Mark T. · AU', text: 'Best tattoo in Pattaya! Clean, pro, fair price. Done fine line script perfect.', date: 'เมื่อวาน' },
  { name: 'คุณฟ้า · กทม', text: 'สักครั้งแรกไม่เจ็บอย่างที่คิด ช่างมือเบา อธิบายดูแลละเอียด กลับมาซ้ำแน่นอนค่ะ', date: '3 วันที่แล้ว' },
  { name: 'Lisa K. · DE', text: 'Cover up old tattoo — looks brand new! Design was adjusted 3 times until perfect.', date: '1 สัปดาห์ที่แล้ว' },
]

const FAQS = [
  { q: 'เจ็บไหม? สักครั้งแรกต้องเตรียมอะไร', a: 'เจ็บแบบแสบๆ ทนได้ ยิ่งเส้นเล็กยิ่งเจ็บน้อย นอนพอ งดแอลกอฮอล์ 24ชม. กินข้าวมาก่อน' },
  { q: 'ราคาเท่าไหร่', a: 'Fine line เริ่ม 1,000฿ สี/ดำ เริ่ม 1,500฿ ส่งแบบมาประเมินฟรี บอกราคาก่อนเริ่ม ไม่บวกหน้างาน' },
  { q: 'ต้องจองไหม กี่นาที', a: 'เล็ก 30–60 นาที กลาง 1–2ชม. แนะนำจองล่วงหน้า 1 วัน แต่ Walk-in ได้ถึง 20:00' },
  { q: 'เข็มสะอาดไหม', a: 'เข็มใหม่แกะต่อหน้า ถุงมือ/อุปกรณ์ฆ่าเชื้อมาตรฐานโรงพยาบาล สีนำเข้า ปลอดภัย' },
]

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [filter, setFilter] = useState('ทั้งหมด')
  const [lightbox, setLightbox] = useState(null)
  const [toast, setToast] = useState('')
  const [openFaq, setOpenFaq] = useState(0)
  const [drawer, setDrawer] = useState(false)
  const [reviewIdx, setReviewIdx] = useState(0)

  const filtered = PORTFOLIO.filter(p => filter === 'ทั้งหมด' || p.tag === filter)
  const filters = ['ทั้งหมด', ...TAGS]

  const scrollTo = (id) => {
    setMenuOpen(false); setDrawer(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const copyTel = async (num) => {
    try { await navigator.clipboard.writeText(num); setToast(`คัดลอก ${num} แล้ว`); setTimeout(() => setToast(''), 1800) } catch { window.location.href = `tel:${num}` }
  }
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
  useEffect(() => {
    const id = setInterval(() => setReviewIdx(v => (v + 1) % REVIEWS.length), 3800)
    return () => clearInterval(id)
  }, [])

  return (
    <>
      <header className="oc-nav">
        <div className="oc-nav-inner">
          <a className="oc-logo" href="#top" onClick={(e) => { e.preventDefault(); scrollTo('top') }}>
            <span className="oc-logo-mark">◈</span> Southside Ink <span className="oc-logo-sub">PATTAYA · EST.2023</span>
          </a>
          <nav className={`oc-links ${menuOpen ? 'open' : ''}`}>
            <a href="#works" onClick={(e) => { e.preventDefault(); scrollTo('works') }}>ผลงาน</a>
            <a href="#services" onClick={(e) => { e.preventDefault(); scrollTo('services') }}>บริการ</a>
            <a href="#process" onClick={(e) => { e.preventDefault(); scrollTo('process') }}>ขั้นตอน</a>
            <a href="#reviews" onClick={(e) => { e.preventDefault(); scrollTo('reviews') }}>รีวิว</a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact') }}>แผนที่</a>
          </nav>
          <div className="oc-actions">
            <a className="oc-ic" href="https://www.facebook.com/ploytattoopt" target="_blank" rel="noreferrer" aria-label="Facebook">f</a>
            <a className="oc-ic" href="https://wa.me/66656964693" target="_blank" rel="noreferrer" aria-label="WhatsApp">wa</a>
            <button className="oc-menu" aria-label="เมนู" onClick={() => setMenuOpen(v => !v)}><span /><span /><span /></button>
          </div>
        </div>
      </header>

      <main id="top" className="oc-main">
        {/* HERO — openclaw style */}
        <section className="oc-hero">
          <pre className="oc-ascii" aria-hidden>{`  ____   ___  _   _ _____ _   _ ____ ___ ____  _____
 / ___| / _ \\| | | |_   _| | | / ___|_ _|  _ \\| ____|
 \\___ \\| | | | | | | | | | |_| \\___ \\| || | | |  _|
  ___) | |_| | |_| | | | |  _  |___) | || |_| | |___
 |____/ \\___/ \\___/  |_| |_| |_|____/___|____/|_____|
         I N K  ·  P A T T A Y A  ·  EST.2023`}</pre>

          <div className="oc-kicker">Open 13:00–22:00 · Walk-in welcome · สาย 2 ซอย 14 ใกล้วอล์กกิ้งสตรีท · 5.0★ 43 reviews</div>

          <h1 className="oc-h1">
            The tattoo that <em>really</em> stays.
            <span>สักให้คม สะอาด ปลอดภัย — ราคาชัดเจน</span>
          </h1>
          <p className="oc-sub">
            Southside Ink — สตูดิโอสักพัทยา ถนัด Fine line / สี / ดำ / แก้ลาย เข็มใหม่แกะต่อหน้า ปลอดเชื้อ 100% ปรับแบบจนถูกใจค่อยสัก
          </p>

          <div className="oc-cta">
            <button className="btn btn-primary" onClick={() => setDrawer(true)}>จองคิว — ประเมินฟรี →</button>
            <a className="btn btn-ghost" href="#works" onClick={(e) => { e.preventDefault(); scrollTo('works') }}>ดูผลงาน</a>
          </div>

          <div className="oc-terminal">
            <div className="oc-term-bar"><span className="d r" /><span className="d y" /><span className="d g" /><span className="oc-term-title">southside — booking</span></div>
            <pre>{`$ southside book --style "fine line" --size 5cm
✓ เข็มใหม่แกะต่อหน้า
✓ ออกแบบฟรีจนถูกใจ
✓ บอกราคาก่อนเริ่ม — ไม่บวกหน้างาน

> ส่งแบบมาที่ fb.com/ploytattoopt
> หรือ WhatsApp 065-696-4693 — ตอบไวใน 1 ชม.`}</pre>
          </div>

          <div className="oc-proof">
            <span>★★★★★ <b>5.0</b> 43 รีวิว</span><span>·</span><span>1,000+ รอยสัก</span><span>·</span><span>เข็มใหม่ 100%</span>
            <span className="oc-proof-actions">
              <button className="oc-pill yellow" onClick={() => copyTel('0656964693')}>065-696-4693</button>
              <a className="oc-pill" href="tel:0838153762">083-815-3762</a>
              <a className="oc-pill blue" href="https://wa.me/66656964693" target="_blank" rel="noreferrer">WhatsApp</a>
            </span>
          </div>
        </section>

        {/* QUICK STATS — minimal */}
        <section className="oc-stats">
          <div><code>100%</code><span>เข็มใหม่แกะต่อหน้า</span></div>
          <div><code>ฟรี</code><span>ออกแบบจนถูกใจ</span></div>
          <div><code>1ชม.</code><span>ตอบประเมินไว</span></div>
          <div><code>TH/EN</code><span>คุยง่าย เป็นกันเอง</span></div>
        </section>

        {/* SERVICES — code list */}
        <section id="services" className="oc-section">
          <div className="oc-section-head">
            <h2><span className="oc-num">01</span> บริการ — <em>ราคาโปร่งใส</em></h2>
            <p>ปรับแบบฟรีจนกว่าจะชอบ ไม่บวกเพิ่มหน้างาน · เล็กเริ่ม 1,000฿ สี/ดำเริ่ม 1,500฿</p>
          </div>
          <div className="oc-svc-list">
            {SERVICES.map(s => (
              <button key={s.id} className="oc-svc" onClick={() => setDrawer(true)}>
                <span className="oc-svc-tag">{s.tag}</span>
                <span className="oc-svc-title">{s.title}</span>
                <span className="oc-svc-desc">{s.desc}</span>
                <span className="oc-svc-meta">{s.price} · {s.meta}</span>
              </button>
            ))}
          </div>
        </section>

        {/* WORKS — openclaw gallery minimal */}
        <section id="works" className="oc-section alt">
          <div className="oc-section-head">
            <h2><span className="oc-num">02</span> ผลงานจริง — <em>แตะเพื่อขยาย</em></h2>
            <p>รูปจริงทั้งหมดจากร้าน — ใช้รูปจาก Drive 30 รูป ไม่ใช่รูปตัวอย่าง</p>
          </div>
          <div className="oc-filters">
            {filters.map(f => (
              <button key={f} className={`oc-chip ${filter === f ? 'on' : ''}`} onClick={() => setFilter(f)}>{f}</button>
            ))}
          </div>
          <div className="oc-grid">
            {filtered.map((it, idx) => (
              <button key={it.id} className="oc-tile" onClick={() => setLightbox(idx)} aria-label={it.label}>
                <img src={it.src} alt={it.label} loading="lazy" />
                <span className="oc-tile-tag">{it.tag}</span>
              </button>
            ))}
          </div>
          <div className="oc-cta-row">
            <span>ชอบสไตล์ไหน? ส่งแบบมาประเมินฟรีได้เลย</span>
            <a className="btn btn-primary" href="https://www.facebook.com/ploytattoopt" target="_blank" rel="noreferrer">ดูเพิ่มใน Facebook →</a>
          </div>
        </section>

        {/* PROCESS */}
        <section id="process" className="oc-section">
          <div className="oc-section-head">
            <h2><span className="oc-num">03</span> ขั้นตอน — <em>ครั้งแรกก็ไม่เกร็ง</em></h2>
          </div>
          <div className="oc-steps">
            {STEPS.map(s => (
              <div key={s.n} className="oc-step">
                <code>{s.n}</code>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ARTIST + REVIEWS */}
        <section id="reviews" className="oc-section alt">
          <div className="oc-split">
            <div className="oc-artist">
              <img src={`${import.meta.env.BASE_URL}images/artist.jpg`} alt="ช่างสัก Southside Ink" />
              <div className="oc-artist-body">
                <h3>ช่างสัก Southside — ดูแลเองทุกเคส</h3>
                <p>ไทย/อังกฤษ ใส่ใจรายละเอียด ปรับแบบจนถูกใจ ไม่เร่ง ไม่กดดัน สักครั้งแรกก็ไม่เกร็ง · 1,000+ รอยสัก · 5.0★ 43 รีวิว</p>
                <div className="oc-artist-actions">
                  <a className="btn btn-primary" href="https://www.facebook.com/ploytattoopt" target="_blank" rel="noreferrer">ดูผลงานช่าง</a>
                  <a className="btn btn-ghost" href="https://wa.me/66656964693" target="_blank" rel="noreferrer">WhatsApp</a>
                </div>
              </div>
            </div>
            <div className="oc-reviews">
              <h3>ลูกค้าพูดถึงเรา</h3>
              <div className="oc-carousel">
                <div className="oc-track" style={{ transform: `translateX(-${reviewIdx * 100}%)` }}>
                  {REVIEWS.map(r => (
                    <div key={r.name} className="oc-review">
                      <div className="oc-stars">★★★★★</div>
                      <p>“{r.text}”</p>
                      <small>{r.name} · {r.date}</small>
                    </div>
                  ))}
                </div>
              </div>
              <div className="oc-dots">
                {REVIEWS.map((_, i) => <button key={i} className={i === reviewIdx ? 'on' : ''} onClick={() => setReviewIdx(i)} aria-label={`รีวิว ${i+1}`} />)}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="oc-section">
          <div className="oc-section-head">
            <h2><span className="oc-num">04</span> ถามบ่อย</h2>
          </div>
          <div className="oc-faq">
            {FAQS.map((f, i) => (
              <div key={f.q} className={`oc-faq-item ${openFaq === i ? 'open' : ''}`}>
                <button className="oc-faq-q" onClick={() => setOpenFaq(openFaq === i ? -1 : i)} aria-expanded={openFaq === i}>
                  <span>{f.q}</span><em>{openFaq === i ? '−' : '+'}</em>
                </button>
                <div className="oc-faq-a"><p>{f.a}</p></div>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="oc-section alt">
          <div className="oc-contact">
            <div>
              <h2>สาย 2 ซอย 14<br /><em>ใกล้วอล์กกิ้งสตรีท</em></h2>
              <p>พัทยาใต้ อ.บางละมุง ชลบุรี 20150 · เปิดทุกวัน 13:00–22:00 · Walk-in ได้ถึง 20:00</p>
              <div className="oc-contact-lines">
                <a href="tel:0656964693"><code>โทรหลัก</code> 065-696-4693</a>
                <a href="tel:0838153762"><code>สำรอง</code> 083-815-3762</a>
                <a href="https://wa.me/66656964693" target="_blank" rel="noreferrer"><code>WhatsApp</code> 0656964693</a>
                <a href="https://www.facebook.com/ploytattoopt" target="_blank" rel="noreferrer"><code>Facebook</code> ploytattoopt</a>
              </div>
              <a className="btn btn-primary" href="https://share.google/lUOdKhWmDRqsbYEMv" target="_blank" rel="noreferrer">เปิดใน Google Maps →</a>
            </div>
            <div className="oc-map">
              <iframe title="Southside Ink Map" src="https://www.google.com/maps?q=Southside+Ink+Tattoo+Pattaya+สาย2+ซอย14&z=16&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </div>
          <div className="oc-book">
            <div>
              <h3>พร้อมสักแล้วหรือยัง?</h3>
              <p>ส่งแบบมาประเมินฟรี ตอบไวใน 1 ชม.</p>
            </div>
            <div className="oc-book-actions">
              <button className="btn btn-primary" onClick={() => setDrawer(true)}>ส่งแบบประเมินฟรี</button>
              <a className="btn btn-ghost" href="tel:0656964693">โทรเลย</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="oc-footer">
        <div>© {new Date().getFullYear()} Southside Ink Tattoo Pattaya · EST.2023 · เข็มใหม่ 100%</div>
        <div>น้ำเงิน เหลือง ขาว ดำ · ทำเว็บด้วยความใส่ใจ</div>
      </footer>

      <div className={`oc-drawer ${drawer ? 'open' : ''}`} role="dialog" aria-modal="true" aria-label="จองคิว">
        <button className="oc-drawer-bg" aria-label="ปิด" onClick={() => setDrawer(false)} />
        <div className="oc-drawer-panel">
          <button className="oc-drawer-x" onClick={() => setDrawer(false)} aria-label="ปิด">×</button>
          <h3>ส่งแบบประเมินฟรี</h3>
          <p>แนบรูป + บอกตำแหน่ง/ขนาด ตอบไวใน 1 ชม.</p>
          <a className="oc-choice primary" href="https://www.facebook.com/ploytattoopt" target="_blank" rel="noreferrer"><b>ทัก Facebook เพจ</b><span>ploytattoopt · ตอบไวสุด</span></a>
          <a className="oc-choice blue" href="https://wa.me/66656964693?text=สวัสดีครับ ขอประเมินราคาสักครับ" target="_blank" rel="noreferrer"><b>ทัก WhatsApp</b><span>065-696-4693</span></a>
          <a className="oc-choice" href="tel:0656964693"><b>โทรเลย</b><span>065-696-4693 / 083-815-3762</span></a>
        </div>
      </div>

      {lightbox !== null && (
        <div className="oc-lightbox" role="dialog" aria-modal="true" aria-label="ดูผลงาน">
          <button className="oc-lb-bg" onClick={() => setLightbox(null)} aria-label="ปิด" />
          <button className="oc-lb-x" onClick={() => setLightbox(null)}>×</button>
          <button className="oc-lb-prev" onClick={() => setLightbox(v => (v - 1 + filtered.length) % filtered.length)}>‹</button>
          <div className="oc-lb-main">
            <img src={filtered[lightbox].src} alt={filtered[lightbox].label} />
            <div className="oc-lb-cap"><span>{filtered[lightbox].tag}</span> {filtered[lightbox].label} · {lightbox + 1}/{filtered.length}</div>
          </div>
          <button className="oc-lb-next" onClick={() => setLightbox(v => (v + 1) % filtered.length)}>›</button>
        </div>
      )}

      <div className="oc-mobilebar">
        <a href="tel:0656964693" className="oc-mbtn ghost">โทร</a>
        <button className="oc-mbtn primary" onClick={() => setDrawer(true)}>จองคิว · ประเมินฟรี</button>
        <a href="https://wa.me/66656964693" target="_blank" rel="noreferrer" className="oc-mbtn blue">WhatsApp</a>
      </div>

      {toast && <div className="oc-toast">{toast}</div>}
    </>
  )
}
