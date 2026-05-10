import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Notice = () => {
  const { type } = useParams();
  const { t } = useTranslation();

  const getTitle = () => {
    switch (type) {
      case 'matching': return t('noticeMatchingTitle');
      case 'books': return t('noticeBooksTitle');
      case 'revival-acc': return t('noticeRevivalAccTitle');
      case 'angeltree-acc': return t('noticeAngelAccTitle');
      default: return t('navNotice');
    }
  };

  return (
    <main>
      <section className="page-hero">
        <div className="page-hero-bg"></div>
        <div className="container">
          <h1 className="section-title fade-in">{getTitle()}</h1>
        </div>
      </section>

      <div className="container">

      <section className="section">
        <div style={{ 
          background: 'white', 
          padding: '4rem', 
          borderRadius: '24px', 
          boxShadow: '0 10px 40px rgba(0,0,0,0.03)', 
          textAlign: 'center', 
          border: '1px solid rgba(0,0,0,0.05)' 
        }}>
          <p style={{ fontSize: '1.2rem', color: '#666' }}>{t('noticePagePlaceholder')}</p>
        </div>
      </section>

      <div style={{ marginTop: '6rem', textAlign: 'center', marginBottom: '6rem' }}>
        <Link to="/" className="secondary-btn">{t('backToHome')}</Link>
      </div>
    </div>
    </main>
  );
};

export default Notice;
