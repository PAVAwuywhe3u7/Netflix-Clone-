import { useRef } from 'react'
import type { Title } from '../types/catalog'
import TitleCard from './TitleCard'

interface RowRailProps {
  id?: string
  label: string
  titles: Title[]
  rowIndex: number
  myListIds: string[]
  onSelectTitle: (title: Title) => void
  onToggleMyList: (titleId: string) => void
}

function RowRail({ id, label, titles, rowIndex, myListIds, onSelectTitle, onToggleMyList }: RowRailProps) {
  const railRef = useRef<HTMLDivElement>(null)

  const handleScroll = (direction: 1 | -1) => {
    const rail = railRef.current

    if (!rail) {
      return
    }

    const scrollAmount = rail.clientWidth * 0.9 * direction
    rail.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }

  return (
    <section id={id} className="rail" style={{ animationDelay: `${120 + rowIndex * 70}ms` }}>
      <div className="rail__header">
        <h2>{label}</h2>
        <div className="rail__controls">
          <button type="button" aria-label={`Scroll ${label} left`} onClick={() => handleScroll(-1)}>
            {'<'}
          </button>
          <button type="button" aria-label={`Scroll ${label} right`} onClick={() => handleScroll(1)}>
            {'>'}
          </button>
        </div>
      </div>

      <div className="rail__track" ref={railRef}>
        {titles.map((title) => (
          <TitleCard
            key={title.id}
            title={title}
            isInMyList={myListIds.includes(title.id)}
            onSelect={onSelectTitle}
            onToggleMyList={onToggleMyList}
          />
        ))}
      </div>
    </section>
  )
}

export default RowRail

