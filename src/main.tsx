import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './app'
import { Toaster } from 'sonner'

import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './hooks/useCart'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <CartProvider>
      <App />
    </CartProvider>
    </BrowserRouter>
    <Toaster richColors/>
  </React.StrictMode>,
)