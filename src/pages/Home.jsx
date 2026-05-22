import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import VideoModal from '../components/common/VideoModal';
import AlertModal from '../components/common/AlertModal';
import { CONFIG } from '../constants/config';
import { MEDITATION_DATES } from '../constants/meditation_data';
import { getMeditationData } from '../services/meditationService';

const Home = () => {
  const { t, i18n } = useTranslation();
  const [modalData, setModalData] = useState({ isOpen: false, videoId: '' });
  const [alertMessage, setAlertMessage] = useState('');
  const [recentSundays, setRecentSundays] = useState([]);
  const [meditationDates, setMeditationDates] = useState({});
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const sitemapLinks = [
    { id: 1, name: '프리즌 리바이벌 소개', to: '/intro', coords: { left: '3.3%', top: '18.5%', width: '13.4%', height: '12.5%' } },
    { id: 2, name: '프리즌 묵상사역', to: '/programs', coords: { left: '1%', top: '34%', width: '12%', height: '11%' } },
    { id: 3, name: '프리즌 얼라이언스', to: '/programs', coords: { left: '27%', top: '28%', width: '12%', height: '11%' } },
    { id: 4, name: '프리즌 수도원 프로젝트', to: '/programs#monastery', coords: { left: '1%', top: '56%', width: '12%', height: '11%' } },
    { id: 5, name: '중보기도 사역', to: '/programs#prayer', coords: { left: '8%', top: '68%', width: '11%', height: '11%' } },
    { id: 6, name: '홈리스 사역', to: '/volunteer-programs#homeless', coords: { left: '23%', top: '49%', width: '12%', height: '10%' } },
    { id: 7, name: '프리즌 플로잉 프로젝트', to: '/programs#flowing', coords: { left: '23%', top: '70%', width: '12%', height: '10%' } },
    { id: 8, name: '엔젤트리', to: '/angeltree', coords: { left: '69%', top: '21%', width: '12%', height: '13%' } },
    { id: 9, name: '참여하기', to: '/volunteer-guide', coords: { left: '84%', top: '36%', width: '12%', height: '13%' } },
    { id: 10, name: '후원하기', to: '/angeltree', coords: { left: '61%', top: '36%', width: '11%', height: '11%' } },
    { id: 11, name: '간증&스토리', to: '/angeltree', coords: { left: '62%', top: '60%', width: '12%', height: '11%' } },
    { id: 12, name: '미디어', to: '/youtube', coords: { left: '80%', top: '72%', width: '11%', height: '11%' } },
    { id: 13, name: '공지사항', to: '/notice/matching', coords: { left: '26%', top: '87%', width: '11%', height: '9.9%' } },
    { id: 14, name: '자료실', to: '/notice/books', coords: { left: '38%', top: '87%', width: '11%', height: '9.9%' } },
    { id: 15, name: '문의하기', to: '/contact-managers', coords: { left: '50%', top: '87%', width: '11%', height: '9.9%' } },
    { id: 16, name: '다국어', to: '#', coords: { left: '62.8%', top: '87%', width: '12.8%', height: '9.9%' } },
    { id: 17, name: '함께 걸어 주세요 (참여하기)', to: '/volunteer-guide', coords: { left: '2%', top: '87%', width: '9%', height: '9.9%' } }
  ];

  const openModal = (id) => setModalData({ isOpen: true, videoId: id });
  const closeModal = () => setModalData({ isOpen: false, videoId: '' });

  const currentLang = i18n.language.split('-')[0];

  useEffect(() => {
    // Load meditation data dynamically
    const loadData = async () => {
      try {
        const dbData = await getMeditationData();
        setMeditationDates(dbData);
      } catch (error) {
        console.error("Failed to load meditation data on Home page:", error);
        setMeditationDates(MEDITATION_DATES);
      }
    };
    loadData();

    // 최근 5주 일요일 계산
    const sundays = [];
    const today = new Date();
    const lastSunday = new Date(today);
    lastSunday.setDate(today.getDate() - today.getDay());
    lastSunday.setHours(0, 0, 0, 0);

    for (let i = 0; i < 5; i++) {
      const d = new Date(lastSunday);
      d.setDate(lastSunday.getDate() - (i * 7));
      sundays.push(d);
    }
    setRecentSundays(sundays);
  }, []);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatDateLabel = (date) => {
    return date.toLocaleDateString(i18n.language, { 
      year: 'numeric', month: 'long', day: 'numeric' 
    });
  };

  const handleDownload = (dateStr) => {
    const mergedLinks = {
      ...CONFIG.weeklyMeditationLinks,
      ...meditationDates
    };
    const linkData = mergedLinks[dateStr];
    const link = linkData ? linkData[currentLang] : null;
    if (link) {
      try {
        const newWindow = window.open(link, '_blank');
        if (!newWindow) {
          window.location.href = link;
        }
      } catch (err) {
        window.location.href = link;
      }
    } else {
      setAlertMessage(t('materialsPreparing'));
    }
  };

  return (
    <main>
      {/* Hero Section (Sitemap Image Map) */}
      <div 
        id="hero-sitemap"
        className="fade-in" 
        style={{ 
          textAlign: 'center',
          width: '100%',
          maxWidth: '1600px',
          margin: '0 auto',
          padding: '0'
        }}
      >
        <div 
          className="sitemap-image-container" 
          style={{ 
            display: 'block',
            width: '100%',
            transition: 'transform 0.3s ease'
          }}
        >
          <div 
            style={{ 
              position: 'relative', 
              width: '100%', 
              aspectRatio: '16 / 9', 
              overflow: 'hidden', 
              backgroundColor: '#f9f9f9'
            }}
          >
            <img 
              src="/images/main_map.png" 
              alt={t('navSitemap')} 
              style={{ 
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%', 
                height: '100%', 
                objectFit: 'cover',
                display: 'block'
              }} 
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://placehold.co/1200x800?text=Sitemap+Image+Not+Found';
              }}
            />

            {sitemapLinks.map((link, idx) => {
              const isHashOnly = link.to === '#';
              const linkProps = isHashOnly 
                ? { to: {}, onClick: (e) => e.preventDefault(), style: { cursor: 'default' } }
                : { to: link.to };

              return (
                <Link
                  key={link.id}
                  {...linkProps}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{
                    position: 'absolute',
                    display: 'block',
                    left: link.coords.left,
                    top: link.coords.top,
                    width: link.coords.width,
                    height: link.coords.height,
                    cursor: isHashOnly ? 'default' : 'pointer',
                    borderRadius: '12px',
                    backgroundColor: hoveredIndex === idx ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                    transition: 'background-color 0.2s ease',
                    zIndex: 10,
                    ...linkProps.style
                  }}
                  title={link.name}
                />
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Video Introduction Section */}
      <section id="intro-video" className="section" style={{ backgroundColor: 'var(--off-white)', padding: '6rem 2rem' }}>
        <div className="container" style={{ maxWidth: '960px', margin: '0 auto' }}>
          <h2 className="section-title" style={{ marginBottom: '1rem' }}>{t('heroTitle')}</h2>
          <p className="section-desc" style={{ maxWidth: '800px', margin: '0 auto 3.5rem', opacity: 0.85 }}>
            {t('heroDesc')}
          </p>

          <div 
            onClick={() => openModal(CONFIG.mainVideoId)}
            className="video-container" 
            style={{ display: 'block', cursor: 'pointer' }}
          >
            <div className="video-wrapper">
              <div className="video-thumb" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                <img 
                  src={`https://img.youtube.com/vi/${CONFIG.mainVideoId}/hqdefault.jpg`} 
                  alt="Prison Revival Video" 
                  style={{ objectFit: 'cover', width: '100%', height: '100%', transition: 'transform 0.5s' }}
                />
                <span className="play-icon" style={{ opacity: 1 }}></span>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '3.5rem' }}>
            <a 
              href="http://pf.kakao.com/_ptYAG/chat" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="primary-btn"
              style={{
                display: 'inline-block',
                padding: '1rem 2.5rem',
                backgroundColor: '#5B21B6',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '30px',
                fontWeight: '600',
                boxShadow: '0 10px 20px rgba(91, 33, 182, 0.2)',
                transition: 'all 0.3s ease'
              }}
            >
              {t('volunteerApply')}
            </a>
          </div>
        </div>
      </section>
      
      {/* Devotional Section */}
      <section id="devotional" className="section container">
        <div className="devotional-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 className="sub-section-title">{t('meditationRecentTitle')}</h2>
          <p>{t('meditationPageDesc')}</p>
        </div>
        <div className="meditation-theme-light">
          {recentSundays.map((date, idx) => {
            const dateStr = formatDate(date);
            return (
              <div key={idx} className="btn-box" onClick={() => handleDownload(dateStr)}>
                <button type="button" className="download-btn">
                  <span>{formatDateLabel(date)}</span>
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

      {/* Modals */}
      <VideoModal 
        isOpen={modalData.isOpen} 
        videoId={modalData.videoId} 
        onClose={closeModal} 
      />
      <AlertModal 
        isOpen={!!alertMessage} 
        message={alertMessage} 
        onClose={() => setAlertMessage('')} 
      />
    </main>
  );
};

export default Home;
