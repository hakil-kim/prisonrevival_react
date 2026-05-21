import { db } from "../firebase";
import { MEDITATION_DATES } from "../constants/meditation_data";
import { ref, get, set } from "firebase/database";

// Toggle to use Firebase. Set to false to revert to the old local file storage method.
export const USE_FIREBASE = true;

const DB_PATH = "meditations";

/**
 * Fetch all meditation data.
 * If USE_FIREBASE is true, fetches from Realtime Database.
 * If Realtime Database is empty, seeds it with the local MEDITATION_DATES.
 * If fetching fails, falls back to local MEDITATION_DATES.
 */
export const getMeditationData = async () => {
  const localData = { ...MEDITATION_DATES };

  if (!USE_FIREBASE) {
    return localData;
  }

  try {
    const dbRef = ref(db, DB_PATH);
    const snapshot = await get(dbRef);
    
    if (snapshot.exists()) {
      const dbData = snapshot.val() || {};
      const merged = { ...dbData };

      // 우선순위 1: 로컬 데이터 (meditation_data.js)
      // 우선순위 2: Firebase Realtime Database
      Object.keys(localData).forEach((date) => {
        const localLinks = localData[date] || {};
        const dbLinks = dbData[date] || {};

        // 로컬 데이터에 유효한 링크가 하나라도 있는지 확인
        const hasValidLocalLink = Object.values(localLinks).some(
          (link) => link && link.trim() !== ""
        );

        if (hasValidLocalLink) {
          // 유효한 로컬 데이터가 있으면 로컬 데이터를 우선 적용 (우선순위 1)
          merged[date] = localLinks;
        } else if (dbData[date]) {
          // 로컬 데이터가 비어있고 DB에 데이터가 존재하면 DB 데이터를 유지 (우선순위 2)
          merged[date] = dbLinks;
        } else {
          // 둘 다 비어있는 경우 빈 로컬 데이터 형식을 유지
          merged[date] = localLinks;
        }
      });

      return merged;
    }
    return localData;
  } catch (error) {
    console.error("Error fetching meditation data from Realtime Database. Falling back to local data:", error);
    return localData;
  }
};

/**
 * Saves the entire meditation dataset.
 * If USE_FIREBASE is true:
 * - Writes the entire dataset to the `/meditations` path.
 * If we are running in localhost, we also try to save to the local file.
 */
export const saveAllMeditations = async (data) => {
  if (USE_FIREBASE) {
    const dbRef = ref(db, DB_PATH);
    await set(dbRef, data);
  }

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
      throw new Error(`Local file sync failed parsing: ${responseText}`);
    }
    if (!response.ok || !result.success) {
      throw new Error(result.error || 'Local file sync failed');
    }
  }
};
