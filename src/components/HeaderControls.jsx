function HeaderControls({
  search,
  onSearchChange,
  category,
  categories,
  onCategoryChange,
  sortOrder,
  onSortOrderChange,
  theme,
  onThemeToggle,
  totalCount,
  favoriteCount
}) {
  return (
    <header className="controls-panel fade-in-up">
      <div className="title-block">
        <h1>Image Gallery</h1>
        <p>{totalCount} images, {favoriteCount} favorites</p>
      </div>

      <div className="control-grid">
        <label className="input-group" htmlFor="search">
          <span>Search</span>
          <input
            id="search"
            type="search"
            placeholder="Search by name..."
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </label>

        <label className="input-group" htmlFor="category">
          <span>Category</span>
          <select
            id="category"
            value={category}
            onChange={(event) => onCategoryChange(event.target.value)}
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="input-group" htmlFor="sort">
          <span>Sort</span>
          <select
            id="sort"
            value={sortOrder}
            onChange={(event) => onSortOrderChange(event.target.value)}
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </select>
        </label>

        <button
          type="button"
          className="theme-toggle"
          onClick={onThemeToggle}
          aria-label="Toggle color mode"
        >
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>
      </div>
    </header>
  );
}

export default HeaderControls;
