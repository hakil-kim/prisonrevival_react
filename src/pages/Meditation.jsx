import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import AlertModal from '../components/common/AlertModal';
import { CONFIG } from '../constants/config';
import { MEDITATION_DATES } from '../constants/meditation_data';

const Meditation = () => {
  const { t, i18n } = useTranslation();
  const [recentSundays, setRecentSundays] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [archiveState, setArchiveState] = useState({
    activeYear: null,
    activeMonth: null,
    hoveredYear: null,
    menuPosition: { left: 0 }
  });

  const currentLang = i18n.language.split('-')[0];

  useEffect(() => {
    // 최근 5주 일요일 계산
    const sundays = [];
    const today = new Date();
    const lastSunday = new Date(today);
    lastSunday.setDate(today.getDate() - today.getDay());
    lastSunday.setHours(0, 0, 0, 0);

    for (let i = 0; i < 5; i++) {
      const d = new Date(lastSunday);
      d.setDate(lastSunday.getDate() - (i * 7));
      sundays.push(d);
    }
    setRecentSundays(sundays);
  }, []);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatDateLabel = (date) => {
    return date.toLocaleDateString(i18n.language, { 
      year: 'numeric', month: 'long', day: 'numeric' 
    });
  };

  const handleDownload = (dateStr) => {
    const mergedLinks = {
      ...CONFIG.weeklyMeditationLinks,
      ...MEDITATION_DATES
    };
    const linkData = mergedLinks[dateStr];
    const link = linkData ? linkData[currentLang] : null;
    if (link) {
      try {
        const newWindow = window.open(link, '_blank');
        if (!newWindow) {
          window.location.href = link;
        }
      } catch (err) {
        window.location.href = link;
      }
    } else {
      setAlertMessage(t('materialsPreparing'));
    }
  };

  const getSundaysOfMonth = (year, month) => {
    const dates = [];
    const date = new Date(year, month, 1);
    while (date.getMonth() === month) {
      if (date.getDay() === 0) dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return dates.reverse();
  };

  const years = [2026, 2025, 2024, 2023, 2022, 2021];

  return (
    <main>
      <section className="page-hero">
        <div className="page-hero-bg"></div>
        <div className="container">
          <h1 className="section-title fade-in">{t('meditationPageTitle')}</h1>
          <p className="section-desc fade-in delay-1">{t('meditationPageDesc')}</p>
        </div>
      </section>

      {/* 1. 따라하는기도 */}
      <section className="section" id="guided-prayer">
        <div className="container">
          <h2 className="section-title">{t('navSubGuidedPrayer')}</h2>
          <p style={{ textAlign: 'center', opacity: 0.7 }}>{t('materialsPreparing')}</p>
        </div>
      </section>

      {/* 2. 5주치 묵상 (기존 묵상자료 내용) */}
      <section className="section" id="5weeks" style={{ backgroundColor: 'var(--off-white)' }}>
        <div className="container">
          <h2 className="section-title">{t('navSub7Days')}</h2>
          <h2 className="sub-section-title" style={{ marginBottom: '3rem', marginTop: '2rem' }}>{t('meditationRecentTitle')}</h2>
          <div className="meditation-theme-light">
            {recentSundays.map((date, idx) => {
              const dateStr = formatDate(date);
              return (
                <div key={idx} className="btn-box" onClick={() => handleDownload(dateStr)}>
                  <button type="button" className="download-btn">
                    <span>{formatDateLabel(date)}</span>
                  </button>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: '10rem' }}>
            <h2 className="sub-section-title" style={{ marginBottom: '3rem' }}>{t('meditationYearlyTitle')}</h2>
            <div className="archive-hybrid-container" onMouseLeave={() => setArchiveState(prev => ({ ...prev, hoveredYear: null, activeMonth: null }))}>
              <div className="year-pill-row">
                {years.map(year => (
                  <div 
                    key={year} 
                    className={`archive-pill ${archiveState.hoveredYear === year ? 'active' : ''}`}
                    onMouseEnter={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const parentRect = e.currentTarget.offsetParent.getBoundingClientRect();
                      let leftPos = (rect.left - parentRect.left) + (rect.width / 2) - 225;
                      if (leftPos < 0) leftPos = 0;
                      setArchiveState(prev => ({ 
                        ...prev, 
                        hoveredYear: year, 
                        menuPosition: { left: leftPos } 
                      }));
                    }}
                  >
                    {year}
                  </div>
                ))}
              </div>

              {archiveState.hoveredYear && (
                <div 
                  className="archive-floating-menu active" 
                  style={{ left: `${archiveState.menuPosition.left}px` }}
                >
                  <div className="archive-column">
                    <h4>{t('archiveMonth')}</h4>
                    <div className="vertical-menu">
                      {Array.from({ length: 12 }, (_, i) => 11 - i).map(m => {
                        const today = new Date();
                        if (archiveState.hoveredYear === today.getFullYear() && m > today.getMonth()) return null;
                        return (
                          <div 
                            key={m} 
                            className={`archive-item ${archiveState.activeMonth === m ? 'active' : ''}`}
                            onMouseEnter={() => setArchiveState(prev => ({ ...prev, activeMonth: m }))}
                          >
                            {new Date(2000, m).toLocaleString(i18n.language, { month: 'long' })}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="archive-column">
                    <h4>{t('archiveDate')}</h4>
                    <div className="vertical-menu">
                      {archiveState.activeMonth !== null && getSundaysOfMonth(archiveState.hoveredYear, archiveState.activeMonth).map((date, idx) => {
                        const dateStr = formatDate(date);
                        const hasLink = !!(CONFIG.weeklyMeditationLinks[dateStr] || MEDITATION_DATES[dateStr]);
                        return (
                          <div 
                            key={idx} 
                            className="date-item" 
                            style={{ opacity: hasLink ? 1 : 0.4 }}
                            onClick={() => handleDownload(dateStr)}
                          >
                            {date.toLocaleDateString(i18n.language, { month: 'short', day: 'numeric' })}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>


          <div style={{ marginTop: '6rem', textAlign: 'center', marginBottom: '4rem' }}>
          </div>
        </div>
      </section>

      {/* 3. 주일예배파일 */}
      <section className="section" id="sunday-service">
        <div className="container">
          <h2 className="section-title">{t('navSubSundayService')}</h2>
          <p style={{ textAlign: 'center', opacity: 0.7 }}>{t('materialsPreparing')}</p>
        </div>
      </section>

      {/* 4. 얼라이언스성경공부 */}
      <section className="section" id="alliance-study" style={{ backgroundColor: 'var(--off-white)' }}>
        <div className="container">
          <h2 className="section-title">{t('navSubAllianceStudy')}</h2>
          <p style={{ textAlign: 'center', opacity: 0.7 }}>{t('materialsPreparing')}</p>
        </div>
      </section>

      {/* 5. 성경일독표 */}
      <section className="section" id="bible-reading">
        <div className="container">
          <h2 className="section-title">{t('navSubBibleReading')}</h2>
          <p style={{ textAlign: 'center', opacity: 0.7 }}>{t('materialsPreparing')}</p>
        </div>
      </section>

      {/* 6. 전도파일 */}
      <section className="section" id="evangelism" style={{ backgroundColor: 'var(--off-white)' }}>
        <div className="container">
          <h2 className="section-title">{t('navSubEvangelism')}</h2>
          <p style={{ textAlign: 'center', opacity: 0.7 }}>{t('materialsPreparing')}</p>
        </div>
      </section>

      {/* 7. 주기도문 + 사도신경 */}
      <section className="section" id="creeds">
        <div className="container">
          <h2 className="section-title">{t('navSubCreeds')}</h2>
          <p style={{ textAlign: 'center', opacity: 0.7 }}>{t('materialsPreparing')}</p>
          <div style={{ marginTop: '6rem', textAlign: 'center', marginBottom: '4rem' }}>
            <Link to="/" className="secondary-btn">{t('backToHome')}</Link>
          </div>
        </div>
      </section>

      <AlertModal 
        isOpen={!!alertMessage} 
        message={alertMessage} 
        onClose={() => setAlertMessage('')} 
      />
    </main>
  );
};

export default Meditation;
