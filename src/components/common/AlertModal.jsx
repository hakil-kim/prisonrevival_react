import React from 'react';
import { useTranslation } from 'react-i18next';

const AlertModal = ({ isOpen, message, onClose }) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className={`video-modal active`} style={{ display: 'flex', zIndex: 9999 }} onClick={onClose}>
      <div 
        className="video-modal-content" 
        style={{ 
          maxWidth: '400px', 
          padding: '2rem', 
          backgroundColor: 'white', 
          borderRadius: '16px',
          textAlign: 'center',
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
        }} 
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ marginBottom: '1.5rem', color: 'var(--primary-color)' }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        </div>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--text-dark)' }}>
          {t('siteTitle')}
        </h3>
        <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '2rem' }}>
          {message}
        </p>
        <button 
          onClick={onClose}
          style={{
            padding: '0.8rem 2rem',
            backgroundColor: 'var(--primary-color)',
            color: 'white',
            border: 'none',
            borderRadius: '30px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default AlertModal;
