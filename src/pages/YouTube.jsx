import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { CONFIG } from '../constants/config';
import VideoModal from '../components/common/VideoModal';

const YouTube = () => {
  const { t } = useTranslation();
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <main>
      <section className="page-hero">
        <div className="page-hero-bg"></div>
        <div className="container">
          <h1 className="section-title fade-in">{t('youtubeTitle')}</h1>
          <p className="section-desc fade-in delay-1">{t('youtubeDesc')}</p>
        </div>
      </section>

      <div className="container">

      {/* 1. Main / Shorts */}
      <section className="youtube-section fade-in" id="main">
        <div className="youtube-grid">
          <div className="youtube-content">
            <h3>{t('navSubYtMain')}</h3>
            <p>{t('ytMainContent')}</p>
            <button onClick={() => window.open('https://www.youtube.com/@PrisonRevival/shorts', '_blank')} className="yt-btn">
              {t('ytShortsBtn')}
            </button>
          </div>
          <div className="video-preview" onClick={() => window.open('https://www.youtube.com/@PrisonRevival/shorts', '_blank')}>
            <img src="/images/yt_shorts.png" alt="Shorts" onError={(e) => e.target.src = 'https://img.youtube.com/vi/placeholder/hqdefault.jpg'} />
            <span className="play-icon">🔗</span>
          </div>
        </div>
      </section>

      {/* 2. Ministry Intro */}
      <section className="youtube-section fade-in" id="intro">
        <div className="youtube-grid">
          <div className="video-preview" onClick={() => setSelectedVideo('oG_jy34D42M')}>
            <img src="https://img.youtube.com/vi/oG_jy34D42M/hqdefault.jpg" alt="Intro" />
            <span className="play-icon"></span>
          </div>
          <div className="youtube-content">
            <h3>{t('navSubYtIntro')}</h3>
            <p>{t('ytIntroContent')}</p>
            <button onClick={() => setSelectedVideo('oG_jy34D42M')} className="yt-btn">{t('ytPlayBtn')}</button>
          </div>
        </div>
      </section>

      {/* 3. 3rd Anniversary */}
      <section className="youtube-section fade-in" id="anniversary">
        <div className="youtube-grid">
          <div className="youtube-content">
            <h3>{t('navSubYtAnniversary')}</h3>
            <p>{t('ytAnnivContent')}</p>
            <button onClick={() => setSelectedVideo('qiTprhhuOSs')} className="yt-btn">{t('ytPlayBtn')}</button>
          </div>
          <div className="video-preview" onClick={() => setSelectedVideo('qiTprhhuOSs')}>
            <img src="https://img.youtube.com/vi/qiTprhhuOSs/hqdefault.jpg" alt="Anniversary" />
            <span className="play-icon"></span>
          </div>
        </div>
      </section>

      {/* 4. Meditation */}
      <section className="youtube-section fade-in" id="meditation">
        <div className="youtube-grid">
          <div className="video-preview" onClick={() => window.open(CONFIG.youtubeLinks.meditation, '_blank')}>
            <img src="/images/yt_meditation.png" alt="Meditation" onError={(e) => e.target.src = 'https://img.youtube.com/vi/placeholder/hqdefault.jpg'} />
            <span className="play-icon">🔗</span>
          </div>
          <div className="youtube-content">
            <h3>{t('navSubYtMeditation')}</h3>
            <p>{t('ytMeditationContent')}</p>
            <button onClick={() => window.open(CONFIG.youtubeLinks.meditation, '_blank')} className="yt-btn">
              {t('ytPlaylistBtn')}
            </button>
          </div>
        </div>
      </section>

      {/* 5. Grace Inside */}
      <section className="youtube-section fade-in" id="inside">
        <div className="youtube-grid">
          <div className="youtube-content">
            <h3>{t('navSubYtInside')}</h3>
            <p>{t('ytInsideContent')}</p>
            <button onClick={() => window.open(CONFIG.youtubeLinks.inside, '_blank')} className="yt-btn">
              {t('ytPlaylistBtn')}
            </button>
          </div>
          <div className="video-preview" onClick={() => window.open(CONFIG.youtubeLinks.inside, '_blank')}>
            <img src="/images/yt_grace.png" alt="Grace" onError={(e) => e.target.src = 'https://img.youtube.com/vi/placeholder/hqdefault.jpg'} />
            <span className="play-icon">🔗</span>
          </div>
        </div>
      </section>

      {/* 6. Angel Tree */}
      <section className="youtube-section fade-in" id="angeltree">
        <div className="youtube-grid">
          <div className="video-preview" onClick={() => window.open(CONFIG.youtubeLinks.angeltree, '_blank')}>
            <img src="/images/yt_angel.png" alt="Angel Tree" onError={(e) => e.target.src = 'https://img.youtube.com/vi/placeholder/hqdefault.jpg'} />
            <span className="play-icon">🔗</span>
          </div>
          <div className="youtube-content">
            <h3>{t('navSubYtAngelTree')}</h3>
            <p>{t('ytAngelContent')}</p>
            <button onClick={() => window.open(CONFIG.youtubeLinks.angeltree, '_blank')} className="yt-btn">
              {t('ytPlaylistBtn')}
            </button>
          </div>
        </div>
      </section>

      <div style={{ margin: '6rem 0', textAlign: 'center' }}>
        <Link to="/" className="secondary-btn">{t('backToHome')}</Link>
      </div>
    </div>

      {selectedVideo && (
        <VideoModal videoId={selectedVideo} onClose={() => setSelectedVideo(null)} />
      )}
    </main>
  );
};

export default YouTube;
