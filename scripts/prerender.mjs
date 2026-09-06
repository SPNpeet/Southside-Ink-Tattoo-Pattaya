import { readFileSync, writeFileSync, rmSync } from 'node:fs'
import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'

const dist = resolve('dist')
const serverEntry = pathToFileURL(resolve(dist, 'server/entry-server.js')).href
const { render } = await import(serverEntry)
const html = render()
const indexPath = resolve(dist, 'index.html')
const template = readFileSync(indexPath, 'utf-8')
const marker = '<div id="root"></div>'
if (!template.includes(marker)) throw new Error('root marker not found in dist/index.html')
writeFileSync(indexPath, template.replace(marker, `<div id="root">${html}</div>`))
rmSync(resolve(dist, 'server'), { recursive: true, force: true })
console.log('prerendered index.html', html.length, 'chars')
