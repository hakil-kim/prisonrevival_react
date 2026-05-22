import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Sitemap = () => {
  const { t } = useTranslation();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // 사용자가 전달한 17개 영역에 대한 좌표 및 링크 매핑 데이터
  const sitemapLinks = [
    {
      id: 1,
      name: '프리즌 리바이벌 소개',
      to: '/intro',
      coords: { left: '3.3%', top: '18.5%', width: '13.4%', height: '12.5%' }
    },
    {
      id: 2,
      name: '프리즌 묵상사역',
      to: '/programs',
      coords: { left: '1%', top: '34%', width: '12%', height: '11%' }
    },
    {
      id: 3,
      name: '프리즌 얼라이언스',
      to: '/programs',
      coords: { left: '27%', top: '28%', width: '12%', height: '11%' }
    },
    {
      id: 4,
      name: '프리즌 수도원 프로젝트',
      to: '/programs#monastery',
      coords: { left: '1%', top: '56%', width: '12%', height: '11%' }
    },
    {
      id: 5,
      name: '중보기도 사역',
      to: '/programs#prayer',
      coords: { left: '8%', top: '68%', width: '11%', height: '11%' }
    },
    {
      id: 6,
      name: '홈리스 사역',
      to: '/volunteer-programs#homeless',
      coords: { left: '23%', top: '49%', width: '12%', height: '10%' }
    },
    {
      id: 7,
      name: '프리즌 플로잉 프로젝트',
      to: '/programs#flowing',
      coords: { left: '23%', top: '70%', width: '12%', height: '10%' }
    },
    {
      id: 8,
      name: '엔젤트리',
      to: '/angeltree',
      coords: { left: '69%', top: '21%', width: '12%', height: '13%' }
    },
    {
      id: 9,
      name: '참여하기',
      to: '/volunteer-guide',
      coords: { left: '84%', top: '36%', width: '12%', height: '13%' }
    },
    {
      id: 10,
      name: '후원하기',
      to: '/angeltree',
      coords: { left: '61%', top: '36%', width: '11%', height: '11%' }
    },
    {
      id: 11,
      name: '간증&스토리',
      to: '/angeltree',
      coords: { left: '62%', top: '60%', width: '12%', height: '11%' }
    },
    {
      id: 12,
      name: '미디어',
      to: '/youtube',
      coords: { left: '80%', top: '72%', width: '11%', height: '11%' }
    },
    {
      id: 13,
      name: '공지사항',
      to: '/notice/matching',
      coords: { left: '26%', top: '87%', width: '11%', height: '9.9%' }
    },
    {
      id: 14,
      name: '자료실',
      to: '/notice/books',
      coords: { left: '38%', top: '87%', width: '11%', height: '9.9%' }
    },
    {
      id: 15,
      name: '문의하기',
      to: '/contact-managers',
      coords: { left: '50%', top: '87%', width: '11%', height: '9.9%' }
    },
    {
      id: 16,
      name: '다국어',
      to: '#',
      coords: { left: '62.8%', top: '87%', width: '12.8%', height: '9.9%' }
    },
    {
      id: 17,
      name: '함께 걸어 주세요 (참여하기)',
      to: '/volunteer-guide',
      coords: { left: '2%', top: '87%', width: '9%', height: '9.9%' }
    }
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
              src="/images/main_map.png" 
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

            {/* 17개 링크 영역 동적 매핑 */}
            {sitemapLinks.map((link, idx) => {
              const isHashOnly = link.to === '#';
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
                    display: 'block',
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

