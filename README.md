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

## Deploy

push ขึ้น `main` แล้ว GitHub Actions (`.github/workflows/deploy.yml`) จะ build และ deploy ให้เอง
