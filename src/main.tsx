import React from 'react'
import ReactDOM from 'react-dom/client'
// 1. Importujemy BrowserRouter
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* 2. "Owinęliśmy" <App /> w <BrowserRouter> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)