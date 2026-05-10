import React, { useEffect } from 'react';

const ImageModal = ({ src, onClose }) => {
  useEffect(() => {
    if (src) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [src, onClose]);

  if (!src) return null;

  return (
    <div className="modal" style={{ display: 'flex' }} onClick={onClose}>
      <span className="modal-close" onClick={onClose}>&times;</span>
      <img 
        className="modal-content" 
        src={src} 
        alt="Full view" 
        onClick={(e) => e.stopPropagation()} 
      />
    </div>
  );
};

export default ImageModal;
