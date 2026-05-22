import React, { useEffect, useRef } from 'react';
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
import Admin from './pages/Admin';
import Sitemap from './pages/Sitemap';
import { Analytics } from '@vercel/analytics/react';
import './styles/index.css';

import { useTranslation } from 'react-i18next';

// ScrollToTop component to reset scroll on route change
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  const { t, i18n } = useTranslation();
  const prevPathnameRef = useRef(pathname);

  useEffect(() => {
    // Force scroll unlock on every route change
    document.body.style.overflow = 'auto';

    if (hash) {
      const targetId = hash.replace('#', '');
      const isNewPage = prevPathnameRef.current !== pathname;

      const scrollToElement = (behavior) => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior });
          return true;
        }
        return false;
      };

      if (isNewPage) {
        // [신규 페이지 진입 시]
        // 0ms 마운트 시점에 즉시 스크롤 시 이미지가 없어 레이아웃이 덜 정해졌으므로 튕김이 생깁니다.
        // 즉시 스크롤은 건너뛰고, 마운트 후 레이아웃이 자리 잡는 120ms 시점에 '단 한 번만' 
        // 튕김 없이 auto(즉시 이동)로 목적지에 정밀 안착시킵니다.
        const timer = setTimeout(() => {
          scrollToElement('auto');
        }, 120);

        prevPathnameRef.current = pathname;
        return () => clearTimeout(timer);
      } else {
        // [동일 페이지 해시 이동 시]
        // 이미 렌더링이 완료된 상태이므로 타이머 없이 즉시 부드럽게(smooth) 스크롤합니다.
        scrollToElement('smooth');
        prevPathnameRef.current = pathname;
      }
    } else {
      window.scrollTo(0, 0);
      prevPathnameRef.current = pathname;
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
    } else if (pathname === '/admin') {
      pageTitle = `관리자 - ${t('siteTitle')}`;
    } else if (pathname === '/sitemap') {
      pageTitle = `${t('navSitemap')} - ${t('siteTitle')}`;
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
          <Route path="/admin" element={<Admin />} />
          <Route path="/sitemap" element={<Sitemap />} />
        </Routes>
        <Footer />
        <Analytics />
      </div>
    </Router>
  );
};

export default App;
