interface HeaderProps {
  scrolled: boolean
  searchQuery: string
  onSearchQueryChange: (value: string) => void
  onMyListClick: () => void
  myListCount: number
}

const navItems = ['Home', 'TV Shows', 'Movies', 'New & Popular', 'My List']

function Header({
  scrolled,
  searchQuery,
  onSearchQueryChange,
  onMyListClick,
  myListCount,
}: HeaderProps) {
  return (
    <header className={`top-nav ${scrolled ? 'top-nav--scrolled' : ''}`}>
      <div className="top-nav__left">
        <a className="brand" href="#" aria-label="Netflix home">
          NETFLIX
        </a>

        <nav className="top-nav__menu" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a
              key={item}
              href={item === 'My List' ? '#my-list' : '#'}
              onClick={item === 'My List' ? onMyListClick : undefined}
            >
              {item}
            </a>
          ))}
        </nav>
      </div>

      <div className="top-nav__right">
        <label className="search" htmlFor="catalog-search">
          <span className="search__icon" aria-hidden="true">
            &#9906;
          </span>
          <input
            id="catalog-search"
            type="search"
            value={searchQuery}
            onChange={(event) => onSearchQueryChange(event.target.value)}
            placeholder="Titles, people, genres"
            autoComplete="off"
          />
        </label>

        <button type="button" className="my-list-pill" onClick={onMyListClick}>
          My List {myListCount > 0 ? `(${myListCount})` : ''}
        </button>

        <button type="button" className="profile" aria-label="Open profile switcher">
          P
        </button>
      </div>
    </header>
  )
}

export default Header

