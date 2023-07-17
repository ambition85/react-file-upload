import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import SingleFileUploader from './components/SingleFileUploader.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <App /> */}
    <SingleFileUploader />
  </React.StrictMode>,
)
