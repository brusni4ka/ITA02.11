import {IFilm} from "./IFilm";

export interface ILayoutState {
  films: IFilm[],
  isFullFilmInfo: boolean,
  currentFilmId: number | string,
  currentFilm: IFilm,
  searchValue: string,
  isActiveTitleBtn: boolean,
  isActiveGenreBtn: boolean,
  isActiveReleaseBtn: boolean,
  isActiveRatingBtn: boolean,
}
