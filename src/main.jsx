import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

const path = window.location.pathname

const PAGE_MAP = {
  '/about.html': 'about',
  '/games.html': 'games',
}

const page = PAGE_MAP[path] ?? 'home'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App page={page} />
  </StrictMode>,
)
