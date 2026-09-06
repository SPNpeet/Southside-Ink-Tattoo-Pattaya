# Southside Ink Tattoo Pattaya

เว็บหน้าร้านสัก Southside Ink Pattaya หน้าเดียว (React + Vite) เสิร์ฟผ่าน GitHub Pages ที่ https://southsideinkpattaya.com

## โครงสร้าง

- `src/App.jsx` เนื้อหาทั้งหมด ข้อความสองภาษาอยู่ใน `I18N` ช่องทางติดต่อใน `CONTACT` รายการรูปใน `WORKS` และหมวดสไตล์ของแต่ละรูปใน `WORK_STYLES`
- `src/index.css` สไตล์ทั้งหมด
- `public/images/works/` รูปผลงานขนาด 1600px และ `thumb/` ขนาด 720px สำหรับกริด
- `public/CNAME` โดเมนหลัก ห้ามลบ

## คำสั่ง

```bash
npm ci
npm run dev
npm run build
npm run preview
npm run lint
```

## เพิ่มรูปผลงานใหม่

1. วางไฟล์ `.jpg` ใน `public/images/works/` (ย่อให้ไม่เกิน 1600px) และสร้างไฟล์ชื่อเดียวกันขนาด 720px ใน `public/images/works/thumb/`
2. เพิ่มชื่อไฟล์ (ไม่มีนามสกุล) ต่อท้าย `WORKS` และเพิ่มหมวดสไตล์ในตำแหน่งเดียวกันของ `WORK_STYLES`

## สองภาษา

ไทยอยู่ที่ `/` อังกฤษอยู่ที่ `/en/` เนื้อหาทั้งหมดมาจาก `I18N` ไฟล์เดียว
`npm run build` จะ prerender ทั้งสองหน้าให้เอง ไม่ต้องแก้ไฟล์ HTML แยก

## Build แบบ pre-render

`npm run build` ทำ 3 ขั้น: build ฝั่ง client, build `src/entry-server.jsx` แบบ SSR, แล้ว `scripts/prerender.mjs`
ฝัง HTML ที่ render แล้วลง `dist/index.html` ให้หน้าแรกแสดงทันทีก่อน JS โหลด ฝั่ง client ใช้ `hydrateRoot`
ข้อควรระวัง: โค้ดที่แตะ `window`/`localStorage`/`navigator`/เวลา ต้องอยู่ใน `useEffect` หรือ handler เท่านั้น
ไม่งั้น build ล้มหรือ hydration ไม่ตรงกัน ภาษาของแต่ละหน้าถูกกำหนดตอน prerender แล้ว (`/` ไทย, `/en/` อังกฤษ) ไม่มีการสลับหลังโหลด

## Deploy

push ขึ้น `main` แล้ว GitHub Actions (`.github/workflows/deploy.yml`) จะ build และ deploy ให้เอง
