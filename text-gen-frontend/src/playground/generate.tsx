import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import PlayGround from '@/playground/homepage'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PlayGround />
  </StrictMode>,
)