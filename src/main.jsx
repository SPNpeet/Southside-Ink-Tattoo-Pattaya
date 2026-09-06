import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const root = document.getElementById('root')
const initialLang = document.documentElement.lang === 'en' ? 'en' : 'th'
const tree = (
  <StrictMode>
    <App initialLang={initialLang} />
  </StrictMode>
)
if (root.hasChildNodes()) hydrateRoot(root, tree)
else createRoot(root).render(tree)
