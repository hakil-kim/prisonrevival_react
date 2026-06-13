import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { CONFIG } from '../constants/config';
import VideoModal from '../components/common/VideoModal';

const VolunteerGuide = () => {
  const { t, i18n } = useTranslation();
  const [selectedVideo, setSelectedVideo] = useState(null);

  const volunteerImages = [
    'KakaoTalk_Photo_2026-06-11-15-39-39 001.jpeg',
    'KakaoTalk_Photo_2026-06-11-15-39-40 002.png',
    'KakaoTalk_Photo_2026-06-11-15-39-40 003.jpeg',
    'KakaoTalk_Photo_2026-06-11-15-39-40 004.jpeg',
    'KakaoTalk_Photo_2026-06-11-15-39-40 005.jpeg',
    'KakaoTalk_Photo_2026-06-11-15-39-41 006.jpeg',
    'KakaoTalk_Photo_2026-06-11-15-39-41 007.jpeg',
    'KakaoTalk_Photo_2026-06-11-15-39-41 008.jpeg',
    'KakaoTalk_Photo_2026-06-11-15-39-42 009.png',
    'KakaoTalk_Photo_2026-06-11-15-39-42 010.png',
    'KakaoTalk_Photo_2026-06-11-15-39-58 001.jpeg',
    'KakaoTalk_Photo_2026-06-11-15-39-59 002.png',
    'KakaoTalk_Photo_2026-06-11-15-39-59 003.png',
    'KakaoTalk_Photo_2026-06-11-15-40-00 004.png',
    'KakaoTalk_Photo_2026-06-11-15-40-00 005.png',
    'KakaoTalk_Photo_2026-06-11-15-40-01 006.png',
    'KakaoTalk_Photo_2026-06-11-15-40-01 007.jpeg',
    'KakaoTalk_Photo_2026-06-11-15-40-02 008.jpeg',
    'KakaoTalk_Photo_2026-06-11-15-40-02 009.jpeg',
    'KakaoTalk_Photo_2026-06-11-15-40-02 010.jpeg',
    'KakaoTalk_Photo_2026-06-11-15-40-15 001.jpeg',
    'KakaoTalk_Photo_2026-06-11-15-40-16 002.png',
    'KakaoTalk_Photo_2026-06-11-15-40-16 003.png',
    'KakaoTalk_Photo_2026-06-11-15-40-16 004.jpeg',
    'KakaoTalk_Photo_2026-06-11-15-40-17 005.jpeg',
    'KakaoTalk_Photo_2026-06-11-15-40-17 006.png',
    'KakaoTalk_Photo_2026-06-11-15-40-18 007.jpeg',
    'KakaoTalk_Photo_2026-06-11-15-40-18 008.jpeg',
    'KakaoTalk_Photo_2026-06-11-15-40-18 009.jpeg',
    'KakaoTalk_Photo_2026-06-11-15-40-18 010.jpeg',
    'KakaoTalk_Photo_2026-06-11-15-40-35 001.jpeg',
    'KakaoTalk_Photo_2026-06-11-15-40-35 002.jpeg',
    'KakaoTalk_Photo_2026-06-11-15-40-35 003.jpeg',
    'KakaoTalk_Photo_2026-06-11-15-40-36 004.jpeg',
    'KakaoTalk_Photo_2026-06-11-15-40-36 005.jpeg',
    'KakaoTalk_Photo_2026-06-11-15-40-36 006.jpeg',
    'KakaoTalk_Photo_2026-06-11-15-40-36 007.jpeg',
    'KakaoTalk_Photo_2026-06-11-15-40-38 008.jpeg',
    'KakaoTalk_Photo_2026-06-11-15-40-38 009.jpeg',
    'KakaoTalk_Photo_2026-06-11-15-40-38 010.jpeg',
    'KakaoTalk_Photo_2026-06-11-15-40-52 001.jpeg',
    'KakaoTalk_Photo_2026-06-11-15-40-52 002.jpeg',
    'KakaoTalk_Photo_2026-06-11-15-40-52 003.jpeg'
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
    <main id="volunteer-guide-page">
      <section className="page-hero">
        <div className="page-hero-bg"></div>
        <div className="container">
          <h1 className="section-title fade-in">{t('volGuideTitleMain')}</h1>
          <p className="section-desc fade-in delay-1">{t('volGuideDescMain')}</p>
        </div>
      </section>

      <div className="container">

      {/* 1. Intro */}
      <section id="intro" className="guide-section scroll-reveal">
        <h2 className="sub-section-title" style={{ textAlign: 'center', marginBottom: '3rem' }}>{t('volGuideIntroTitle')}</h2>
        
        {/* 이미지 배너 영역 */}
        <div className="volunteer-intro-banners" style={{ 
          display: 'flex', 
          gap: '2rem', 
          marginBottom: '3.5rem', 
          justifyContent: 'center', 
          flexWrap: 'wrap',
          width: '100%',
          boxSizing: 'border-box'
        }}>
          <div className="banner-item" style={{ 
            flex: '1 1 350px', 
            height: '350px', 
            borderRadius: '12px', 
            overflow: 'hidden', 
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
            border: '1px solid #eaeaea'
          }}>
            <img 
              src="/images/volunteer_guide_banner1.png" 
              alt="Prison Revival & Angel Tree Volunteer Banner" 
              style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }} 
            />
          </div>
          <div className="banner-item" style={{ 
            flex: '1 1 350px', 
            height: '350px', 
            borderRadius: '12px', 
            overflow: 'hidden', 
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
            border: '1px solid #eaeaea'
          }}>
            <img 
              src="/images/volunteer_guide_banner2.png" 
              alt="3rd Anniversary Service Group Photo" 
              style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }} 
            />
          </div>
        </div>

        <div 
          className="guide-intro-box" 
          dangerouslySetInnerHTML={{ __html: t('volGuideIntroText') }}
        ></div>
      </section>

      {/* 2. Kakao Support */}
      <section id="support" className="guide-section scroll-reveal" style={{ textAlign: 'center' }}>
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
      <section id="guide" className="guide-section scroll-reveal">
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
      <section id="chatroom" className="guide-section scroll-reveal" style={{ textAlign: 'center' }}>
        <h2 className="sub-section-title" style={{ marginBottom: '1rem' }}>{t('volGuideChatTitle')}</h2>
        <p style={{ color: '#777' }}>{t('volGuideChatDesc')}</p>
        
        {(() => {
          let isKo = false;
          try {
            isKo = i18n.language && i18n.language.split('-')[0] === 'ko';
          } catch (e) {
            console.error('Failed to parse language in VolunteerGuide:', e);
          }

          const rooms = [
            { 
              key: 'main', 
              img: isKo ? 'chat_main_ko.jpg' : 'chat_main_en.jpg', 
              alt: isKo ? '메인공지방 참여하기' : 'Join the Main Announcement Channel' 
            },
            { 
              key: 'prayer', 
              img: isKo ? 'chat_prayer_ko.jpg' : 'chat_prayer_en.jpg', 
              alt: isKo ? '중보기도방 참여하기' : 'Join the Intercessory Prayer Room' 
            },
            { 
              key: 'meditation', 
              img: isKo ? 'chat_meditation_ko.jpg' : 'chat_meditation_en.jpg', 
              alt: isKo ? '7일치 묵상방 참여하기' : 'Join the 7-Day Devotional Ministry Room' 
            }
          ];

          return (
            <div className="chat-image-group" style={{ 
              display: 'flex', 
              gap: '2rem', 
              marginTop: '3rem', 
              justifyContent: 'center', 
              flexWrap: 'wrap',
              width: '100%',
              boxSizing: 'border-box'
            }}>
              {rooms.map((room) => (
                <div 
                  key={room.key}
                  className="chat-room-card"
                  onClick={() => window.open(CONFIG.volunteerGuideLinks.chatRooms[room.key], '_blank')}
                >
                  <img 
                    src={`/images/${room.img}`} 
                    alt={room.alt} 
                    style={{ width: '100%', height: 'auto', display: 'block' }} 
                  />
                </div>
              ))}
            </div>
          );
        })()}
      </section>

      {/* 5. Contributors */}
      <section id="contributors" className="guide-section scroll-reveal">
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
