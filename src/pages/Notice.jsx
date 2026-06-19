import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { NOTICE_DATA } from '../constants/noticeData';

const Notice = () => {
  const { type } = useParams();
  const { t } = useTranslation();
  const [activeNoticeId, setActiveNoticeId] = useState(null);
  const noticeBoardRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (noticeBoardRef.current && !noticeBoardRef.current.contains(e.target)) {
        setActiveNoticeId(null);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const renderContentWithLinks = (text) => {
    if (!text) return null;
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split('\n').map((line, i) => {
      const parts = line.split(urlRegex);
      return (
        <span key={i}>
          {parts.map((part, j) => {
            if (urlRegex.test(part)) {
              return (
                <a 
                  key={j} 
                  href={part} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ color: '#047857', fontWeight: 'bold', textDecoration: 'underline' }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {part}
                </a>
              );
            }
            return part;
          })}
          <br />
        </span>
      );
    });
  };

  const getTitle = () => {
    switch (type) {
      case 'general': return t('noticeGeneralTitle');
      case 'matching': return t('noticeMatchingTitle');
      case 'books': return t('noticeBooksTitle');
      case 'revival-acc': return t('noticeRevivalAccTitle');
      case 'angeltree-acc': return t('noticeAngelAccTitle');
      default: return t('navNotice');
    }
  };

  return (
    <main>
      <section className="page-hero">
        <div className="page-hero-bg"></div>
        <div className="container">
          <h1 className="section-title fade-in">{getTitle()}</h1>
        </div>
      </section>

      <div className="container">
        <section className="section">
          {type === 'general' ? (
            <div className="notice-board" ref={noticeBoardRef} style={{ maxWidth: '800px', margin: '0 auto' }}>
              {Object.values(NOTICE_DATA)
                .sort((a, b) => b.date.localeCompare(a.date))
                .map((notice, index) => {
                  const isActive = activeNoticeId === notice.id;
                  return (
                    <div 
                      key={notice.id}
                      className="notice-item-wrapper"
                      style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        width: '100%',
                        marginTop: index > 0 ? '0.5rem' : '0' 
                      }}
                    >
                      <div 
                        className={`notice-item ${isActive ? 'active' : ''}`}
                        onClick={() => setActiveNoticeId(isActive ? null : notice.id)}
                        style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}
                      >
                        <div className="notice-left">
                          <span className="notice-dot"></span>
                          <span>{notice.title}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                          <span className={`notice-tag ${notice.tagClass || ''}`} style={{ whiteSpace: 'nowrap' }}>{notice.date}</span>
                          <span style={{ fontSize: '0.8rem', opacity: 0.6, transform: isActive ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s', display: 'inline-block' }}>▼</span>
                        </div>
                      </div>
                      <div 
                        className="notice-detail-content" 
                        style={{
                          maxHeight: isActive ? '1000px' : '0',
                          opacity: isActive ? 1 : 0,
                          overflow: 'hidden',
                          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                          padding: isActive ? '1.5rem' : '0 1.5rem',
                          backgroundColor: '#f9fafb',
                          borderRadius: '8px',
                          marginTop: isActive ? '0.5rem' : '0',
                          marginBottom: isActive ? '1rem' : '0',
                          fontSize: '0.95rem',
                          lineHeight: '1.75',
                          color: '#374151',
                          textAlign: 'left',
                          border: isActive ? '1px solid rgba(17, 42, 34, 0.08)' : 'none'
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {renderContentWithLinks(notice.content)}
                      </div>
                    </div>
                  );
                })}
            </div>
          ) : (
            <div style={{ 
              background: 'white', 
              padding: '4rem', 
              borderRadius: '24px', 
              boxShadow: '0 10px 40px rgba(0,0,0,0.03)', 
              textAlign: 'center', 
              border: '1px solid rgba(0,0,0,0.05)' 
            }}>
              <p style={{ fontSize: '1.2rem', color: '#666' }}>{t('noticePagePlaceholder')}</p>
            </div>
          )}
        </section>

        <div style={{ marginTop: '6rem', textAlign: 'center', marginBottom: '6rem' }}>
          <Link to="/" className="secondary-btn">{t('backToHome')}</Link>
        </div>
      </div>
    </main>
  );
};

export default Notice;
