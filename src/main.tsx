import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import SingleFileUploader from './components/SingleFileUploader.tsx'
import MultipleFileUploader from './components/MultipleFileUploader.tsx'
import UploadcareUploader from './components/UploadcareUploader.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <SingleFileUploader /> */}
    {/* <MultipleFileUploader /> */}
    <UploadcareUploader />
  </React.StrictMode>,
)
