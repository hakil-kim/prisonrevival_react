import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Meditation from './pages/Meditation';
import Intro from './pages/Intro';
import AngelTree from './pages/AngelTree';
import Programs from './pages/Programs';
import VolunteerPrograms from './pages/VolunteerPrograms';
import VolunteerGuide from './pages/VolunteerGuide';
import YouTube from './pages/YouTube';
import Notice from './pages/Notice';
import ContactManagers from './pages/ContactManagers';
import { Analytics } from '@vercel/analytics/react';
import './styles/index.css';

import { useTranslation } from 'react-i18next';

// ScrollToTop component to reset scroll on route change
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    // Force scroll unlock on every route change
    document.body.style.overflow = 'auto';

    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }

    // Dynamic Document Title based on route & i18n language
    let pageTitle = t('siteTitle');
    if (pathname === '/intro') {
      pageTitle = `${t('navIntro')} - ${t('siteTitle')}`;
    } else if (pathname === '/meditation') {
      pageTitle = `${t('navDownload')} - ${t('siteTitle')}`;
    } else if (pathname === '/angeltree') {
      pageTitle = `${t('navAngelTree')} - ${t('siteTitle')}`;
    } else if (pathname === '/programs') {
      pageTitle = `${t('progTitleMain')} - ${t('siteTitle')}`;
    } else if (pathname === '/volunteer-programs') {
      pageTitle = `${t('volProgTitleMain')} - ${t('siteTitle')}`;
    } else if (pathname === '/volunteer-guide') {
      pageTitle = `${t('volGuideTitleMain')} - ${t('siteTitle')}`;
    } else if (pathname === '/youtube') {
      pageTitle = `${t('navYoutube')} - ${t('siteTitle')}`;
    } else if (pathname.startsWith('/notice')) {
      pageTitle = `${t('navNotice')} - ${t('siteTitle')}`;
    } else if (pathname === '/contact-managers') {
      pageTitle = `${t('footerContactInquiry')} - ${t('siteTitle')}`;
    }
    
    document.title = pageTitle;
  }, [pathname, hash, i18n.language, t]);

  return null;
};

const App = () => {
  return (
    <Router>
      <div className="app">
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/intro" element={<Intro />} />
          <Route path="/meditation" element={<Meditation />} />
          <Route path="/angeltree" element={<AngelTree />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/volunteer-programs" element={<VolunteerPrograms />} />
          <Route path="/volunteer-guide" element={<VolunteerGuide />} />
          <Route path="/youtube" element={<YouTube />} />
          <Route path="/notice/:type" element={<Notice />} />
          <Route path="/contact-managers" element={<ContactManagers />} />
        </Routes>
        <Footer />
        <Analytics />
      </div>
    </Router>
  );
};

export default App;
