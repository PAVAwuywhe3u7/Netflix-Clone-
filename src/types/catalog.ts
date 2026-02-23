export type ContentType = 'Movie' | 'Series'

export interface Title {
  id: string
  name: string
  synopsis: string
  year: number
  maturityRating: string
  duration: string
  genres: string[]
  cast: string[]
  match: number
  contentType: ContentType
  isNetflixOriginal: boolean
  backdropUrl: string
  posterUrl: string
  accentColor: string
}

export interface Category {
  id: string
  label: string
  titleIds: string[]
}

