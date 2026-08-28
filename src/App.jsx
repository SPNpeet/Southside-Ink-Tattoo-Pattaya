import { useState } from 'react'

const SERVICES = [
  {
    tag: 'Most Popular',
    title: 'Fine Line & Minimal',
    desc: 'เส้นเล็ก คมกริบ ลายมินิมอล ตัวอักษร สัญลักษณ์ เหมาะกับรอยแรก',
    price: 'เริ่ม 1,000฿',
    icon: '◐',
  },
  {
    tag: 'Color',
    title: 'งานสีสด คัลเลอร์',
    desc: 'สีแน่น สดนาน เทคนิคลงสีเนียน ไม่ดรอปไว',
    price: 'เริ่ม 1,500฿',
    icon: '◎',
  },
  {
    tag: 'Blackwork',
    title: 'Blackwork / Tribal',
    desc: 'ดำเข้ม ดุดัน ลายใหญ่ งานถมดำ งานเผ่า',
    price: 'เริ่ม 1,500฿',
    icon: '⬢',
  },
  {
    tag: 'Cover Up',
    title: 'แก้ลาย / สักทับ',
    desc: 'แก้รอยสักพัง สักทับให้ใหม่ ปรับแบบฟรีก่อนสัก',
    price: 'ประเมินฟรี',
    icon: '⬣',
  },
  {
    tag: 'Japanese',
    title: 'Japanese / Old School',
    desc: 'ลายญี่ปุ่น ปลาคาร์พ มังกร ดอกโบตั๋น เส้นแข็งแรง',
    price: 'เริ่ม 2,000฿',
    icon: '❖',
  },
  {
    tag: 'Piercing',
    title: 'เจาะ & ดูแลหลังสัก',
    desc: 'ให้คำปรึกษาดูแลแผล ผลิตภัณฑ์ดูแลหลังสักครบ',
    price: 'สอบถามได้',
    icon: '✦',
  },
]

const GALLERY = [
  { id: 1, tag: 'Fine line', span: 'featured' },
  { id: 2, tag: 'Blackwork' },
  { id: 3, tag: 'Color' },
  { id: 4, tag: 'Minimal' },
  { id: 5, tag: 'Japanese' },
  { id: 6, tag: 'Cover up' },
  { id: 7, tag: 'Lettering' },
]

const REVIEWS = [
  { name: 'Anna M.', text: 'งานเนี๊ยบมาก พี่ช่างใส่ใจรายละเอียด แนะนำดี สะอาด ปลอดภัย ประทับใจสุดๆ', star: 5 },
  { name: 'Mark T.', text: 'Best tattoo in Pattaya! Clean shop, great artist, fair price. Will come again.', star: 5 },
  { name: 'คุณฟ้า', text: 'สักครั้งแรกไม่เจ็บอย่างที่คิด ช่างมือเบา อธิบายดูแลหลังสักละเอียดมาก 5 ดาวไปเลยค่ะ', star: 5 },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState('ทั้งหมด')

  const scrollTo = (id) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const filters = ['ทั้งหมด', 'Fine line', 'Blackwork', 'Color', 'Minimal']

  return (
    <>
      <header className="nav">
        <a className="logo" href="#top" onClick={(e) => { e.preventDefault(); scrollTo('top') }}>
          <span className="logo-mark">SOUTHSIDE</span> <span className="logo-ink">INK</span> <span className="logo-sub">PATTAYA</span>
        </a>
        <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <a href="#works" onClick={(e) => { e.preventDefault(); scrollTo('works') }}>ผลงาน</a>
          <a href="#services" onClick={(e) => { e.preventDefault(); scrollTo('services') }}>บริการ</a>
          <a href="#artists" onClick={(e) => { e.preventDefault(); scrollTo('artists') }}>ช่างสัก</a>
          <a href="#reviews" onClick={(e) => { e.preventDefault(); scrollTo('reviews') }}>รีวิว</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact') }}>ติดต่อ</a>
          <a className="btn btn-primary nav-cta" href="https://www.facebook.com/ploytattoopt" target="_blank" rel="noreferrer">จองคิว</a>
        </nav>
        <button className="menu-toggle" aria-label="เมนู" onClick={() => setMenuOpen(v => !v)}>☰</button>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="hero">
          <div className="hero-grid">
            <div className="hero-left">
              <p className="badge"><span className="dot" /> เปิดทุกวัน · Walk-in ยินดีต้อนรับ · ปรึกษาฟรี</p>
              <h1>
                สักให้<span className="h-yellow">คม</span><br />
                สะอาด <span className="h-blue">ปลอดภัย</span><br />
                <span className="h-outline">ราคาชัดเจน</span>
              </h1>
              <p className="sub">
                Southside Ink Tattoo Pattaya — สตูดิโอสักพัทยาใต้ สาย 2 ซอย 14 ใกล้วอล์กกิ้งสตรีท
                ช่างมืออาชีพ งาน Fine line / สี / ดำ / แก้ลาย เข็มใหม่ทุกครั้ง ปลอดเชื้อ 100%
              </p>
              <div className="cta-row">
                <a className="btn btn-primary" href="https://www.facebook.com/ploytattoopt" target="_blank" rel="noreferrer">จองคิวทาง Facebook →</a>
                <a className="btn btn-secondary" href="#works" onClick={(e) => { e.preventDefault(); scrollTo('works') }}>ดูผลงาน</a>
              </div>
              <div className="hero-meta">
                <div className="stars">★ 5.0 <span>(43 รีวิว Google)</span></div>
                <div className="meta-dot">·</div>
                <div>เปิด 13:00 ทุกวัน</div>
                <div className="meta-dot">·</div>
                <div>พัทยา สาย 2 ซอย 14</div>
              </div>
              <div className="contact-pills">
                <a href="tel:0656964693" className="pill pill-yellow">📞 065-696-4693</a>
                <a href="tel:0838153762" className="pill">083-815-3762</a>
                <a href="https://wa.me/66656964693" target="_blank" rel="noreferrer" className="pill pill-blue">WhatsApp</a>
              </div>
            </div>

            <div className="hero-right">
              <div className="hero-image-wrap">
                <div className="hero-image">
                  <img src="https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?w=800&q=80&auto=format&fit=crop" alt="Southside Ink Tattoo Pattaya หน้าร้าน" />
                  <div className="hero-badge-card">
                    <strong>EST. 2023</strong>
                    <span>EXPERT TATTOOING</span>
                    <span>OPEN DAILY 13:00–22:00</span>
                  </div>
                </div>
                <div className="hero-pattern" aria-hidden />
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="stats-bar">
          <div><h2>5.0★</h2><p>43 รีวิว Google</p></div>
          <div><h2>100%</h2><p>เข็มใหม่ ปลอดเชื้อ</p></div>
          <div><h2>1000+</h2><p>รอยสักที่ไว้ใจเรา</p></div>
          <div><h2>WIN</h2><p>เดินเข้าได้ ไม่ต้องจอง</p></div>
        </section>

        {/* SERVICES */}
        <section id="services" className="section">
          <span className="cmd">— Services</span>
          <h2 className="section-title">บริการของเรา <span className="title-accent">เลือกสไตล์ที่ใช่</span></h2>
          <p className="section-subtitle">ปรึกษาออกแบบฟรี ปรับแบบจนกว่าจะชอบ บอกราคาก่อนเริ่ม ไม่บวกเพิ่มหน้างาน</p>
          <div className="sessions-grid">
            {SERVICES.map(s => (
              <article className="session-card" key={s.title}>
                <div className="session-image">
                  <img src={`https://picsum.photos/seed/${s.title}/600/400`} alt={s.title} loading="lazy" />
                  <span className="session-tag">{s.tag}</span>
                </div>
                <div className="session-content">
                  <div className="svc-icon">{s.icon}</div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                  <div className="session-price">{s.price}</div>
                </div>
              </article>
            ))}
          </div>
          <div className="center-cta">
            <a className="btn btn-blue" href="https://www.facebook.com/ploytattoopt" target="_blank" rel="noreferrer">ส่งแบบให้ประเมินราคาฟรี →</a>
          </div>
        </section>

        {/* GALLERY */}
        <section id="works" className="section">
          <span className="cmd">— Portfolio</span>
          <div className="section-head-row">
            <h2 className="section-title">ผลงานจริง <span className="title-accent">จากร้านเรา</span></h2>
            <div className="filter-row">
              {filters.map(f => (
                <button key={f} className={`chip ${activeFilter === f ? 'active' : ''}`} onClick={() => setActiveFilter(f)}>{f}</button>
              ))}
            </div>
          </div>
          <p className="section-subtitle">รูปจาก Drive: โฟลเดอร์ ผลงาน / รีวิว / รูปร้าน — อัปโหลดแล้วจะโชว์ตรงนี้อัตโนมัติ (ตอนนี้ใช้รูปตัวอย่าง)</p>
          <div className="gallery-grid">
            {GALLERY.filter(g => activeFilter === 'ทั้งหมด' || g.tag === activeFilter).map(item => (
              <div key={item.id} className={`gallery-item ${item.span || ''}`}>
                <img src={`https://picsum.photos/seed/tat${item.id}southside/800/800`} alt={item.tag} loading="lazy" />
                <div className="gallery-overlay"><span>{item.tag}</span></div>
              </div>
            ))}
          </div>
          <div className="gallery-note">
            <p>อยากเห็นแบบชัดๆ เพิ่มเติม? ดูในเพจ <a href="https://www.facebook.com/ploytattoopt" target="_blank" rel="noreferrer">facebook.com/ploytattoopt</a></p>
            <a className="btn btn-secondary" href="https://drive.google.com/drive/folders/1bVeStwNcYRf-1hyKugyKKX5Eh-BdjOsR?usp=drive_link" target="_blank" rel="noreferrer">เปิดโฟลเดอร์รูปต้นฉบับ</a>
          </div>
        </section>

        {/* WHY US + ARTIST */}
        <section id="artists" className="section">
          <div className="two-col">
            <div>
              <span className="cmd">— Why Southside Ink</span>
              <h2 className="section-title">ทำไมลูกค้าถึง<br />กลับมาซ้ำ</h2>
              <ul className="why-list">
                <li><span>✓</span> เข็มใหม่ แกะให้ดูต่อหน้า ฆ่าเชื้อมาตรฐานโรงพยาบาล</li>
                <li><span>✓</span> ออกแบบให้ฟรี ปรับจนถูกใจ ไม่คิดเงินเพิ่ม</li>
                <li><span>✓</span> ช่างคุยง่าย ภาษาไทย/อังกฤษ รับทั้งคนไทยและต่างชาติ</li>
                <li><span>✓</span> ราคาบอกก่อนสัก ไม่มีหมกเม็ด</li>
                <li><span>✓</span> ดูแลหลังสักละเอียด มีการรับประกันเติมฟรีตามเงื่อนไข</li>
              </ul>
              <div className="mini-cards">
                <div className="mini-card"><strong>สะอาด</strong><span>ผ่านการฆ่าเชื้อทุกชิ้น</span></div>
                <div className="mini-card yellow"><strong>ตรงปก</strong><span>แบบไหนได้แบบนั้น</span></div>
                <div className="mini-card blue"><strong>เป็นกันเอง</strong><span>สักครั้งแรกก็ไม่เกร็ง</span></div>
              </div>
            </div>
            <div className="artist-highlight">
              <div className="artist-image-wrap">
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=600&q=80&auto=format&fit=crop" alt="ช่างสัก Southside Ink" />
              </div>
              <div className="artist-info-box">
                <h3>ช่างพลอย · Southside Ink</h3>
                <p className="artist-specialty">Fine line / Minimal / Lettering ถนัดงานเส้นเล็ก</p>
                <p className="artist-bio">ดูแลทุกเคสเอง ตั้งแต่คุยแบบ วาดแบบ สัก และติดตามหลังสัก ใส่ใจทุกรอย</p>
                <div className="artist-social">
                  <a href="https://www.facebook.com/ploytattoopt" target="_blank" rel="noreferrer" aria-label="Facebook">f</a>
                  <a href="tel:0656964693" aria-label="โทร">☎</a>
                  <a href="https://wa.me/66656964693" target="_blank" rel="noreferrer" aria-label="WhatsApp">✆</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* REVIEWS */}
        <section id="reviews" className="section">
          <span className="cmd">— Reviews · 5.0 ★ 43 รีวิว</span>
          <h2 className="section-title">ลูกค้าพูดถึงเรา</h2>
          <div className="reviews-grid">
            {REVIEWS.map(r => (
              <div className="review-card" key={r.name}>
                <div className="review-stars">{'★'.repeat(r.star)}</div>
                <p className="review-text">“{r.text}”</p>
                <div className="review-name">— {r.name}</div>
              </div>
            ))}
          </div>
          <div className="center-cta">
            <a className="btn btn-secondary" href="https://share.google/lUOdKhWmDRqsbYEMv" target="_blank" rel="noreferrer">ดูรีวิวทั้งหมดบน Google Maps →</a>
          </div>
        </section>

        {/* LOCATION & BOOKING */}
        <section id="contact" className="section">
          <div className="studio-section">
            <div className="studio-grid">
              <div className="studio-item">
                <span className="studio-label">ที่อยู่</span>
                <span className="studio-value">สาย 2 ซอย 14 ใกล้วอล์กกิ้งสตรีท<br />พัทยาใต้ อ.บางละมุง ชลบุรี 20150</span>
                <a className="btn btn-blue" href="https://share.google/lUOdKhWmDRqsbYEMv" target="_blank" rel="noreferrer" style={{ marginTop: 12, alignSelf: 'flex-start' }}>เปิดใน Google Maps →</a>
              </div>
              <div className="studio-item">
                <span className="studio-label">เวลาเปิด</span>
                <span className="studio-value">เปิดทุกวัน 13:00 – 22:00<br /><span style={{ color: 'var(--text-dim)', fontSize: 14 }}>Walk-in ได้เลย หรือจองคิวล่วงหน้า</span></span>
              </div>
              <div className="studio-item">
                <span className="studio-label">ติดต่อ</span>
                <span className="studio-value">
                  <a href="tel:0656964693">065-696-4693</a> · <a href="tel:0838153762">083-815-3762</a><br />
                  <a href="https://wa.me/66656964693" target="_blank" rel="noreferrer">WhatsApp: 0656964693</a><br />
                  <a href="https://www.facebook.com/ploytattoopt" target="_blank" rel="noreferrer" style={{ color: 'var(--blue)' }}>facebook.com/ploytattoopt</a>
                </span>
              </div>
            </div>
            <div className="map-wrap">
              <iframe
                title="Southside Ink Map"
                src="https://www.google.com/maps?q=Southside+Ink+Tattoo+Pattaya+สาย2+ซอย14&z=16&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div className="booking-cta" style={{ marginTop: 24 }}>
            <h2>พร้อมสักแล้วหรือยัง?</h2>
            <p>ส่งแบบที่อยากได้มาประเมินราคาฟรี ตอบไวใน 1 ชั่วโมง — ไม่สักก็ปรึกษาได้</p>
            <div className="cta-row">
              <a className="btn btn-primary" href="https://www.facebook.com/ploytattoopt" target="_blank" rel="noreferrer">ทักเพจ Ploy Tattoo</a>
              <a className="btn btn-secondary" href="https://wa.me/66656964693" target="_blank" rel="noreferrer">ทัก WhatsApp</a>
              <a className="btn btn-blue" href="tel:0656964693">โทร 065-696-4693</a>
            </div>
            <p className="booking-note">* แนะนำจองล่วงหน้า 1 วัน ช่วงเย็นคิวแน่น — Walk-in แนะนำมาก่อน 20:00</p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo"><span style={{ color: 'var(--yellow)' }}>SOUTHSIDE</span> INK PATTAYA</div>
            <p className="footer-tagline">สตูดิโอสักพัทยา งานคม สะอาด ปลอดภัย — สาย 2 ซอย 14 ใกล้วอล์กกิ้งสตรีท เปิดทุกวัน 13:00 เป็นต้นไป</p>
            <div className="footer-social">
              <a href="https://www.facebook.com/ploytattoopt" target="_blank" rel="noreferrer" aria-label="Facebook">f</a>
              <a href="https://wa.me/66656964693" target="_blank" rel="noreferrer" aria-label="WhatsApp">W</a>
              <a href="tel:0656964693" aria-label="Phone">☎</a>
            </div>
          </div>
          <div className="footer-column">
            <h4>เมนู</h4>
            <ul>
              <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollTo('services') }}>บริการ</a></li>
              <li><a href="#works" onClick={(e) => { e.preventDefault(); scrollTo('works') }}>ผลงาน</a></li>
              <li><a href="#artists" onClick={(e) => { e.preventDefault(); scrollTo('artists') }}>ช่างสัก</a></li>
              <li><a href="#reviews" onClick={(e) => { e.preventDefault(); scrollTo('reviews') }}>รีวิว</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>ติดต่อ</h4>
            <ul>
              <li><a href="tel:0656964693">065-696-4693</a></li>
              <li><a href="tel:0838153762">083-815-3762</a></li>
              <li><a href="https://wa.me/66656964693" target="_blank" rel="noreferrer">WhatsApp</a></li>
              <li><a href="https://www.facebook.com/ploytattoopt" target="_blank" rel="noreferrer">Facebook</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>ที่อยู่</h4>
            <ul>
              <li style={{ color: 'var(--text-dim)', fontSize: 14, lineHeight: 1.6 }}>สาย 2 ซอย 14<br />วอล์กกิ้งสตรีท พัทยา<br />20150 · <a href="https://share.google/lUOdKhWmDRqsbYEMv" target="_blank" rel="noreferrer">ดูแผนที่</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Southside Ink Tattoo Pattaya · Expert Tattooing EST. 2023</span>
          <span>สีประจำร้าน: น้ำเงิน เหลือง ขาว ดำ · ทำเว็บด้วยความใส่ใจ</span>
        </div>
      </footer>
    </>
  )
}

export default App
