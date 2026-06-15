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

    // Dynamic HTML lang attribute based on i18n language
    const currentLang = i18n.language.split('-')[0];
    document.documentElement.lang = currentLang;

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
    const baseSiteTitle = i18n.language === 'en'
      ? "Prison Revival & Angel Tree"
      : `Prison Revival & Angel Tree | ${t('siteTitle')}`;

    let pageTitle = baseSiteTitle;
    if (pathname === '/intro') {
      pageTitle = `${t('navIntro')} - ${baseSiteTitle}`;
    } else if (pathname === '/meditation') {
      pageTitle = `${t('navDownload')} - ${baseSiteTitle}`;
    } else if (pathname === '/angeltree') {
      pageTitle = `${t('navAngelTree')} - ${baseSiteTitle}`;
    } else if (pathname === '/programs') {
      pageTitle = `${t('progTitleMain')} - ${baseSiteTitle}`;
    } else if (pathname === '/volunteer-programs') {
      pageTitle = `${t('volProgTitleMain')} - ${baseSiteTitle}`;
    } else if (pathname === '/volunteer-guide') {
      pageTitle = `${t('volGuideTitleMain')} - ${baseSiteTitle}`;
    } else if (pathname === '/youtube') {
      pageTitle = `${t('navYoutube')} - ${baseSiteTitle}`;
    } else if (pathname.startsWith('/notice')) {
      pageTitle = `${t('navNotice')} - ${baseSiteTitle}`;
    } else if (pathname === '/contact-managers') {
      pageTitle = `${t('footerContactInquiry')} - ${baseSiteTitle}`;
    } else if (pathname === '/admin') {
      pageTitle = `관리자 - ${baseSiteTitle}`;
    } else if (pathname === '/sitemap') {
      pageTitle = `${t('navSitemap')} - ${baseSiteTitle}`;
    }
    
    document.title = pageTitle;

    // Dynamic Description (meta description & og:description)
    let rawDesc = t('heroDesc');
    if (pathname === '/intro') {
      rawDesc = t('introPageDesc');
    } else if (pathname === '/meditation') {
      rawDesc = t('meditationPageDesc');
    } else if (pathname === '/angeltree') {
      rawDesc = t('angelDescMain');
    } else if (pathname === '/programs') {
      rawDesc = t('progDescMain');
    } else if (pathname === '/volunteer-programs') {
      rawDesc = t('volProgDescMain');
    } else if (pathname === '/volunteer-guide') {
      rawDesc = t('volGuideDescMain');
    } else if (pathname === '/youtube') {
      rawDesc = t('youtubeDesc');
    } else if (pathname === '/contact-managers') {
      rawDesc = t('contactPageDesc');
    } else if (pathname === '/sitemap') {
      rawDesc = t('sitemapDesc');
    }

    const englishBaseDesc = "Prison Revival & Angel Tree is a lay gospel organization spreading the Gospel to the incarcerated.";
    const pageDesc = `${englishBaseDesc} | ${rawDesc}`;

    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) descMeta.setAttribute('content', pageDesc);

    const ogDescMeta = document.querySelector('meta[property="og:description"]');
    if (ogDescMeta) ogDescMeta.setAttribute('content', pageDesc);

    const ogTitleMeta = document.querySelector('meta[property="og:title"]');
    if (ogTitleMeta) ogTitleMeta.setAttribute('content', pageTitle);

    // Dynamic Canonical URL & og:url Tag updates for SEO optimization
    const canonicalUrl = `https://prisonrevival.org${pathname}`;

    let link = document.querySelector("link[rel='canonical']");
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", canonicalUrl);

    let ogUrl = document.querySelector("meta[property='og:url']");
    if (!ogUrl) {
      ogUrl = document.createElement("meta");
      ogUrl.setAttribute("property", "og:url");
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute("content", canonicalUrl);
  }, [pathname, hash, i18n.language, t]);

  // Intersection Observer for Scroll Reveal animations
  useEffect(() => {
    const timer = setTimeout(() => {
      const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Trigger animation only once
          }
        });
      };

      const observer = new IntersectionObserver(observerCallback, {
        root: null,
        rootMargin: '0px 0px -80px 0px', // Trigger slightly before entering viewport fully
        threshold: 0.05
      });

      const revealElements = document.querySelectorAll('.scroll-reveal');
      revealElements.forEach(el => observer.observe(el));

      return () => observer.disconnect();
    }, 200);

    return () => clearTimeout(timer);
  }, [pathname]);

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
