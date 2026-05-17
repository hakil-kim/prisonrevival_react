import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
    return () => document.body.classList.remove('menu-open');
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  const toggleDropdown = (name, e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      setActiveDropdown(activeDropdown === name ? null : name);
    } else {
      // On desktop, ensure menu states are cleared when navigating via main menu link
      closeMenu();
    }
  };

  const handleLangChange = (e) => {
    i18n.changeLanguage(e.target.value);
    closeMenu();
  };

  return (
    <header className={`${i18n.language} ${isScrolled ? 'scrolled' : ''}`}>
      <Link onClick={closeMenu} to="/" className="logo">
        <img src="/images/favicon.png" alt="PR Logo" className="header-logo-icon" />
        <span>{t('siteTitle')}</span>
      </Link>

      <nav>
        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <li className={`dropdown ${activeDropdown === 'intro' ? 'mobile-active' : ''}`}>
            <Link onClick={(e) => toggleDropdown('intro', e)} to="/intro" className="dropdown-toggle">
              <span>{t('navIntro')}</span>
              <i className="dropdown-icon"></i>
            </Link>
            <ul className="dropdown-menu">
              <li><Link onClick={closeMenu} to="/intro#ministry">{t('navSubMinistry')}</Link></li>
              <li><Link onClick={closeMenu} to="/intro#missionary">{t('navSubMissionary')}</Link></li>
              <li><Link onClick={closeMenu} to="/intro#pastors">{t('navSubPastors')}</Link></li>
              <li><Link onClick={closeMenu} to="/intro#ceo">{t('navSubCeo')}</Link></li>
              <li><Link onClick={closeMenu} to="/intro#press">{t('navSubPress')}</Link></li>
              <li><Link onClick={closeMenu} to="/intro#partners">{t('navSubPartners')}</Link></li>
            </ul>
          </li>
          <li className={`dropdown ${activeDropdown === 'meditation' ? 'mobile-active' : ''}`}>
            <Link onClick={(e) => toggleDropdown('meditation', e)} to="/meditation" className="dropdown-toggle">
              <span>{t('navDownload')}</span>
              <i className="dropdown-icon"></i>
            </Link>
            <ul className="dropdown-menu">
              <li><Link onClick={closeMenu} to="/meditation#guided-prayer">{t('navSubGuidedPrayer')}</Link></li>
              <li><Link onClick={closeMenu} to="/meditation#5weeks">{t('navSub7Days')}</Link></li>
              <li><Link onClick={closeMenu} to="/meditation#sunday-service">{t('navSubSundayService')}</Link></li>
              <li><Link onClick={closeMenu} to="/meditation#alliance-study">{t('navSubAllianceStudy')}</Link></li>
              <li><Link onClick={closeMenu} to="/meditation#bible-reading">{t('navSubBibleReading')}</Link></li>
              <li><Link onClick={closeMenu} to="/meditation#evangelism">{t('navSubEvangelism')}</Link></li>
              <li><Link onClick={closeMenu} to="/meditation#creeds">{t('navSubCreeds')}</Link></li>
            </ul>
          </li>
          <li className={`dropdown ${activeDropdown === 'angeltree' ? 'mobile-active' : ''}`}>
            <Link onClick={(e) => toggleDropdown('angeltree', e)} to="/angeltree" className="dropdown-toggle">
              <span>{t('navAngelTree')}</span>
              <i className="dropdown-icon"></i>
            </Link>
            <ul className="dropdown-menu">
              <li><Link onClick={closeMenu} to="/angeltree#intro">{t('navSubAngelIntro')}</Link></li>
              <li><Link onClick={closeMenu} to="/angeltree#christmas">{t('navSubChristmas')}</Link></li>
              <li><Link onClick={closeMenu} to="/angeltree#manna">{t('navSubMannaBridge')}</Link></li>
            </ul>
          </li>
          <li className={`dropdown ${activeDropdown === 'programs' ? 'mobile-active' : ''}`}>
            <Link onClick={(e) => toggleDropdown('programs', e)} to="/programs" className="dropdown-toggle">
              <span>{t('navPrograms')}</span>
              <i className="dropdown-icon"></i>
            </Link>
            <ul className="dropdown-menu">
              <li><Link onClick={closeMenu} to="/programs#prayer">{t('navSubPrayer')}</Link></li>
              <li><Link onClick={closeMenu} to="/programs#bible">{t('navSubBible')}</Link></li>
              <li><Link onClick={closeMenu} to="/programs#monastery">{t('navSubMonastery')}</Link></li>
              <li><Link onClick={closeMenu} to="/programs#flowing">{t('navSubFlowing')}</Link></li>
            </ul>
          </li>
          <li className={`dropdown ${activeDropdown === 'volunteer-programs' ? 'mobile-active' : ''}`}>
            <Link onClick={(e) => toggleDropdown('volunteer-programs', e)} to="/volunteer-programs" className="dropdown-toggle">
              <span>{t('navVolunteerProg')}</span>
              <i className="dropdown-icon"></i>
            </Link>
            <ul className="dropdown-menu">
              <li><Link onClick={closeMenu} to="/volunteer-programs#saturday">{t('navSubSaturdayPrayer')}</Link></li>
              <li><Link onClick={closeMenu} to="/volunteer-programs#personal">{t('navSubPersonalPrayer')}</Link></li>
              <li><Link onClick={closeMenu} to="/volunteer-programs#homeless">{t('navSubHomeless')}</Link></li>
              <li><Link onClick={closeMenu} to="/volunteer-programs#alliance">{t('navSubAllianceBible')}</Link></li>
            </ul>
          </li>
          <li className={`dropdown ${activeDropdown === 'volunteer-guide' ? 'mobile-active' : ''}`}>
            <Link onClick={(e) => toggleDropdown('volunteer-guide', e)} to="/volunteer-guide" className="dropdown-toggle">
              <span>{t('navVolunteerGuide')}</span>
              <i className="dropdown-icon"></i>
            </Link>
            <ul className="dropdown-menu">
              <li><Link onClick={closeMenu} to="/volunteer-guide#intro">{t('navSubVolunteerIntro')}</Link></li>
              <li><Link onClick={closeMenu} to="/volunteer-guide#support">{t('navSubKakaoSupport')}</Link></li>
              <li><Link onClick={closeMenu} to="/volunteer-guide#guide">{t('navSubGuide')}</Link></li>
              <li><Link onClick={closeMenu} to="/volunteer-guide#chatroom">{t('navSubChatRoom')}</Link></li>
              <li><Link onClick={closeMenu} to="/volunteer-guide#contributors">{t('navSubContributors')}</Link></li>
            </ul>
          </li>
          <li className={`dropdown ${activeDropdown === 'youtube' ? 'mobile-active' : ''}`}>
            <Link onClick={(e) => toggleDropdown('youtube', e)} to="/youtube" className="dropdown-toggle">
              <span>{t('navYoutube')}</span>
              <i className="dropdown-icon"></i>
            </Link>
            <ul className="dropdown-menu">
              <li><Link onClick={closeMenu} to="/youtube#main">{t('navSubYtMain')}</Link></li>
              <li><Link onClick={closeMenu} to="/youtube#intro">{t('navSubYtIntro')}</Link></li>
              <li><Link onClick={closeMenu} to="/youtube#anniversary">{t('navSubYtAnniversary')}</Link></li>
              <li><Link onClick={closeMenu} to="/youtube#meditation">{t('navSubYtMeditation')}</Link></li>
              <li><Link onClick={closeMenu} to="/youtube#inside">{t('navSubYtInside')}</Link></li>
              <li><Link onClick={closeMenu} to="/youtube#angeltree">{t('navSubYtAngelTree')}</Link></li>
            </ul>
          </li>
          <li className={`dropdown ${activeDropdown === 'notice' ? 'mobile-active' : ''}`}>
            <Link onClick={(e) => toggleDropdown('notice', e)} to="/notice/matching" className="dropdown-toggle">
              <span>{t('navNotice')}</span>
              <i className="dropdown-icon"></i>
            </Link>
            <ul className="dropdown-menu">
              <li><Link onClick={closeMenu} to="/notice/matching">{t('navSubMatching')}</Link></li>
              <li><Link onClick={closeMenu} to="/notice/books">{t('navSubBookSupport')}</Link></li>
              <li><Link onClick={closeMenu} to="/notice/revival-acc">{t('navSubRevivalAccounting')}</Link></li>
              <li><Link onClick={closeMenu} to="/notice/angeltree-acc">{t('navSubAngelAccounting')}</Link></li>
            </ul>
          </li>
          <li className="lang-selector-item">
            <div className="lang-selector">
              <select onChange={handleLangChange} value={i18n.language}>
                <option value="ko">한국어</option>
                <option value="en">English</option>
                <option value="zh">中文</option>
                <option value="es">Español</option>
                <option value="pt">Português</option>
                <option value="tl">Tagalog</option>
              </select>
            </div>
          </li>
        </ul>
      </nav>

      <div className="menu-toggle" onClick={toggleMenu}>
        {isMenuOpen ? '✕' : '☰'}
      </div>
    </header>
  );
};

export default Header;
