import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true, // 소스 수정 시 자동 반영(HMR)을 100% 보장하는 폴링 설정
    }
  }
})
