# Southside Ink Tattoo Pattaya — กฎประจำโปรเจกต์

เว็บหน้าร้านสัก Southside Ink Pattaya (เจ้าของร้าน: คุณ Orawan ส่งงานผ่าน Messenger กลุ่ม "เว็บร้านสัก")
React + Vite → GitHub Pages ที่ https://spnpeet.github.io/Southside-Ink-Tattoo-Pattaya/
หน้าเดียว ไม่มี router ไม่มีหลังบ้าน ข้อความทั้งหมดอยู่ใน `I18N` และช่องทางติดต่อใน `CONTACT` หัวไฟล์ `src/App.jsx`

---

## 1. สิ่งที่ลูกค้าสั่งไว้ (5 ก.ย. 2569) ห้ามย้อนกลับ

- โครงหน้ามี **5 หัวข้อเท่านั้น**: About us / Style / Artist / Locations / Contact
  รีวิว "ลูกค้าพูดถึงเรา" ลูกค้าเลือกให้อยู่หน้าหลักได้ (อยู่ใต้ Artist)
- **ห้ามใส่ราคางานสัก** ทุกที่ รวม FAQ, meta description, ข้อความปุ่ม
- **ห้ามใส่ป้ายประเภทใต้รูปผลงาน** เพราะไม่รู้ว่ารูปไหนสไตล์ไหน ใส่แล้วผิดหลายอัน
  รายการสไตล์ใน Style จึงเป็นรายการอ่านอย่างเดียว ไม่ใช่ปุ่มกรอง
- **เวลาเปิด-ปิด 13:00–24:00** ทุกวัน ต้องตรงกันทุกจุด: kicker, Locations, footer, `index.html` (meta + JSON-LD)
- **หน้าแรกบนมือถือต้องเต็มจอพอดี** แบบ ink.inc ห้ามมีอะไรกว้างเกิน 375px (ASCII art เคยทำหน้ามือถือย่อจนอ่านไม่ออก)
- ข้อความ About us ไทย/อังกฤษ และข้อความช่าง Artist Ploy มาจากลูกค้าโดยตรง แก้ถ้อยคำต้องถามก่อน

## 2. กฎที่ห้ามละเมิด

- ห้ามแต่งข้อมูลที่พิสูจน์ไม่ได้ (ตัวเลข ผลงาน รีวิว) เว็บนี้ลูกค้าจริงใช้ตัดสินใจ
- ทุกอย่างที่ดูกดได้ ต้องกดได้จริง ช่องทางที่ยังไม่มีค่าใน `CONTACT` ห้ามเรนเดอร์ปุ่ม
- ห้ามใช้อิโมจิเป็นไอคอน ใช้ SVG ที่วาดในไฟล์ (`IconCheck`, `IconLine`, ...)
- ห้ามกล่องเทอร์มินัลปลอม / ASCII art ในหน้าแรก

## 3. เกณฑ์ที่ต้องผ่านก่อนถือว่าเสร็จ

- `npm run build` ผ่าน และ `npm run lint` exit 0
- ไม่มี horizontal overflow ที่ 375px (`document.documentElement.scrollWidth === innerWidth`)
- hero สูงเท่าจอมือถือ (ใช้ `100svh - nav`)
- เป้ากดบนมือถือไม่ต่ำกว่า 44px
- ไม่มีลิงก์ที่ href ว่าง

## 4. ข้อควรระวังตอนทดสอบใน Browser pane

- screenshot ถ่ายได้แค่ส่วนบนของหน้า เลื่อนลงแล้วภาพดำ วิธีดูส่วนล่าง: ตั้ง viewport สูง ๆ
  แล้วซ่อน section บน ๆ ด้วย `style.display='none'` ชั่วคราว (ใช้ตรวจเท่านั้น)
- headless Chrome `--screenshot` ใช้ไม่ได้กับหน้านี้ เพราะ hero ใช้ `svh` จะยืดเท่าความสูง window

## 5. งานที่ต้องให้เจ้าของทำเอง

- รูปโปสเตอร์ ARTIST PLOY ต้องได้ไฟล์จริง ดึงจาก Messenger เองไม่ได้
- แก้ไขเพจเฟซบุ๊ก / LINE OA ต้องขออนุญาตเฉพาะเจาะจงทุกครั้ง

## 6. คำสั่งที่ใช้บ่อย

```bash
npm run dev      # เซิร์ฟเวอร์ระหว่างพัฒนา
npm run build    # build ลง dist/
npm run preview  # ดู dist/ จริง ที่ /Southside-Ink-Tattoo-Pattaya/
npm run lint     # oxlint
```

deploy อัตโนมัติเมื่อ push ขึ้น `main` ผ่าน `.github/workflows/deploy.yml`
`vite.config.js` ต้องคง `base: '/Southside-Ink-Tattoo-Pattaya/'` ไว้เสมอ ไม่งั้น asset 404 ทั้งเว็บ

ตรวจผลรัน workflow จาก API (`/actions/runs` ดู `conclusion`) อย่าเชื่อหน้า Actions ที่ render มา
