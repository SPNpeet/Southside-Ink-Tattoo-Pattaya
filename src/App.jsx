import { useState } from 'react'
import './App.css'

const SERVICES = [
  {
    icon: '🌐',
    title: 'Web App & เว็บไซต์',
    desc: 'เว็บไซต์ธุรกิจ พอร์ตโฟลิโอ ร้านค้าออนไลน์ และระบบหลังบ้านครบวงจร รองรับทุกขนาดธุรกิจ',
  },
  {
    icon: '🤖',
    title: 'AI Assistant',
    desc: 'แชทบอท, AI Agent, ระบบอัตโนมัติบน LINE/Facebook/Messenger พร้อมเชื่อมกับข้อมูลธุรกิจของคุณ',
  },
  {
    icon: '📊',
    title: 'ระบบบัญชีอัตโนมัติ',
    desc: 'ออกแบบระบบบัญชีอัตโนมัติ ช่วย SME และสำนักงานบัญชีปิดงบไว ไม่ต้องคีย์มือ ลดงานซ้ำซ้อน',
  },
  {
    icon: '🎨',
    title: 'งานกราฟิก',
    desc: 'โลโก้, แบรนดิ้ง, สื่อโฆษณา, คอนเทนต์โซเชียลมีเดีย — ปั้นภาพลักษณ์ให้ดูมืออาชีพ',
  },
  {
    icon: '🧊',
    title: 'งาน 3D',
    desc: 'โมเดล 3D, ภาพเรนเดอร์สินค้า, อนิเมชัน สำหรับนำเสนอสินค้าและงานโฆษณา',
  },
  {
    icon: '🔗',
    title: 'วางระบบครบวงจร',
    desc: 'ดูแลตั้งแต่คอนเซ็ปต์ ออกแบบ พัฒนา ติดตั้ง จนถึงเทรนและซัพพอร์ต End-to-End',
  },
]

const STEPS = [
  {
    num: '01',
    title: 'คุยโจทย์',
    desc: 'เล่าเป้าหมายธุรกิจให้เราฟัง เราช่วยขยายเป็นโซลูชันที่จับต้องได้',
  },
  {
    num: '02',
    title: 'วางแผน & ออกแบบ',
    desc: 'จัดทำแบบและประมาณการก่อนเริ่มงาน ทุกอย่างชัดเจน โปร่งใส',
  },
  {
    num: '03',
    title: 'พัฒนา & ดีไซน์',
    desc: 'ลงมือสร้างระบบ AI กราฟิก 3D ให้ตรงแบบที่ตกลงกันไว้',
  },
  {
    num: '04',
    title: 'ส่งมอบ & ซัพพอร์ต',
    desc: 'ติดตั้ง เฟ้นหา และดูแลต่อเนื่องให้ธุรกิจโตแบบก้าวกระโดด 🚀',
  },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  const nav = (id) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <header className="nav">
        <a
          className="logo"
          href="#top"
          onClick={(e) => {
            e.preventDefault()
            nav('top')
          }}
        >
          <span className="logo-prompt">$</span> sudo command
        </a>
        <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <a href="#services" onClick={(e) => { e.preventDefault(); nav('services') }}>
            บริการ
          </a>
          <a href="#process" onClick={(e) => { e.preventDefault(); nav('process') }}>
            วิธีทำงาน
          </a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); nav('contact') }}>
            ติดต่อ
          </a>
          <a className="btn" href="#contact" onClick={(e) => { e.preventDefault(); nav('contact') }}>
            ปรึกษาฟรี
          </a>
        </nav>
        <button
          className="menu-toggle"
          aria-label="เปิดเมนู"
          onClick={() => setMenuOpen((v) => !v)}
        >
          ☰
        </button>
      </header>

      <main id="top">
        <section className="hero">
          <p className="badge">
            <span className="dot" />
            Web App · AI · กราฟิก · 3D
          </p>
          <h1>
            สั่งรันความสำเร็จ
            <br />
            ให้ธุรกิจคุณ <span className="gradient">โตแบบก้าวกระโดด!</span>
          </h1>
          <p className="sub">
            Sudo Command คือ Tech & Creative Agency “ตัวจบ” ที่ช่วยให้ธุรกิจ SME
            และสำนักงานบัญชีปิดงบไว ไม่ต้องคีย์มือ พร้อมดูแลงานกราฟิก 3D
            และวางระบบครบวงจร End-to-End 💻✨
          </p>
          <div className="cta-row">
            <a className="btn btn-primary" href="#contact" onClick={(e) => { e.preventDefault(); nav('contact') }}>
              เริ่มโปรเจกต์ของคุณ →
            </a>
            <a className="btn btn-ghost" href="#services" onClick={(e) => { e.preventDefault(); nav('services') }}>
              ดูบริการทั้งหมด
            </a>
          </div>
          <div className="terminal">
            <div className="terminal-bar">
              <span className="t-dot red" />
              <span className="t-dot yellow" />
              <span className="t-dot green" />
              <span className="t-title">sudo-command — bash</span>
            </div>
            <pre>{`$ sudo business --grow --accelerate
[Sudo Command] initializing solutions...
[✓] Web App             … ready
[✓] AI Assistant        … ready
[✓] บัญชีอัตโนมัติ       … ready
[✓] กราฟิก & 3D         … ready

> ธุรกิจของคุณ พร้อมแล้วหรือยัง?`}</pre>
          </div>
        </section>

        <section className="stats">
          <div>
            <h2>End-to-End</h2>
            <p>ดูแลครบจบในที่เดียว</p>
          </div>
          <div>
            <h2>AI-First</h2>
            <p>ทุกงานชู AI เข้ามาช่วย</p>
          </div>
          <div>
            <h2>Fast &amp; Scalable</h2>
            <p>เร็วขึ้น รองรับการโต</p>
          </div>
        </section>

        <section id="services" className="section">
          <h2 className="section-title">
            <span className="cmd">~/services</span> บริการของเรา
          </h2>
          <div className="grid">
            {SERVICES.map((s) => (
              <article className="card" key={s.title}>
                <div className="card-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="process" className="section">
          <h2 className="section-title">
            <span className="cmd">~/process</span> วิธีทำงาน
          </h2>
          <div className="steps">
            {STEPS.map((s) => (
              <div className="step" key={s.num}>
                <span className="step-num">{s.num}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="section contact">
          <h2 className="section-title">
            <span className="cmd">~/contact</span> เริ่มกันเลย
          </h2>
          <p className="contact-sub">
            พิมพ์ปัญหาธุรกิจของคุณ — เราจะตอบกลับภายใน 24 ชั่วโมง
          </p>
          <form
            className="contact-form"
            onSubmit={(e) => e.preventDefault()}
          >
            <input type="text" placeholder="ชื่อ / ชื่อบริษัท" required />
            <input type="email" placeholder="อีเมล" required />
            <input type="text" placeholder="เบอร์ LINE หรือโทรศัพท์" />
            <textarea
              placeholder="เล่าโจทย์ธุรกิจที่อยากทำ เช่น ระบบบัญชีอัตโนมัติ, เว็บร้านค้า, AI chatbot…"
              rows="4"
              required
            />
            <button type="submit" className="btn btn-primary">
              ส่งข้อความ →
            </button>
          </form>
          <p className="contact-note">
            📧 sudocoffee.home@gmail.com · เพจ: Sudo Z — รับทำเว็บไซต์ AI กราฟิก
            และงาน 3D ครบวงจร
          </p>
        </section>
      </main>

      <footer className="footer">
        <p>
          <span className="logo-prompt">$</span> sudo command — Tech &amp;
          Creative Agency © {new Date().getFullYear()}
        </p>
      </footer>
    </>
  )
}

export default App