import { MEDITATION_DATES } from "../constants/meditation_data";

/**
 * Fetch all meditation data.
 * Loads directly from the local MEDITATION_DATES constant.
 */
export const getMeditationData = async () => {
  return { ...MEDITATION_DATES };
};

/**
 * Saves the entire meditation dataset.
 * If we are running in localhost (development environment), we save to the local file via API.
 */
export const saveAllMeditations = async (data) => {
  // 로컬 개발 환경(Vite Dev Server)일 때만 로컬 파일 동기화를 시도하여 외부 클라우드(Vercel, Cloudflare 등) 배포 시 오류가 나지 않도록 차단
  const isDev = import.meta.env.DEV;
  if (isDev) {
    const response = await fetch('/api/save-meditation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    
    const responseText = await response.text();
    let result;
    try {
      result = JSON.parse(responseText);
    } catch (parseErr) {
      throw new Error(`Local file sync failed parsing: ${responseText}`, { cause: parseErr });
    }
    if (!response.ok || !result.success) {
      throw new Error(result.error || 'Local file sync failed');
    }
  }
};

