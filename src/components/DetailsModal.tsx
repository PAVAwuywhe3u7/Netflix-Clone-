import type { Title } from '../types/catalog'

interface DetailsModalProps {
  title: Title | null
  isInMyList: boolean
  onClose: () => void
  onToggleMyList: (titleId: string) => void
}

function DetailsModal({ title, isInMyList, onClose, onToggleMyList }: DetailsModalProps) {
  if (!title) {
    return null
  }

  return (
    <div className="modal-overlay" role="presentation" onClick={onClose}>
      <section
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={`${title.name} details`}
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="modal__close" onClick={onClose} aria-label="Close details">
          Close
        </button>

        <div className="modal__hero" style={{ backgroundImage: `url(${title.backdropUrl})` }}>
          <div className="modal__hero-gradient" />
          <div className="modal__hero-content">
            <h2>{title.name}</h2>
            <p>
              <span>{title.match}% Match</span>
              <span>{title.year}</span>
              <span>{title.maturityRating}</span>
              <span>{title.duration}</span>
              <span>{title.contentType}</span>
            </p>
            <div className="modal__actions">
              <button type="button" className="button button--light">
                Play
              </button>
              <button type="button" className="button button--outline" onClick={() => onToggleMyList(title.id)}>
                {isInMyList ? 'In My List' : '+ My List'}
              </button>
            </div>
          </div>
        </div>

        <div className="modal__body">
          <p>{title.synopsis}</p>
          <p>
            <strong>Genres:</strong> {title.genres.join(', ')}
          </p>
          <p>
            <strong>Cast:</strong> {title.cast.join(', ')}
          </p>
          <p>
            <strong>Tags:</strong> {title.isNetflixOriginal ? 'Netflix Original, ' : ''}
            Binge-Worthy, Cinematic, High Production
          </p>
        </div>
      </section>
    </div>
  )
}

export default DetailsModal

