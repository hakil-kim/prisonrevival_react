import React from 'react';

const VideoModal = ({ isOpen, videoId, onClose }) => {
  if (!isOpen) return null;

  return (
    <div id="videoModal" className={`video-modal ${isOpen ? 'active' : ''}`} style={{ display: 'flex' }} onClick={onClose}>
      <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="video-modal-close" onClick={onClose}>&times;</span>
        <div className="video-wrapper">
          <iframe 
            id="modalVideoFrame" 
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&playsinline=1&rel=0`}
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowFullScreen
            title="YouTube Video"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
