import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import VideoModal from '../components/common/VideoModal';
import AlertModal from '../components/common/AlertModal';
import { CONFIG } from '../constants/config';
import { MEDITATION_DATES } from '../constants/meditation_data';
import { getMeditationData } from '../services/meditationService';

const Home = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [modalData, setModalData] = useState({ isOpen: false, videoId: '' });
  const [alertMessage, setAlertMessage] = useState('');
  const [recentSaturdays, setRecentSaturdays] = useState([]);
  const [meditationDates, setMeditationDates] = useState({});
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const openModal = (id) => setModalData({ isOpen: true, videoId: id });
  const closeModal = () => setModalData({ isOpen: false, videoId: '' });

  const currentLang = i18n.language.split('-')[0];
  const supportedLangs = ['ko', 'en', 'zh', 'es', 'pt', 'tl'];
  const mapImageSrc = currentLang === 'ko'
    ? '/images/main_map_ko.png'
    : (currentLang === 'en' || !supportedLangs.includes(currentLang)
      ? '/images/main_map_en2.jpeg'
      : `/images/main_map_${currentLang}2.png`);

  const handleMeditationNav = (lang) => {
    i18n.changeLanguage(lang);
    navigate('/meditation');
  };

  // 사용자가 전달한 19개 영역에 대한 좌표 및 링크 매핑 데이터
  const sitemapLinks = [
    { id: 1, name: '프리즌 리바이벌 소개', to: '/intro', coords: { left: '3.6%', top: '13.2%', width: '11.8%', height: '17.6%' } },
    { id: 2, name: '프리즌 묵상 편지사역', to: '/meditation', coords: { left: '1.4%', top: '32.6%', width: '11.7%', height: '13.6%' } },
    { id: 3, name: '프리즌 얼라이언스', to: '/programs#bible', coords: { left: '28.2%', top: '23.1%', width: '10.6%', height: '13.9%' } },
    { id: 4, name: '프리즌 수도원 프로젝트', to: '/programs#monastery', coords: { left: '0.7%', top: '52.1%', width: '12.3%', height: '13.2%' } },
    { id: 5, name: '프리즌 중보기도 사역', to: '/programs#prayer', coords: { left: '7.4%', top: '67.0%', width: '11.3%', height: '11.6%' } },
    { id: 6, name: '프리즌 플로잉 프로젝트', to: '/programs#flowing', coords: { left: '21.3%', top: '67.3%', width: '11.6%', height: '11.9%' } },
    { id: 7, name: '프리즌 홈리스 사역', to: '/volunteer-programs#homeless', coords: { left: '22.1%', top: '46.9%', width: '11.6%', height: '10.7%' } },
    { id: 8, name: '엔젤트리', to: '/angeltree', coords: { left: '69.1%', top: '14.9%', width: '10.8%', height: '15.3%' } },
    { id: 9, name: '프리즌 발렌티어 참여하기', to: '/volunteer-guide', coords: { left: '86.3%', top: '35.9%', width: '12.0%', height: '12.8%' } },
    { id: 10, name: '후원하기', to: '#', coords: { left: '62.9%', top: '33.3%', width: '8.1%', height: '11.6%' } },
    { id: 11, name: '간증&스토리', to: '/youtube#inside', coords: { left: '63.2%', top: '57.2%', width: '11.8%', height: '13.7%' } },
    { id: 12, name: '프리즌 미디어 센터', to: '/youtube', coords: { left: '81.9%', top: '68.8%', width: '13.1%', height: '11.7%' } },
    { id: 13, name: '발렌티어 지원하기', to: 'http://pf.kakao.com/_ptYAG/chat', coords: { left: '2.2%', top: '91.4%', width: '7.0%', height: '3.0%' } },
    { id: 14, name: '섬겨주시는 발렌티어분들', to: '/volunteer-guide#contributors', coords: { left: '2.4%', top: '95.2%', width: '8.0%', height: '2.9%' } },
    { id: 15, name: '공지사항', to: '/notice/matching', coords: { left: '24.8%', top: '84.4%', width: '12.4%', height: '14.8%' } },
    { id: 16, name: '프리즌 성경책 in 갓피플 플로잉 프로젝트', to: 'https://mall.godpeople.com/?G=1721883418-5', coords: { left: '38.9%', top: '84.2%', width: '11.0%', height: '15.0%' } },
    { id: 17, name: '임은미 선교사님 책 in 갓피플 플로잉 프로젝트', to: '#', coords: { left: '51.1%', top: '84.6%', width: '11.3%', height: '14.9%' } },
    { id: 18, name: '엔젤트리 만나브릿지 in 세움 정기 후원 프로젝트', to: 'https://online.mrm.or.kr/sr5t4uf', coords: { left: '64.5%', top: '84.7%', width: '11.0%', height: '14.6%' } },
    { id: 19, name: '묵상편지 다운로드 (한국어)', to: '/meditation', onClick: () => handleMeditationNav('ko'), coords: { left: '79.4%', top: '89.6%', width: '5.3%', height: '3.0%' } },
    { id: 20, name: '묵상편지 다운로드 (영어)', to: '/meditation', onClick: () => handleMeditationNav('en'), coords: { left: '85.6%', top: '89.6%', width: '5.3%', height: '3.0%' } },
    { id: 21, name: '묵상편지 다운로드 (중국어)', to: '/meditation', onClick: () => handleMeditationNav('zh'), coords: { left: '92.2%', top: '89.6%', width: '4.9%', height: '2.9%' } },
    { id: 22, name: '묵상편지 다운로드 (스페인어)', to: '/meditation', onClick: () => handleMeditationNav('es'), coords: { left: '79.6%', top: '93.7%', width: '5.2%', height: '2.7%' } },
    { id: 23, name: '묵상편지 다운로드 (포르투갈어)', to: '/meditation', onClick: () => handleMeditationNav('pt'), coords: { left: '85.8%', top: '93.3%', width: '5.0%', height: '3.1%' } },
    { id: 24, name: '묵상편지 다운로드 (타갈로그어)', to: '/meditation', onClick: () => handleMeditationNav('tl'), coords: { left: '92.1%', top: '93.6%', width: '4.9%', height: '2.7%' } }
  ];

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

    // 최근 5주 토요일 계산
    const saturdays = [];
    const today = new Date();
    const lastSaturday = new Date(today);
    lastSaturday.setDate(today.getDate() - ((today.getDay() + 1) % 7));
    lastSaturday.setHours(0, 0, 0, 0);

    for (let i = 0; i < 5; i++) {
      const d = new Date(lastSaturday);
      d.setDate(lastSaturday.getDate() - (i * 7));
      saturdays.push(d);
    }
    setRecentSaturdays(saturdays);
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
              src={mapImageSrc} 
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
              const isExternal = link.to.startsWith('http');
              const isHashOnly = link.to === '#';

              if (typeof link.onClick === 'function') {
                return (
                  <div
                    key={link.id}
                    onClick={link.onClick}
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    style={{
                      position: 'absolute',
                      left: link.coords.left,
                      top: link.coords.top,
                      width: link.coords.width,
                      height: link.coords.height,
                      cursor: 'pointer',
                      borderRadius: '12px',
                      backgroundColor: hoveredIndex === idx ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                      transition: 'background-color 0.2s ease',
                      zIndex: 10
                    }}
                    title={link.name}
                  />
                );
              }

              if (isExternal) {
                return (
                  <a
                    key={link.id}
                    href={link.to}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    style={{
                      position: 'absolute',
                      left: link.coords.left,
                      top: link.coords.top,
                      width: link.coords.width,
                      height: link.coords.height,
                      cursor: 'pointer',
                      borderRadius: '12px',
                      backgroundColor: hoveredIndex === idx ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                      transition: 'background-color 0.2s ease',
                      zIndex: 10
                    }}
                    title={link.name}
                  />
                );
              }

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
      <section id="intro-video" className="section scroll-reveal" style={{ backgroundColor: 'var(--off-white)', padding: '6rem 2rem' }}>
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
      <section id="devotional" className="section container scroll-reveal">
        <div className="devotional-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 className="sub-section-title">{t('meditationRecentTitle')}</h2>
          <p>{t('meditationPageDesc')}</p>
        </div>
        <div className="meditation-theme-light">
          {recentSaturdays.map((date, idx) => {
            const dateStr = formatDate(date);
            const delayClass = idx === 0 ? '' : `delay-${idx * 100}`;
            return (
              <div key={idx} className={`btn-box scroll-reveal ${delayClass}`} onClick={() => handleDownload(dateStr)}>
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
      <section className="section scroll-reveal" id="intro">
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
            <a 
              href={CONFIG.introLinks.partners.eunice} 
              target="_blank"
              rel="noopener"
              data-tooltip={t('partnerEunice')}
              className="partner-banner-link"
            >
              <img src="/images/partners/partner_banner_eunice.jpg" alt={t('partnerEunice')} />
            </a>
            <a 
              href={CONFIG.introLinks.partners.samintl} 
              target="_blank"
              rel="noopener"
              data-tooltip={t('partnerSam')}
              className="partner-banner-link"
            >
              <img src="/images/partners/partner_banner_sam.png" alt={t('partnerSam')} />
            </a>
            <a 
              href={CONFIG.introLinks.partners.iseum} 
              target="_blank"
              rel="noopener"
              data-tooltip={t('partnerIseum')}
              className="partner-banner-link"
            >
              <img src="/images/partners/partner_banner_iseum.png" alt={t('partnerIseum')} />
            </a>
            <a 
              href={CONFIG.introLinks.partners.godpeople} 
              target="_blank"
              rel="noopener"
              data-tooltip={t('partnerGodpeople')}
              className="partner-banner-link"
            >
              <img src="/images/partners/partner_banner_godpeople.png" alt={t('partnerGodpeople')} />
            </a>
            <a 
              href={CONFIG.introLinks.partners.kyujang} 
              target="_blank"
              rel="noopener"
              data-tooltip={t('partnerKyujang')}
              className="partner-banner-link"
            >
              <img src="/images/partners/partner_banner_kyujang.png" alt={t('partnerKyujang')} />
            </a>
            <a 
              href={CONFIG.introLinks.partners.jusomang} 
              target="_blank"
              rel="noopener"
              data-tooltip={t('partnerJusomang')}
              className="partner-banner-link"
            >
              <img src="/images/partners/partner_banner_jusomang.jpg" alt={t('partnerJusomang')} />
            </a>
            <a 
              href={CONFIG.introLinks.partners.thunder} 
              target="_blank"
              rel="noopener"
              data-tooltip={t('partnerThunder')}
              className="partner-banner-link"
            >
              <img src="/images/partners/partner_banner_thunder.png" alt={t('partnerThunder')} />
            </a>
            <a 
              href={CONFIG.introLinks.partners.alliance} 
              target="_blank"
              rel="noopener"
              data-tooltip={t('partnerAlliance')}
              className="partner-banner-link"
            >
              <img src="/images/partners/partner_banner_alliance.png" alt={t('partnerAlliance')} />
            </a>
            <a 
              href={CONFIG.introLinks.partners.fellowship} 
              target="_blank"
              rel="noopener"
              data-tooltip={t('partnerFellowship')}
              className="partner-banner-link"
            >
              <img src="/images/partners/partner_banner_fellowship.png" alt={t('partnerFellowship')} />
            </a>
            <a 
              href={CONFIG.introLinks.partners.omked} 
              target="_blank"
              rel="noopener"
              data-tooltip={t('partnerOmked')}
              className="partner-banner-link"
            >
              <img src="/images/partners/partner_banner_omked.jpg" alt={t('partnerOmked')} />
            </a>
          </div>
        </div>
      </section>

      {/* Angel Tree Section */}
      <section className="section scroll-reveal" id="angeltree">
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
      <section className="section section-dark scroll-reveal" id="programs">
        <div className="container">
          <h2 className="section-title">{t('programsTitle')}</h2>
          <div className="programs-grid">
            <div className="program-card scroll-reveal">
              <img src="https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&q=80&w=600" alt="Inside" />
              <div className="program-content">
                <h3>{t('insideTitle')}</h3>
                <p>{t('insideDesc')}</p>
                <Link to="/programs" className="text-link">{t('viewMore')} →</Link>
              </div>
            </div>
            <div className="program-card scroll-reveal delay-200">
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
      <section className="section section-notice scroll-reveal" id="notice">
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
