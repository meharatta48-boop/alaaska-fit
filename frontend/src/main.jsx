import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { applyPerformanceOptimizations } from './utils/performance.js'

if ('requestIdleCallback' in window) {
  window.requestIdleCallback(() => applyPerformanceOptimizations())
} else {
  window.setTimeout(() => applyPerformanceOptimizations(), 150)
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
