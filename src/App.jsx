import { useEffect, useMemo, useRef, useState } from 'react';
import GalleryGrid from './components/GalleryGrid';
import HeaderControls from './components/HeaderControls';
import LightboxModal from './components/LightboxModal';
import UploadPreview from './components/UploadPreview';

const FAVORITES_KEY = 'gallery-favorites-v1';
const THEME_KEY = 'gallery-theme-v1';

function App() {
  const [images, setImages] = useState([]);
  const [uploads, setUploads] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('latest');
  const uploadUrlsRef = useRef([]);
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');
    } catch {
      return [];
    }
  });
  const [theme, setTheme] = useState(() => localStorage.getItem(THEME_KEY) || 'light');
  const [modalIndex, setModalIndex] = useState(-1);

  useEffect(() => {
    fetch('/data/images.json')
      .then((response) => response.json())
      .then((data) => setImages(data))
      .catch(() => setImages([]));
  }, []);

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    uploadUrlsRef.current = uploads.map((item) => item.url);
  }, [uploads]);

  useEffect(() => {
    return () => {
      uploadUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  const allImages = useMemo(() => [...images, ...uploads], [images, uploads]);

  const categories = useMemo(() => {
    const set = new Set(allImages.map((item) => item.category));
    return ['All', ...Array.from(set)];
  }, [allImages]);

  const filteredImages = useMemo(() => {
    const normalizedQuery = search.trim().toLowerCase();

    return allImages
      .filter((image) => {
        const nameMatch = image.name.toLowerCase().includes(normalizedQuery);
        const categoryMatch = category === 'All' || image.category === category;
        return nameMatch && categoryMatch;
      })
      .sort((a, b) => {
        const timeA = new Date(a.date).getTime();
        const timeB = new Date(b.date).getTime();
        return sortOrder === 'latest' ? timeB - timeA : timeA - timeB;
      });
  }, [allImages, search, category, sortOrder]);

  const selectedImage = modalIndex >= 0 ? filteredImages[modalIndex] : null;

  useEffect(() => {
    if (modalIndex >= filteredImages.length) {
      setModalIndex(filteredImages.length ? 0 : -1);
    }
  }, [filteredImages.length, modalIndex]);

  function handleUpload(files) {
    const nextUploads = files.map((file, index) => ({
      id: `upload-${Date.now()}-${index}`,
      name: file.name.replace(/\.[^/.]+$/, ''),
      category: 'Uploaded',
      date: new Date().toISOString(),
      url: URL.createObjectURL(file)
    }));

    setUploads((current) => [...nextUploads, ...current]);
  }

  function toggleFavorite(id) {
    setFavorites((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  }

  function goNext() {
    if (!filteredImages.length) return;
    setModalIndex((current) => (current + 1) % filteredImages.length);
  }

  function goPrev() {
    if (!filteredImages.length) return;
    setModalIndex((current) => (current - 1 + filteredImages.length) % filteredImages.length);
  }

  return (
    <main className="app-shell">
      <div className="background-shape" aria-hidden="true" />
      <div className="container">
        <HeaderControls
          search={search}
          onSearchChange={setSearch}
          category={category}
          categories={categories}
          onCategoryChange={setCategory}
          sortOrder={sortOrder}
          onSortOrderChange={setSortOrder}
          theme={theme}
          onThemeToggle={() => setTheme((current) => (current === 'light' ? 'dark' : 'light'))}
          totalCount={filteredImages.length}
          favoriteCount={favorites.length}
        />

        <UploadPreview onUpload={handleUpload} />

        <GalleryGrid
          images={filteredImages}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          onOpen={setModalIndex}
        />
      </div>

      <LightboxModal
        isOpen={modalIndex >= 0}
        image={selectedImage}
        onClose={() => setModalIndex(-1)}
        onPrev={goPrev}
        onNext={goNext}
        isFavorite={selectedImage ? favorites.includes(selectedImage.id) : false}
        onToggleFavorite={toggleFavorite}
      />
    </main>
  );
}

export default App;
