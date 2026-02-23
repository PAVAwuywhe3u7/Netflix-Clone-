import type { Title } from '../types/catalog'

interface HeroBannerProps {
  title: Title
  isInMyList: boolean
  onPlay: (title: Title) => void
  onMoreInfo: (title: Title) => void
  onToggleMyList: (titleId: string) => void
}

function HeroBanner({ title, isInMyList, onPlay, onMoreInfo, onToggleMyList }: HeroBannerProps) {
  return (
    <section className="hero" aria-label="Featured title">
      <div className="hero__backdrop" style={{ backgroundImage: `url(${title.backdropUrl})` }} />
      <div className="hero__overlay" />

      <div className="hero__content">
        <p className="hero__eyebrow">Now Streaming</p>
        <h1>{title.name}</h1>
        <p className="hero__meta">
          <span>{title.match}% Match</span>
          <span>{title.year}</span>
          <span>{title.maturityRating}</span>
          <span>{title.duration}</span>
          <span>{title.contentType}</span>
        </p>
        <p className="hero__description">{title.synopsis}</p>

        <div className="hero__actions">
          <button
            type="button"
            className="button button--light"
            onClick={() => onPlay(title)}
            aria-label={`Play ${title.name}`}
          >
            Play
          </button>
          <button
            type="button"
            className="button button--dark"
            onClick={() => onMoreInfo(title)}
            aria-label={`Open details for ${title.name}`}
          >
            More Info
          </button>
          <button
            type="button"
            className="button button--outline"
            onClick={() => onToggleMyList(title.id)}
            aria-label={`${isInMyList ? 'Remove' : 'Add'} ${title.name} ${isInMyList ? 'from' : 'to'} My List`}
          >
            {isInMyList ? 'In My List' : '+ My List'}
          </button>
        </div>
      </div>
    </section>
  )
}

export default HeroBanner

