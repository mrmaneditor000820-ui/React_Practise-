import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HashRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 4000,
          style: {
            zIndex: 999999,
            fontSize: '14px',
          },
        }}
        containerStyle={{ top: 20 }}
      />
      <HashRouter>
        <App />
      </HashRouter>
    </>
  </StrictMode>,
)
