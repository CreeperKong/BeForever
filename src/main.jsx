import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

const path = window.location.pathname
const page = path.endsWith('/about.html') ? 'about' : path.endsWith('/games.html') ? 'games' : 'home'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App page={page} />
  </StrictMode>,
)
