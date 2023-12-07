import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/authContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Toaster toastOptions={{duration:4000}}/>
    <AuthProvider>
    <App />
    </AuthProvider>
  </React.StrictMode>,
)
