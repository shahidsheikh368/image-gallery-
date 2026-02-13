import ImageCard from './ImageCard';

function GalleryGrid({ images, favorites, onToggleFavorite, onOpen }) {
  if (!images.length) {
    return (
      <section className="empty-state fade-in-up">
        <h2>No images found</h2>
        <p>Try a different search, category, or sort option.</p>
      </section>
    );
  }

  return (
    <section className="gallery-grid fade-in-up" aria-live="polite">
      {images.map((image, index) => (
        <ImageCard
          key={image.id}
          image={image}
          isFavorite={favorites.includes(image.id)}
          onToggleFavorite={onToggleFavorite}
          onOpen={() => onOpen(index)}
        />
      ))}
    </section>
  );
}

export default GalleryGrid;
