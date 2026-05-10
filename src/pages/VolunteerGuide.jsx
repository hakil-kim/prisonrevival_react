import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { CONFIG } from '../constants/config';
import VideoModal from '../components/common/VideoModal';

const VolunteerGuide = () => {
  const { t } = useTranslation();
  const [selectedVideo, setSelectedVideo] = useState(null);

  const contributors = [
    { name: "Tim Curington", title: "Executive Director", img: "contributor1.jpg" },
    { name: "Heath Placek", title: "Development and Communications Director", img: "contributor2.jpg" },
    { name: "Clever Prince", title: "Operations Director", img: "contributor3.jpg" },
    { name: "Paul Jimenez", title: "Engagement Manager", img: "contributor4.jpg" },
    { name: "Dee Green", title: "Program Manager", img: "contributor5.jpg" },
    { name: "Andrea Andrews", title: "Program Manager", img: "contributor6.jpg" },
    { name: "Chris Powell", title: "Warehouse & Chaplain Relations Manager", img: "contributor7.jpg" },
    { name: "Lucas Suriano", title: "Global Operations Manager", img: "contributor8.jpg" }
  ];

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
        
        <div className="contributors-grid">
          {contributors.map((c, i) => (
            <div key={i} className="contributor-item">
              <div className="contributor-img-wrapper">
                <img 
                  src={`/images/profile/${c.img}`} 
                  alt={c.name}
                  onError={(e) => { e.target.src = '/images/profile/placeholder.png'; }}
                />
              </div>
              <h3 className="contributor-name">{c.name}</h3>
              <p className="contributor-title">{c.title}</p>
            </div>
          ))}
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
