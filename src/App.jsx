import { useCallback, useEffect, useRef, useState } from 'react'
import Icon from './Icon'
import Terminal from './Terminal'
import { VISUAL_BY_KEY } from './ServiceVisuals'
import CommandPalette from './CommandPalette'
import FloatingContact from './FloatingContact'
import ServiceModal from './ServiceModal'
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

// แต่ละบริการมีสามชั้น: desc = เราทำอะไร, gain = ลูกค้าได้อะไรกลับไป
// ปรับให้ครอบคลุมบริการจริงทั้งหมด: การตลาด/เว็บ/AI/IoT/IT Audit/วางระบบ
// visual = component key สำหรับ SVG abstract (ServiceVisuals.jsx)
// who/how/sample = ข้อมูลสำหรับหน้าจอรายละเอียด (ServiceModal)
const SERVICES = [
  {
    id: 'svc-marketing',
    visual: 'marketing', icon: 'megaphone',
    title: 'การตลาดดิจิทัล',
    short: 'ยิงแอด · SEO · คอนเทนต์ · วิดีโอ',
    desc: 'ยิงแอด Google/Facebook สอนยิงเองได้ เขียน SEO คิดแคปชั่น และ Gen วิดีโอจากข่าวรายวัน คุมโทนชุดเดียว',
    gain: 'ลูกค้าเห็นคุณบ่อยขึ้นในช่องทางที่ใช่ และคุณเห็นยอดจากแดชบอร์ดเดียว',
    who: 'ร้านค้าและ SME ที่อยากได้ลูกค้าใหม่ทุกเดือน แต่ไม่อยากนั่งเรียนรู้เครื่องมือโฆษณาเอง',
    how: [
      'คุยเป้าหมายและงบก่อน ไม่บังคับให้ใช้ช่องทางที่แพงแต่ไม่ใช่',
      'ลงมือทำแคมเปญ + สอนวิธีดูผลให้คุณรู้เองว่าคุ้มไหม',
      'ส่งรายงานสั้น ๆ เป็นระยะ ไม่มีศัพท์เทคนิคยัดใส่หัว',
    ],
    sample: 'ร้านกาแฟย่านบางมด — เปิดเพจใหม่ ยิงแอดเปิดร้าน 2 สัปดาห์ได้ลูกค้าใหม่เข้ากลุ่ม LINE ประจำ',
    includes: ['ยิงแอด + สอนยิง', 'SEO on-page', 'เขียนคอนเทนต์', 'Gen วิดีโอจากข่าว'],
  },
  {
    id: 'svc-web',
    visual: 'web', icon: 'web',
    title: 'เว็บ & แอป',
    short: 'Web App · Website · POS · ERP',
    desc: 'เว็บธุรกิจ ร้านค้าออนไลน์ Web App POS ERP พร้อมแดชบอร์ดดูตัวเลขเรียลไทม์',
    gain: 'ลูกค้าเจอคุณบนเว็บ สั่งของได้ทันที ส่วนคุณเปิดดูยอดจากมือถือได้ทุกที่',
    who: 'ธุรกิจที่ยังใช้กระดาษหรือ Excel จัดการออเดอร์และสต็อก จนมานั่งคีย์ซ้ำทุกวัน',
    how: [
      'ดูงานปัจจุบันของคุณก่อน ออกแบบให้เข้ากับวิธีที่คุณใช้อยู่จริง',
      'ทำเวอร์ชันทดลองให้ลองกดก่อนเริ่มทำจริง',
      'ติดตั้ง สอน และอยู่ดูแลหลังส่งมอบ',
    ],
    sample: 'ระบบ POS + สต็อกสำหรับร้านค้า พนักงานกดสั่งได้เอง ยอดตัดสต็อกอัตโนมัติ',
    includes: ['เว็บธุรกิจ', 'ร้านค้าออนไลน์', 'POS / ERP', 'แดชบอร์ดเรียลไทม์'],
  },
  {
    id: 'svc-ai',
    visual: 'ai', icon: 'ai',
    title: 'AI & Automation',
    short: 'Chatbot · โพส 24/7 · วิดีโออัตโนมัติ',
    desc: 'แชทบอทปิดยอด ตอบแทน 24 ชม. โพสอัตโนมัติทุกวัน และ Gen วิดีโอจากข่าวรายวัน เชื่อมกับข้อมูลธุรกิจจริง',
    gain: 'ลูกค้าทักเมื่อไหร่ก็มีคนตอบ โพสไม่ต้องนั่งทำเองทุกวัน และปิดงานได้แม้คุณนอน',
    who: 'ร้านค้าออนไลน์และธุรกิจบริการที่ลูกค้าทักเข้ามาทุกวัน จนตอบไม่ทันทั้งวันทั้งคืน',
    how: [
      'เก็บตัวอย่างบทสนทนาจริงของคุณ มาสอนบอทให้ตอบแบบที่คุณตอบ',
      'ให้บอททำงานเบื้องต้นแล้วส่งต่อให้คนเฉพาะเรื่องที่ต้องใช้คน',
      'เชื่อมกับ LINE/Messenger/เว็บ แล้วเทสต์กับสถานการณ์จริงก่อนเปิด',
    ],
    sample: 'ร้านอาหาร — ลูกค้าทักถามเวลาปิด-เปิด จองโต๊ะ บอทตอบเองได้ทั้งคืน ปิดยอดอัตโนมัติ',
    includes: ['Chatbot ปิดยอด', 'โพส 24/7', 'Gen วิดีโอจากข่าว', 'ส่งต่อคนเมื่อจำเป็น'],
  },
  {
    id: 'svc-iot',
    visual: 'iot', icon: 'chip',
    title: 'IoT & ฮาร์ดแวร์',
    short: 'เซ็นเซอร์ · หุ่นยนต์ · สมาร์ตโฮม',
    desc: 'ทุ่นวัดน้ำ หุ่นยนต์คลังสินค้า แจ้งเตือนไฟไหม้/ควัน กระถางรดน้ำใส่ปุ๋ยอัตโนมัติ สั่งผ่านมือถือหรือ LINE',
    gain: 'ของในคลัง/ในน้ำ/ในบ้าน ดูแลตัวเองได้ แจ้งเตือนเข้ามือถือคุณทันทีเมื่อมีเรื่อง',
    who: 'ฟาร์ม คลังสินค้า บ้านหรือสำนักงานที่อยากให้ระบบคอยเฝ้าดูแทนคน และแจ้งเตือนก่อนเกิดปัญหา',
    how: [
      'ออกแบบอุปกรณ์ตามปัญหาจริงของคุณ ไม่ใช่ขายของสำเร็จรูป',
      'ทำต้นแบบให้ลองใช้ก่อน แล้วปรับตามการใช้งานจริง',
      'ติดตั้งหน้างาน + สอนใช้งานผ่านแอป/LINE',
    ],
    sample: 'ทุ่นวัดระดับน้ำในบ่อ — ระดับต่ำกว่าเกณฑ์แจ้งเตือนเข้าบัญชี LINE ทันที',
    includes: ['เซ็นเซอร์ตรวจค่า', 'หุ่นยนต์/ระบบอัตโนมัติ', 'แจ้งเตือนฉุกเฉิน', 'สั่งงานผ่านแอป/LINE'],
  },
  {
    id: 'svc-audit',
    visual: 'audit', icon: 'shield',
    title: 'IT Audit & Compliance',
    short: 'ตรวจสอบ · ประเมินความเสี่ยง · PDPA',
    desc: 'ตรวจระบบ IT ประเมินความเสี่ยง ช่วยให้ผ่าน PDPA พร้อมรายงานและแผนแก้ไข',
    gain: 'คุณรู้ทันว่าระบบไหนเสี่ยง แก้ก่อนถูกฟ้องร้องหรือถูกแฮ็ก และ audit ผ่านตามมาตรฐาน',
    who: 'องค์กรที่ต้องส่งผลการตรวจสอบให้หน่วยงาน หรืออยากรู้ว่าระบบของตัวเองปลอดภัยแค่ไหน',
    how: [
      'เก็บข้อมูลระบบจริงของคุณ — ไม่ใช่แค่กรอกแบบฟอร์ม',
      'ประเมินความเสี่ยง + จัดลำดับว่าอะไรด่วนต้องแก้ก่อน',
      'ส่งรายงานพร้อมแผนแก้ไข อ่านรู้เรื่อง ไม่มีศัพท์วิชาการยัดใส่',
    ],
    sample: 'ตรวจพบช่องโหว่บัญชีพนักงานในระบบ POS แนะนำวิธีแก้ก่อนข้อมูลรั่ว',
    includes: ['ตรวจระบบ IT', 'ประเมินความเสี่ยง', 'PDPA / มาตรฐาน', 'แผนแก้ไข'],
  },
  {
    id: 'svc-full',
    visual: 'full', icon: 'layers',
    title: 'วางระบบครบวงจร',
    short: 'ตั้งแต่คอนเซ็ปต์จนซัพพอร์ต',
    desc: 'ดูแลตั้งแต่คอนเซ็ปต์ ออกแบบ พัฒนา ติดตั้ง ถึงเทรนทีมและซัพพอร์ตต่อเนื่อง รวมทุกบริการในแพ็คเดียว',
    gain: 'คุยทีมเดียวจบ ไม่ต้องวิ่งประสานหลายเจ้าเอง และมีคนดูแลต่อหลังส่งมอบ',
    who: 'ธุรกิจที่อยากได้ระบบแบบจบในที่เดียว ทั้งหน้าเว็บ หลังบ้าน บอท และการตลาด',
    how: [
      'วางคอนเซ็ปต์และแผนภาพรวมให้เห็นภาพก่อนเริ่ม',
      'ทำทีละส่วนให้เห็นผลจริง ค่อย ๆ ต่อยอด ไม่ต้องรอจนเสร็จทั้งหมด',
      'ส่งมอบพร้อมเทรนทีมและคู่มือ แล้วอยู่ดูแลต่อเนื่อง',
    ],
    sample: 'ร้านค้าออนไลน์ครบวงจร — เว็บขายของ + บอทตอบลูกค้า + ระบบหลังบ้านตัดสต็อก + รายงานยอด',
    includes: ['วางคอนเซ็ปต์', 'ออกแบบ', 'พัฒนา', 'ติดตั้ง', 'เทรนทีม', 'ซัพพอร์ตต่อเนื่อง'],
  },
]

/* time/cost ต้องเป็นสิ่งที่เจ้าของยืนยันเองเท่านั้น
   เคยมีตัวเลขที่ตั้งขึ้นเอง (30 นาที / เริ่ม 4,900 / 3-14 วัน / ปรับแก้ 2 รอบ) ปนอยู่
   ลูกค้าแคปหน้าจอไปอ้างได้ ถือเป็นข้อผูกพัน ไม่ใช่ข้อความตกแต่ง
   เหลือไว้เฉพาะที่เจ้าของประกาศเองอยู่แล้วคือ ตอบกลับ 24 ชม. และปรึกษาฟรี
   desc สั้น 1 บรรทัด ให้อ่านจบไว เพราะเป็นแถวที่คนสแกนข้ามเร็วที่สุด */
const STEPS = [
  {
    title: 'คุยกันก่อน',
    time: 'ตามสะดวก',
    cost: 'ไม่มีค่าใช้จ่าย',
    desc: 'เล่าแบบบ้าน ๆ ได้เลย ไม่ต้องเตรียมอะไร',
  },
  {
    title: 'เราสรุปให้ดู',
    time: 'ภายใน 24 ชม.',
    cost: 'ไม่มีค่าใช้จ่าย',
    desc: 'ใบเสนอราคาชัดเจน เห็นตัวเลขแล้วค่อยตัดสินใจ',
  },
  {
    title: 'ลงมือทำ',
    time: 'ตามขอบเขตงาน',
    cost: 'ตามที่ตกลง',
    desc: 'มี demo ให้ดูความคืบหน้า แก้ได้ระหว่างทาง',
  },
  {
    title: 'ส่งมอบแล้วอยู่ต่อ',
    time: 'มีรอบปรับแก้',
    cost: 'ดูแลต่อเนื่อง',
    desc: 'ติดตั้ง สอนจนใช้เป็น แล้วตามดูแลต่อ ไม่ทิ้งงาน',
  },
]

// คำถามที่เจ้าของธุรกิจมักลังเลแต่ไม่กล้าถาม ตอบไว้ก่อนเลยจะได้กล้าทัก
// ทุกข้อต้องตอบจากสิ่งที่ทำจริงเท่านั้น ห้ามสัญญาสิ่งที่ยังไม่รู้ว่าทำได้ไหม
const FAQS = [
  {
    q: 'ไม่มีความรู้ด้านเทคนิคเลย คุยกันรู้เรื่องไหม',
    a: 'รู้เรื่องแน่นอน คุณเล่าว่าติดอะไรอยู่ก็พอ ศัพท์เทคนิคเป็นหน้าที่เราที่ต้องแปลให้เข้าใจ',
  },
  {
    q: 'อยากทำแค่บางส่วน ไม่เอาทั้งหมด ได้ไหม',
    a: 'ได้ครับ แนะนำให้เริ่มจากจุดที่เจ็บที่สุดก่อนด้วยซ้ำ พอเห็นผลแล้วค่อยขยายทีหลังก็ยังทัน',
  },
  {
    q: 'ราคาประมาณเท่าไหร่',
    a: 'ขึ้นกับขอบเขตงาน เราจะสรุปขอบเขตและราคามาให้ดูก่อนเริ่มเสมอ เห็นตัวเลขแล้วค่อยตัดสินใจ ช่วงคุยและประเมินไม่มีค่าใช้จ่าย',
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
  {
    q: 'มีงานเร่งด่วนมาก ต้องเสร็จไวจริง ๆ ได้ไหม',
    a: 'ได้ครับ ทักมาเลย แล้วบอกว่าดีไลน์ต้องเมื่อไหร่ เราจะบอกตรง ๆ ว่าทำทันหรือไม่ทัน และมีทางไหนช่วยได้บ้าง ดีกว่าทำแล้วไม่ตรงเวลา',
  },
  {
    q: 'แค่อยากปรึกษาก่อนเฉย ๆ ยังไม่ตัดสินใจจ้าง ได้ไหม',
    a: 'ได้เลยครับ ปรึกษาครั้งแรกไม่มีค่าใช้จ่าย และไม่มีการตื๊อขาย — ยังไม่พร้อมก็บอกได้ ไม่ได้เป็นไร เราอยากให้คุณตัดสินใจเพราะงานดี ไม่ใช่เพราะเกรงใจ',
  },
  {
    q: 'ทำไมต้องจ้างคุณ ทำเองไม่ได้เหรอ',
    a: 'ทำเองได้แน่นอน ถ้างานเล็กพอเราบอกวิธีทำฟรี ๆ เลยด้วยซ้ำ แต่ถ้าเป็นงานที่ต้องใช้เวลาหลายวัน มือใหม่ทำเป็นเดือนและเสี่ยงพลาด การจ้างเรามักคุ้มกว่าเมื่อนับเวลาของคุณ',
  },
]

// ───────────── ผลงาน ─────────────
// งานจริงที่ทำและส่งมอบแล้วเท่านั้น — ไม่อนุญาตงานสมมุติหรือตัวเลขที่พิสูจน์ไม่ได้
// ลูกค้าเปิดดูเว็บแล้วจับได้ = เสียเครดิตทั้งหน้า
// ข้อมูล CURTAIN STORY HOME มาจากเอกสารส่งมอบจริง (P-Jib folder): LINE OA @curtainstoryhome
//   เปิดใช้งาน 9 ก.ย. 2569 · auto-reply 6 เมนู · followers 300-325 · ตอบ ~25 นาที
//   เชื่อม Google Business Profile + Facebook · เว็บ curtainstoryhome.com
const WORKS = [
  {
    title: 'ร้านผ้าม่าน — LINE OA ตอบลูกค้าอัตโนมัติ',
    client: 'CURTAIN STORY HOME',
    tags: ['LINE OA', 'Chatbot', 'Auto-reply'],
    desc: 'ตั้ง LINE Official Account + ระบบตอบอัตโนมัติ 6 เมนู (เวลาเปิด-ปิด/โปรโมชัน/สินค้า/ติดต่อ) ทำงาน 06:00-23:00 เชื่อม Google Business Profile และเพจ Facebook',
    visual: 'ai',
    metric: 'ตอบลูกค้าภายใน ~25 นาที · สมาชิก 300+',
  },
  {
    title: 'เว็บร้านค้า — curtainstoryhome.com',
    client: 'CURTAIN STORY HOME',
    tags: ['Website', 'E-commerce'],
    desc: 'เว็บร้านผ้าม่านครบชุด — แนะนำบริการ รูปผลงานติดตั้งจริง แคตตาล็อคสินค้า และช่องทางติดต่อรวมทุกจุด',
    visual: 'web',
    metric: 'หน้าร้านออนไลน์เปิด 24 ชม.',
  },
  {
    title: 'แคตตาล็อคสินค้า — วอลเปเปอร์/มู่ลี่/ผ้าม่าน',
    client: 'CURTAIN STORY HOME',
    tags: ['แคตตาล็อค', 'ดีไซน์', 'คอนเทนต์'],
    desc: 'ออกแบบแคตตาล็อค 3 ชุด (วอลเปเปอร์ติดผนัง มู่ลี่ไม้ ผ้าม่าน) ให้ลูกค้าเลือกสินค้าได้จากภาพจริง',
    visual: 'marketing',
    metric: 'แคตตาล็อคครบ 3 สายสินค้า',
  },
  {
    title: 'สอนยิงแอด Google Ads — ปั้นทีมเองได้',
    client: 'ลูกค้าคอร์ส (P-Jib)',
    tags: ['Google Ads', 'สอนสด', 'คอร์ส'],
    desc: 'คอร์สสอนยิงแอดแบบลงมือจริง 4-5 ชม. พร้อมคู่มือเครื่องมือ 15 อย่าง และสไลด์สอน — สอนจนตั้งแคมเปญเองได้',
    visual: 'marketing',
    metric: 'จบคอร์สตั้งแคมเปญเองได้จริง',
  },
]

// ───────────── คำชมจากลูกค้า (testimonials) ─────────────
// ต้องเป็นข้อความจริงจากลูกค้าที่พิสูจน์ได้เท่านั้น — ห้ามแต่งขึ้นเองเด็ดขาด
// ลูกค้าอ่านเจอข้อความที่ตัวเองไม่เคยพูด = เสียเครดิตทั้งเว็บ
// วิธีได้มา: ถ่ายรูปแชท LINE/FB ที่ลูกค้าชม แล้วคัดลอกข้อความจริงมาวาง
// ตัวอย่างรูปแบบ:
//   { quote: 'ข้อความชมจริง (คัดมาจากแชท)', from: 'ชื่อลูกค้า หรือ ประเภทธุรกิจ', context: 'เช่น เจ้าของร้าน CURTAIN STORY HOME' }
// ว่างไว้ = ส่วนคำชมจะไม่ขึ้นเลย
const TESTIMONIALS = [
  // {
  //   quote: 'ข้อความชมจริงจากลูกค้า',
  //   from: 'ชื่อลูกค้า',
  //   context: 'เจ้าของร้าน CURTAIN STORY HOME',
  // },
]

const BUDGETS = [
  { id: 'b-0', label: 'ยังไม่รู้เลย' },
  { id: 'b-1', label: 'ต่ำกว่า 5,000' },
  { id: 'b-2', label: '5,000 – 15,000' },
  { id: 'b-3', label: '15,000 – 40,000' },
  { id: 'b-4', label: '40,000 ขึ้นไป' },
]

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

// ปุ่มกลับขึ้นบน — โผล่เมื่อเลื่อนพ้น hero แล้ว หายเมื่ออยู่บนสุด
// อยู่ซ้ายล่าง กันกับปุ่มติดต่อลอย (ขวาล่าง) ไม่บังกัน
function ScrollTop() {
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const update = () => setShown(window.scrollY > 480)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])
  return (
    <button
      type="button"
      className={`scroll-top ${shown ? 'in' : ''}`}
      aria-label="กลับขึ้นด้านบน"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <Icon name="chevron" />
    </button>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [ddOpen, setDdOpen] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [status, setStatus] = useState('idle') // idle | sending | ok | error
  const [toast, setToast] = useState('')
  const [theme, setTheme] = useTheme()
  const [svcOpen, setSvcOpen] = useState(null) // id ของบริการที่เปิดรายละเอียดอยู่ (ServiceModal)
  const [topic, setTopic] = useState('') // หัวข้อที่เลือกไว้ในช่องติดต่อ (เติมข้อความให้อัตโนมัติ)
  const [faqQ, setFaqQ] = useState('') // คำค้นหาใน FAQ
  const [msg, setMsg] = useState('') // ข้อความในฟอร์ม — เติมให้อัตโนมัติจากหัวข้อที่เลือก
  const [budget, setBudget] = useState('') // งบประมาณที่เลือกในฟอร์ม (b-0..b-4)

  const ddRef = useRef(null)
  const ddBtnRef = useRef(null)

  const order = [
    'services',
    'why',
    ...(WORKS.length ? ['work'] : []),
    ...(TESTIMONIALS.length ? ['testimonials'] : []),
    'process',
    'perks',
    'faq',
    'contact',
  ]
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
    {
      id: 'curtain-web',
      icon: 'web',
      label: 'ดูเว็บ curtainstoryhome.com',
      hint: 'งานจริงที่ส่งมอบแล้ว',
      keywords: ['curtain', 'ผ้าม่าน', 'งาน', 'portfolio', 'ตัวอย่างงาน'],
      run: openExternal('https://curtainstoryhome.com'),
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
    const data = new FormData(form)
    const payload = {
      name: data.get('name') || '',
      email: data.get('email') || '',
      line: data.get('line') || '',
      phone: data.get('phone') || '',
      topic: data.get('topic') || '',
      budget: data.get('budget') || '',
      message: data.get('message') || '',
    }

    // ลูกค้าฝากช่องทางติดต่อไว้ก็พอ — แต่ต้องมีอย่างน้อย 1 ช่องทาง
    // ไม่งั้นเราติดต่อกลับไปหาไม่ได้
    if (!payload.email && !payload.line && !payload.phone) {
      setStatus('nochan')
      return
    }

    // ยังไม่มี web3formsKey → เปิด mailto พร้อมข้อความสำเร็จรูปแทน
    // ให้ลูกค้าได้ส่งจริง ไม่ใช่กดแล้วเงียบแล้วข้อมูลหาย
    if (!CONTACT.web3formsKey) {
      const subject = encodeURIComponent(`ลูกค้าใหม่จากเว็บ: ${payload.topic || 'สนใจบริการ'} (${payload.budget || 'ยังไม่ระบุงบ'})`)
      const body = encodeURIComponent(
        `ชื่อ: ${payload.name}\nอีเมล: ${payload.email || '-'}\nLINE: ${payload.line || '-'}\nเบอร์โทร: ${payload.phone || '-'}\nหัวข้อ: ${payload.topic || '-'}\nงบประมาณ: ${payload.budget || '-'}\n\nรายละเอียด:\n${payload.message || '-'}`
      )
      window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`
      return
    }

    setStatus('sending')

    data.append('access_key', CONTACT.web3formsKey)
    data.append('subject', `ลูกค้าใหม่จากเว็บ Sudo Command — ${payload.topic || 'สนใจบริการ'} (${payload.budget || 'ยังไม่ระบุงบ'})`)

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
      })
      const json = await res.json()
      if (json.success) {
        setStatus('ok')
        // form.reset() ล้างได้เฉพาะ input ที่ไม่ถูก React ควบคุม
        // msg/topic/budget เป็น controlled state ต้องล้างเอง ไม่งั้น
        // ข้อความเดิมจะเด้งกลับมาหลัง render
        form.reset()
        setMsg('')
        setTopic('')
        setBudget('')
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
            <img
              className="brand-mark"
              src="/sudo-command/favicon.svg"
              alt=""
              width="32"
              height="32"
            />
            <span className="brand-name">
              Sudo Command
              <span className="brand-sub">Tech &amp; Creative Agency</span>
            </span>
          </a>

          <nav id="site-nav" className={`site-nav ${menuOpen ? 'open' : ''}`} aria-label="เมนูหลัก">
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
            aria-controls="site-nav"
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
                ตั้งแต่ยิงแอด ถึงวางระบบหลังบ้าน
                <br />
                <em>จบในทีมเดียว</em>
              </h1>
              <p className="lede">
                เล่ามาว่าตอนนี้ติดอะไรอยู่ เดี๋ยวเราช่วยดูให้ว่าอะไรที่ระบบทำแทนได้
                แล้วค่อยหาทางที่พอดีกับธุรกิจและงบของคุณ
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
              <p className="hero-proof">
                <Icon name="shield" />
                มีงานส่งมอบจริงแล้ว — LINE OA + เว็บร้าน + แคตตาล็อค
                <span className="hero-proof-client">CURTAIN STORY HOME</span>
              </p>
            </div>

            <Terminal />
          </div>
        </section>

        {/* Trust strip — ตัวเลขแบบเรียลไทม์ที่พิสูจน์ได้ */}
        <section className="trust" aria-label="ตัวเลขที่พิสูจน์ได้">
          <div className="wrap trust-grid">
            <div className="trust-item" data-reveal>
              <strong className="trust-num">24 <span className="trust-unit">ชม.</span></strong>
              <span className="trust-cap">เวลาตอบกลับเฉลี่ย (ในเวลาทำการ)</span>
            </div>
            <div className="trust-item" data-reveal>
              <strong className="trust-num">100<span className="trust-unit">%</span></strong>
              <span className="trust-cap">รับงานทั่วประเทศ · ทำงานออนไลน์เต็มรูปแบบ</span>
            </div>
            <div className="trust-item" data-reveal>
              <strong className="trust-num">0 <span className="trust-unit">บาท</span></strong>
              <span className="trust-cap">ค่าปรึกษา + ค่าประเมินขอบเขตงาน</span>
            </div>
            {/* ช่องที่ 4 เคยเป็น "7 วัน เร็วสุดสำหรับงาน Sprint" ซึ่งอ้างอิงแพ็คราคาที่ถอดไปแล้ว
                และเป็นตัวเลขที่เจ้าของไม่ได้ตั้ง เปลี่ยนเป็นสิ่งที่นับได้จริงจากรายการบริการ */}
            <div className="trust-item" data-reveal>
              <strong className="trust-num">6 <span className="trust-unit">ด้าน</span></strong>
              <span className="trust-cap">การตลาด · เว็บ&amp;แอป · AI · IoT · IT Audit · วางระบบ</span>
            </div>
          </div>
        </section>

        {/* แถบนี้เคยเขียนซ้ำกับหัวข้อบริการทั้งสามข้อ เปลี่ยนมาบอกว่า "ใครเหมาะ"
            ซึ่งเป็นข้อมูลที่ไม่มีที่ไหนบอก และช่วยให้คนอ่านรู้ตัวว่าใช่กลุ่มตัวเองไหม */}
        <section className="band" aria-label="กลุ่มธุรกิจที่เราถนัด">
          <div className="wrap band-grid">
            <p>
              <strong>เจ้าของ SME ที่ทำเองเกือบทุกอย่าง</strong>
              งานเอกสารและตอบลูกค้ากินเวลาจนไม่ได้ไปหาลูกค้าใหม่
            </p>
            <p>
              <strong>สำนักงานบัญชีที่ลูกค้าเยอะขึ้นทุกปี</strong>
              รับงานเพิ่มไม่ไหว เพราะติดที่ต้องคีย์เอกสารเองทุกใบ
            </p>
            <p>
              <strong>ร้านค้าออนไลน์ที่ลูกค้าทักหลายช่องทาง</strong>
              แชทเข้ามาหลายทางจนตอบไม่ทัน และตกหล่นโดยไม่รู้ตัว
            </p>
          </div>
        </section>

        {/* ทำไมถึงเลือกเรา — ข้อดีที่พิสูจน์ได้จริงจากวิธีทำงาน
            ไม่ใช่คำโฆษณาที่ไม่มีหลักฐาน */}
        <section className="sec why" aria-label="ทำไมถึงเลือกเรา" id="why" tabIndex={-1}>
          <div className="wrap">
            <SectionHead
              num={numOf('why')}
              title="ทำไมถึงเลือกเรา"
              note="ดูจากวิธีทำงานของเราก็พอ ไม่ต้องเชื่อเพราะเราบอกเอง"
            />
            <ul className="why-list">
              {[
                {
                  icon: 'layers',
                  title: 'ทีมเดียวจบ 6 ด้าน',
                  text: 'การตลาด เว็บ AI IoT IT Audit วางระบบ — ไม่ต้องวิ่งประสานหลายเจ้า ให้แต่ละคนเถียงกันเอง เราแปลความต้องการคุณให้เป็นงานแล้วดูแลจนจบ',
                },
                {
                  icon: 'chat',
                  title: 'สอนจนใช้เป็นจริง ๆ',
                  text: 'ส่งมอบพร้อมเทรนทีมและคู่มือ ถ้าทีมคุณยังใช้ไม่เป็น ถือว่างานยังไม่จบ แล้วยังมีคนคอยตอบคำถามหลังส่งมอบ ไม่ใช่ส่งงานแล้วหาย',
                },
                {
                  icon: 'cube',
                  title: 'มองด้วยสายตา IT Audit',
                  text: 'ตรวจระบบให้ปลอดภัยตั้งแต่แรก ไม่ใช่ทำเสร็จแล้วปล่อย รู้ว่าข้อมูลไหนเสี่ยง ก่อนที่ปัญหาจะกลายเป็นเรื่องใหญ่',
                },
              ].map((w, i) => (
                <li key={w.title} data-reveal>
                  <span className="why-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="why-ic" aria-hidden="true">
                    <Icon name={w.icon} />
                  </span>
                  <h3>{w.title}</h3>
                  <p>{w.text}</p>
                </li>
              ))}
            </ul>
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
              {SERVICES.map((s) => {
                const Visual = VISUAL_BY_KEY[s.visual]
                const open = () => setSvcOpen(s.id)
                return (
                  <li
                    className={`svc svc-${s.id}`}
                    id={s.id}
                    key={s.id}
                    tabIndex={-1}
                    data-reveal
                  >
                    <button
                      type="button"
                      className="svc-visual"
                      onClick={open}
                      aria-label={`ดูรายละเอียด ${s.title}`}
                    >
                      {Visual && <Visual label={s.title} />}
                    </button>
                    <div className="svc-body">
                      <h3>{s.title}</h3>
                      <p className="svc-short">{s.short}</p>
                      <p className="svc-desc">{s.desc}</p>
                      {s.includes?.length > 0 && (
                        <ul className="svc-includes">
                          {s.includes.map((it) => (
                            <li key={it}>{it}</li>
                          ))}
                        </ul>
                      )}
                      <p className="svc-gain">
                        <span className="svc-gain-label">คุณจะได้</span>
                        {s.gain}
                      </p>
                      {s.sample && (
                        <p className="svc-sample">
                          <span className="svc-gain-label">ตัวอย่าง</span>
                          {s.sample}
                        </p>
                      )}
                      {/* เคยโชว์ราคาเริ่มต้นตรงนี้ ถอดออกเพราะเป็นตัวเลขที่เจ้าของไม่ได้ตั้ง
                          จะใส่กลับได้ก็ต่อเมื่อเจ้าของยืนยันตัวเลขเองเท่านั้น */}
                      <div className="svc-foot">
                        <span className="svc-quote">ประเมินตามขอบเขตงาน · ปรึกษาฟรี</span>
                        <div className="svc-actions">
                          <button type="button" className="btn btn-line btn-sm" onClick={open}>
                            ดูรายละเอียด
                          </button>
                          <a className="btn btn-solid btn-sm" href="#contact" onClick={nav('contact')}>
                            ขอใบเสนอราคา
                          </a>
                        </div>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>

        {WORKS.length > 0 && (
          <section className="sec sec-alt" id="work" tabIndex={-1}>
            <div className="wrap">
              <SectionHead
                num={numOf('work')}
                title="ตัวอย่างงานที่ส่งมอบจริง"
                note="แต่ละโปรเจกต์ออกแบบตามธุรกิจของคุณ — ภาพเป็นสัญลักษณ์แทนรายละเอียดงานจริง"
              />
              <ul className="work-list">
                {WORKS.map((w) => {
                  const WVisual = VISUAL_BY_KEY[w.visual]
                  return (
                    <li className="work" key={w.title} data-reveal>
                      <div className="work-visual" aria-hidden="true">
                        {WVisual && <WVisual label={w.title} />}
                      </div>
                      <div className="work-body">
                        {w.client && <p className="work-client">{w.client}</p>}
                        <h3>{w.title}</h3>
                        <p>{w.desc}</p>
                        {w.metric && (
                          <p className="work-metric">
                            <span className="work-metric-label">ผลลัพธ์</span>
                            {w.metric}
                          </p>
                        )}
                        {w.tags?.length > 0 && (
                          <ul className="tags">
                            {w.tags.map((t) => (
                              <li key={t}>{t}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          </section>
        )}

        {TESTIMONIALS.length > 0 && (
          <section className="sec" id="testimonials" tabIndex={-1}>
            <div className="wrap">
              <SectionHead
                num={numOf('testimonials')}
                title="ลูกค้าพูดถึงเรายังไง"
                note="ข้อความจริงจากลูกค้า — ไม่มีการปรุงแต่ง"
              />
              <ul className="tst-list">
                {TESTIMONIALS.map((t) => (
                  <li key={t.from} data-reveal>
                    <blockquote>“{t.quote}”</blockquote>
                    <footer>
                      <strong>{t.from}</strong>
                      {t.context && <span>{t.context}</span>}
                    </footer>
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
                  <div className="step-meta">
                    <span className="step-time">
                      <Icon name="clock" />
                      <span>{s.time}</span>
                    </span>
                    <span className="step-cost">
                      <Icon name="tag" />
                      <span>{s.cost}</span>
                    </span>
                  </div>
                  <p>{s.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="sec" id="perks" tabIndex={-1}>
          <div className="wrap">
            <SectionHead
              num={numOf('perks')}
              title="ได้อะไรทุกครั้งที่ทำงานด้วย"
              note="สิ่งเหล่านี้เป็นมาตรฐานของทุกโปรเจกต์ ไม่ใช่บริการเสริมที่ต้องจ่ายเพิ่ม"
            />
            <ul className="perk-list">
              <li data-reveal>
                <Icon name="monitor" />
                <h3>เห็น demo ทุกขั้น</h3>
                <p>ไม่ต้องเดาว่าทำไปถึงไหน ดูงานจริงระหว่างทาง และขอปรับก่อนเสร็จได้</p>
              </li>
              <li data-reveal>
                <Icon name="layers" />
                <h3>เทรนทีม + คู่มือ</h3>
                <p>ส่งมอบพร้อมสอนจนใช้เป็น และมีคู่มือให้ดูย้อนหลัง ไม่ใช่ส่งไฟล์แล้วจบ</p>
              </li>
              <li data-reveal>
                <Icon name="chat" />
                <h3>ดูแลหลังส่งมอบ</h3>
                <p>ติดขัดตรงไหนทักมาได้ เรายังอยู่กับคุณต่อ ถึงงานจะจบไปแล้ว</p>
              </li>
              <li data-reveal>
                <Icon name="tag" />
                <h3>ประเมินฟรี ไม่ผูกมัด</h3>
                <p>เห็นขอบเขตและราคาก่อนเริ่มเสมอ ปรึกษากี่รอบก็ไม่คิดเงิน</p>
              </li>
            </ul>
          </div>
        </section>

        <section className="sec" id="faq" tabIndex={-1}>
          <div className="wrap">
            <SectionHead
              num={numOf('faq')}
              title="เรื่องที่หลายคนสงสัย"
              note="ถ้ายังมีข้อไหนค้างใจอยู่ ทักมาถามได้เลย ไม่ต้องเกรงใจ"
            />
            <div className="faq-search" role="search">
              <Icon name="search" />
              <input
                type="search"
                placeholder="ค้นหาคำถาม เช่น ราคา ต่างจังหวัด บริการหลังขาย"
                aria-label="ค้นหาคำถามที่พบบ่อย"
                value={faqQ}
                onChange={(e) => setFaqQ(e.target.value)}
              />
              {faqQ.trim() && (
                <button type="button" className="faq-clear" onClick={() => setFaqQ('')}>
                  ล้างการค้นหา
                  <Icon name="close" />
                </button>
              )}
            </div>
            <ul className={`faq ${faqQ.trim() ? 'faq-filtered' : ''}`}>
              {FAQS.filter((f) => !faqQ.trim() || (f.q + f.a).includes(faqQ.trim())).map((f) => (
                <li key={f.q} data-reveal>
                  <details>
                    <summary>
                      <span>{f.q}</span>
                      <Icon name="chevron" className="faq-caret" />
                    </summary>
                    <p>
                        <span>{f.a}</span>
                      </p>
                  </details>
                </li>
              ))}
              {faqQ.trim() && !FAQS.some((f) => (f.q + f.a).includes(faqQ.trim())) && (
                <li className="faq-none">
                  <p>
                    ไม่เจอคำถามที่ค้นหา แต่ตอบได้แน่นอน — ทักมาถามตรง ๆ เลยครับ
                  </p>
                </li>
              )}
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
                    const topicText = topic
                      ? ` สวัสดีครับ สนใจบริการ ${SERVICES.find((s) => s.id === topic)?.title} ครับ`
                      : ''
                    const href =
                      c.key === 'messenger' && topic
                        ? `${c.href}?text=${encodeURIComponent(topicText.trim())}`
                        : c.href
                    return (
                      <li key={c.key}>
                        <a
                          className="channel"
                          href={href}
                          target={external ? '_blank' : undefined}
                          rel={external ? 'noopener noreferrer' : undefined}
                        >
                          <Icon name={c.icon} />
                          <span>
                            {c.label}
                            {c.key === 'messenger' && topic && ' · ข้อความเตรียมไว้แล้ว'}
                          </span>
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

              <form className="form" onSubmit={sendForm} data-reveal>
                <div className="field">
                  <label htmlFor="f-name">ชื่อ หรือ ชื่อบริษัท</label>
                  <input id="f-name" name="name" type="text" required placeholder="เช่น สมชาย ร้านโชคชัย" />
                </div>
                <div className="field">
                  <span className="field-label" id="f-chan-label">
                    ฝากช่องทางติดต่อไว้เลย — เดี๋ยวเราติดต่อกลับเอง
                    <span className="opt"> (เลือกอย่างน้อย 1 ช่องทาง)</span>
                  </span>
                  <div className="field-chan" role="group" aria-labelledby="f-chan-label">
                    <label className="sr-only" htmlFor="f-email">อีเมล</label>
                    <input id="f-email" name="email" type="email" placeholder="อีเมล เช่น name@example.com" />
                    <label className="sr-only" htmlFor="f-line">LINE ID</label>
                    <input id="f-line" name="line" type="text" placeholder="LINE ID" />
                    <label className="sr-only" htmlFor="f-phone">เบอร์โทร</label>
                    <input id="f-phone" name="phone" type="tel" placeholder="เบอร์โทร" />
                  </div>
                </div>
                <div className="field">
                  <span className="field-label" id="f-topic-label">
                    อยากให้ช่วยเรื่องอะไร
                  </span>
                  <input type="hidden" name="topic" value={topic} />
                  <div className="field-chips" role="group" aria-labelledby="f-topic-label">
                    {SERVICES.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        className={topic === s.id ? 'on' : ''}
                        aria-pressed={topic === s.id}
                        onClick={() => {
                          const next = topic === s.id ? '' : s.id
                          setTopic(next)
                          if (next) setMsg(`สวัสดีครับ สนใจบริการ ${SERVICES.find((x) => x.id === next)?.title} ครับ`)
                        }}
                      >
                        {s.title}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="field">
                  <span className="field-label" id="f-budget-label">
                    งบประมาณคร่าว ๆ
                    <span className="opt"> (เพื่อให้เราเสนอได้ตรง — ไม่ผูกมัด)</span>
                  </span>
                  <div className="field-chips" role="radiogroup" aria-labelledby="f-budget-label">
                    {BUDGETS.map((b) => (
                      <label key={b.id} className={`field-chip ${budget === b.id ? 'on' : ''}`}>
                        <input
                          type="radio"
                          name="budget"
                          value={b.label}
                          checked={budget === b.id}
                          onChange={() => setBudget(b.id)}
                        />
                        <span>{b.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="f-msg">
                    รายละเอียดงาน <span className="opt">(ไม่บังคับ — ฝากช่องทางไว้เฉย ๆ ก็ได้)</span>
                  </label>
                  <textarea
                    id="f-msg"
                    name="message"
                    rows="3"
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    placeholder="เล่าแบบบ้าน ๆ ได้เลย หรือเว้นว่างไว้ก็ได้ เราจะติดต่อกลับไปถามเอง"
                  />
                </div>

                <button type="submit" className="btn btn-solid" disabled={status === 'sending'}>
                  {status === 'sending' ? 'กำลังส่ง…' : 'ฝากไว้ ให้ติดต่อกลับ'}
                  {status !== 'sending' && <Icon name="arrow" />}
                </button>

                <p className="form-msg" role="status" aria-live="polite">
                  {status === 'ok' && (
                    <span className="ok">รับฝากแล้ว เราจะติดต่อกลับภายใน 24 ชั่วโมง</span>
                  )}
                  {status === 'error' && (
                    <span className="err">ส่งไม่สำเร็จ รบกวนทักมาทางช่องทางด้านซ้ายแทนได้เลย</span>
                  )}
                  {status === 'nochan' && (
                    <span className="err">กรอกช่องทางติดต่ออย่างน้อย 1 ช่องทาง (อีเมล / LINE / เบอร์โทร) เพื่อให้เราติดต่อกลับได้</span>
                  )}
                </p>
                <p className="fine">
                  {CONTACT.web3formsKey
                    ? 'ข้อมูลถึงเราโดยตรง · ตอบกลับภายใน 24 ชั่วโมงในเวลาทำการ'
                    : 'ฟอร์มนี้ส่งผ่านอีเมลของคุณเอง — กดส่งแล้วจะเปิดอีเมลขึ้นมาให้กดส่งอีกครั้ง'}
                </p>
              </form>
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
          <div className="foot-grid">
            <div className="foot-brand">
              <p className="foot-name">Sudo Command</p>
              <p className="foot-tag">Tech &amp; Creative Agency — การตลาด · เว็บ&amp;แอป · AI · IoT · IT Audit</p>
            </div>
            <nav className="foot-nav" aria-label="เมนูท้ายหน้า">
              <p className="foot-h">เมนู</p>
              <ul>
                <li><a href="#services" onClick={nav('services')}>บริการ</a></li>
                {WORKS.length > 0 && (
                  <li><a href="#work" onClick={nav('work')}>ผลงาน</a></li>
                )}
                <li><a href="#process" onClick={nav('process')}>วิธีทำงาน</a></li>
                <li><a href="#faq" onClick={nav('faq')}>คำถามที่พบบ่อย</a></li>
                <li><a href="#contact" onClick={nav('contact')}>ติดต่อ</a></li>
              </ul>
            </nav>
            <div className="foot-channels">
              <p className="foot-h">ช่องทางติดต่อ</p>
              <ul>
                {CHANNELS.map((c) => {
                  const external = c.href.startsWith('http')
                  return (
                    <li key={c.key}>
                      <a
                        href={c.href}
                        target={external ? '_blank' : undefined}
                        rel={external ? 'noopener noreferrer' : undefined}
                      >
                        {c.label}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
          <div className="foot-inner">
            <p>© {new Date().getFullYear()} Sudo Command — บางมด กรุงเทพฯ</p>
            <a className="foot-top" href="#top" onClick={nav('top')}>
              กลับขึ้นบน
              <Icon name="chevron" />
            </a>
          </div>
        </div>
      </footer>

      <FloatingContact channels={CHANNELS} />

      <ScrollTop />

      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        actions={actions}
      />

      <ServiceModal
        service={SERVICES.find((s) => s.id === svcOpen)}
        onClose={() => setSvcOpen(null)}
        onQuote={() => {
          setSvcOpen(null)
          goto('contact')
        }}
      />

      <div className="toast" role="status" aria-live="polite">
        {toast && <span>{toast}</span>}
      </div>
    </>
  )
}

export default App
