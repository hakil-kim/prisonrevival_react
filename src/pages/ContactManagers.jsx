import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { CONFIG } from '../constants/config';

const ContactManagers = () => {
  const { t } = useTranslation();

  return (
    <main>
      <section className="page-hero">
        <div className="page-hero-bg"></div>
        <div className="container">
          <h1 className="section-title fade-in">{t('contactPageTitle')}</h1>
          <p className="section-desc fade-in delay-1">{t('contactPageDesc')}</p>
        </div>
      </section>

      <section className="section container">
        <div className="contact-grid">
          {CONFIG.contactManagers.map((manager, idx) => (
            <div key={idx} className="contact-card fade-in" style={{ animationDelay: `${0.2 + idx * 0.1}s` }}>
              <div className="contact-card-role">{t(manager.roleKey)}</div>
              <div className="contact-card-name">{t(manager.nameKey)}</div>
              {manager.orgKey && <div className="contact-card-org">{t(manager.orgKey)}</div>}
              
              <div className="contact-card-info">
                {manager.kakao && (
                  <div className="contact-info-item">
                    <span className="contact-info-icon">💬</span>
                    <div className="contact-info-content">
                      <span className="contact-info-label">{t('contactKakao')}</span>
                      <span className="contact-info-value">{manager.kakao}</span>
                    </div>
                  </div>
                )}
                {manager.email && (
                  <div className="contact-info-item">
                    <span className="contact-info-icon">✉️</span>
                    <div className="contact-info-content">
                      <span className="contact-info-label">{t('contactEmail')}</span>
                      <span className="contact-info-value">{manager.email}</span>
                    </div>
                  </div>
                )}
                {manager.phone && (
                  <div className="contact-info-item">
                    <span className="contact-info-icon">📱</span>
                    <div className="contact-info-content">
                      <span className="contact-info-label">{t('contactPhone')}</span>
                      <span className="contact-info-value">
                        {manager.phone}
                        {manager.phoneNoteKey && <span style={{ fontSize: '0.85em', opacity: 0.8, display: 'block' }}>({t(manager.phoneNoteKey)})</span>}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '6rem', textAlign: 'center', marginBottom: '6rem' }}>
          <Link to="/" className="secondary-btn">{t('backToHome')}</Link>
        </div>
      </section>
    </main>
  );
};

export default ContactManagers;
