import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { CONFIG } from '../constants/config';
import ImageModal from '../components/common/ImageModal';

const Intro = () => {
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState(null);
  const pastorNumbers = [1, 2, 3, 4, 5, 6];


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
          <div className="ministry-stats-container">
            <div className="ministry-stats-card unified">
              <h3 className="stats-card-title">Ministry Status & Vision</h3>
              <div className="stats-grid">
                <div className="stats-item prisons">
                  <span className="stats-label">South Korea Prisons</span>
                  <span className="stats-value">57 <span className="stats-unit">Prisons</span></span>
                </div>
                <div className="stats-item inmates">
                  <span className="stats-label">Total Inmates</span>
                  <span className="stats-value">64,000 <span className="stats-unit">People</span></span>
                </div>
                <div className="stats-item christians">
                  <span className="stats-label">Christian Inmates</span>
                  <span className="stats-value">35% <span className="stats-sub-unit">(22,400 People)</span></span>
                </div>
                <div className="stats-item belief">
                  <span className="stats-label">Belief via Letters</span>
                  <span className="stats-value">30~40% <span className="stats-sub-unit">New Believers</span></span>
                </div>
                <div className="stats-item vision">
                  <span className="stats-label">Vision Letter Target</span>
                  <span className="stats-value">20,000 ~ 30,000 <span className="stats-unit">People</span></span>
                </div>
                <div className="stats-item volunteers">
                  <span className="stats-label">Volunteer Goal</span>
                  <span className="stats-value">3,000 <span className="stats-unit">People</span> <span className="stats-sub-unit">(Current: 490 Volunteers)</span></span>
                </div>
              </div>
            </div>
          </div>

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
              </div>
            </div>
          </div>
        </div>

        {/* 2. Missionary Intro */}
        <div id="missionary" className="intro-section-block scroll-reveal">
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
              <span className="missionary-signature">Eunice</span>
              <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
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
        <div id="pastors" className="intro-section-block scroll-reveal">
          <h2 className="sub-section-title">{t('pastorIntro')}</h2>
          <div className="pastors-intro-container">
            <div 
              className="pastors-text-column"
              dangerouslySetInnerHTML={{ __html: t('pastorsIntroText') }}
            ></div>
            <div className="pastors-grid-column">
              <div className="pastors-grid">
                {pastorNumbers.map((num) => {
                  const imgSrc = `/images/profile/KakaoTalk_Photo_2026-04-27-09-39-59 00${num}.png`;
                  const isPastorChoi = num === 5;
                  const isPastorBongho = num === 4;
                  const isPastorHeewon = num === 1;
                  const isPastorSeungro = num === 2;
                  const isPastorGeumju = num === 3;
                  const isPastorHyeonmin = num === 6;
                  const hasOverlay = isPastorChoi || isPastorBongho || isPastorHeewon || isPastorSeungro || isPastorGeumju || isPastorHyeonmin;
                  return (
                    <div 
                      key={num} 
                      className={`pastor-card ${hasOverlay ? 'has-overlay' : ''}`} 
                      onClick={() => !hasOverlay && setSelectedImage(imgSrc)} 
                      style={{ cursor: hasOverlay ? 'default' : 'pointer' }}
                    >
                      <img src={imgSrc} alt={`Pastor ${num}`} />
                      {hasOverlay && (
                        <div className="pastor-card-hint-btn">
                          <span className="dot"></span>
                          <span className="dot"></span>
                          <span className="dot"></span>
                        </div>
                      )}
                      {isPastorHeewon && (
                        <div className="pastor-card-overlay">
                          <div className="pastor-overlay-content">
                            <p>{t('pastorHeewonOverlayText1')}</p>
                            <p>{t('pastorHeewonOverlayText2')}</p>
                            <p>{t('pastorHeewonOverlayText3')}</p>
                            <span className="overlay-signature">{t('pastorHeewonOverlaySign')}</span>
                          </div>
                        </div>
                      )}
                      {isPastorSeungro && (
                        <div className="pastor-card-overlay">
                          <div className="pastor-overlay-content">
                            <p>{t('pastorSeungroOverlayText1')}</p>
                            <p>{t('pastorSeungroOverlayText2')}</p>
                            <span className="overlay-signature">{t('pastorSeungroOverlaySign')}</span>
                          </div>
                        </div>
                      )}
                      {isPastorGeumju && (
                        <div className="pastor-card-overlay">
                          <div className="pastor-overlay-content">
                            <p>{t('pastorGeumjuOverlayText1')}</p>
                            <p>{t('pastorGeumjuOverlayText2')}</p>
                            <p>{t('pastorGeumjuOverlayText3')}</p>
                            <p>{t('pastorGeumjuOverlayText4')}</p>
                            <p>{t('pastorGeumjuOverlayText5')}</p>
                            <p>{t('pastorGeumjuOverlayText6')}</p>
                            <span className="overlay-signature">{t('pastorGeumjuOverlaySign')}</span>
                          </div>
                        </div>
                      )}
                      {isPastorChoi && (
                        <div className="pastor-card-overlay">
                          <div className="pastor-overlay-content">
                            <p>{t('pastorChoiOverlayText1')}</p>
                            <p>{t('pastorChoiOverlayText2')}</p>
                            <p>{t('pastorChoiOverlayText3')}</p>
                            <span className="overlay-signature">{t('pastorChoiOverlaySign')}</span>
                          </div>
                        </div>
                      )}
                      {isPastorBongho && (
                        <div className="pastor-card-overlay">
                          <div className="pastor-overlay-content">
                            <p>{t('pastorBonghoOverlayText1')}</p>
                            <p>{t('pastorBonghoOverlayText2')}</p>
                            <span className="overlay-signature">{t('pastorBonghoOverlaySign')}</span>
                          </div>
                        </div>
                      )}
                      {isPastorHyeonmin && (
                        <div className="pastor-card-overlay">
                          <div className="pastor-overlay-content">
                            <p>{t('pastorHyeonminOverlayText1')}</p>
                            <p>{t('pastorHyeonminOverlayText2')}</p>
                            <p>{t('pastorHyeonminOverlayText3')}</p>
                            <p>{t('pastorHyeonminOverlayText4')}</p>
                            <span className="overlay-signature">{t('pastorHyeonminOverlaySign')}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* 4. CEO Greeting */}
        <div id="ceo" className="intro-section-block scroll-reveal">
          <h2 className="sub-section-title">{t('ceoGreeting')}</h2>
          <div className="ceo-intro-container">
            <div className="ceo-profile-column">
              <div className="ceo-photo-area">
                <img src="/images/profile/ceo_ohhyuk_watercolor.jpg" alt="CEO Oh Hyuk" className="ceo-profile-img" />
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
        <div id="press" className="intro-section-block scroll-reveal">
          <h2 className="sub-section-title">{t('pressTitle')}</h2>
          <div className="press-list">
            <div className="press-container">
              <div className="press-item" onClick={() => window.open(CONFIG.introLinks.press.lawToday, '_blank')}>
                <span className="press-name">{t('pressLawToday')}</span>
                <span className="press-link">
                  <svg className="external-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </span>
              </div>
              <div className="press-screenshot-wrapper" onClick={() => window.open(CONFIG.introLinks.press.lawToday, '_blank')}>
                <img src="/images/press/press_lawtoday.png" alt="LawToday Screenshot" className="press-screenshot" />
              </div>
            </div>

            <div className="press-container">
              <div className="press-item" onClick={() => window.open(CONFIG.introLinks.press.goodNews, '_blank')}>
                <span className="press-name">{t('pressGoodNews')}</span>
                <span className="press-link">
                  <svg className="external-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </span>
              </div>
              <div className="press-screenshot-wrapper" onClick={() => window.open(CONFIG.introLinks.press.goodNews, '_blank')}>
                <img src="/images/press/press_goodnews.png" alt="GoodNews Screenshot" className="press-screenshot" />
              </div>
            </div>
          </div>
        </div>

        {/* Partners Section */}
        <div id="partners" className="intro-section-block scroll-reveal">
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

