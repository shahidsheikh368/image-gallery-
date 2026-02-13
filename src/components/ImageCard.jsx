function ImageCard({ image, isFavorite, onToggleFavorite, onOpen }) {
  const extension = image.url.split('.').pop()?.split('?')[0] || 'jpg';
  const fileName = `${image.name}.${extension}`;

  return (
    <article className="image-card">
      <button
        type="button"
        className="image-btn"
        onClick={onOpen}
        aria-label={`Open ${image.name}`}
      >
        <img
          src={image.url}
          alt={image.name}
          loading="lazy"
          decoding="async"
          width="800"
          height="600"
        />
      </button>

      <div className="image-meta">
        <div>
          <h3>{image.name}</h3>
          <p>{image.category}</p>
        </div>
        <div className="card-actions">
          <button
            type="button"
            className={`favorite-btn ${isFavorite ? 'active' : ''}`}
            onClick={() => onToggleFavorite(image.id)}
            aria-label={isFavorite ? 'Remove favorite' : 'Save favorite'}
            title={isFavorite ? 'Remove favorite' : 'Save favorite'}
          >
            {isFavorite ? 'Favorite' : 'Save'}
          </button>
          <a className="download-btn" href={image.url} download={fileName}>
            Download
          </a>
        </div>
      </div>
    </article>
  );
}

export default ImageCard;
