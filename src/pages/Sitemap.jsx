import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

const Sitemap = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const currentLang = i18n.language.split('-')[0];
  const supportedLangs = ['ko', 'en', 'zh', 'es', 'pt', 'tl'];
  const mapImageSrc = supportedLangs.includes(currentLang)
    ? `/images/main_map_${currentLang}.png`
    : '/images/main_map_en.png';

  const handleMeditationNav = (lang) => {
    i18n.changeLanguage(lang);
    navigate('/meditation');
  };

  // 사용자가 전달한 19개 영역에 대한 좌표 및 링크 매핑 데이터
  const sitemapLinks = [
    { id: 1, name: '프리즌 리바이벌 소개', to: '/intro', coords: { left: '3.6%', top: '13.2%', width: '11.8%', height: '17.6%' } },
    { id: 2, name: '프리즌 묵상 편지사역', to: '/intro', coords: { left: '1.4%', top: '32.6%', width: '11.7%', height: '13.6%' } },
    { id: 3, name: '프리즌 얼라이언스', to: '/programs#bible', coords: { left: '28.2%', top: '23.1%', width: '10.6%', height: '13.9%' } },
    { id: 4, name: '프리즌 수도원 프로젝트', to: '/programs#monastery', coords: { left: '0.7%', top: '52.1%', width: '12.3%', height: '13.2%' } },
    { id: 5, name: '프리즌 중보기도 사역', to: '/programs#prayer', coords: { left: '7.4%', top: '67.0%', width: '11.3%', height: '11.6%' } },
    { id: 6, name: '담장 플로잉 프로젝트', to: '/programs#flowing', coords: { left: '21.3%', top: '67.3%', width: '11.6%', height: '11.9%' } },
    { id: 7, name: '프리즌 홈리스 사역', to: '/volunteer-programs#homeless', coords: { left: '22.1%', top: '46.9%', width: '11.6%', height: '10.7%' } },
    { id: 8, name: '엔젤트리', to: '/angeltree', coords: { left: '69.1%', top: '14.9%', width: '10.8%', height: '15.3%' } },
    { id: 9, name: '프리즌 발렌티어 참여하기', to: '/volunteer-guide#support', coords: { left: '86.3%', top: '35.9%', width: '12.0%', height: '12.8%' } },
    { id: 10, name: '후원하기', to: '#', coords: { left: '62.9%', top: '33.3%', width: '8.1%', height: '11.6%' } },
    { id: 11, name: '간증&스토리', to: '/youtube#inside', coords: { left: '63.2%', top: '57.2%', width: '11.8%', height: '13.7%' } },
    { id: 12, name: '프리즌 미디어 센터', to: '/youtube', coords: { left: '81.9%', top: '68.8%', width: '13.1%', height: '11.7%' } },
    { id: 13, name: '발렌티어 지원하기', to: 'http://pf.kakao.com/_ptYAG/chat', coords: { left: '2.2%', top: '91.4%', width: '7.0%', height: '3.0%' } },
    { id: 14, name: '섬겨주시는 발렌티어분들', to: '/volunteer-guide#contributors', coords: { left: '2.4%', top: '95.2%', width: '8.0%', height: '2.9%' } },
    { id: 15, name: '공지사항', to: '/notice/matching', coords: { left: '24.8%', top: '84.4%', width: '12.4%', height: '14.8%' } },
    { id: 16, name: '프리즌 성경책 in 갓피플 플로잉 프로젝트', to: 'https://mall.godpeople.com/?G=1721883418-5', coords: { left: '38.9%', top: '84.2%', width: '11.0%', height: '15.0%' } },
    { id: 17, name: '임은미 선교사님 책 in 갓피플 플로잉 프로젝트', to: '#', coords: { left: '51.1%', top: '84.6%', width: '11.3%', height: '14.9%' } },
    { id: 18, name: '엔젤트리 만나브릿지 in 세움 정기 후원 프로젝트', to: 'https://online.mrm.or.kr/sr5t4uf', coords: { left: '64.5%', top: '84.7%', width: '11.0%', height: '14.6%' } },
    { id: 19, name: '묵상편지 다운로드 (한국어)', to: '/meditation', onClick: () => handleMeditationNav('ko'), coords: { left: '79.4%', top: '89.6%', width: '5.3%', height: '3.0%' } },
    { id: 20, name: '묵상편지 다운로드 (영어)', to: '/meditation', onClick: () => handleMeditationNav('en'), coords: { left: '85.6%', top: '89.6%', width: '5.3%', height: '3.0%' } },
    { id: 21, name: '묵상편지 다운로드 (중국어)', to: '/meditation', onClick: () => handleMeditationNav('zh'), coords: { left: '92.2%', top: '89.6%', width: '4.9%', height: '2.9%' } },
    { id: 22, name: '묵상편지 다운로드 (스페인어)', to: '/meditation', onClick: () => handleMeditationNav('es'), coords: { left: '79.6%', top: '93.7%', width: '5.2%', height: '2.7%' } },
    { id: 23, name: '묵상편지 다운로드 (포르투갈어)', to: '/meditation', onClick: () => handleMeditationNav('pt'), coords: { left: '85.8%', top: '93.3%', width: '5.0%', height: '3.1%' } },
    { id: 24, name: '묵상편지 다운로드 (타갈로그어)', to: '/meditation', onClick: () => handleMeditationNav('tl'), coords: { left: '92.1%', top: '93.6%', width: '4.9%', height: '2.7%' } }
  ];

  return (
    <main className="sitemap-page">
      <div 
        className="fade-in" 
        style={{ 
          textAlign: 'center',
          width: '95vw',
          maxWidth: '1600px',
          margin: '0.5rem auto 4rem',
          padding: '0 1rem'
        }}
      >
        <div 
          className="sitemap-image-container" 
          style={{ 
            display: 'block',
            width: '100%',
            transition: 'transform 0.3s ease'
          }}
        >
          <div 
            style={{ 
              position: 'relative', 
              width: '100%', 
              aspectRatio: '16 / 9', 
              overflow: 'hidden', 
              borderRadius: '10px',
              backgroundColor: '#f9f9f9'
            }}
          >
            <img 
              src={mapImageSrc} 
              alt={t('navSitemap')} 
              style={{ 
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%', 
                height: '100%', 
                objectFit: 'cover',
                display: 'block',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.04)'
              }} 
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://placehold.co/1200x800?text=Sitemap+Image+Not+Found';
              }}
            />

            {/* 링크 영역 동적 매핑 (외부 링크는 a 태그 분기 처리) */}
            {sitemapLinks.map((link, idx) => {
              const isExternal = link.to.startsWith('http');
              const isHashOnly = link.to === '#';

              if (typeof link.onClick === 'function') {
                return (
                  <div
                    key={link.id}
                    onClick={link.onClick}
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    style={{
                      position: 'absolute',
                      left: link.coords.left,
                      top: link.coords.top,
                      width: link.coords.width,
                      height: link.coords.height,
                      cursor: 'pointer',
                      borderRadius: '12px',
                      backgroundColor: hoveredIndex === idx ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                      transition: 'background-color 0.2s ease',
                      zIndex: 10
                    }}
                    title={link.name}
                  />
                );
              }

              if (isExternal) {
                return (
                  <a
                    key={link.id}
                    href={link.to}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    style={{
                      position: 'absolute',
                      left: link.coords.left,
                      top: link.coords.top,
                      width: link.coords.width,
                      height: link.coords.height,
                      cursor: 'pointer',
                      borderRadius: '12px',
                      backgroundColor: hoveredIndex === idx ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                      transition: 'background-color 0.2s ease',
                      zIndex: 10
                    }}
                    title={link.name}
                  />
                );
              }

              const linkProps = isHashOnly 
                ? {
                    to: {},
                    onClick: (e) => e.preventDefault(),
                    style: { cursor: 'default' }
                  }
                : {
                    to: link.to
                  };

              return (
                <Link
                  key={link.id}
                  {...linkProps}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{
                    position: 'absolute',
                    left: link.coords.left,
                    top: link.coords.top,
                    width: link.coords.width,
                    height: link.coords.height,
                    cursor: isHashOnly ? 'default' : 'pointer',
                    borderRadius: '12px',
                    backgroundColor: hoveredIndex === idx ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                    transition: 'background-color 0.2s ease',
                    zIndex: 10,
                    ...linkProps.style
                  }}
                  title={link.name}
                />
              );
            })}
          </div>
        </div>

        <div style={{ marginTop: '4rem' }} className="fade-in delay-1">
          <Link to="/" className="secondary-btn">
            {t('backToHome')}
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Sitemap;

