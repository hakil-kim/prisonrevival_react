import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'save-meditation-api',
      configureServer(server) {
        const saveMeditationMiddleware = (req, res, next) => {
          const url = req.url ? req.url.split('?')[0] : '';
          if (url === '/api/save-meditation') {
            console.log(`[API Debug] Intercepted Request - Method: ${req.method}, URL: ${req.url}`);
            
            if (req.method === 'POST') {
              let body = '';
              req.on('data', chunk => {
                body += chunk.toString();
              });
              req.on('end', () => {
                console.log(`[API Debug] Stream ended. Body length: ${body.length}`);
                try {
                  if (!body) {
                    throw new Error('전송된 데이터가 비어 있습니다.');
                  }
                  const data = JSON.parse(body);
                  console.log(`[API Debug] Parsed keys: ${Object.keys(data).join(', ')}`);
                  
                  const filePath = path.resolve(__dirname, 'src/constants/meditation_data.js');
                  const fileContent = `export const MEDITATION_DATES = ${JSON.stringify(data, null, 2)};\n`;
                  fs.writeFileSync(filePath, fileContent, 'utf-8');
                  console.log(`[API Debug] File saved successfully`);
                  
                  res.writeHead(200, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ success: true }));
                } catch (err) {
                  console.error(`[API Debug] Error: ${err.message}`);
                  res.writeHead(500, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ error: err.message || '알 수 없는 서버 에러' }));
                }
              });
              return;
            }
          }
          next();
        };

        // 미들웨어 스택의 가장 최상단에 추가하여 다른 미들웨어가 404를 리턴하기 전에 가로챔
        server.middlewares.stack.unshift({
          route: '',
          handle: saveMeditationMiddleware
        });
      }
    }
  ],
  server: {
    watch: {
      usePolling: true // 소스 수정 시 자동 반영(HMR)을 100% 보장하는 폴링 설정
    }
  }
})
