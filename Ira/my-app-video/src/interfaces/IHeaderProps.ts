import {IFilm} from "./IFilm";

export interface IHeaderProps {
  isFullFilmInfo: boolean,
  value: string,
  classNameTitleBtn: string,
  classNameGenreBtn: string,
  classNameReleaseBtn: string,
  classNameRatingBtn: string,
  film: IFilm,
  result: number,

  returnToSearchSection(): void,

  returnToSearchSection(): void,

  changeValue(e: string): void,

  changeSearchingBtnState(e: string): () => void,

  changeSortingBtnState(e: string): () => void,

  searchFilm():  void,
}
