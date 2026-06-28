import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    // Dynamic Title update for SEO and clarity
    const baseSiteTitle = i18n.language === 'en'
      ? "Prison Revival & Angel Tree"
      : `Prison Revival & Angel Tree | ${t('siteTitle')}`;
    document.title = `${t('notFoundTitle')} - ${baseSiteTitle}`;
  }, [t, i18n.language]);

  return (
    <div className="not-found-container" id="not-found-page">
      <div className="not-found-content">
        <h1 className="not-found-title" id="not-found-heading">{t('notFoundTitle')}</h1>
        <p className="not-found-text">{t('notFoundDesc')}</p>
        <button 
          className="not-found-button" 
          id="not-found-home-btn"
          onClick={() => navigate('/')}
        >
          {t('notFoundBtn')}
        </button>
      </div>
    </div>
  );
};

export default NotFound;
