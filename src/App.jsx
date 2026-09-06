import { useState, useEffect, useRef } from 'react'

const WORKS = [
  "1juqLfCJ8rMus2TWOjrvMi5-ScWqTFQ2i","1Y_UHXZKVVa-BeNGie6VZ1bZDsTKvaaEP","1AakBm6zRlxdU18-O0OZMsZBtXJec4cjy","1CJcz60zMz2FAsiTp8peXexBvckRR2Sje","1mvqnMOsuKOkkez-v_LwRXjESalyyQM6u","1wez5GHlEmSGPSGOFSGKv7TjZb33w2ay6","1JE7RvJS9z4mJnac6FTv7IbzNKl0xMgtT","18Sxx5C7vxdBdD1Vx2M7rB-dVeSmdf4wT","1UqICiJMIogflvg49LlN0aY5XIls7-9-u","1wRKLneJwNOqA6cMw-YgmfrQDJ2wod9oU","1p2t7M8TjgttoPjFLLZJQddmntVv127fK","1s3_oTYl2dsWPa-L6-04U3Ujq-B0e7LPW","1lj9O7B5YVODclQbytPDYdsDdWEx6FhbY","12b6gAAIKsFg8fYAqhGjlaTotcCO5P-LW","1mRemjlWbFPKVmoHxE8l2-ILXNiTpQEN6","1bZ_tiEF_w5g2CpCYvBFSQmJ7InH64zFi","1d55chDA5fq2GiW-OVFcik_Fb7uZFd_3u","1RGABkEBV_NKAzrhmSoILBIb0ntfMC4ka","1MmTWMflnMW1UBas_QM0MTffrBEle_YkD","1wabeadflb2uqkl6vCmUe00_yxcDdYMcN","1hwQi9k3-vuqcZp_BR0qasYe48ohPDSKY","12mQYgLHfDgodOQ49HncpDDU2UmfzE7Io","1eO87gXAGeA8phrPA_BGElyeyFxztsD3C","1L03vX6Gtgn4btn21SGZmbhFYj7doDoU6","1ABhsZCWhnAzmQk1Tc1HURcAJ67fvxyJb","1cl-hCX2gP8I9J31-Vxb8ZMoZOUgvJY7N","1KrAzbfZqZnnePKlZ-xRRty__wqg1Luxv","1jZ0ux5JtJYCeJpj7IZZufJ2B1Z6VrJ2W","1GUYMDjO5cKVRrWQiRF4cx79_4TTQxav8","1bf22cCZ8nkOQj4DTKkWehOqVqmDGwqZ6",
]
const SHOP = ["1uZSA_1RswqRn_pAMW9wQx62ORcIEG1_Y","1WyQ_jfm05gZY_ihhjDCIWuUS7LL65524","1uRIBZHtOpJrfdMMmUJQyo6WeBehyxj9b","1QsuQgVxlhEjVYXTBZJGdULz_bf4M9cot"]

const STYLES = ["Realism","Traditional","Japanese","Mandala","Neo-Traditional","Portrait","Abstract","Black Work","Colour","Cover Ups","Floral","Mythology Realistic","Sak Yank"]

const WORK_STYLES = [
  ["Mythology Realistic","Realism"],
  ["Japanese","Colour"],
  ["Realism"],
  ["Sak Yank"],
  ["Sak Yank"],
  ["Realism","Floral"],
  ["Realism","Mythology Realistic"],
  ["Traditional","Colour"],
  ["Realism"],
  ["Mythology Realistic"],
  ["Realism"],
  ["Neo-Traditional","Colour"],
  ["Floral"],
  ["Realism","Mythology Realistic"],
  ["Mythology Realistic"],
  ["Realism","Portrait"],
  ["Realism","Mythology Realistic"],
  ["Portrait","Japanese","Colour"],
  ["Floral","Black Work"],
  ["Realism"],
  ["Realism","Floral"],
  ["Realism","Colour"],
  ["Realism"],
  ["Realism"],
  ["Mandala","Realism"],
  ["Mythology Realistic"],
  ["Black Work","Realism"],
  ["Abstract"],
  ["Realism","Portrait"],
  ["Japanese","Black Work"],
]

const STYLE_ALIAS = {
  "Fine Line & Minimal": "Floral",
  "Blackwork": "Black Work",
  "Japanese": "Japanese",
  "Realism": "Realism",
  "Custom Design": null,
  "Realistic": "Realism",
  "Black & Grey": "Realism",
  "Portrait": "Portrait",
  "Ancient Warrior": "Mythology Realistic",
}

const CONTACT = {
  phone: "065-696-4693", phoneHref: "tel:0656964693",
  phone2: "083-815-3762", phone2Href: "tel:0838153762",
  lineId: "Ponair1", lineUrl: "https://line.me/ti/p/VzL1rgJr-E",
  waUrl: "https://wa.me/66656964693",
  fbId: "ploytattoopt", fbUrl: "https://www.facebook.com/ploytattoopt",
  igId: "southside.ink.pattaya", igUrl: "https://www.instagram.com/southside.ink.pattaya/",
  mapUrl: "https://maps.app.goo.gl/5ewABJZuthpYTu2v8",
  reviewsUrl: "https://www.google.com/maps?cid=17392138095371947966",
  mapEmbed: "https://maps.google.com/maps?q=12.926258,100.8751928+(Southside+Ink+Tattoo+Pattaya)&z=17&hl=th&output=embed",
}

const I18N = {
  th: {
    nav: ["เกี่ยวกับเรา","สไตล์","ช่างสัก","ที่ตั้ง","ติดต่อ"],
    heroKicker: "เปิดทุกวัน 13:00–24:00 · รับ Walk-in · 5.0★ 47 รีวิว",
    heroH1a: "ร้านสักพัทยา", heroH1b: "ห่างจาก Walking Street เพียงไม่กี่นาที",
    heroSub: "รับออกแบบและสักลายตามความต้องการของลูกค้า ครบทุกสไตล์ ช่างสักประสบการณ์มากกว่า 10 ปี สตูดิโอสะอาด ปลอดภัย",
    ctaBook: "ปรึกษา / จองคิว", ctaWorks: "ดูผลงาน",
    aboutTitle: "เกี่ยวกับเรา",
    aboutLead1: "กำลังมองหาร้านสักในพัทยาอยู่ไหม?",
    aboutLead2: "ร้านเราอยู่ห่างจาก Walking Street เพียงไม่กี่นาที!",
    aboutIntro: "เรารับออกแบบและสักลายตามความต้องการของลูกค้า ครบทุกสไตล์ ไม่ว่าจะเป็น",
    aboutStyles: ["Fine Line & Minimal","Blackwork","Japanese","Realism","Custom Design"],
    aboutPoints: [
      "ช่างสักประจำร้าน ประสบการณ์มากกว่า 10 ปี",
      "ผ่านการทำงานกับร้านสักชั้นนำมากกว่า 10 ร้านในพัทยา",
      "สตูดิโอสะอาด ปลอดภัย และใส่ใจเรื่องสุขอนามัย",
      "รับประกันคุณภาพผลงาน",
      "ปรึกษาและออกแบบเบื้องต้นฟรี",
      "รับ Walk-in",
    ],
    aboutClose1: "ไม่ว่าคุณจะกำลังหาสักครั้งแรก หรือกำลังมองหาผลงานชิ้นต่อไป",
    aboutClose2: "เราพร้อมสร้างรอยสักที่เป็นเอกลักษณ์และน่าจดจำสำหรับคุณ",
    aboutCta: "สนใจสอบถามรายละเอียดหรือจองคิว ทักข้อความหาเราได้เลยค่ะ",
    styleTitle: "สไตล์",
    styleSub: "สไตล์งานสัก",
    styleDesc: "รับสักทุกสไตล์ แตะชื่อสไตล์เพื่อดูผลงาน หรือส่งแบบที่ชอบมาปรึกษาได้เลย",
    styleAll: "ทั้งหมด",
    worksTitle: "ผลงานจริงจากร้าน",
    worksDesc: "แตะรูปเพื่อขยาย",
    worksBtn: "ดูผลงานเพิ่มใน Facebook",
    artistTitle: "ช่างสัก",
    artistName: "ช่างพลอย (Artist Ploy)",
    artistRole: "ช่างสักประจำร้าน Southside Ink Pattaya",
    artistDesc: "ช่างพลอยถนัดงาน Realistic แนว Black and Grey เก็บรายละเอียดสูง ทั้งภาพเหมือนบุคคลและลายนักรบโบราณตามแบบที่ลูกค้าต้องการ ใส่ใจทุกรายละเอียด มาสร้างผลงานชิ้นเอกของคุณกับเราได้เลย",
    artistTags: ["Realistic","Black & Grey","Portrait","Ancient Warrior"],
    artistBtn: "ดูผลงานช่างใน Facebook",
    reviewsTitle: "ลูกค้าพูดถึงเรา", reviewsLink: "ดูรีวิวทั้งหมดใน Google (5.0★ 47 รีวิว)", translated: "แปลจากภาษาอังกฤษ",
    locTitle: "ที่ตั้งร้าน",
    locName: "Southside Ink Pattaya",
    locAddr: ["133/9 หมู่ 10 เมืองพัทยา","อำเภอบางละมุง จังหวัดชลบุรี 20150","ใกล้ Walking Street พัทยา"],
    locHoursLabel: "เวลาเปิด–ปิด",
    locHours: "ทุกวัน 13:00–24:00",
    locWalk: "รับ Walk-in",
    mapBtn: "เปิดใน Google Maps",
    contactTitle: "ติดต่อ",
    contactDesc: "สอบถามรายละเอียดหรือจองคิว ทักข้อความหาเราได้เลย",
    contactLines: [
      { code: "โทร", value: CONTACT.phone, href: CONTACT.phoneHref },
      { code: "โทรสำรอง", value: CONTACT.phone2, href: CONTACT.phone2Href },
      { code: "LINE", value: CONTACT.lineId, href: CONTACT.lineUrl },
      { code: "WhatsApp", value: CONTACT.phone, href: CONTACT.waUrl },
      { code: "Facebook", value: "Southside Ink Pattaya", href: CONTACT.fbUrl },
      { code: "Instagram", value: `@${CONTACT.igId}`, href: CONTACT.igUrl },
    ],
    qrText: "สแกน QR เพื่อแอด LINE",
    footerCopy: "Southside Ink Tattoo Pattaya · EST.2023",
    drawerTitle: "ปรึกษา / จองคิว", drawerDesc: "แนบรูปแบบที่ชอบ บอกตำแหน่งและขนาด แล้วทักมาได้เลย",
    drawerFb: "ทัก Facebook เพจ", drawerFbSub: "Southside Ink Pattaya",
    drawerLine: "แอด LINE", drawerLineSub: `${CONTACT.lineId} · สแกน QR`,
    drawerWa: "ทัก WhatsApp", drawerWaSub: CONTACT.phone,
    drawerCall: "โทรเลย", drawerCallSub: `${CONTACT.phone} / ${CONTACT.phone2}`,
    fabLabel: "ติดต่อ", fabBook: "จองคิว", fabBookSub: "ปรึกษาฟรี", fabCall: "โทร",
    copied: "คัดลอกแล้ว", copyBtn: "คัดลอกเบอร์",
    openNow: "เปิดอยู่ตอนนี้ · ถึงเที่ยงคืน", opensAt: "วันนี้เปิด 13:00",
    visitTitle: "แวะมาที่ร้านได้เลย ไม่ต้องจองล่วงหน้า",
    visitDesc: "133/9 หมู่ 10 เมืองพัทยา เดินจาก Walking Street ไม่กี่นาที มองหาป้ายเหลือง TATTOO หน้าร้าน หรือทักมาก่อนก็ได้",
  },
  en: {
    nav: ["About us","Style","Artist","Locations","Contact"],
    heroKicker: "Open daily 13:00–24:00 · Walk-ins welcome · 5.0★ 47 reviews",
    heroH1a: "Tattoo Studio in Pattaya", heroH1b: "Just a few minutes from Walking Street.",
    heroSub: "We create custom tattoos tailored to your ideas and preferences, offering a wide range of tattoo styles. Our tattoo artists have over 10 years of experience, and our studio is clean, safe, and hygienic.",
    ctaBook: "Get a Quote", ctaWorks: "View works",
    aboutTitle: "About us",
    aboutLead1: "Looking for a tattoo in Pattaya?",
    aboutLead2: "You're just minutes away from Walking Street.",
    aboutIntro: "We create custom tattoos in every style, from Fine Line and Minimal to Blackwork, Japanese, Realism, and completely custom designs.",
    aboutStyles: ["Fine Line & Minimal","Blackwork","Japanese","Realism","Custom Design"],
    aboutPoints: [
      "Tattoo artists with 10+ years of experience",
      "Experience working at 10+ established tattoo studios in Pattaya",
      "Clean, hygienic and professional studio",
      "Quality guaranteed",
      "Free consultation & design discussion",
      "Walk-ins welcome",
    ],
    aboutClose1: "Whether it's your first tattoo or your next masterpiece,",
    aboutClose2: "we're here to create a unique piece that you'll be proud to wear.",
    aboutCta: "Your idea. Your style. Your tattoo. Message us for a consultation or to book your appointment.",
    styleTitle: "Style",
    styleSub: "Tattoo Styles",
    styleDesc: "Every style welcome. Tap a style to see our work, or send us a reference and let's talk.",
    styleAll: "All",
    worksTitle: "Real works from our studio",
    worksDesc: "Tap to enlarge",
    worksBtn: "More works on Facebook",
    artistTitle: "Artist",
    artistName: "Artist Ploy",
    artistRole: "Resident artist, Southside Ink Pattaya",
    artistDesc: "Artist Ploy of Southside Ink Tattoo Pattaya demonstrates the highest level of expertise. With a specialization in realistic, hyper-detailed black and grey work, including custom portraits and ancient warrior designs, Ploy's skill and attention to detail are exceptional. Come and get your custom masterpiece.",
    artistTags: ["Realistic","Black & Grey","Portrait","Ancient Warrior"],
    artistBtn: "See artist works on Facebook",
    reviewsTitle: "What clients say", reviewsLink: "See all reviews on Google (5.0★ 47 reviews)", translated: "translated from Thai",
    locTitle: "Locations",
    locName: "Southside Ink Pattaya",
    locAddr: ["133/9 M.10 Muang Pattaya","Bang Lamung, Chonburi 20150","Near Walking Street, Pattaya"],
    locHoursLabel: "Opening hours",
    locHours: "Daily 13:00–24:00",
    locWalk: "Walk-ins welcome",
    mapBtn: "Open in Google Maps",
    contactTitle: "Contact",
    contactDesc: "Message us for a consultation or to book your appointment",
    contactLines: [
      { code: "Call", value: CONTACT.phone, href: CONTACT.phoneHref },
      { code: "Alt", value: CONTACT.phone2, href: CONTACT.phone2Href },
      { code: "LINE", value: CONTACT.lineId, href: CONTACT.lineUrl },
      { code: "WhatsApp", value: CONTACT.phone, href: CONTACT.waUrl },
      { code: "Facebook", value: "Southside Ink Pattaya", href: CONTACT.fbUrl },
      { code: "Instagram", value: `@${CONTACT.igId}`, href: CONTACT.igUrl },
    ],
    qrText: "Scan QR to add LINE",
    footerCopy: "Southside Ink Tattoo Pattaya · EST.2023",
    drawerTitle: "Get a Quote", drawerDesc: "Attach a reference, tell us placement and size, and message us",
    drawerFb: "Message on Facebook", drawerFbSub: "Southside Ink Pattaya",
    drawerLine: "Add LINE", drawerLineSub: `${CONTACT.lineId} · scan QR`,
    drawerWa: "WhatsApp", drawerWaSub: CONTACT.phone,
    drawerCall: "Call now", drawerCallSub: `${CONTACT.phone} / ${CONTACT.phone2}`,
    fabLabel: "CONTACT", fabBook: "Book", fabBookSub: "Free consult", fabCall: "Call",
    copied: "Copied", copyBtn: "Copy number",
    openNow: "Open now · until midnight", opensAt: "Opens today at 13:00",
    visitTitle: "Walk in anytime, no booking needed",
    visitDesc: "133/9 M.10 Muang Pattaya, a few minutes on foot from Walking Street. Look for the yellow TATTOO sign, or message us first.",
  },
}

const SECTION_IDS = ["about","style","artist","locations","contact"]

function IconCheck() {
  return <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>
}
function IconLine() {
  return <svg viewBox="0 0 24 24" width="18" height="18" fill="white" aria-hidden="true"><path d="M19.5 12c0-3.3-3.1-6-6.9-6S5.7 8.7 5.7 12c0 1.8.8 3.4 2.1 4.5l-.3 1.5 1.6-.9c.8.3 1.7.5 2.5.5 3.8 0 6.9-2.7 6.9-6z"/></svg>
}
function IconFb() {
  return <svg viewBox="0 0 24 24" width="18" height="18" fill="white" aria-hidden="true"><path d="M14 8h2.5l-.5-3H14c-1.7 0-3 1.3-3 3v2H9v3h2v5h3v-5h2.2l.3-3H14V9c0-.6.4-1 1-1z"/></svg>
}
function IconWa() {
  return <svg viewBox="0 0 24 24" width="18" height="18" fill="white" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15l-1.1 3.9 4-1A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-2.4.6.6-2.3-.2-.3A8 8 0 1 1 12 20zm4.3-5.9c-.2-.1-1.3-.6-1.5-.7-.2 0-.4 0-.5.2l-.7.8c-.2.2-.4.2-.6.1-.2-.1-.9-.3-1.7-1-.6-.5-1-1.2-1.2-1.4 0-.2 0-.4.1-.5l.6-.7c.1-.1.1-.2 0-.4l-.6-1.5c-.2-.4-.3-.4-.5-.4h-.4c-.2 0-.4.1-.6.3-.2.2-.7.7-.7 1.7s.7 2 1 2.3c.2.2 1.3 2 3.1 2.8l1.3.5c.3.1.5.1.7 0 .2-.1.9-.4 1-.7.1-.3.1-.6 0-.7 0 0-.1 0-.3 0z"/></svg>
}
function IconIg() {
  return <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="1" fill="white" stroke="none"/></svg>
}
function IconPhone() {
  return <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>
}
function IconPin() {
  return <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 21s7-6.5 7-11.5a7 7 0 1 0-14 0C5 14.5 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>
}
function IconClock() {
  return <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
}

const REVIEWS = [
  { name: 'Hatari Nangngam', lang: 'en',
    text: 'Looking for the best tattoo shop in Pattaya? Look no further! The studio is exceptionally clean, hygienic, and follows strict safety standards. The artists are incredibly talented, speak great English, and make you feel completely at ease. They also offer fair prices with no hidden tourist traps. Highly recommend!',
    th: 'กำลังมองหาร้านสักที่ดีที่สุดในพัทยาอยู่ใช่ไหม ไม่ต้องมองหาที่ไหนอีกแล้ว สตูดิโอสะอาดถูกสุขอนามัย ปฏิบัติตามมาตรฐานความปลอดภัยอย่างเคร่งครัด ช่างสักฝีมือดี พูดภาษาอังกฤษได้ดี ทำให้รู้สึกสบายใจ ราคาเป็นธรรม ไม่มีกลโกงนักท่องเที่ยว แนะนำเลย' },
  { name: 'Tanaphat Satchanon', lang: 'th',
    text: 'บริการดีครับ ช่างเป็นกันเองมากๆ งานถือว่าออกมาได้ดีน่าพอใจ',
    en: 'Great service. The artist is very friendly and the work came out really well.' },
  { name: 'Poonchida Poonpawas', lang: 'th',
    text: 'ร้านบริการดีมากค่ะ ช่างสักมือเบามาก แนะนำร้านนี้ค่ะ',
    en: 'Excellent service. The artist has a very gentle hand. I recommend this shop.' },
  { name: 'Kran2539 Tt', lang: 'th',
    text: 'ใครสนใจรอยสัก เข้าไปสอบถามกับช่างที่ร้านได้เลยครับ ช่างแนะนำดีมาก เป็นกันเองด้วย',
    en: 'If you are interested in a tattoo, just walk in and talk to the artist. Great advice and very friendly.' },
  { name: 'GlorFinNum', lang: 'th',
    text: 'งานสักสวยสุดๆ ไม่เจ็บมากด้วย',
    en: 'The tattoo turned out beautifully, and it did not hurt much.' },
]

export default function App() {
  const [lang, setLang] = useState(() => {
    try {
      const saved = localStorage.getItem('southside-lang')
      if (saved === 'th' || saved === 'en') return saved
    } catch { /* storage blocked */ }
    const nav = (navigator.language || '').toLowerCase()
    return nav.startsWith('th') ? 'th' : 'en'
  })
  const [menuOpen, setMenuOpen] = useState(false)
  const [lightbox, setLightbox] = useState(null)
  const [toast, setToast] = useState('')
  const [drawer, setDrawer] = useState(false)
  const [reviewIdx, setReviewIdx] = useState(0)
  const [fabOpen, setFabOpen] = useState(false)
  const [style, setStyle] = useState(null)

  const L = I18N[lang]
  const base = import.meta.env.BASE_URL
  const ALL = WORKS.map((id, i) => ({ id, src: `${base}images/works/${id}.jpg`, thumb: `${base}images/works/thumb/${id}.jpg`, thumbWebp: `${base}images/works/thumb/${id}.webp`, alt: `Southside Ink Pattaya tattoo work ${i + 1}`, styles: WORK_STYLES[i] || [] }))
  const STYLE_LIST = STYLES.filter(s => ALL.some(w => w.styles.includes(s)))
  const PORTFOLIO = style ? ALL.filter(w => w.styles.includes(style)) : ALL
  const pickStyle = (s) => {
    setStyle(s && STYLE_LIST.includes(s) ? s : null)
    setLightbox(null)
  }
  const jumpToStyle = (label) => {
    const target = STYLE_ALIAS[label]
    pickStyle(target === undefined ? label : target)
    scrollTo('style')
  }
  const SHOP_THUMB = SHOP.map(id => `${base}images/works/thumb/${id}.jpg`)
  const SHOP_THUMB_WEBP = SHOP.map(id => `${base}images/works/thumb/${id}.webp`)
  const bkkHour = (() => {
    try { return Number(new Intl.DateTimeFormat('en-GB', { hour: 'numeric', hour12: false, timeZone: 'Asia/Bangkok' }).format(new Date())) } catch { return new Date().getHours() }
  })()
  const openNow = bkkHour >= 13
  const reviews = REVIEWS.map(r => {
    const translated = r.lang !== lang
    const text = translated ? (lang === 'th' ? r.th : r.en) : r.text
    return { name: r.name, text, translated }
  })

  useEffect(() => {
    try { localStorage.setItem('southside-lang', lang) } catch { /* storage blocked */ }
    document.documentElement.lang = lang
  }, [lang])
  useEffect(() => {
    if (!drawer && !fabOpen && !menuOpen) return
    const onKey = (e) => { if (e.key === 'Escape') { setDrawer(false); setFabOpen(false); setMenuOpen(false) } }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [drawer, fabOpen, menuOpen])
  useEffect(() => {
    if (!drawer) return
    const x = document.querySelector('.oc-drawer-x')
    if (x) x.focus()
  }, [drawer])
  const swipe = useRef(null)
  const onTouchStart = (e) => { swipe.current = e.touches[0].clientX }
  const onTouchEnd = (e) => {
    if (swipe.current === null) return
    const dx = e.changedTouches[0].clientX - swipe.current
    swipe.current = null
    if (Math.abs(dx) < 40) return
    setLightbox(v => dx < 0 ? (v + 1) % PORTFOLIO.length : (v - 1 + PORTFOLIO.length) % PORTFOLIO.length)
  }

  const scrollTo = (id) => {
    setMenuOpen(false); setDrawer(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const copyTel = async (num) => {
    try { await navigator.clipboard.writeText(num); setToast(`${L.copied} ${num}`); setTimeout(() => setToast(''), 1800) } catch { window.location.href = `tel:${num}` }
  }
  useEffect(() => {
    if (lightbox === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(null)
      if (e.key === 'ArrowRight') setLightbox(v => (v + 1) % PORTFOLIO.length)
      if (e.key === 'ArrowLeft') setLightbox(v => (v - 1 + PORTFOLIO.length) % PORTFOLIO.length)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [lightbox, PORTFOLIO.length])
  const [reviewPaused, setReviewPaused] = useState(false)
  useEffect(() => {
    if (reviewPaused) return
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setReviewIdx(v => (v + 1) % reviews.length), 5000)
    return () => clearInterval(id)
  }, [reviews.length, reviewPaused])

  const navLink = (id, i) => (
    <a key={id} href={`#${id}`} onClick={(e) => { e.preventDefault(); scrollTo(id) }}>{L.nav[i]}</a>
  )

  return (
    <>
      <header className="oc-nav">
        <div className="oc-nav-inner">
          <a className="oc-logo" href="#top" onClick={(e) => { e.preventDefault(); scrollTo('top') }}>
            <img src={`${base}logo-nav.png`} alt="Southside Ink Pattaya" className="oc-logo-img" width="44" height="39" loading="eager" decoding="async" />
            <span className="oc-logo-text">Southside Ink <span className="oc-logo-sub">PATTAYA</span></span>
          </a>
          <nav className={`oc-links ${menuOpen ? 'open' : ''}`}>
            {SECTION_IDS.map(navLink)}
          </nav>
          <div className="oc-actions">
            <div className="oc-lang" role="group" aria-label="Language">
              <button className={lang==='th'?'on':''} onClick={() => setLang('th')} aria-pressed={lang==='th'}>TH</button>
              <button className={lang==='en'?'on':''} onClick={() => setLang('en')} aria-pressed={lang==='en'}>EN</button>
            </div>
            <a className="oc-ic line" href={CONTACT.lineUrl} target="_blank" rel="noreferrer" aria-label="LINE"><IconLine /></a>
            <a className="oc-ic fb" href={CONTACT.fbUrl} target="_blank" rel="noreferrer" aria-label="Facebook"><IconFb /></a>
            <a className="oc-ic ig" href={CONTACT.igUrl} target="_blank" rel="noreferrer" aria-label="Instagram"><IconIg /></a>
            <a className="oc-ic wa" href={CONTACT.waUrl} target="_blank" rel="noreferrer" aria-label="WhatsApp"><IconWa /></a>
            <button className="oc-menu" aria-label="Menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(v => !v)}><span /><span /><span /></button>
          </div>
        </div>
      </header>

      <main id="top" className="oc-main">
        <section className="oc-hero">
          <picture>
            <source type="image/webp" srcSet={`${base}images/hero/shop-800.webp 800w, ${base}images/hero/shop-1200.webp 1200w, ${base}images/hero/shop-1600.webp 1600w`} sizes="(max-width: 768px) 100vw, 1140px" />
            <img className="oc-hero-img" src={`${base}images/hero/shop-1200.jpg`} srcSet={`${base}images/hero/shop-800.jpg 800w, ${base}images/hero/shop-1200.jpg 1200w, ${base}images/hero/shop-1600.jpg 1600w`} sizes="(max-width: 768px) 100vw, 1140px" alt="" aria-hidden="true" fetchPriority="high" decoding="async" />
          </picture>
          <div className="oc-hero-shade" aria-hidden="true" />
          <div className="oc-hero-inner">
            <div className="oc-kicker">{L.heroKicker}</div>
            <h1 className="oc-h1">{L.heroH1a}<span>{L.heroH1b}</span></h1>
            <p className="oc-sub">{L.heroSub}</p>
            <div className="oc-cta">
              <button className="btn btn-primary" onClick={() => setDrawer(true)}>{L.ctaBook}</button>
              <a className="btn btn-ghost" href="#style" onClick={(e) => { e.preventDefault(); scrollTo('style') }}>{L.ctaWorks}</a>
            </div>
            <div className="oc-hero-contact">
              <a href={CONTACT.phoneHref}><IconPhone /> {CONTACT.phone}</a>
              <a href={CONTACT.lineUrl} target="_blank" rel="noreferrer">LINE {CONTACT.lineId}</a>
              <a href={CONTACT.waUrl} target="_blank" rel="noreferrer">WhatsApp</a>
            </div>
          </div>
        </section>

        <section id="about" className="oc-section">
          <div className="oc-section-head">
            <h2><span className="oc-num">01</span> {L.aboutTitle}</h2>
          </div>
          <div className="oc-about">
            <div className="oc-about-text">
              <p className="oc-about-lead">{L.aboutLead1}<br />{L.aboutLead2}</p>
              <p className="oc-about-name"><IconPin /> Southside Ink Pattaya</p>
              <p>{L.aboutIntro}</p>
              <ul className="oc-about-styles">
                {L.aboutStyles.map(s => <li key={s}><button type="button" onClick={() => jumpToStyle(s)}>{s}</button></li>)}
              </ul>
              <ul className="oc-checklist">
                {L.aboutPoints.map(p => <li key={p}><IconCheck />{p}</li>)}
              </ul>
              <p className="oc-about-close">{L.aboutClose1}<br />{L.aboutClose2}</p>
              <p className="oc-about-cta">{L.aboutCta}</p>
              <button className="btn btn-primary" onClick={() => setDrawer(true)}>{L.ctaBook}</button>
            </div>
            <div className="oc-about-photos">
              <picture>
                <source type="image/webp" srcSet={SHOP_THUMB_WEBP[1]} />
                <img src={SHOP_THUMB[1]} alt="Southside Ink Pattaya studio" loading="lazy" decoding="async" />
              </picture>
              <picture>
                <source type="image/webp" srcSet={ALL[1].thumbWebp} />
                <img src={ALL[1].thumb} alt={ALL[1].alt} loading="lazy" decoding="async" />
              </picture>
            </div>
          </div>
        </section>

        <section id="style" className="oc-section alt">
          <div className="oc-section-head">
            <h2><span className="oc-num">02</span> {L.styleTitle}</h2>
            <p>{L.styleSub} · {L.styleDesc}</p>
          </div>
          <div className="oc-styles" role="group" aria-label="Tattoo styles">
            <button type="button" className={style ? '' : 'on'} aria-pressed={!style} onClick={() => pickStyle(null)}>{L.styleAll}</button>
            {STYLE_LIST.map(s => (
              <button key={s} type="button" className={style === s ? 'on' : ''} aria-pressed={style === s} onClick={() => pickStyle(style === s ? null : s)}>{s}</button>
            ))}
          </div>
          <h3 className="oc-works-title">{style || L.worksTitle} <small>{PORTFOLIO.length}/{ALL.length} · {L.worksDesc}</small></h3>
          <div className="oc-grid">
            {PORTFOLIO.map((it, idx) => (
              <button key={it.id} className={`oc-tile ${idx===0?'tall': idx===7?'wide':''}`} onClick={() => setLightbox(idx)} aria-label={`${L.worksDesc} ${idx + 1}`}>
                <picture>
                  <source type="image/webp" srcSet={it.thumbWebp} />
                  <img src={it.thumb} alt={it.alt} loading="lazy" decoding="async" width="720" height="720" />
                </picture>
              </button>
            ))}
          </div>
          <div className="oc-cta-row">
            <a className="btn btn-primary" href={CONTACT.fbUrl} target="_blank" rel="noreferrer">{L.worksBtn}</a>
          </div>
        </section>

        <section id="artist" className="oc-section">
          <div className="oc-section-head">
            <h2><span className="oc-num">03</span> {L.artistTitle}</h2>
          </div>
          <div className="oc-artist">
            <img src={`${base}images/artist.jpg`} alt="Artist Ploy, Southside Ink Pattaya" loading="lazy" />
            <div className="oc-artist-body">
              <h3>{L.artistName}</h3>
              <span className="oc-artist-role">{L.artistRole}</span>
              <p>{L.artistDesc}</p>
              <ul className="oc-artist-tags">
                {L.artistTags.map(t => <li key={t}><button type="button" onClick={() => jumpToStyle(t)}>{t}</button></li>)}
              </ul>
              <div className="oc-artist-actions">
                <a className="btn btn-primary" href={CONTACT.fbUrl} target="_blank" rel="noreferrer">{L.artistBtn}</a>
                <a className="btn btn-ghost" href={CONTACT.igUrl} target="_blank" rel="noreferrer">Instagram</a>
              </div>
            </div>
          </div>
          <div className="oc-reviews">
            <h3>{L.reviewsTitle}</h3>
            <div className="oc-carousel" onMouseEnter={() => setReviewPaused(true)} onMouseLeave={() => setReviewPaused(false)} onTouchStart={() => setReviewPaused(true)}>
              <div className="oc-track" style={{ transform: `translateX(-${reviewIdx * 100}%)` }}>
                {reviews.map(r => (
                  <div key={r.name} className="oc-review">
                    <div className="oc-stars" aria-label="5 stars">★★★★★</div>
                    <p>“{r.text}”</p>
                    <small>{r.name} · Google{r.translated ? ` · ${L.translated}` : ''}</small>
                  </div>
                ))}
              </div>
            </div>
            <div className="oc-dots">
              {reviews.map((_, i) => <button key={i} className={i === reviewIdx ? 'on' : ''} onClick={() => setReviewIdx(i)} aria-label={`review ${i+1}`} />)}
            </div>
            <a className="oc-reviews-link" href={CONTACT.reviewsUrl} target="_blank" rel="noreferrer">{L.reviewsLink}</a>
          </div>
        </section>

        <section id="locations" className="oc-section alt">
          <div className="oc-section-head">
            <h2><span className="oc-num">04</span> {L.locTitle}</h2>
          </div>
          <div className="oc-loc">
            <div className="oc-loc-info">
              <h3>{L.locName}</h3>
              <p className="oc-loc-addr"><IconPin /><span>{L.locAddr.map(a => <span key={a}>{a}<br /></span>)}</span></p>
              <p className="oc-loc-hours"><IconClock /><span><b>{L.locHoursLabel}</b><br />{L.locHours} · {L.locWalk}</span></p>
              <a className="btn btn-primary" href={CONTACT.mapUrl} target="_blank" rel="noreferrer">{L.mapBtn}</a>
              <div className="oc-shop-grid">
                {SHOP_THUMB.map((src, i) => (
                  <picture key={src}>
                    <source type="image/webp" srcSet={SHOP_THUMB_WEBP[i]} />
                    <img src={src} alt={`Southside Ink Pattaya studio ${i + 1}`} loading="lazy" decoding="async" />
                  </picture>
                ))}
              </div>
            </div>
            <div className="oc-map">
              <iframe title="Southside Ink Pattaya map" src={CONTACT.mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </div>
        </section>

        <section id="contact" className="oc-section">
          <div className="oc-section-head">
            <h2><span className="oc-num">05</span> {L.contactTitle}</h2>
            <p>{L.contactDesc}</p>
          </div>
          <div className="oc-contact">
            <div className="oc-contact-lines">
              {L.contactLines.map(l => (
                <a key={l.code} href={l.href} target={l.href.startsWith('http')?'_blank':undefined} rel={l.href.startsWith('http')?'noreferrer':undefined}><code>{l.code}</code> {l.value}</a>
              ))}
            </div>
            <div className="oc-line-qr-card">
              <img src={`${base}images/line-qr.png`} alt={`LINE QR ${CONTACT.lineId}`} width="140" height="140" loading="lazy" />
              <b>LINE ID: {CONTACT.lineId}</b>
              <span>{L.qrText}</span>
              <a href={CONTACT.lineUrl} target="_blank" rel="noreferrer">line.me/ti/p/{CONTACT.lineId}</a>
            </div>
          </div>
          <div className="oc-visit">
            <picture className="oc-visit-bg" aria-hidden="true">
              <source type="image/webp" srcSet={SHOP_THUMB_WEBP[2]} />
              <img src={SHOP_THUMB[2]} alt="" loading="lazy" decoding="async" />
            </picture>
            <div className="oc-visit-shade" aria-hidden="true" />
            <div className="oc-visit-body">
              <span className={`oc-open ${openNow ? 'on' : ''}`}><i />{openNow ? L.openNow : L.opensAt}</span>
              <h3>{L.visitTitle}</h3>
              <p>{L.visitDesc}</p>
              <div className="oc-visit-actions">
                <a className="oc-visit-btn line" href={CONTACT.lineUrl} target="_blank" rel="noreferrer"><IconLine /> LINE</a>
                <a className="oc-visit-btn wa" href={CONTACT.waUrl} target="_blank" rel="noreferrer"><IconWa /> WhatsApp</a>
                <a className="oc-visit-btn call" href={CONTACT.phoneHref}><IconPhone /> {CONTACT.phone}</a>
                <a className="oc-visit-btn map" href={CONTACT.mapUrl} target="_blank" rel="noreferrer"><IconPin /> {L.mapBtn}</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="oc-footer">
        <div className="oc-footer-grid">
          <div>
            <img src={`${base}logo-nav.png`} alt="Southside Ink" width="52" height="46" className="oc-footer-logo" />
            <div className="oc-footer-name">Southside Ink Tattoo Pattaya</div>
            <div className="oc-footer-addr">{L.locAddr[0]}<br />{L.locAddr[1]}<br />{L.locHours}</div>
          </div>
          <div>
            <h4>{L.contactTitle}</h4>
            <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
            <a href={CONTACT.phone2Href}>{CONTACT.phone2}</a>
            <a href={CONTACT.lineUrl} target="_blank" rel="noreferrer" className="line">LINE {CONTACT.lineId}</a>
            <a href={CONTACT.waUrl} target="_blank" rel="noreferrer">WhatsApp</a>
            <a href={CONTACT.fbUrl} target="_blank" rel="noreferrer">Facebook</a>
            <a href={CONTACT.igUrl} target="_blank" rel="noreferrer">Instagram @{CONTACT.igId}</a>
          </div>
          <div className="oc-footer-qr">
            <img src={`${base}images/line-qr.png`} alt={`LINE QR ${CONTACT.lineId}`} width="110" height="110" />
            <div>{L.qrText}<br /><b>{CONTACT.lineId}</b></div>
          </div>
        </div>
        <div className="oc-footer-bottom">
          <span>© {new Date().getFullYear()} {L.footerCopy}</span>
          <a href={CONTACT.mapUrl} target="_blank" rel="noreferrer">{L.mapBtn}</a>
        </div>
      </footer>

      <div className={`oc-drawer ${drawer ? 'open' : ''}`} role="dialog" aria-modal="true" aria-label="booking">
        <button className="oc-drawer-bg" aria-label="Close" onClick={() => setDrawer(false)} />
        <div className="oc-drawer-panel">
          <button className="oc-drawer-x" onClick={() => setDrawer(false)} aria-label="Close">×</button>
          <h3>{L.drawerTitle}</h3>
          <p>{L.drawerDesc}</p>
          <a className="oc-choice line" href={CONTACT.lineUrl} target="_blank" rel="noreferrer">
            <img src={`${base}images/line-qr.png`} alt="LINE QR" width="36" height="36" />
            <span><b>{L.drawerLine}</b><span>{L.drawerLineSub}</span></span>
          </a>
          <a className="oc-choice primary" href={CONTACT.fbUrl} target="_blank" rel="noreferrer"><b>{L.drawerFb}</b><span>{L.drawerFbSub}</span></a>
          <a className="oc-choice blue" href={CONTACT.waUrl} target="_blank" rel="noreferrer"><b>{L.drawerWa}</b><span>{L.drawerWaSub}</span></a>
          <a className="oc-choice" href={CONTACT.phoneHref}><b>{L.drawerCall}</b><span>{L.drawerCallSub}</span></a>
          <button className="oc-choice" onClick={() => copyTel(CONTACT.phone.replace(/-/g, ''))}><b>{L.copyBtn}</b><span>{CONTACT.phone}</span></button>
        </div>
      </div>

      {lightbox !== null && (
        <div className="oc-lightbox" role="dialog" aria-modal="true" aria-label="works">
          <button className="oc-lb-bg" onClick={() => setLightbox(null)} aria-label="Close" />
          <button className="oc-lb-x" onClick={() => setLightbox(null)} aria-label="Close">×</button>
          <button className="oc-lb-prev" onClick={() => setLightbox(v => (v - 1 + PORTFOLIO.length) % PORTFOLIO.length)} aria-label="Previous">‹</button>
          <div className="oc-lb-main" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            <img src={PORTFOLIO[lightbox].src} alt={PORTFOLIO[lightbox].alt} />
            <div className="oc-lb-cap">{lightbox + 1} / {PORTFOLIO.length}</div>
          </div>
          <button className="oc-lb-next" onClick={() => setLightbox(v => (v + 1) % PORTFOLIO.length)} aria-label="Next">›</button>
        </div>
      )}

      <div className="oc-fab">
        {fabOpen && (
          <div className="oc-fab-menu" role="menu">
            <a href={CONTACT.lineUrl} target="_blank" rel="noreferrer" className="oc-fab-item line" role="menuitem">
              <span className="oc-fab-ic2"><IconLine /></span>
              <span><b>LINE</b> {CONTACT.lineId}</span>
            </a>
            <a href={CONTACT.phoneHref} className="oc-fab-item call" role="menuitem">
              <span className="oc-fab-ic2"><IconPhone /></span>
              <span><b>{L.fabCall}</b> {CONTACT.phone}</span>
            </a>
            <a href={CONTACT.waUrl} target="_blank" rel="noreferrer" className="oc-fab-item wa" role="menuitem">
              <span className="oc-fab-ic2"><IconWa /></span>
              <span><b>WhatsApp</b> {CONTACT.phone}</span>
            </a>
            <a href={CONTACT.fbUrl} target="_blank" rel="noreferrer" className="oc-fab-item fb" role="menuitem">
              <span className="oc-fab-ic2"><IconFb /></span>
              <span><b>Facebook</b> Southside Ink Pattaya</span>
            </a>
            <a href={CONTACT.igUrl} target="_blank" rel="noreferrer" className="oc-fab-item ig" role="menuitem">
              <span className="oc-fab-ic2"><IconIg /></span>
              <span><b>Instagram</b> @{CONTACT.igId}</span>
            </a>
            <button className="oc-fab-item book" onClick={() => { setFabOpen(false); setDrawer(true) }} role="menuitem">
              <span className="oc-fab-ic2"><IconCheck /></span>
              <span><b>{L.fabBook}</b> {L.fabBookSub}</span>
            </button>
          </div>
        )}
        <button className={`oc-fab-btn ${fabOpen ? 'open' : ''}`} onClick={() => setFabOpen(v => !v)} aria-expanded={fabOpen} aria-label={L.fabLabel}>
          {fabOpen ? <span className="oc-fab-close">×</span> : <><img src={`${base}logo-nav.png`} alt="" width="28" height="24" className="oc-fab-logo" /><span className="oc-fab-label">{L.fabLabel}</span></>}
        </button>
      </div>

      {fabOpen && <button className="oc-fab-backdrop" aria-label="Close" onClick={() => setFabOpen(false)} />}
      {toast && <div className="oc-toast">{toast}</div>}
    </>
  )
}
