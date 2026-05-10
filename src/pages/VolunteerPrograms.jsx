import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import ImageModal from '../components/common/ImageModal';

const VolunteerPrograms = () => {
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (src) => {
    setSelectedImage(src);
  };

  return (
    <main>
      <section className="page-hero">
        <div className="page-hero-bg"></div>
        <div className="container">
          <h1 className="section-title fade-in">{t('volProgTitleMain')}</h1>
          <p className="section-desc fade-in delay-1">{t('volProgDescMain')}</p>
        </div>
      </section>

      <div className="container">

      {[1, 2, 3, 4].map((num) => (
        <section key={num} id={num === 1 ? 'saturday' : num === 2 ? 'personal' : num === 3 ? 'homeless' : 'alliance'} className={`program-section fade-in delay-${num}`}>
          <div className="program-img-col" style={{ cursor: 'zoom-in' }} onClick={() => handleImageClick(t(`volProg${num}Poster`))}>
            <img src={t(`volProg${num}Poster`)} alt={`Volunteer Program ${num} Poster`} />
          </div>
          <div className="program-text-col">
            <h2 className="program-title">{t(`volProg${num}Title`)}</h2>
            <p className="program-desc" dangerouslySetInnerHTML={{ __html: t(`volProg${num}Desc`) }}></p>
          </div>
        </section>
      ))}

      <div style={{ marginTop: '6rem', textAlign: 'center', marginBottom: '6rem' }}>
        <Link to="/" className="secondary-btn">{t('backToHome')}</Link>
      </div>
    </div>
      <ImageModal src={selectedImage} onClose={() => setSelectedImage(null)} />
    </main>
  );
};

export default VolunteerPrograms;
