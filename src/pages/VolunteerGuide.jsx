import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { CONFIG } from '../constants/config';
import VideoModal from '../components/common/VideoModal';

const VolunteerGuide = () => {
  const { t } = useTranslation();
  const [selectedVideo, setSelectedVideo] = useState(null);

  const volunteerImages = [
    'KakaoTalk_Photo_2026-05-19-22-45-31.png',
    'KakaoTalk_Photo_2026-05-19-22-46-03.png',
    'KakaoTalk_Photo_2026-05-19-22-46-28.jpeg',
    'KakaoTalk_Photo_2026-05-19-22-46-46.png',
    'KakaoTalk_Photo_2026-05-19-22-46-58.jpeg',
    'KakaoTalk_Photo_2026-05-19-22-47-07.png',
    'KakaoTalk_Photo_2026-05-19-22-47-21.png',
    'KakaoTalk_Photo_2026-05-19-22-47-31.png',
    'KakaoTalk_Photo_2026-05-19-22-47-42.png',
    'KakaoTalk_Photo_2026-05-19-22-47-54.png',
    'KakaoTalk_Photo_2026-05-19-22-48-14.png',
    'KakaoTalk_Photo_2026-05-19-22-48-23.jpeg',
    'KakaoTalk_Photo_2026-05-21-11-47-55.png',
    'KakaoTalk_Photo_2026-05-21-11-48-18.png',
    'KakaoTalk_Photo_2026-05-21-11-48-31.jpeg',
    'KakaoTalk_Photo_2026-05-21-11-48-46.png',
    'KakaoTalk_Photo_2026-05-21-11-48-59.png',
    'KakaoTalk_Photo_2026-05-21-11-49-12.png',
    'KakaoTalk_Photo_2026-05-21-11-49-24.png',
    'KakaoTalk_Photo_2026-05-21-11-49-36.png',
    'KakaoTalk_Photo_2026-05-21-11-49-47.png',
    'KakaoTalk_Photo_2026-05-21-11-49-59.png'
  ];

  const imageCount = volunteerImages.length;
  // 매 페이지 로드마다 랜덤한 이미지부터 시작 (1 ~ imageCount 범위)
  const [currentIndex, setCurrentIndex] = useState(() => Math.floor(Math.random() * volunteerImages.length) + 1);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const slidesToRender = [
    volunteerImages[imageCount - 1],
    ...volunteerImages,
    volunteerImages[0]
  ];

  const nextSlide = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const prevSlide = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const handleTransitionEnd = () => {
    if (currentIndex === imageCount + 1) {
      setIsTransitioning(false);
      setCurrentIndex(1);
    } else if (currentIndex === 0) {
      setIsTransitioning(false);
      setCurrentIndex(imageCount);
    }
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const activeDotIndex = currentIndex === 0 
    ? imageCount - 1 
    : currentIndex === imageCount + 1 
      ? 0 
      : currentIndex - 1;

  return (
    <main>
      <section className="page-hero">
        <div className="page-hero-bg"></div>
        <div className="container">
          <h1 className="section-title fade-in">{t('volGuideTitleMain')}</h1>
          <p className="section-desc fade-in delay-1">{t('volGuideDescMain')}</p>
        </div>
      </section>

      <div className="container">

      {/* 1. Intro */}
      <section id="intro" className="guide-section fade-in delay-2">
        <h2 className="sub-section-title" style={{ textAlign: 'center', marginBottom: '3rem' }}>{t('volGuideIntroTitle')}</h2>
        <div 
          className="guide-intro-box" 
          dangerouslySetInnerHTML={{ __html: t('volGuideIntroText') }}
        ></div>
      </section>

      {/* 2. Kakao Support */}
      <section id="support" className="guide-section fade-in delay-3" style={{ textAlign: 'center' }}>
        <h2 className="sub-section-title" style={{ marginBottom: '3rem' }}>{t('volGuideKakaoTitle')}</h2>
        <div style={{ marginTop: '2rem' }}>
          <button 
            onClick={() => window.open(CONFIG.volunteerGuideLinks.kakaoSupport, '_blank')} 
            className="kakao-btn"
          >
            <span style={{ fontSize: '1.4rem' }}>💬</span>
            <span>{t('volGuideKakaoBtn')}</span>
          </button>
        </div>
      </section>

      {/* 3. Video Guides */}
      <section id="guide" className="guide-section fade-in delay-4">
        <h2 className="sub-section-title" style={{ textAlign: 'center', marginBottom: '1rem' }}>{t('volGuideVideoTitle')}</h2>
        <p style={{ textAlign: 'center', color: '#777', marginBottom: '3rem' }}>{t('volGuideVideoDesc')}</p>
        
        <div className="video-guide-grid">
          {CONFIG.videoGuides.map((guide) => (
            <div key={guide.id} className="video-card" onClick={() => setSelectedVideo(guide.videoId)}>
              <div className="video-thumb-placeholder">
                <div className="play-icon"></div>
              </div>
              <div className="video-info">
                <h4>{t(guide.titleKey)}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Chat Rooms */}
      <section id="chatroom" className="guide-section fade-in delay-5" style={{ textAlign: 'center' }}>
        <h2 className="sub-section-title" style={{ marginBottom: '1rem' }}>{t('volGuideChatTitle')}</h2>
        <p style={{ color: '#777' }}>{t('volGuideChatDesc')}</p>
        
        <div className="chat-btn-group">
          <button onClick={() => window.open(CONFIG.volunteerGuideLinks.chatRooms.main, '_blank')} className="chat-btn">
            <span>{t('volGuideChatBtn1')}</span>
            <span>🔗</span>
          </button>
          <button onClick={() => window.open(CONFIG.volunteerGuideLinks.chatRooms.prayer, '_blank')} className="chat-btn">
            <span>{t('volGuideChatBtn2')}</span>
            <span>🔗</span>
          </button>
          <button onClick={() => window.open(CONFIG.volunteerGuideLinks.chatRooms.meditation, '_blank')} className="chat-btn">
            <span>{t('volGuideChatBtn3')}</span>
            <span>🔗</span>
          </button>
        </div>
      </section>

      {/* 5. Contributors */}
      <section id="contributors" className="guide-section fade-in">
        <h2 className="sub-section-title" style={{ textAlign: 'center', marginBottom: '4rem' }}>{t('volGuideContributorsTitle')}</h2>
        
        <div className="pastor-slider-wrapper">
          <div className="pastor-slider">
            <div 
              className="pastor-slides" 
              style={{ 
                display: 'flex', 
                transition: isTransitioning ? 'transform 0.5s ease' : 'none', 
                transform: `translateX(-${currentIndex * 100}%)` 
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {slidesToRender.map((imgName, num) => {
                const imgSrc = `/images/volunteer_profile/${imgName}`;
                return (
                  <div key={num} className="pastor-slide" style={{ minWidth: '100%' }}>
                    <div 
                      className="pastor-slide-bg-blur" 
                      style={{ backgroundImage: `url("${imgSrc}")` }}
                    />
                    <img 
                      src={imgSrc} 
                      alt={`Volunteer ${num}`} 
                      style={{ maxHeight: '600px', objectFit: 'contain' }}
                    />
                  </div>
                );
              })}
            </div>
            <button className="slider-btn prev" onClick={prevSlide}>❮</button>
            <button className="slider-btn next" onClick={nextSlide}>❯</button>
            <div className="slider-dots">
              {volunteerImages.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`dot ${activeDotIndex === idx ? 'active' : ''}`}
                  onClick={() => {
                    setIsTransitioning(true);
                    setCurrentIndex(idx + 1);
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div style={{ marginTop: '6rem', textAlign: 'center', marginBottom: '6rem' }}>
        <Link to="/" className="secondary-btn">{t('backToHome')}</Link>
      </div>
    </div>

      {selectedVideo && (
        <VideoModal videoId={selectedVideo} onClose={() => setSelectedVideo(null)} />
      )}
    </main>
  );
};

export default VolunteerGuide;
