import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer>
      <div className="footer-content container">
        <div className="footer-logo">
          <img src="/images/favicon.png" alt="PR Logo" className="footer-logo-img" />
          <span className="footer-brand">{t('siteTitle')}</span>
        </div>
        
        <div className="footer-info-grid">
          <div className="footer-col footer-links">
            <h4>{t('footerLinksTitle')}</h4>
            <a href="http://pf.kakao.com/_ptYAG/chat" target="_blank" rel="noopener noreferrer" className="footer-link">{t('footerLinkVol')}</a>
            <a href="https://mall.godpeople.com/?G=1721883418-5" target="_blank" rel="noopener noreferrer" className="footer-link">{t('footerLinkBible')}</a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="footer-link">{t('footerLinkBook')}</a>
            <a href="https://forms.gle/4x7HjQGWheJu8Sfb9" target="_blank" rel="noopener noreferrer" className="footer-link">{t('footerLinkSponsor')}</a>
            <a href="https://online.mrm.or.kr/sr5t4uf" target="_blank" rel="noopener noreferrer" className="footer-link">{t('footerLinkManna')}</a>
          </div>

          <div className="footer-col footer-contact">
            <h4>{t('footerContactTitle')}</h4>
            <div className="footer-contact-item">
              <span className="footer-icon">💬</span>
              <span>{t('footerContactKakao')}</span>
            </div>
            <div className="footer-contact-item">
              <span className="footer-icon">✉️</span>
              <span>E Mail: 21davidoh@gmail.com</span>
            </div>
            <div className="footer-contact-item">
              <span className="footer-icon">📱</span>
              <span>{t('footerContactPhone')}</span>
            </div>
            <div className="footer-contact-item">
              <span className="footer-icon">👤</span>
              <span>{t('footerContactName')}</span>
            </div>
            <Link to="/contact-managers" className="footer-contact-item footer-link">
              <span className="footer-icon">📞</span>
              <span>{t('footerContactInquiry')}</span>
            </Link>
          </div>
        </div>

        <p className="copyright">&copy; 2026 Prison Revival. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
