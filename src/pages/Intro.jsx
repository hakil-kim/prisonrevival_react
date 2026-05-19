import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { CONFIG } from '../constants/config';

const Intro = () => {
  const { t } = useTranslation();
  const { hash } = useLocation();
  const pastorCount = 6;
  const pastorNumbers = [1, 2, 3, 4, 5, 6];
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const slidesToRender = [
    pastorNumbers[pastorCount - 1],
    ...pastorNumbers,
    pastorNumbers[0]
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
    if (currentIndex === pastorCount + 1) {
      setIsTransitioning(false);
      setCurrentIndex(1);
    } else if (currentIndex === 0) {
      setIsTransitioning(false);
      setCurrentIndex(pastorCount);
    }
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const activeDotIndex = currentIndex === 0 
    ? pastorCount - 1 
    : currentIndex === pastorCount + 1 
      ? 0 
      : currentIndex - 1;

  // Handle hash scrolling
  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [hash]);

  return (
    <main id="intro-page">
      <section className="page-hero">
        <div className="page-hero-bg"></div>
        <div className="container">
          <h1 className="section-title fade-in">{t('introPageTitle')}</h1>
          <p className="section-desc fade-in delay-1">{t('introPageDesc')}</p>
        </div>
      </section>

      <section className="section container">
        {/* 1. Ministry Intro */}
        <div id="ministry" className="intro-section-block">
          <h2 className="sub-section-title">{t('introMain')}</h2>
          <div 
            className="intro-text-box" 
            dangerouslySetInnerHTML={{ __html: t('introMainText') }}
          ></div>
        </div>

        {/* 2. Missionary Intro */}
        <div id="missionary" className="intro-section-block">
          <h2 className="sub-section-title">{t('missionaryInfo')}</h2>
          <div className="missionary-intro-container">
            <div className="missionary-profile-column">
              <div className="missionary-photo-area">
                <img src="/images/profile/missionary_eunmi_lim.jpg" alt="Missionary" className="missionary-profile-img" />
              </div>
            </div>
            <div className="missionary-recommendation-area">
              <h3>{t('recommendation')}</h3>
              <p className="recommendation-text" dangerouslySetInnerHTML={{ __html: t('recommendationText') }}></p>
              
              <div style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <button 
                  className="secondary-btn full-width-btn" 
                  onClick={() => window.open('https://eunice825.com/%EC%82%AC%EC%97%AD%EC%86%8C%EA%B0%9C', '_blank')}
                >
                  {t('missionarySiteBtn')}
                </button>
                <button 
                  className="secondary-btn full-width-btn" 
                  onClick={() => window.open('https://www.youtube.com/c/EUNICEYIMNEWCOMB', '_blank')}
                >
                  {t('missionaryYtBtn')}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Partner Pastors Slider */}
        <div id="pastors" className="intro-section-block">
          <h2 className="sub-section-title">{t('pastorIntro')}</h2>
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
                {slidesToRender.map((num, idx) => {
                  const imgSrc = `/images/profile/KakaoTalk_Photo_2026-04-27-09-39-59 00${num}.png`;
                  return (
                    <div key={idx} className="pastor-slide" style={{ minWidth: '100%' }}>
                      <div 
                        className="pastor-slide-bg-blur" 
                        style={{ backgroundImage: `url("${imgSrc}")` }}
                      />
                      <img src={imgSrc} alt={`Pastor ${num}`} />
                    </div>
                  );
                })}
              </div>
              <button className="slider-btn prev" onClick={prevSlide}>❮</button>
              <button className="slider-btn next" onClick={nextSlide}>❯</button>
              <div className="slider-dots">
                {pastorNumbers.map((_, idx) => (
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
        </div>

        {/* 4. CEO Greeting */}
        <div id="ceo" className="intro-section-block">
          <h2 className="sub-section-title">{t('ceoGreeting')}</h2>
          <div 
            className="intro-text-box" 
            dangerouslySetInnerHTML={{ __html: t('ceoGreetingText') }}
          ></div>
        </div>

        {/* Press Section */}
        <div id="press" className="intro-sub-section">
          <h2 className="sub-section-title">{t('pressTitle')}</h2>
          <div className="press-list">
            <div className="press-item" onClick={() => window.open(CONFIG.introLinks.press.lawToday, '_blank')}>
              <span className="press-name">{t('pressLawToday')}</span>
              <span className="press-link">🔗</span>
            </div>
            <div className="press-item" onClick={() => window.open(CONFIG.introLinks.press.goodNews, '_blank')}>
              <span className="press-name">{t('pressGoodNews')}</span>
              <span className="press-link">🔗</span>
            </div>
          </div>
        </div>

        {/* Partners Section */}
        <div id="partners" className="intro-sub-section">
          <h2 className="sub-section-title">{t('partnersFull')}</h2>
          <div className="partners-links-grid">
            <a href="#" onClick={(e) => { e.preventDefault(); window.open(CONFIG.introLinks.partners.samintl, '_blank'); }}>{t('partnerSam')}</a>
            <a href="#" onClick={(e) => { e.preventDefault(); window.open(CONFIG.introLinks.partners.godpeople, '_blank'); }}>{t('partnerGodpeople')}</a>
            <a href="#" onClick={(e) => { e.preventDefault(); window.open(CONFIG.introLinks.partners.kyujang, '_blank'); }}>{t('partnerKyujang')}</a>
            <a href="#" onClick={(e) => { e.preventDefault(); window.open(CONFIG.introLinks.partners.iseum, '_blank'); }}>{t('partnerIseum')}</a>
            <a href="#" onClick={(e) => { e.preventDefault(); window.open(CONFIG.introLinks.partners.jusomang, '_blank'); }}>{t('partnerJusomang')}</a>
            <a href="#" onClick={(e) => { e.preventDefault(); window.open(CONFIG.introLinks.partners.alliance, '_blank'); }}>{t('partnerAlliance')}</a>
            <a href="#" onClick={(e) => { e.preventDefault(); window.open(CONFIG.introLinks.partners.fellowship, '_blank'); }}>{t('partnerFellowship')}</a>
          </div>
        </div>

        <div style={{ marginTop: '6rem', textAlign: 'center' }}>
          <Link to="/" className="secondary-btn">{t('backToHome')}</Link>
        </div>
      </section>
    </main>
  );
};

export default Intro;

