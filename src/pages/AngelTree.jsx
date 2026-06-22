import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import ImageModal from '../components/common/ImageModal';
import { ArrowRight } from 'lucide-react';

const AngelTree = () => {
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (src) => {
    setSelectedImage(src);
  };

  return (
    <main id="angeltree-page">
      <section className="page-hero">
        <div className="page-hero-bg"></div>
        <div className="container">
          <h1 className="section-title fade-in">{t('angelTitleMain')}</h1>
          <p className="section-desc fade-in delay-1">{t('angelDescMain')}</p>
        </div>
      </section>

      <div className="container">

      {/* 1. What is Angel Tree? */}
      <section id="intro" className="guide-section scroll-reveal">
        <h2 className="sub-section-title" style={{ textAlign: 'center', marginBottom: '3rem' }}>{t('angelIntroTitle')}</h2>
        <div className="guide-intro-box">
          <div className="split-layout" style={{ gap: '3rem' }}>
            <div className="program-img-col" style={{ cursor: 'zoom-in', aspectRatio: 'auto', height: 'fit-content' }} onClick={() => handleImageClick('/images/angeltree/angel_intro_illust.png')}>
              <img src="/images/angeltree/angel_intro_illust.png" alt="Angel Tree Intro Illustration" style={{ borderRadius: '16px', width: '100%', height: 'auto', display: 'block' }} />
            </div>
            <div 
              className="content-col"
              dangerouslySetInnerHTML={{ __html: t('angelIntroText') }}
              style={{ padding: 0 }}
            ></div>
          </div>
        </div>
      </section>

      {/* 2. Christmas */}
      <section id="christmas" className="guide-section scroll-reveal">
        <div className="split-layout">
          <div className="program-img-col" style={{ cursor: 'zoom-in' }} onClick={() => handleImageClick(t('angelChristmasImg'))}>
            <img src={t('angelChristmasImg')} alt="Christmas Poster" />
          </div>
          <div className="content-col">
            <h3>{t('angelChristmasTitle')}</h3>
            <p>{t('angelChristmasText')}</p>
            
            <div className="guide-box">
              <h4>{t('angelChristmasHowTitle')}</h4>
              <p dangerouslySetInnerHTML={{ __html: t('angelChristmasHowText') }}></p>
            </div>

            <div className="christmas-donate-box">
              <h4>{t('angelChristmasDonateTitle')}</h4>
              <p>{t('angelChristmasDonateTax')}</p>
              <p>{t('angelChristmasDonateNoTax')}</p>
            </div>

            <a 
              href="http://pf.kakao.com/_ptYAG/chat" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="primary-btn"
              style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '1.5rem' }}
            >
              <ArrowRight size={20} />
              {t('angelChristmasApplyBtn')}
            </a>
          </div>
        </div>
      </section>

      {/* 3. Angel Tree : Manna Bridge in Seum */}
      <section id="manna-seum" className="guide-section scroll-reveal">
        <div className="split-layout" style={{ alignItems: 'start' }}>
          <div className="program-img-col">
            <div style={{ cursor: 'zoom-in', marginBottom: '1.5rem' }} onClick={() => handleImageClick('/images/angeltree/angel_manna_seum_banner.png')}>
              <img src="/images/angeltree/angel_manna_seum_banner.png" alt="Manna Bridge in Seum Form" style={{ width: '100%', height: 'auto', borderRadius: '12px', display: 'block' }} />
            </div>
            <div style={{ cursor: 'zoom-in' }} onClick={() => handleImageClick(t('angelMannaImg'))}>
              <img src={t('angelMannaImg')} alt="Manna Bridge in Seum Poster" style={{ width: '100%', height: 'auto', borderRadius: '12px', display: 'block' }} />
            </div>
          </div>
          <div className="content-col">
            <h3>{t('mannaSeumTitle')}</h3>
            <p dangerouslySetInnerHTML={{ __html: t('mannaSeumText') }}></p>
            
            <div className="guide-box">
              <h4>{t('mannaSeumHowTitle')}</h4>
              <p dangerouslySetInnerHTML={{ __html: t('mannaSeumHowText') }}></p>
              <p style={{ marginTop: '1.5rem', fontWeight: 600, color: 'var(--dark-green)' }}>
                {t('mannaSeumInquiry')}
              </p>
            </div>

            <a 
              href="https://online.mrm.or.kr/sr5t4uf" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="primary-btn"
              style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '1.5rem' }}
            >
              <ArrowRight size={20} />
              {t('mannaSeumBtn')}
            </a>
          </div>
        </div>
      </section>

      {/* 4. Angel Tree : Manna Bridge in Angel Tree */}
      <section id="manna-angel" className="guide-section scroll-reveal">
        <div className="split-layout" style={{ alignItems: 'start' }}>
          <div className="program-img-col" style={{ cursor: 'zoom-in' }} onClick={() => handleImageClick('/images/angeltree/angel_manna_angel_banner.png')}>
            <img src="/images/angeltree/angel_manna_angel_banner.png" alt="Manna Bridge in Angel Tree Banner" style={{ width: '100%', height: 'auto', borderRadius: '12px', display: 'block' }} />
          </div>
          <div className="content-col">
            <h3>{t('mannaAngelTitle')}</h3>
            <p dangerouslySetInnerHTML={{ __html: t('mannaAngelText') }}></p>
            
            <div className="guide-box">
              <h4>{t('mannaAngelHowTitle')}</h4>
              <p dangerouslySetInnerHTML={{ __html: t('mannaAngelHowText') }}></p>
            </div>

            <div className="christmas-donate-box" style={{ marginTop: '1.5rem' }}>
              <h4>{t('mannaAngelDonateTitle')}</h4>
              <p>{t('mannaAngelDonateTax')}</p>
              <p>{t('mannaAngelDonateNoTax')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Prison Angel Tree Ministry & Support Guide */}
      <section id="prison-angel-guide" className="guide-section scroll-reveal" style={{ textAlign: 'center' }}>
        <h2 className="sub-section-title" style={{ textAlign: 'center', marginBottom: '3rem' }}>{t('navSubPrisonAngelGuide')}</h2>
        <div 
          style={{ 
            cursor: 'zoom-in', 
            width: '100%', 
            borderRadius: '16px', 
            overflow: 'hidden', 
            boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
            display: 'block'
          }} 
          onClick={() => handleImageClick('/images/angeltree/prison_angel_guide.jpg')}
        >
          <img 
            src="/images/angeltree/prison_angel_guide.jpg" 
            alt="Prison Angel Tree Guide Poster" 
            style={{ 
              width: '100%', 
              height: 'auto', 
              display: 'block'
            }} 
          />
        </div>
      </section>

      <div style={{ marginTop: '6rem', textAlign: 'center', marginBottom: '6rem' }}>
        <Link to="/" className="secondary-btn">{t('backToHome')}</Link>
      </div>
    </div>
      <ImageModal src={selectedImage} onClose={() => setSelectedImage(null)} />
    </main>
  );
};

export default AngelTree;
