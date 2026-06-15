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

      const scrollToElement = () => {
        const element = document.getElementById(targetId);
        if (element) {
          // 헤더 높이를 실측하여 정밀 오프셋 보정
          const header = document.querySelector('header');
          const headerHeight = header ? header.getBoundingClientRect().height : 0;
          const extraPadding = 20; // 헤더 아래 여유 공간
          const elementTop = element.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: elementTop - headerHeight - extraPadding,
            behavior: 'auto'
          });
          return true;
        }
        return false;
      };

      if (isNewPage) {
        // [신규 페이지 진입 시]
        // 3단계 타이머로 이미지 로딩에 의한 레이아웃 밀림을 완벽 보정합니다.
        // 1차 즉각 안착 시도 (120ms) - 텍스트 렌더 완료 시점
        const timer1 = setTimeout(() => {
          scrollToElement();
        }, 120);

        // 2차 중간 보정 시도 (800ms) - 대부분의 이미지 로드 완료 시점
        const timer2 = setTimeout(() => {
          scrollToElement();
        }, 800);

        // 3차 최종 보정 시도 (1500ms) - 모바일 느린 네트워크 환경까지 대응
        const timer3 = setTimeout(() => {
          scrollToElement();
        }, 1500);

        prevPathnameRef.current = pathname;
        return () => {
          clearTimeout(timer1);
          clearTimeout(timer2);
          clearTimeout(timer3);
        };
      } else {
        // [동일 페이지 해시 이동 시]
        // 이미 렌더링이 완료된 상태이므로 부드럽게(smooth) 스크롤합니다.
        const element = document.getElementById(targetId);
        if (element) {
          const header = document.querySelector('header');
          const headerHeight = header ? header.getBoundingClientRect().height : 0;
          const extraPadding = 20;
          const elementTop = element.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: elementTop - headerHeight - extraPadding,
            behavior: 'smooth'
          });
        }
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
