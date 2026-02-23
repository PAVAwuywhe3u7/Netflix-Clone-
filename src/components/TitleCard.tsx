import type { CSSProperties, MouseEvent } from 'react'
import type { Title } from '../types/catalog'

interface TitleCardProps {
  title: Title
  isInMyList: boolean
  onSelect: (title: Title) => void
  onToggleMyList: (titleId: string) => void
}

function TitleCard({ title, isInMyList, onSelect, onToggleMyList }: TitleCardProps) {
  const handleMyListClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    onToggleMyList(title.id)
  }

  return (
    <article className="title-card" style={{ '--accent': title.accentColor } as CSSProperties}>
      <button
        type="button"
        className="title-card__poster"
        onClick={() => onSelect(title)}
        aria-label={`Open details for ${title.name}`}
      >
        <img loading="lazy" src={title.posterUrl} alt={`${title.name} poster`} />
        <span className="title-card__gradient" aria-hidden="true" />

        <span className="title-card__details">
          <span className="title-card__name">{title.name}</span>
          <span className="title-card__meta">
            {title.match}% Match | {title.year} | {title.maturityRating}
          </span>
          <span className="title-card__genres">{title.genres.slice(0, 2).join(' | ')}</span>
        </span>
      </button>

      <button
        type="button"
        className={`title-card__my-list ${isInMyList ? 'title-card__my-list--active' : ''}`}
        onClick={handleMyListClick}
        aria-label={`${isInMyList ? 'Remove' : 'Add'} ${title.name} ${isInMyList ? 'from' : 'to'} My List`}
      >
        {isInMyList ? 'In List' : '+ List'}
      </button>
    </article>
  )
}

export default TitleCard


