import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import ImageModal from '../components/common/ImageModal';
import AlertModal from '../components/common/AlertModal';
import { DownloadCloud, ArrowRight, Globe } from 'lucide-react';

const Programs = () => {
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');

  const handleImageClick = (src) => {
    setSelectedImage(src);
  };

  return (
    <main id="programs-page">
      <section className="page-hero">
        <div className="page-hero-bg"></div>
        <div className="container">
          <h1 className="section-title fade-in">{t('progTitleMain')}</h1>
          <p className="section-desc fade-in delay-1">{t('progDescMain')}</p>
        </div>
      </section>

      <div className="container">

      {/* 1. Prayer Ministry */}
      <section id="prayer" className="program-section scroll-reveal">
        <div className="program-img-col" style={{ cursor: 'zoom-in' }} onClick={() => handleImageClick(t('prayerPoster'))}>
          <img src={t('prayerPoster')} alt="Prayer Poster" />
        </div>
        <div className="program-text-col">
          <h2 className="program-title">{t('prog1Title')}</h2>
          <p className="program-desc" dangerouslySetInnerHTML={{ __html: t('prog1Desc') }}></p>
          
          <div className="program-btn-group" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '2rem' }}>
            <a 
              href="https://pf.kakao.com/_ptYAG/chat" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="primary-btn" 
              style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
            >
              <ArrowRight size={20} />
              {t('prog1BtnVolunteer')}
            </a>
          </div>
        </div>
      </section>

      {/* 2. Bible Study */}
      <section id="bible" className="program-section scroll-reveal">
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
          
          <div className="program-btn-group" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '2rem' }}>
            <Link to="/meditation#alliance-study" className="primary-btn" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <DownloadCloud size={20} />
              {t('prog2BtnDownload')}
            </Link>
            <Link to="/volunteer-programs#alliance" className="primary-btn" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <ArrowRight size={20} />
              {t('prog2BtnVolunteer')}
            </Link>
            <a 
              href="https://prisonalliance.org/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="primary-btn" 
              style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
            >
              <Globe size={20} />
              {t('prog2BtnAllianceHome')}
            </a>
          </div>
        </div>
      </section>

      {/* 3. Monastery Project */}
      <section id="monastery" className="program-section scroll-reveal">
        <div className="program-img-col" style={{ cursor: 'zoom-in' }} onClick={() => handleImageClick(t('monasteryPoster'))}>
          <img src={t('monasteryPoster')} alt="Monastery Poster" />
        </div>
        <div className="program-text-col">
          <h2 className="program-title" dangerouslySetInnerHTML={{ __html: t('prog3Title') }}></h2>
          <div className="program-status" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: '#F3E8FF',
            color: '#6B21A8',
            padding: '0.6rem 1.2rem',
            borderRadius: '50px',
            fontSize: '0.95rem',
            fontWeight: '600',
            marginBottom: '1.5rem',
            boxShadow: '0 2px 8px rgba(107, 33, 168, 0.05)'
          }}>
            <span role="img" aria-label="chart">📊</span>
            {t('prog3Status')}
          </div>
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
      <section id="flowing" className="program-section scroll-reveal" style={{ display: 'block' }}>
        <div style={{ display: 'flex', gap: '3rem', alignItems: 'flex-start', flexWrap: 'wrap', marginBottom: '2rem' }}>
          <div className="program-img-col" style={{ cursor: 'zoom-in' }} onClick={() => handleImageClick(t('flowingPoster'))}>
            <img src={t('flowingPoster')} alt="Flowing Poster" />
          </div>
          <div className="program-text-col" style={{ flex: 1, minWidth: '300px' }}>
            <h2 className="program-title" dangerouslySetInnerHTML={{ __html: t('prog4Title') }}></h2>
            <h3 className="program-account-title" style={{ color: '#B8E986', fontSize: '1.3rem', marginBottom: '1.5rem' }}>{t('prog4Quote')}</h3>
            <p className="program-desc" dangerouslySetInnerHTML={{ __html: t('prog4Desc') }}></p>

            <div className="program-account-box" style={{ background: '#FFF5F5', borderLeft: '4px solid #FF6B6B', borderRadius: '8px', padding: '1.5rem', marginBottom: '1rem' }}>
              <p className="program-account-info" style={{ color: '#D32F2F', fontWeight: 600, fontSize: '1.05rem' }} dangerouslySetInnerHTML={{ __html: t('prog4Notice') }}></p>
            </div>
          </div>
        </div>

        {/* 3개 후원처 가로 정렬 카드 래퍼 (전체 너비 100% 사용) */}
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginTop: '1.5rem', marginBottom: '2rem', width: '100%', boxSizing: 'border-box' }}>
          {[1, 2, 3].map((num) => {
            let buttons = null;
            if (num === 1) {
              buttons = (
                <a 
                  href="https://samintl.net" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="secondary-btn" 
                  style={{ fontSize: '0.9rem', padding: '0.5rem 1rem', textDecoration: 'none', display: 'inline-block', whiteSpace: 'nowrap' }}
                >
                  {t('prog4BtnSam')}
                </a>
              );
            } else if (num === 2) {
              buttons = (
                <a 
                  href="https://www.iseum.or.kr/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="secondary-btn" 
                  style={{ fontSize: '0.9rem', padding: '0.5rem 1rem', textDecoration: 'none', display: 'inline-block', whiteSpace: 'nowrap' }}
                >
                  {t('prog4BtnIseum')}
                </a>
              );
            } else if (num === 3) {
              buttons = (
                <a 
                  href="http://www.jing.co.kr/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="secondary-btn" 
                  style={{ fontSize: '0.9rem', padding: '0.5rem 1rem', textDecoration: 'none', display: 'inline-block', whiteSpace: 'nowrap' }}
                >
                  {t('prog4BtnThunder')}
                </a>
              );
            }

            return (
              <div 
                key={num} 
                className="program-account-box" 
                style={{ 
                  background: '#F1F5F9', 
                  borderLeft: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flex: '1 1 280px',
                  minWidth: '260px',
                  padding: '1.5rem',
                  margin: 0,
                  boxSizing: 'border-box'
                }}
              >
                <div style={{ flex: 1, marginBottom: '1.2rem' }}>
                  <h4 className="program-account-title" style={{ fontSize: '1.1rem', margin: 0, lineHeight: 1.4 }}>{t(`prog4Acct${num}Title`)}</h4>
                  <p className="program-account-info" style={{ fontSize: '0.95rem', margin: '0.5rem 0 0 0', lineHeight: 1.5 }} dangerouslySetInnerHTML={{ __html: t(`prog4Acct${num}Info`) }}></p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                  {buttons}
                </div>
              </div>
            );
          })}
        </div>

        {/* 밖으로 꺼낸 전체 가로 너비 박스 */}
        <div style={{ width: '100%', padding: '1.2rem 2rem', background: '#F0FDF4', borderRadius: '16px', border: '2px dashed #22C55E', marginTop: '1.5rem', boxSizing: 'border-box' }}>
          <h4 className="program-account-title" style={{ color: '#166534', fontSize: '1.2rem', margin: '0 0 0.5rem 0' }}>{t('prog4FooterTitle')}</h4>
          <p className="program-account-info" style={{ color: '#15803D', fontSize: '1.05rem', fontWeight: 500, margin: 0, lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: t('prog4FooterInfo') }}></p>
        </div>
      </section>

      {/* 5. Book Donation Project */}
      <section id="book-project" className="program-section scroll-reveal">
        <div className="program-text-col" style={{ flex: '1 1 100%', maxWidth: '100%' }}>
          <h2 className="program-title">{t('progBookTitle')}</h2>
          <p className="program-desc" dangerouslySetInnerHTML={{ __html: t('progBookDesc') }}></p>
          
          <div style={{ padding: '1.2rem 2rem', background: '#F8FAFC', borderRadius: '16px', border: '2px dashed #E2E8F0', marginTop: '1.5rem', marginBottom: '1rem' }}>
            <p style={{ color: '#1E3A8A', fontWeight: 600, fontSize: '1.1rem', margin: 0, fontStyle: 'italic', lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: t('progBookQuote') }}></p>
          </div>

          <div className="program-btn-group" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1.2rem', marginTop: '2.5rem' }}>
            <a 
              href="https://mall.godpeople.com/?G=1721883418-5" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="secondary-btn" 
              style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'flex-start', gap: '0.5rem', width: '100%', maxWidth: '720px', boxSizing: 'border-box', paddingLeft: '1.5rem' }}
            >
              <ArrowRight size={20} style={{ flexShrink: 0 }} />
              <span>{t('progBookBtnBible')}</span>
            </a>
            <a 
              href="https://mall.godpeople.com/?G=1780557148-0" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="secondary-btn" 
              style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'flex-start', gap: '0.5rem', width: '100%', maxWidth: '720px', boxSizing: 'border-box', paddingLeft: '1.5rem' }}
            >
              <ArrowRight size={20} style={{ flexShrink: 0 }} />
              <span>{t('progBookBtnBook1')}</span>
            </a>
            <a 
              href="https://mall.godpeople.com/?G=1780558629-1" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="secondary-btn" 
              style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'flex-start', gap: '0.5rem', width: '100%', maxWidth: '720px', boxSizing: 'border-box', paddingLeft: '1.5rem' }}
            >
              <ArrowRight size={20} style={{ flexShrink: 0 }} />
              <span>{t('progBookBtnBook2')}</span>
            </a>
            <a 
              href="https://mall.godpeople.com/?G=1780560102-5" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="secondary-btn" 
              style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'flex-start', gap: '0.5rem', width: '100%', maxWidth: '720px', boxSizing: 'border-box', paddingLeft: '1.5rem' }}
            >
              <ArrowRight size={20} style={{ flexShrink: 0 }} />
              <span>{t('progBookBtnBook3')}</span>
            </a>
          </div>
        </div>
      </section>

      {/* 6. Jesus Again Project */}
      <section id="jesus-again" className="program-section scroll-reveal">
        <div className="program-text-col" style={{ flex: '1 1 100%', maxWidth: '100%' }}>
          <h2 className="program-title">{t('navSubJesusAgain')}</h2>
          <div style={{ padding: '3.5rem 2rem', background: '#F8FAFC', borderRadius: '16px', border: '2px dashed #E2E8F0', textAlign: 'center', color: '#64748B', marginTop: '2rem' }}>
            <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '1rem' }}>⛪</span>
            <p style={{ fontSize: '1.1rem', fontWeight: 500 }}>이곳에 프리즌 Jesus Again 프로젝트 관련 세부 내용이 추가될 예정입니다.</p>
          </div>
        </div>
      </section>

      <div style={{ marginTop: '6rem', textAlign: 'center', marginBottom: '6rem' }}>
        <Link to="/" className="secondary-btn">{t('backToHome')}</Link>
      </div>
    </div>
      <ImageModal src={selectedImage} onClose={() => setSelectedImage(null)} />
      <AlertModal 
        isOpen={!!alertMessage} 
        message={alertMessage} 
        onClose={() => setAlertMessage('')} 
      />
    </main>
  );
};

export default Programs;
