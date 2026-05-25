import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import ImageModal from '../components/common/ImageModal';

const AngelTree = () => {
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (src) => {
    setSelectedImage(src);
  };

  return (
    <main>
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
        <div 
          className="guide-intro-box" 
          dangerouslySetInnerHTML={{ __html: t('angelIntroText') }}
        ></div>
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
          </div>
        </div>
      </section>

      {/* 3. Angel Tree : Manna Bridge */}
      <section id="manna" className="guide-section scroll-reveal">
        <div className="split-layout">
          <div className="program-img-col" style={{ cursor: 'zoom-in' }} onClick={() => handleImageClick(t('angelMannaImg'))}>
            <img src={t('angelMannaImg')} alt="Manna Bridge Poster" />
          </div>
          <div className="content-col">
            <h3>{t('angelMannaTitle')}</h3>
            
            <a 
              href="https://online.mrm.or.kr/sr5t4uf" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="manna-btn"
            >
              {t('angelMannaBtn')}
            </a>
            
            <div className="guide-box">
              <p style={{ marginBottom: 0, fontWeight: 500 }}>{t('angelMannaDesc')}</p>
            </div>
          </div>
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
