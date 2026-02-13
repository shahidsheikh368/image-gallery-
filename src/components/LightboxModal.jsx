import { useEffect } from 'react';

function LightboxModal({ isOpen, image, onClose, onPrev, onNext, isFavorite, onToggleFavorite }) {
  const extension = image?.url?.split('.').pop()?.split('?')[0] || 'jpg';
  const fileName = image ? `${image.name}.${extension}` : 'image.jpg';

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    function onKeyDown(event) {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') onPrev();
      if (event.key === 'ArrowRight') onNext();
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || !image) {
    return null;
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="modal-content" onClick={(event) => event.stopPropagation()}>
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close modal">
          x
        </button>

        <img src={image.url} alt={image.name} className="modal-image" />

        <div className="modal-footer">
          <div>
            <h2>{image.name}</h2>
            <p>{image.category}</p>
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onPrev} className="nav-btn">Previous</button>
            <button type="button" onClick={onNext} className="nav-btn">Next</button>
            <button
              type="button"
              className={`favorite-btn ${isFavorite ? 'active' : ''}`}
              onClick={() => onToggleFavorite(image.id)}
            >
              {isFavorite ? 'Favorited' : 'Save'}
            </button>
            <a className="download-btn" href={image.url} download={fileName}>
              Download
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LightboxModal;
