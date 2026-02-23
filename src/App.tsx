import { useEffect, useMemo, useState } from 'react'
import './App.css'
import DetailsModal from './components/DetailsModal'
import Header from './components/Header'
import HeroBanner from './components/HeroBanner'
import RowRail from './components/RowRail'
import TitleCard from './components/TitleCard'
import { categories, featuredTitleIds, getTitleById, titles as catalogTitles } from './data/catalog'
import type { Title } from './types/catalog'

const MY_LIST_STORAGE_KEY = 'netflix-clone-my-list'

const featuredTitles = featuredTitleIds
  .map((titleId) => getTitleById(titleId))
  .filter((title): title is Title => Boolean(title))

const categoryRows = categories
  .map((category) => ({
    id: category.id,
    label: category.label,
    titles: category.titleIds
      .map((titleId) => getTitleById(titleId))
      .filter((title): title is Title => Boolean(title)),
  }))
  .filter((row) => row.titles.length > 0)

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTitle, setSelectedTitle] = useState<Title | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [featuredIndex, setFeaturedIndex] = useState(0)
  const [myListIds, setMyListIds] = useState<string[]>(() => {
    try {
      const fromStorage = localStorage.getItem(MY_LIST_STORAGE_KEY)

      if (!fromStorage) {
        return []
      }

      const parsed = JSON.parse(fromStorage)
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12)

    onScroll()
    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    localStorage.setItem(MY_LIST_STORAGE_KEY, JSON.stringify(myListIds))
  }, [myListIds])

  useEffect(() => {
    if (searchQuery.trim() || selectedTitle || featuredTitles.length < 2) {
      return
    }

    const intervalId = window.setInterval(() => {
      setFeaturedIndex((previousIndex) => (previousIndex + 1) % featuredTitles.length)
    }, 9000)

    return () => window.clearInterval(intervalId)
  }, [searchQuery, selectedTitle])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedTitle(null)
      }
    }

    const previousOverflow = document.body.style.overflow

    if (selectedTitle) {
      document.body.style.overflow = 'hidden'
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [selectedTitle])

  const normalizedQuery = searchQuery.trim().toLowerCase()

  const filteredTitles = useMemo(() => {
    if (!normalizedQuery) {
      return catalogTitles
    }

    return catalogTitles.filter((title) => {
      const titleMatches = title.name.toLowerCase().includes(normalizedQuery)
      const genreMatches = title.genres.some((genre) => genre.toLowerCase().includes(normalizedQuery))
      const castMatches = title.cast.some((member) => member.toLowerCase().includes(normalizedQuery))

      return titleMatches || genreMatches || castMatches
    })
  }, [normalizedQuery])

  const myListTitles = useMemo(
    () => myListIds.map((titleId) => getTitleById(titleId)).filter((title): title is Title => Boolean(title)),
    [myListIds],
  )

  const featuredTitle = featuredTitles[featuredIndex] ?? catalogTitles[0]

  const toggleMyList = (titleId: string) => {
    setMyListIds((previousIds) => {
      if (previousIds.includes(titleId)) {
        return previousIds.filter((id) => id !== titleId)
      }

      return [titleId, ...previousIds]
    })
  }

  const jumpToMyList = () => {
    const myListSection = document.getElementById('my-list')
    myListSection?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  if (!featuredTitle) {
    return null
  }

  return (
    <div className="app-shell">
      <Header
        scrolled={isScrolled}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        onMyListClick={jumpToMyList}
        myListCount={myListIds.length}
      />

      <main>
        <HeroBanner
          title={featuredTitle}
          isInMyList={myListIds.includes(featuredTitle.id)}
          onPlay={setSelectedTitle}
          onMoreInfo={setSelectedTitle}
          onToggleMyList={toggleMyList}
        />

        <section className="catalog">
          {normalizedQuery ? (
            <section className="search-results" aria-live="polite">
              <div className="search-results__header">
                <h2>Search Results</h2>
                <p>
                  {filteredTitles.length} result{filteredTitles.length === 1 ? '' : 's'} for "{searchQuery.trim()}"
                </p>
              </div>

              {filteredTitles.length > 0 ? (
                <div className="search-results__grid">
                  {filteredTitles.map((title) => (
                    <TitleCard
                      key={title.id}
                      title={title}
                      isInMyList={myListIds.includes(title.id)}
                      onSelect={setSelectedTitle}
                      onToggleMyList={toggleMyList}
                    />
                  ))}
                </div>
              ) : (
                <p className="search-results__empty">No matches yet. Try searching by genre or cast name.</p>
              )}
            </section>
          ) : (
            <>
              {myListTitles.length > 0 && (
                <RowRail
                  id="my-list"
                  label="My List"
                  titles={myListTitles}
                  rowIndex={0}
                  myListIds={myListIds}
                  onSelectTitle={setSelectedTitle}
                  onToggleMyList={toggleMyList}
                />
              )}

              {categoryRows.map((row, index) => (
                <RowRail
                  key={row.id}
                  label={row.label}
                  titles={row.titles}
                  rowIndex={index + (myListTitles.length > 0 ? 1 : 0)}
                  myListIds={myListIds}
                  onSelectTitle={setSelectedTitle}
                  onToggleMyList={toggleMyList}
                />
              ))}
            </>
          )}
        </section>
      </main>

      <footer className="app-credit">This project was done by Tummepalli Pavan Karthik.</footer>

      <DetailsModal
        title={selectedTitle}
        isInMyList={selectedTitle ? myListIds.includes(selectedTitle.id) : false}
        onClose={() => setSelectedTitle(null)}
        onToggleMyList={toggleMyList}
      />
    </div>
  )
}

export default App

