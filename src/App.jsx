import { useState, useEffect } from 'react'

const WORKS = [
  "1juqLfCJ8rMus2TWOjrvMi5-ScWqTFQ2i","1Y_UHXZKVVa-BeNGie6VZ1bZDsTKvaaEP","1AakBm6zRlxdU18-O0OZMsZBtXJec4cjy","1CJcz60zMz2FAsiTp8peXexBvckRR2Sje","1mvqnMOsuKOkkez-v_LwRXjESalyyQM6u","1wez5GHlEmSGPSGOFSGKv7TjZb33w2ay6","1JE7RvJS9z4mJnac6FTv7IbzNKl0xMgtT","18Sxx5C7vxdBdD1Vx2M7rB-dVeSmdf4wT","1UqICiJMIogflvg49LlN0aY5XIls7-9-u","1wRKLneJwNOqA6cMw-YgmfrQDJ2wod9oU","1p2t7M8TjgttoPjFLLZJQddmntVv127fK","1s3_oTYl2dsWPa-L6-04U3Ujq-B0e7LPW","1lj9O7B5YVODclQbytPDYdsDdWEx6FhbY","12b6gAAIKsFg8fYAqhGjlaTotcCO5P-LW","1mRemjlWbFPKVmoHxE8l2-ILXNiTpQEN6","1bZ_tiEF_w5g2CpCYvBFSQmJ7InH64zFi","1d55chDA5fq2GiW-OVFcik_Fb7uZFd_3u","1RGABkEBV_NKAzrhmSoILBIb0ntfMC4ka","1MmTWMflnMW1UBas_QM0MTffrBEle_YkD","1wabeadflb2uqkl6vCmUe00_yxcDdYMcN","1hwQi9k3-vuqcZp_BR0qasYe48ohPDSKY","12mQYgLHfDgodOQ49HncpDDU2UmfzE7Io","1eO87gXAGeA8phrPA_BGElyeyFxztsD3C","1L03vX6Gtgn4btn21SGZmbhFYj7doDoU6","1ABhsZCWhnAzmQk1Tc1HURcAJ67fvxyJb","1cl-hCX2gP8I9J31-Vxb8ZMoZOUgvJY7N","1KrAzbfZqZnnePKlZ-xRRty__wqg1Luxv","1jZ0ux5JtJYCeJpj7IZZufJ2B1Z6VrJ2W","1GUYMDjO5cKVRrWQiRF4cx79_4TTQxav8","1bf22cCZ8nkOQj4DTKkWehOqVqmDGwqZ6",
]
const SHOP = ["1uZSA_1RswqRn_pAMW9wQx62ORcIEG1_Y","1WyQ_jfm05gZY_ihhjDCIWuUS7LL65524","1uRIBZHtOpJrfdMMmUJQyo6WeBehyxj9b","1QsuQgVxlhEjVYXTBZJGdULz_bf4M9cot"]
const TAGS_EN = ["Fine line","Blackwork","Color","Minimal","Japanese","Cover up"]
const TAGS_TH = ["Fine line","Blackwork","งานสี","มินิมอล","ญี่ปุ่น","แก้ลาย"]

const I18N = {
  th: {
    navWorks: "ผลงาน", navServices: "บริการ", navShop: "ร้าน", navProcess: "ขั้นตอน", navReviews: "รีวิว", navContact: "แผนที่",
    kicker: "เปิด 13:00–22:00 · Walk-in ยินดีต้อนรับ · สาย 2 ซอย 14 ใกล้วอล์กกิ้งสตรีท · 5.0★ 43 รีวิว",
    h1a: "The tattoo that", h1b: "really", h1c: "stays.",
    h1sub: "สักให้คม สะอาด ปลอดภัย — ราคาชัดเจน",
    sub: "Southside Ink — สตูดิโอสักพัทยา ถนัด Fine line / สี / ดำ / แก้ลาย เข็มใหม่แกะต่อหน้า ปลอดเชื้อ 100% ปรับแบบจนถูกใจค่อยสัก",
    ctaBook: "จองคิว — ประเมินฟรี →", ctaWorks: "ดูผลงาน",
    termTitle: "southside — booking",
    term: `$ southside book --style "fine line" --size 5cm\n✓ เข็มใหม่แกะต่อหน้า\n✓ ออกแบบฟรีจนถูกใจ\n✓ บอกราคาก่อนเริ่ม — ไม่บวกหน้างาน\n\n> ส่งแบบมาที่ fb.com/ploytattoopt\n> หรือ WhatsApp 065-696-4693 — ตอบไวใน 1 ชม.`,
    proofReviews: "43 รีวิว", proofTats: "1,000+ รอยสัก", proofNeedle: "เข็มใหม่ 100%",
    stats1: "เข็มใหม่แกะต่อหน้า", stats2: "ออกแบบจนถูกใจ", stats3: "ตอบประเมินไว", stats4: "คุยง่าย เป็นกันเอง",
    svcTitle: "บริการ —", svcEm: "ราคาโปร่งใส", svcDesc: "ปรับแบบฟรีจนกว่าจะชอบ ไม่บวกเพิ่มหน้างาน · เล็กเริ่ม 1,000฿ สี/ดำเริ่ม 1,500฿",
    services: [
      { tag: "ยอดนิยม", title: "Fine Line & Minimal", desc: "เส้นเล็ก 0.3mm คมกริบ ตัวอักษร สัญลักษณ์ ลายแรกไม่เจ็บมาก", price: "เริ่ม 1,000฿", meta: "30–60 นาที" },
      { tag: "งานสี", title: "งานสีสด คัลเลอร์", desc: "ลงสีแน่น ไม่ดรอป เทคนิคแพ็คสีเนียน สีนำเข้าปลอดภัย", price: "เริ่ม 1,500฿", meta: "60–120 นาที" },
      { tag: "ดำเข้ม", title: "Blackwork / Tribal", desc: "งานดำดุดัน ถมดำ Tribal Maori งานใหญ่คุมโทนเท่", price: "เริ่ม 1,500฿", meta: "45–180 นาที" },
      { tag: "แก้ลาย", title: "แก้ลาย / สักทับ", desc: "แก้รอยพัง คิดแบบใหม่ให้ฟรี ปรับจนชอบค่อยสัก", price: "ประเมินฟรี", meta: "ปรึกษาฟรี" },
      { tag: "ญี่ปุ่น", title: "Japanese / Old School", desc: "ปลาคาร์พ มังกร ดอกโบตั๋น เส้นแข็งแรง เงาสวย", price: "เริ่ม 2,000฿", meta: "90–240 นาที" },
      { tag: "ดูแล", title: "ดูแลหลังสัก & เจาะ", desc: "ฟิล์มกันน้ำ ครีมดูแล คำแนะนำแผลแบบละเอียด", price: "ฟรี", meta: "รับประกันเติม*" },
    ],
    shopTitle: "หน้าร้าน —", shopEm: "สะอาด สว่าง มองเห็นจากถนน",
    shopDesc: "สาขาเดียวพัทยาใต้ ไฟเหลือง-น้ำเงินเด่นชัด เดินถึงจาก Walking Street 3 นาที",
    worksTitle: "ผลงานจริง —", worksEm: "แตะเพื่อขยาย", worksDesc: "รูปจริงทั้งหมดจากร้าน — 30 รูป ไม่ใช่รูปตัวอย่าง",
    filterAll: "ทั้งหมด",
    worksCta: "ชอบสไตล์ไหน? ส่งแบบมาประเมินฟรีได้เลย",
    worksBtn: "ดูเพิ่มใน Facebook →",
    whyTitle: "ทำไมต้อง Southside",
    why: [
      { n: "100%", t: "ปลอดเชื้อ", d: "เข็มใหม่แกะต่อหน้า ถุงมือ ฆ่าเชื้อมาตรฐานโรงพยาบาล" },
      { n: "ฟรี", t: "ออกแบบ", d: "วาดให้ดู ปรับจนถูกใจ ไม่คิดเงินเพิ่ม" },
      { n: "1ชม.", t: "ตอบไว", d: "ส่งแบบมาประเมินฟรี ตอบไวใน 1 ชม. ไม่สักก็ปรึกษาได้" },
    ],
    stepsTitle: "ขั้นตอน —", stepsEm: "ครั้งแรกก็ไม่เกร็ง",
    steps: [
      { n: "01", t: "ส่งแบบ", d: "ทักเพจ/WhatsApp ส่งรูป บอกตำแหน่ง ขนาด" },
      { n: "02", t: "ออกแบบ & ตีราคา", d: "วาดให้ดู ปรับจนถูกใจ บอกราคาก่อนเริ่ม" },
      { n: "03", t: "สักจริง", d: "เข็มใหม่แกะต่อหน้า มือเบา ไทย/อังกฤษ" },
      { n: "04", t: "ดูแลหลังสัก", d: "สอนล้างแผล ฟิล์ม/ครีม นัดเติมฟรี*" },
    ],
    artistTitle: "ช่างสัก Southside — ดูแลเองทุกเคส",
    artistDesc: "ไทย/อังกฤษ ใส่ใจรายละเอียด ปรับแบบจนถูกใจ ไม่เร่ง ไม่กดดัน สักครั้งแรกก็ไม่เกร็ง · 1,000+ รอยสัก · 5.0★ 43 รีวิว",
    artistBtn: "ดูผลงานช่าง", artistWa: "WhatsApp",
    reviewsTitle: "ลูกค้าพูดถึงเรา",
    faqsTitle: "ถามบ่อย",
    faqs: [
      { q: "เจ็บไหม? สักครั้งแรกต้องเตรียมอะไร", a: "เจ็บแบบแสบๆ ทนได้ ยิ่งเส้นเล็กยิ่งเจ็บน้อย นอนพอ งดแอลกอฮอล์ 24 ชม. กินข้าวมาก่อน" },
      { q: "ราคาเท่าไหร่", a: "Fine line เริ่ม 1,000฿ สี/ดำ เริ่ม 1,500฿ ส่งแบบมาประเมินฟรี บอกราคาก่อนเริ่ม ไม่บวกหน้างาน" },
      { q: "ต้องจองไหม กี่นาที", a: "เล็ก 30–60 นาที กลาง 1–2 ชม. แนะนำจองล่วงหน้า 1 วัน แต่ Walk-in ได้ถึง 20:00" },
      { q: "เข็มสะอาดไหม", a: "เข็มใหม่แกะต่อหน้า ถุงมือ/อุปกรณ์ฆ่าเชื้อมาตรฐานโรงพยาบาล สีนำเข้า ปลอดภัย" },
    ],
    contactTitle: "สาย 2 ซอย 14", contactEm: "ใกล้วอล์กกิ้งสตรีท",
    contactDesc: "พัทยาใต้ อ.บางละมุง ชลบุรี 20150 · เปิดทุกวัน 13:00–22:00 · Walk-in ได้ถึง 20:00",
    contactLines: [
      { code: "โทรหลัก", value: "065-696-4693", href: "tel:0656964693" },
      { code: "สำรอง", value: "083-815-3762", href: "tel:0838153762" },
      { code: "WhatsApp", value: "0656964693", href: "https://wa.me/66656964693" },
      { code: "Facebook", value: "ploytattoopt", href: "https://www.facebook.com/ploytattoopt" },
    ],
    mapBtn: "เปิดใน Google Maps →",
    bookTitle: "พร้อมสักแล้วหรือยัง?", bookDesc: "ส่งแบบมาประเมินฟรี ตอบไวใน 1 ชม.",
    bookBtn: "ส่งแบบประเมินฟรี", callBtn: "โทรเลย",
    footerCopy: "Southside Ink Tattoo Pattaya · EST.2023 · เข็มใหม่ 100%",
    drawerTitle: "ส่งแบบประเมินฟรี", drawerDesc: "แนบรูป + บอกตำแหน่ง/ขนาด ตอบไวใน 1 ชม.",
    drawerFb: "ทัก Facebook เพจ", drawerFbSub: "ploytattoopt · ตอบไวสุด",
    drawerWa: "ทัก WhatsApp", drawerWaSub: "065-696-4693",
    drawerCall: "โทรเลย", drawerCallSub: "065-696-4693 / 083-815-3762",
    mobileCall: "โทร", mobileBook: "จองคิว · ประเมินฟรี",
  },
  en: {
    navWorks: "Works", navServices: "Services", navShop: "Studio", navProcess: "Process", navReviews: "Reviews", navContact: "Location",
    kicker: "Open 13:00–22:00 · Walk-ins welcome · Soi 14, Second Road, near Walking Street · 5.0★ 43 reviews",
    h1a: "The tattoo that", h1b: "really", h1c: "stays.",
    h1sub: "Sharp. Sterile. Transparent pricing.",
    sub: "Southside Ink — Pattaya studio. Fine line / Color / Blackwork / Cover-ups. Fresh needle every time, 100% sterile. Free design until you love it.",
    ctaBook: "Book now — Free quote →", ctaWorks: "View works",
    termTitle: "southside — booking",
    term: `$ southside book --style "fine line" --size 5cm\n✓ fresh needle opened in front of you\n✓ free design until perfect\n✓ fixed price — no hidden fees\n\n> send design to fb.com/ploytattoopt\n> or WhatsApp 065-696-4693 — reply within 1h`,
    proofReviews: "43 reviews", proofTats: "1,000+ tattoos", proofNeedle: "100% sterile",
    stats1: "fresh needle every time", stats2: "free design", stats3: "reply in 1h", stats4: "TH/EN friendly",
    svcTitle: "Services —", svcEm: "transparent pricing", svcDesc: "Free revisions until you love it. No hidden fees. Small from 1,000 THB, color/black from 1,500 THB.",
    services: [
      { tag: "most popular", title: "Fine Line & Minimal", desc: "Ultra-fine 0.3mm, crisp scripts, symbols — great for first tattoo", price: "from 1,000 THB", meta: "30–60 min" },
      { tag: "color", title: "Color", desc: "Vibrant, packed color that lasts. Safe imported inks", price: "from 1,500 THB", meta: "60–120 min" },
      { tag: "blackwork", title: "Blackwork / Tribal", desc: "Bold black, tribal, Maori, large scale", price: "from 1,500 THB", meta: "45–180 min" },
      { tag: "cover up", title: "Cover-up", desc: "Fix or cover old tattoos. Free redesign until perfect", price: "free quote", meta: "free consult" },
      { tag: "japanese", title: "Japanese / Old School", desc: "Koi, dragon, peony — strong lines, smooth shading", price: "from 2,000 THB", meta: "90–240 min" },
      { tag: "aftercare", title: "Aftercare & Piercing", desc: "Waterproof film, cream, detailed healing guide", price: "free", meta: "free touch-up*" },
    ],
    shopTitle: "Studio —", shopEm: "bright, clean, visible from the road",
    shopDesc: "One location in South Pattaya, yellow-blue facade, 3 min walk from Walking Street",
    worksTitle: "Real works —", worksEm: "tap to enlarge", worksDesc: "All photos are real works from our studio — 30 photos, no stock images",
    filterAll: "All",
    worksCta: "Like a style? Send your idea for a free quote",
    worksBtn: "More on Facebook →",
    whyTitle: "Why Southside",
    why: [
      { n: "100%", t: "Sterile", d: "Fresh needle, gloves, hospital-standard sterilization" },
      { n: "Free", t: "Design", d: "Draw & revise until you love it, no extra charge" },
      { n: "1h", t: "Fast reply", d: "Free quote within 1h, no pressure" },
    ],
    stepsTitle: "Process —", stepsEm: "first time? no worries",
    steps: [
      { n: "01", t: "Send idea", d: "Message us reference, placement and size" },
      { n: "02", t: "Design & quote", d: "We draw, revise until perfect, fixed price" },
      { n: "03", t: "Get tattooed", d: "Fresh needle, gentle hand, TH/EN" },
      { n: "04", t: "Aftercare", d: "Wash, film, cream, free touch-up*" },
    ],
    artistTitle: "Southside Artist — every case personally handled",
    artistDesc: "TH/EN, detail-oriented, revise until perfect. No rush, no pressure. First tattoo feels easy. 1,000+ tattoos · 5.0★ 43 reviews",
    artistBtn: "See artist works", artistWa: "WhatsApp",
    reviewsTitle: "What clients say",
    faqsTitle: "FAQ",
    faqs: [
      { q: "Does it hurt? How to prepare for first tattoo?", a: "Mild stinging, fine lines hurt less. Sleep well, no alcohol 24h, eat before." },
      { q: "How much does it cost?", a: "Fine line from 1,000 THB, color/black from 1,500 THB. Free quote, fixed price, no add-ons." },
      { q: "Need booking? How long?", a: "Small 30–60 min, medium 1–2h. Book 1 day ahead, walk-ins until 20:00." },
      { q: "Is it sterile?", a: "Fresh needle opened in front of you, gloves, hospital-standard, safe inks." },
    ],
    contactTitle: "Soi 14, Second Road", contactEm: "near Walking Street",
    contactDesc: "South Pattaya, Bang Lamung, Chonburi 20150 · Open daily 13:00–22:00 · Walk-ins until 20:00",
    contactLines: [
      { code: "Main", value: "065-696-4693", href: "tel:0656964693" },
      { code: "Alt", value: "083-815-3762", href: "tel:0838153762" },
      { code: "WhatsApp", value: "0656964693", href: "https://wa.me/66656964693" },
      { code: "Facebook", value: "ploytattoopt", href: "https://www.facebook.com/ploytattoopt" },
    ],
    mapBtn: "Open in Google Maps →",
    bookTitle: "Ready for your tattoo?", bookDesc: "Send your idea for a free quote — reply within 1h",
    bookBtn: "Send for free quote", callBtn: "Call now",
    footerCopy: "Southside Ink Tattoo Pattaya · EST.2023 · 100% sterile",
    drawerTitle: "Free quote", drawerDesc: "Attach image + placement/size — reply within 1h",
    drawerFb: "Message Facebook", drawerFbSub: "ploytattoopt · fastest",
    drawerWa: "WhatsApp", drawerWaSub: "065-696-4693",
    drawerCall: "Call now", drawerCallSub: "065-696-4693 / 083-815-3762",
    mobileCall: "Call", mobileBook: "Book · Free quote",
  }
}

export default function App() {
  const [lang, setLang] = useState(() => localStorage.getItem('southside-lang') || 'th')
  const [menuOpen, setMenuOpen] = useState(false)
  const [filter, setFilter] = useState(null)
  const [lightbox, setLightbox] = useState(null)
  const [toast, setToast] = useState('')
  const [openFaq, setOpenFaq] = useState(0)
  const [drawer, setDrawer] = useState(false)
  const [reviewIdx, setReviewIdx] = useState(0)

  const L = I18N[lang]
  const TAGS = lang === 'th' ? TAGS_TH : TAGS_EN
  const allLabel = L.filterAll
  const PORTFOLIO = WORKS.map((id, i) => ({
    id,
    src: `${import.meta.env.BASE_URL}images/works/${id}.jpg`,
    tag: TAGS[i % TAGS.length],
    label: lang === 'th' ? `ผลงาน ${String(i+1).padStart(2,'0')}` : `Work ${String(i+1).padStart(2,'0')}`,
  }))
  const curFilter = filter ?? allLabel
  const filtered = PORTFOLIO.filter(p => curFilter === allLabel || p.tag === curFilter)
  const filters = [allLabel, ...TAGS]
  const SHOP_SRC = SHOP.map(id => `${import.meta.env.BASE_URL}images/works/${id}.jpg`)

  useEffect(() => {
    localStorage.setItem('southside-lang', lang)
    document.documentElement.lang = lang
  }, [lang])

  const scrollTo = (id) => {
    setMenuOpen(false); setDrawer(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const copyTel = async (num) => {
    try { await navigator.clipboard.writeText(num); setToast(lang==='th'?`คัดลอก ${num} แล้ว`:`Copied ${num}`); setTimeout(() => setToast(''), 1800) } catch { window.location.href = `tel:${num}` }
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
    const id = setInterval(() => setReviewIdx(v => (v + 1) % 4), 3800)
    return () => clearInterval(id)
  }, [])

  const reviewTexts = lang==='th'
    ? [
        { name: 'Anna M. · UK', text: 'งานเนี๊ยบมาก พี่ช่างใส่ใจมาก สะอาด ปลอดภัย แนะนำดีสุดๆ', date: '2 สัปดาห์ที่แล้ว' },
        { name: 'Mark T. · AU', text: 'Best tattoo in Pattaya! Clean, pro, fair price. Done fine line script perfect.', date: 'เมื่อวาน' },
        { name: 'คุณฟ้า · กทม', text: 'สักครั้งแรกไม่เจ็บอย่างที่คิด ช่างมือเบา อธิบายดูแลละเอียด กลับมาซ้ำแน่นอนค่ะ', date: '3 วันที่แล้ว' },
        { name: 'Lisa K. · DE', text: 'Cover up old tattoo — looks brand new! Design was adjusted 3 times until perfect.', date: '1 สัปดาห์ที่แล้ว' },
      ]
    : [
        { name: 'Anna M. · UK', text: 'Super clean and precise, artist cares a lot, safe and well advised.', date: '2 weeks ago' },
        { name: 'Mark T. · AU', text: 'Best tattoo in Pattaya! Clean, pro, fair price. Done fine line script perfect.', date: 'Yesterday' },
        { name: 'Khun Fah · BKK', text: 'First tattoo, less painful than expected, gentle hand and clear aftercare.', date: '3 days ago' },
        { name: 'Lisa K. · DE', text: 'Cover up old tattoo — looks brand new! Design was adjusted 3 times until perfect.', date: '1 week ago' },
      ]

  return (
    <>
      <header className="oc-nav">
        <div className="oc-nav-inner">
          <a className="oc-logo" href="#top" onClick={(e) => { e.preventDefault(); scrollTo('top') }}>
            <span className="oc-logo-mark">◈</span> Southside Ink <span className="oc-logo-sub">PATTAYA · EST.2023</span>
          </a>
          <nav className={`oc-links ${menuOpen ? 'open' : ''}`}>
            <a href="#works" onClick={(e) => { e.preventDefault(); scrollTo('works') }}>{L.navWorks}</a>
            <a href="#services" onClick={(e) => { e.preventDefault(); scrollTo('services') }}>{L.navServices}</a>
            <a href="#shop" onClick={(e) => { e.preventDefault(); scrollTo('shop') }}>{L.navShop}</a>
            <a href="#process" onClick={(e) => { e.preventDefault(); scrollTo('process') }}>{L.navProcess}</a>
            <a href="#reviews" onClick={(e) => { e.preventDefault(); scrollTo('reviews') }}>{L.navReviews}</a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact') }}>{L.navContact}</a>
          </nav>
          <div className="oc-actions">
            <div className="oc-lang" role="group" aria-label="Language">
              <button className={lang==='th'?'on':''} onClick={() => setLang('th')} aria-pressed={lang==='th'}>TH</button>
              <button className={lang==='en'?'on':''} onClick={() => setLang('en')} aria-pressed={lang==='en'}>EN</button>
            </div>
            <a className="oc-ic" href="https://www.facebook.com/ploytattoopt" target="_blank" rel="noreferrer" aria-label="Facebook">f</a>
            <a className="oc-ic" href="https://wa.me/66656964693" target="_blank" rel="noreferrer" aria-label="WhatsApp">wa</a>
            <button className="oc-menu" aria-label="Menu" onClick={() => setMenuOpen(v => !v)}><span /><span /><span /></button>
          </div>
        </div>
      </header>

      <main id="top" className="oc-main">
        <section className="oc-hero">
          <div className="oc-hero-grid">
            <div>
              <pre className="oc-ascii" aria-hidden>{`  ____   ___  _   _ _____ _   _ ____ ___ ____  _____
 / ___| / _ \\| | | |_   _| | | / ___|_ _|  _ \\| ____|
 \\___ \\| | | | | | | | | | |_| \\___ \\| || | | |  _|
  ___) | |_| | |_| | | | |  _  |___) | || |_| | |___
 |____/ \\___/ \\___/  |_| |_| |_|____/___|____/|_____|
         I N K  ·  P A T T A Y A  ·  EST.2023`}</pre>
              <div className="oc-kicker">{L.kicker}</div>
              <h1 className="oc-h1">
                {L.h1a} <em>{L.h1b}</em> {L.h1c}
                <span>{L.h1sub}</span>
              </h1>
              <p className="oc-sub">{L.sub}</p>
              <div className="oc-cta">
                <button className="btn btn-primary" onClick={() => setDrawer(true)}>{L.ctaBook}</button>
                <a className="btn btn-ghost" href="#works" onClick={(e) => { e.preventDefault(); scrollTo('works') }}>{L.ctaWorks}</a>
              </div>
              <div className="oc-terminal">
                <div className="oc-term-bar"><span className="d r" /><span className="d y" /><span className="d g" /><span className="oc-term-title">{L.termTitle}</span></div>
                <pre>{L.term}</pre>
              </div>
              <div className="oc-proof">
                <span>★★★★★ <b>5.0</b> {L.proofReviews}</span><span>·</span><span>{L.proofTats}</span><span>·</span><span>{L.proofNeedle}</span>
                <span className="oc-proof-actions">
                  <button className="oc-pill yellow" onClick={() => copyTel('0656964693')}>065-696-4693</button>
                  <a className="oc-pill" href="tel:0838153762">083-815-3762</a>
                  <a className="oc-pill blue" href="https://wa.me/66656964693" target="_blank" rel="noreferrer">WhatsApp</a>
                </span>
              </div>
            </div>
            <div className="oc-hero-visual">
              <div className="oc-hero-card">
                <img src={SHOP_SRC[0]} alt="Southside Ink Pattaya shop" />
                <div className="oc-hero-badge">
                  <b>SOUTHSIDE INK PATTAYA</b>
                  <span>EXPERT TATTOOING · EST.2023</span>
                  <span>OPEN DAILY 13:00–22:00 · WALK-IN WELCOME</span>
                </div>
              </div>
              <div className="oc-hero-mini">
                <img src={`${import.meta.env.BASE_URL}images/works/${WORKS[0]}.jpg`} alt="fine line work" />
                <span>Fine line · 0.3mm</span>
              </div>
            </div>
          </div>
        </section>

        <section className="oc-stats">
          <div><code>100%</code><span>{L.stats1}</span></div>
          <div><code>{lang==='th'?'ฟรี':'Free'}</code><span>{L.stats2}</span></div>
          <div><code>1h</code><span>{L.stats3}</span></div>
          <div><code>TH/EN</code><span>{L.stats4}</span></div>
        </section>

        <section id="services" className="oc-section">
          <div className="oc-section-head">
            <h2><span className="oc-num">01</span> {L.svcTitle} <em>{L.svcEm}</em></h2>
            <p>{L.svcDesc}</p>
          </div>
          <div className="oc-svc-list">
            {L.services.map((s, i) => (
              <button key={s.title} className="oc-svc" onClick={() => setDrawer(true)}>
                <div className="oc-svc-img"><img src={`${import.meta.env.BASE_URL}images/works/${WORKS[i%WORKS.length]}.jpg`} alt={s.title} loading="lazy" /></div>
                <span className="oc-svc-tag">{s.tag}</span>
                <span className="oc-svc-title">{s.title}</span>
                <span className="oc-svc-desc">{s.desc}</span>
                <span className="oc-svc-meta">{s.price} · {s.meta}</span>
              </button>
            ))}
          </div>
        </section>

        <section id="shop" className="oc-section alt">
          <div className="oc-section-head">
            <h2><span className="oc-num">02</span> {L.shopTitle} <em>{L.shopEm}</em></h2>
            <p>{L.shopDesc}</p>
          </div>
          <div className="oc-shop-grid">
            {SHOP_SRC.map((src, i) => (
              <div key={src} className={`oc-shop-card ${i===0?'wide':''}`}>
                <img src={src} alt={`shop ${i+1}`} loading="lazy" />
              </div>
            ))}
          </div>
          <div className="oc-why">
            {L.why.map(w => (
              <div key={w.t} className="oc-why-card">
                <code>{w.n}</code>
                <h3>{w.t}</h3>
                <p>{w.d}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="works" className="oc-section">
          <div className="oc-section-head">
            <h2><span className="oc-num">03</span> {L.worksTitle} <em>{L.worksEm}</em></h2>
            <p>{L.worksDesc}</p>
          </div>
          <div className="oc-filters">
            {filters.map(f => (
              <button key={f} className={`oc-chip ${curFilter === f ? 'on' : ''}`} onClick={() => { setFilter(f); setLightbox(null) }}>{f}</button>
            ))}
          </div>
          <div className="oc-grid">
            {filtered.map((it, idx) => (
              <button key={it.id} className={`oc-tile ${idx===0?'tall': idx===7?'wide':''}`} onClick={() => setLightbox(idx)} aria-label={it.label}>
                <img src={it.src} alt={it.label} loading="lazy" />
                <span className="oc-tile-tag">{it.tag}</span>
              </button>
            ))}
          </div>
          <div className="oc-cta-row">
            <span>{L.worksCta}</span>
            <a className="btn btn-primary" href="https://www.facebook.com/ploytattoopt" target="_blank" rel="noreferrer">{L.worksBtn}</a>
          </div>
        </section>

        <section id="process" className="oc-section alt">
          <div className="oc-section-head">
            <h2><span className="oc-num">04</span> {L.stepsTitle} <em>{L.stepsEm}</em></h2>
          </div>
          <div className="oc-steps">
            {L.steps.map(s => (
              <div key={s.n} className="oc-step">
                <code>{s.n}</code>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="reviews" className="oc-section">
          <div className="oc-split">
            <div className="oc-artist">
              <img src={`${import.meta.env.BASE_URL}images/artist.jpg`} alt="Southside Ink artist" />
              <div className="oc-artist-body">
                <h3>{L.artistTitle}</h3>
                <p>{L.artistDesc}</p>
                <div className="oc-artist-actions">
                  <a className="btn btn-primary" href="https://www.facebook.com/ploytattoopt" target="_blank" rel="noreferrer">{L.artistBtn}</a>
                  <a className="btn btn-ghost" href="https://wa.me/66656964693" target="_blank" rel="noreferrer">{L.artistWa}</a>
                </div>
              </div>
            </div>
            <div className="oc-reviews">
              <h3>{L.reviewsTitle}</h3>
              <div className="oc-carousel">
                <div className="oc-track" style={{ transform: `translateX(-${reviewIdx * 100}%)` }}>
                  {reviewTexts.map(r => (
                    <div key={r.name} className="oc-review">
                      <div className="oc-stars">★★★★★</div>
                      <p>“{r.text}”</p>
                      <small>{r.name} · {r.date}</small>
                    </div>
                  ))}
                </div>
              </div>
              <div className="oc-dots">
                {reviewTexts.map((_, i) => <button key={i} className={i === reviewIdx ? 'on' : ''} onClick={() => setReviewIdx(i)} aria-label={`review ${i+1}`} />)}
              </div>
            </div>
          </div>
        </section>

        <section className="oc-section alt">
          <div className="oc-section-head">
            <h2><span className="oc-num">05</span> {L.faqsTitle}</h2>
          </div>
          <div className="oc-faq">
            {L.faqs.map((f, i) => (
              <div key={f.q} className={`oc-faq-item ${openFaq === i ? 'open' : ''}`}>
                <button className="oc-faq-q" onClick={() => setOpenFaq(openFaq === i ? -1 : i)} aria-expanded={openFaq === i}>
                  <span>{f.q}</span><em>{openFaq === i ? '−' : '+'}</em>
                </button>
                <div className="oc-faq-a"><p>{f.a}</p></div>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="oc-section">
          <div className="oc-contact">
            <div>
              <h2>{L.contactTitle}<br /><em>{L.contactEm}</em></h2>
              <p>{L.contactDesc}</p>
              <div className="oc-contact-lines">
                {L.contactLines.map(l => (
                  <a key={l.code} href={l.href} target={l.href.startsWith('http')?'_blank':undefined} rel={l.href.startsWith('http')?'noreferrer':undefined}><code>{l.code}</code> {l.value}</a>
                ))}
              </div>
              <a className="btn btn-primary" href="https://share.google/lUOdKhWmDRqsbYEMv" target="_blank" rel="noreferrer">{L.mapBtn}</a>
            </div>
            <div className="oc-map">
              <iframe title="Southside Ink Map" src="https://www.google.com/maps?q=Southside+Ink+Tattoo+Pattaya+สาย2+ซอย14&z=16&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </div>
          <div className="oc-book">
            <div>
              <h3>{L.bookTitle}</h3>
              <p>{L.bookDesc}</p>
            </div>
            <div className="oc-book-actions">
              <button className="btn btn-primary" onClick={() => setDrawer(true)}>{L.bookBtn}</button>
              <a className="btn btn-ghost" href="tel:0656964693">{L.callBtn}</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="oc-footer">
        <div>© {new Date().getFullYear()} {L.footerCopy}</div>
        <div>น้ำเงิน เหลือง ขาว ดำ · Crafted with care</div>
      </footer>

      <div className={`oc-drawer ${drawer ? 'open' : ''}`} role="dialog" aria-modal="true" aria-label="booking">
        <button className="oc-drawer-bg" aria-label="Close" onClick={() => setDrawer(false)} />
        <div className="oc-drawer-panel">
          <button className="oc-drawer-x" onClick={() => setDrawer(false)} aria-label="Close">×</button>
          <h3>{L.drawerTitle}</h3>
          <p>{L.drawerDesc}</p>
          <a className="oc-choice primary" href="https://www.facebook.com/ploytattoopt" target="_blank" rel="noreferrer"><b>{L.drawerFb}</b><span>{L.drawerFbSub}</span></a>
          <a className="oc-choice blue" href="https://wa.me/66656964693?text=สวัสดีครับ ขอประเมินราคาสักครับ" target="_blank" rel="noreferrer"><b>{L.drawerWa}</b><span>{L.drawerWaSub}</span></a>
          <a className="oc-choice" href="tel:0656964693"><b>{L.drawerCall}</b><span>{L.drawerCallSub}</span></a>
        </div>
      </div>

      {lightbox !== null && (
        <div className="oc-lightbox" role="dialog" aria-modal="true" aria-label="works">
          <button className="oc-lb-bg" onClick={() => setLightbox(null)} aria-label="Close" />
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
        <a href="tel:0656964693" className="oc-mbtn ghost">{L.mobileCall}</a>
        <button className="oc-mbtn primary" onClick={() => setDrawer(true)}>{L.mobileBook}</button>
        <a href="https://wa.me/66656964693" target="_blank" rel="noreferrer" className="oc-mbtn blue">WhatsApp</a>
      </div>

      {toast && <div className="oc-toast">{toast}</div>}
    </>
  )
}
