import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import ImageModal from '../components/common/ImageModal';

const Programs = () => {
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
          <h1 className="section-title fade-in">{t('progTitleMain')}</h1>
          <p className="section-desc fade-in delay-1">{t('progDescMain')}</p>
        </div>
      </section>

      <div className="container">

      {/* 1. Prayer Ministry */}
      <section id="prayer" className="program-section fade-in delay-2">
        <div className="program-img-col" style={{ cursor: 'zoom-in' }} onClick={() => handleImageClick(t('prayerPoster'))}>
          <img src={t('prayerPoster')} alt="Prayer Poster" />
        </div>
        <div className="program-text-col">
          <h2 className="program-title">{t('prog1Title')}</h2>
          <p className="program-desc" dangerouslySetInnerHTML={{ __html: t('prog1Desc') }}></p>
        </div>
      </section>

      {/* 2. Bible Study */}
      <section id="bible" className="program-section fade-in delay-3">
        <div className="program-img-col" style={{ cursor: 'zoom-in' }} onClick={() => handleImageClick(t('biblePoster'))}>
          <img src={t('biblePoster')} alt="Bible Poster" />
        </div>
        <div className="program-text-col">
          <h2 className="program-title">{t('prog2Title')}</h2>
          <p className="program-desc">{t('prog2Desc1')}</p>
          <ul className="program-list">
            <li>{t('prog2List1')}</li>
            <li>{t('prog2List2')}</li>
            <li>{t('prog2List3')}</li>
          </ul>
          <p className="program-desc" dangerouslySetInnerHTML={{ __html: t('prog2Desc2') }}></p>
        </div>
      </section>

      {/* 3. Monastery Project */}
      <section id="monastery" className="program-section fade-in delay-4">
        <div className="program-img-col" style={{ cursor: 'zoom-in' }} onClick={() => handleImageClick(t('monasteryPoster'))}>
          <img src={t('monasteryPoster')} alt="Monastery Poster" />
        </div>
        <div className="program-text-col">
          <h2 className="program-title" dangerouslySetInnerHTML={{ __html: t('prog3Title') }}></h2>
          <p className="program-desc">{t('prog3Desc')}</p>
          
          <h3 className="program-account-title" style={{ marginTop: '1.5rem' }}>{t('prog3Sub1')}</h3>
          <ul className="program-list">
            <li dangerouslySetInnerHTML={{ __html: t('prog3List1_1') }}></li>
            <li dangerouslySetInnerHTML={{ __html: t('prog3List1_2') }}></li>
            <li dangerouslySetInnerHTML={{ __html: t('prog3List1_3') }}></li>
          </ul>

          <h3 className="program-account-title" style={{ marginTop: '1.5rem' }}>{t('prog3Sub2')}</h3>
          <ul className="program-list">
            <li>{t('prog3List2_1')}</li>
            <li>{t('prog3List2_2')}</li>
          </ul>

          <h3 className="program-account-title" style={{ marginTop: '1.5rem' }}>{t('prog3Sub3')}</h3>
          <ul className="program-list">
            <li>{t('prog3List3_1')}</li>
            <li>{t('prog3List3_2')}</li>
            <li>{t('prog3List3_3')}</li>
          </ul>
        </div>
      </section>

      {/* 4. Flowing Project */}
      <section id="flowing" className="program-section fade-in delay-5">
        <div className="program-img-col" style={{ cursor: 'zoom-in' }} onClick={() => handleImageClick(t('flowingPoster'))}>
          <img src={t('flowingPoster')} alt="Flowing Poster" />
        </div>
        <div className="program-text-col">
          <h2 className="program-title" dangerouslySetInnerHTML={{ __html: t('prog4Title') }}></h2>
          <h3 className="program-account-title" style={{ color: '#B8E986', fontSize: '1.3rem', marginBottom: '1.5rem' }}>{t('prog4Quote')}</h3>
          <p className="program-desc" dangerouslySetInnerHTML={{ __html: t('prog4Desc') }}></p>

          <div className="program-account-box" style={{ background: '#FFF5F5', borderLeft: '4px solid #FF6B6B', borderRadius: '8px', padding: '1.5rem', marginBottom: '2rem' }}>
            <p className="program-account-info" style={{ color: '#D32F2F', fontWeight: 600, fontSize: '1.05rem' }} dangerouslySetInnerHTML={{ __html: t('prog4Notice') }}></p>
          </div>

          {[1, 2, 3, 4].map((num) => (
            <div key={num} className="program-account-box" style={{ background: '#F8FAFC', marginBottom: '1.2rem', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
              <h4 className="program-account-title" style={{ fontSize: '1.15rem' }}>{t(`prog4Acct${num}Title`)}</h4>
              <p className="program-account-info" style={{ fontSize: '1.05rem' }} dangerouslySetInnerHTML={{ __html: t(`prog4Acct${num}Info`) }}></p>
            </div>
          ))}

          <div className="program-account-box" style={{ background: '#F0FDF4', borderLeft: '4px solid #22C55E', borderRadius: '8px', padding: '1.5rem', marginTop: '2rem' }}>
            <h4 className="program-account-title" style={{ color: '#166534', fontSize: '1.2rem' }}>{t('prog4FooterTitle')}</h4>
            <p className="program-account-info" style={{ color: '#15803D', fontSize: '1.05rem', fontWeight: 500 }} dangerouslySetInnerHTML={{ __html: t('prog4FooterInfo') }}></p>
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

export default Programs;
