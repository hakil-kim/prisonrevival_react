import React from 'react';
import { useTranslation } from 'react-i18next';

const AlertModal = ({ isOpen, message, onClose }) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div 
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999
      }} 
      onClick={onClose}
    >
      <div 
        style={{ 
          width: '90%',
          maxWidth: '400px', 
          padding: '2rem', 
          backgroundColor: 'white', 
          borderRadius: '20px',
          textAlign: 'center',
          boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          transform: 'scale(1)',
          transition: 'transform 0.2s ease'
        }} 
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ color: 'var(--dark-green)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        </div>
        <h3 style={{ fontSize: '1.3rem', fontWeight: '700', color: 'var(--dark-green)', margin: 0 }}>
          {t('siteTitle')}
        </h3>
        <p style={{ fontSize: '1.05rem', color: '#4b5563', lineHeight: '1.6', margin: '0.5rem 0 1rem 0', wordBreak: 'keep-all' }}>
          {message}
        </p>
        <button 
          onClick={onClose}
          style={{
            width: '100%',
            padding: '0.8rem',
            backgroundColor: 'var(--dark-green)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: '0 4px 12px rgba(17, 42, 34, 0.15)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#1a3a2a';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--dark-green)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default AlertModal;
