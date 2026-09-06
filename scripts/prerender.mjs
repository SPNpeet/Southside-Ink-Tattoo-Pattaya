import { readFileSync, writeFileSync, rmSync, mkdirSync } from 'node:fs'
import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'

const dist = resolve('dist')
const { render } = await import(pathToFileURL(resolve(dist, 'server/entry-server.js')).href)
const template = readFileSync(resolve(dist, 'index.html'), 'utf-8')
const marker = '<div id="root"></div>'
if (!template.includes(marker)) throw new Error('root marker not found in dist/index.html')

const cssMatch = template.match(/<link rel="stylesheet"[^>]*href="([^"]+\.css)"[^>]*>/)
if (!cssMatch) throw new Error('stylesheet link not found')
const css = readFileSync(resolve(dist, cssMatch[1].replace(/^[./]+/, '')), 'utf-8').replaceAll('url(../fonts/', 'url(/fonts/')

const SITE = 'https://southsideinkpattaya.com'
const META = {
  th: {
    path: '/',
    title: 'Southside Ink Tattoo Pattaya — ร้านสักพัทยา ใกล้ Walking Street',
    desc: 'ร้านสักพัทยา ห่างจาก Walking Street ไม่กี่นาที เปิดทุกวัน 13:00–24:00 รับ Walk-in ช่างสักประสบการณ์กว่า 10 ปี Realism, Black & Grey, Japanese, Fine Line และทุกสไตล์ 5.0★ 47 รีวิวใน Google',
    locale: 'th_TH',
    alt: 'en_US',
  },
  en: {
    path: '/en/',
    title: 'Southside Ink Tattoo Pattaya — Tattoo Studio near Walking Street',
    desc: 'Tattoo studio in Pattaya, a few minutes from Walking Street. Open daily 13:00–24:00, walk-ins welcome. Artists with 10+ years of experience. Realism, Black & Grey, Japanese, Fine Line and every style. 5.0★ 47 Google reviews.',
    locale: 'en_US',
    alt: 'th_TH',
  },
}

const langHint = (lang) =>
  `<script>(function(){try{var s=localStorage.getItem('southside-lang');if(s==='th'||s==='en'){if(s!=='${lang}')document.documentElement.setAttribute('data-langhint','1');return}var want=/^th/i.test(navigator.language||'')?'th':'en';if(want!=='${lang}')document.documentElement.setAttribute('data-langhint','1')}catch(e){}})()</script>`

const hreflang = [
  `<link rel="alternate" hreflang="th" href="${SITE}/" />`,
  `<link rel="alternate" hreflang="en" href="${SITE}/en/" />`,
  `<link rel="alternate" hreflang="x-default" href="${SITE}/" />`,
].join('\n    ')

for (const [lang, m] of Object.entries(META)) {
  const out = template
    .replace(marker, `<div id="root">${render(lang)}</div>`)
    .replace(cssMatch[0], `<style>${css}</style>`)
    .replace('<html lang="th">', `<html lang="${lang}">`)
    .replace(/<title>[^<]*<\/title>/, `<title>${m.title}</title>`)
    .replace(/<meta\s+name="description"[\s\S]*?\/>/, `<meta name="description" content="${m.desc}" />`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${m.title}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${m.desc}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${SITE}${m.path}$2`)
    .replace(/(<meta property="og:locale" content=")[^"]*(")/, `$1${m.locale}$2`)
    .replace(/(<meta property="og:locale:alternate" content=")[^"]*(")/, `$1${m.alt}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${SITE}${m.path}$2`)
    .replace('</head>', `  ${hreflang}\n    ${langHint(lang)}\n  </head>`)
  const dir = lang === 'th' ? dist : resolve(dist, 'en')
  if (lang !== 'th') mkdirSync(dir, { recursive: true })
  writeFileSync(resolve(dir, 'index.html'), out)
  console.log('prerendered', m.path, out.length, 'bytes')
}
rmSync(resolve(dist, 'server'), { recursive: true, force: true })
