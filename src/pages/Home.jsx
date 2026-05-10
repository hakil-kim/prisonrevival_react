import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import VideoModal from '../components/common/VideoModal';
import { CONFIG } from '../constants/config';

const Home = () => {
  const { t, i18n } = useTranslation();
  const [modalData, setModalData] = useState({ isOpen: false, videoId: '' });

  const openModal = (id) => setModalData({ isOpen: true, videoId: id });
  const closeModal = () => setModalData({ isOpen: false, videoId: '' });

  const currentLang = i18n.language.split('-')[0];

  return (
    <main>
      {/* Hero Section */}
      <div className="hero-wrapper" id="home">
        <h1 className="fade-in">{t('heroTitle')}</h1>
        <p className="fade-in delay-1">{t('heroDesc')}</p>

        <div 
          onClick={() => openModal(CONFIG.mainVideoId)}
          className="video-container fade-in delay-2" 
          style={{ display: 'block', cursor: 'pointer' }}
        >
          <div className="video-wrapper">
            <div className="video-thumb" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
              <img 
                src={`https://img.youtube.com/vi/${CONFIG.mainVideoId}/hqdefault.jpg`} 
                alt="Prison Revival Video" 
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
              <span className="play-icon" style={{ opacity: 1 }}></span>
            </div>
          </div>
        </div>
        
        <div className="hero-action fade-in delay-3">
          <a href="http://pf.kakao.com/_ptYAG/chat" target="_blank" rel="noopener noreferrer" className="volunteer-btn">
            {t('volunteerApply')}
          </a>
        </div>
      </div>
      
      {/* Devotional Section */}
      <section id="devotional" className="section container">
        <div className="devotional-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 className="sub-section-title">{t('navDownload')}</h2>
          <p>{t('heroDesc')}</p>
        </div>
        <div className="devotional-buttons">
          {Array.from({ length: CONFIG.currentMonthWeeks }).map((_, i) => {
            const weekKey = `week${i + 1}`;
            return (
              <div key={weekKey} className="btn-box">
                <button 
                  className="download-btn"
                  onClick={() => {
                    const link = CONFIG.devotionalLinks[weekKey]?.[currentLang];
                    if (link) window.open(link, '_blank');
                    else alert(t('linkPreparing'));
                  }}
                >
                  {t(weekKey)}
                </button>
              </div>
            );
          })}
        </div>
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link to="/meditation" className="secondary-btn">{t('viewRecentArchive')}</Link>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="section" id="intro">
        <div className="container">
          <h2 className="section-title">{t('introTitle')}</h2>
          <div className="intro-grid">
            <div className="missionary-img-wrapper">
              <img 
                src="/images/profile/missionary.jpg"
                alt="Missionary" 
                className="missionary-img"
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=800'; }}
              />
            </div>
            <div className="intro-content">
              <h3>{t('missionaryName')}</h3>
              <p>{t('missionaryDesc')}</p>
              <Link to="/intro" className="secondary-btn" style={{ marginTop: '2rem', display: 'inline-block' }}>{t('navIntro')} {t('viewMore')}</Link>
            </div>
          </div>

          <h3 style={{ marginTop: '8rem', textAlign: 'center', marginBottom: '3rem' }}>{t('partnersTitle')}</h3>
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
      </section>

      {/* Angel Tree Section */}
      <section className="section" id="angeltree">
        <div className="container">
          <div className="section-badge">🎄 Hope for Children</div>
          <h2 className="section-title">{t('navAngelTree')}</h2>
          <p className="section-desc">{t('angelDescMain')}</p>
          <div className="angel-tree-visual">
            <img 
              src="/images/angeltree/KakaoTalk_Photo_2026-05-02-23-44-41.png"
              alt="Angel Tree" 
              className="angel-tree-img" 
              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&q=80&w=1000'; }}
            />
          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/angeltree" className="secondary-btn">{t('navAngelTree')} {t('viewMore')}</Link>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="section section-dark" id="programs">
        <div className="container">
          <h2 className="section-title">{t('programsTitle')}</h2>
          <div className="programs-grid">
            <div className="program-card">
              <img src="https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&q=80&w=600" alt="Inside" />
              <div className="program-content">
                <h3>{t('insideTitle')}</h3>
                <p>{t('insideDesc')}</p>
                <Link to="/programs" className="text-link">{t('viewMore')} →</Link>
              </div>
            </div>
            <div className="program-card">
              <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=600" alt="Volunteer" />
              <div className="program-content">
                <h3>{t('volunteerTitle')}</h3>
                <p>{t('volunteerDesc')}</p>
                <Link to="/volunteer-programs" className="text-link">{t('viewMore')} →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Notice Section */}
      <section className="section section-notice" id="notice">
        <div className="container">
          <div className="section-icon">📋</div>
          <h2 className="section-title">{t('noticeTitle')}</h2>
          <div className="notice-board">
            <Link to="/notice/matching" className="notice-item">
              <div className="notice-left">
                <span className="notice-dot"></span>
                <span>{t('matchingStatus')}</span>
              </div>
              <span className="notice-tag">Updated</span>
            </Link>
            <Link to="/notice/revival-acc" className="notice-item">
              <div className="notice-left">
                <span className="notice-dot"></span>
                <span>{t('accountingReport')}</span>
              </div>
              <span className="notice-tag tag-monthly">Monthly</span>
            </Link>
          </div>
        </div>
      </section>

      <VideoModal 
        isOpen={modalData.isOpen} 
        videoId={modalData.videoId} 
        onClose={closeModal} 
      />
    </main>
  );
};

export default Home;
