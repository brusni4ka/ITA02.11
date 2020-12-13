export interface IFilmCardProps {
  id: number,
  title: string,
  poster: string,
  release: string,
  genres: string[],

  showFullFilmInfo(id: number): () => void
}
