import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './i18n'
import './styles/index.css'

// 브라우저의 자동 스크롤 복원 기능을 꺼서 새로고침 시 스크롤 누적 버그 방지
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
