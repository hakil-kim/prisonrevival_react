import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { CONFIG } from '../constants/config';
import ImageModal from '../components/common/ImageModal';

const Intro = () => {
  const { t } = useTranslation();
  const { hash } = useLocation();
  const [selectedImage, setSelectedImage] = useState(null);
  const pastorNumbers = [1, 2, 3, 4, 5, 6];



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
        <div id="ministry" className="intro-section-block scroll-reveal">
          <h2 className="sub-section-title">{t('introMain')}</h2>
          <div className="ministry-intro-container">
            <div className="ministry-map-column">
              <img src="/images/korea_prison_map.png" alt="Korea Prison Map" className="ministry-map-img" />
            </div>
            <div className="ministry-content-column">
              <div 
                className="intro-text-box" 
                style={{ margin: 0, maxWidth: '100%', display: 'flex', flexDirection: 'column', gap: '2rem' }}
              >
                <div dangerouslySetInnerHTML={{ __html: t('introMainText') }}></div>
                <div className="ministry-stats-box">
                  <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', margin: 0 }}>
{`South KOREA of Prison 57  
Prisoners 64,000 People

Christians 
: 35% 22,400 People

Prison Revival letter 
: People who came to believe in 
Christianity 30~40%

Vision
Prison Revival letter 
: 20,000~30,000 People

Volunteer
: 3,000 People ( 490 People )`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Missionary Intro */}
        <div id="missionary" className="intro-section-block scroll-reveal">
          <h2 className="sub-section-title">{t('missionaryInfo')}</h2>
          <div className="missionary-intro-container" style={{ display: 'grid', gridTemplateColumns: '450px 1fr', gap: '3rem', alignItems: 'stretch' }}>
            <div className="missionary-profile-column">
              <div className="missionary-photo-area" style={{ height: '100%' }}>
                <img src="/images/profile/missionary_eunmi_lim.jpg" alt="Missionary" className="missionary-profile-img" />
              </div>
            </div>
            <div className="missionary-recommendation-area" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', margin: 0 }}>
              <h3>{t('recommendation')}</h3>
              <p className="recommendation-text" dangerouslySetInnerHTML={{ __html: t('recommendationText') }}></p>
              <span className="missionary-signature">Eunice</span>
            </div>
          </div>
        </div>

        {/* 3. Partner Pastors Slider */}
        <div id="pastors" className="intro-section-block scroll-reveal">
          <h2 className="sub-section-title">{t('pastorIntro')}</h2>
          <div className="pastors-intro-container">
            <div className="pastors-grid-column">
              <div className="pastors-grid">
                {pastorNumbers.map((num) => {
                  const imgSrc = `/images/profile/KakaoTalk_Photo_2026-04-27-09-39-59 00${num}.png`;
                  return (
                    <div key={num} className="pastor-card" onClick={() => setSelectedImage(imgSrc)} style={{ cursor: 'pointer' }}>
                      <img src={imgSrc} alt={`Pastor ${num}`} />
                    </div>
                  );
                })}
              </div>
            </div>
            <div 
              className="pastors-text-column"
              dangerouslySetInnerHTML={{ __html: t('pastorsIntroText') }}
            ></div>
          </div>
        </div>

        {/* 4. CEO Greeting */}
        <div id="ceo" className="intro-section-block scroll-reveal">
          <h2 className="sub-section-title">{t('ceoGreeting')}</h2>
          <div className="ceo-intro-container">
            <div className="ceo-profile-column">
              <div className="ceo-photo-area">
                <img src="/images/profile/ceo_ohhyuk.png" alt="CEO Oh Hyuk" className="ceo-profile-img" />
              </div>
            </div>
            <div className="ceo-text-column">
              <div dangerouslySetInnerHTML={{ __html: t('ceoGreetingText') }}></div>
              <div className="ceo-signature-area">
                <span className="ceo-signature-org">{t('ceoSignatureOrg')}</span>
                <span className="ceo-signature-title">{t('ceoSignatureTitle')}</span>
                <span className="ceo-signature-name">David OH</span>
              </div>
            </div>
          </div>
        </div>

        {/* Press Section */}
        <div id="press" className="intro-sub-section scroll-reveal">
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
        <div id="partners" className="intro-sub-section scroll-reveal">
          <h2 className="sub-section-title">{t('partnersFull')}</h2>
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

        <div style={{ marginTop: '6rem', textAlign: 'center' }}>
          <Link to="/" className="secondary-btn">{t('backToHome')}</Link>
        </div>
        <ImageModal src={selectedImage} onClose={() => setSelectedImage(null)} />
      </section>
    </main>
  );
};

export default Intro;

