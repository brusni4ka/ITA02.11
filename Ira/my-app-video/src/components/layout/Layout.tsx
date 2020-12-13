import React from 'react';
import {Header} from "./header";
import {FilmCard} from "../filmCard";
import {Footer} from "./footer";
import {IFilm} from "../../interfaces/IFilm";
import {ILayoutState} from "../../interfaces/ILayoutState";
import './styles.scss';

const emptyObjectFilm: IFilm = {
  id: 0,
  title: '',
  tagline: '',
  vote_average: 0,
  vote_count: 0,
  release_date: '',
  poster_path: '',
  overview: '',
  budget: 0,
  revenue: 0,
  runtime: 0,
  genres: [''],
}

let films: IFilm[];
films = [
  {
    id: 1,
    title: "kill bill",
    tagline: 'Grammy',
    vote_average: 0,
    vote_count: 0,
    release_date: '2006',
    poster_path: "https://i.ytimg.com/vi/huM6iOVmeZI/maxresdefault.jpg",
    overview: 'This is (IMO) a much better solution than the accepted answer, because it lets you define a type and then, say, pass a parameter of that type (the callback) which you can then use any way you want, including calling it. The accepted answer uses a member variable and you have to set the member variable to your function, then call a method - ugly and prone to errors, because setting the variable first is part of the contract of calling the method.  ',
    budget: 0,
    revenue: 0,
    runtime: 0,
    genres: ['action'],
  },
  {
    id: 2,
    title: "island",
    tagline: 'Oscar',
    vote_average: 0,
    vote_count: 0,
    release_date: '2006',
    poster_path: "https://upload.wikimedia.org/wikipedia/ru/7/72/Fantasy_Island_%28film%2C_2020%29.jpg",
    overview: '',
    budget: 0,
    revenue: 0,
    runtime: 0,
    genres: ['action', 'detective'],
  },
  {
    id: 3,
    title: "kill bill",
    tagline: 'Oscar',
    vote_average: 0,
    vote_count: 0,
    release_date: '2006',
    poster_path: "https://i.ytimg.com/vi/huM6iOVmeZI/maxresdefault.jpg",
    overview: '',
    budget: 0,
    revenue: 0,
    runtime: 0,
    genres: ['action'],
  },
  {
    id: 4,
    title: "kill bill",
    tagline: '',
    vote_average: 0,
    vote_count: 0,
    release_date: '2006',
    poster_path: "https://i.ytimg.com/vi/huM6iOVmeZI/maxresdefault.jpg",
    overview: '',
    budget: 0,
    revenue: 0,
    runtime: 0,
    genres: ['action'],
  },
  {
    id: 5,
    title: "kill bill",
    tagline: '',
    vote_average: 0,
    vote_count: 0,
    release_date: '2006',
    poster_path: "https://i.ytimg.com/vi/huM6iOVmeZI/maxresdefault.jpg",
    overview: '',
    budget: 0,
    revenue: 0,
    runtime: 0,
    genres: ['action'],
  },
  {
    id: 6,
    title: "kill bill",
    tagline: '',
    vote_average: 0,
    vote_count: 0,
    release_date: '2006',
    poster_path: "https://i.ytimg.com/vi/huM6iOVmeZI/maxresdefault.jpg",
    overview: '',
    budget: 0,
    revenue: 0,
    runtime: 0,
    genres: ['action'],
  },
];

let film: IFilm[];
film = [];

export class Layout extends React.Component<{}, ILayoutState> {
  state: ILayoutState = {
    films: [...films],
    isFullFilmInfo: false,
    currentFilmId: '',
    currentFilm: emptyObjectFilm,
    searchValue: '',
    isActiveTitleBtn: true,
    isActiveGenreBtn: false,
    isActiveReleaseBtn: false,
    isActiveRatingBtn: true,
  }

  returnToSearchSection = (): void => {
    this.setState({
      ...this.state,
      isFullFilmInfo: false,
      currentFilmId: '',
      currentFilm: emptyObjectFilm,
    })
  }

  showFullFilmInfo = (id: number) => (): void => {
    const film: IFilm[] = films.filter(film => film.id === id);

    this.setState({
      ...this.state,
      isFullFilmInfo: true,
      currentFilmId: id,
      currentFilm: film[0],
    })
  }

  changeValue = (value: string): void =>  {
    this.setState({
      ...this.state,
      searchValue: value,
    })
  }

  changeSearchingBtnState = (btnName: string | null) => ():void => {

    if (btnName === 'titleBtn') {
      this.setState({
        ...this.state,
        isActiveTitleBtn: true,
        isActiveGenreBtn: false,
      })
    }

    if (btnName === 'genreBtn') {
      this.setState({
        ...this.state,
        isActiveTitleBtn: false,
        isActiveGenreBtn: true,
      })
    }
  }

  changeSortingBtnState = (btnName: string | null) => ():void => {

    if (btnName === 'releaseBtn') {
      this.setState({
        ...this.state,
        isActiveReleaseBtn: true,
        isActiveRatingBtn: false,
      })
    }

    if (btnName === 'ratingBtn') {
      this.setState({
        ...this.state,
        isActiveReleaseBtn: false,
        isActiveRatingBtn: true,
      })
    }
  }

  searchFilm = ():void => {
    this.setState({
      ...this.state,
      searchValue: '',
    })
  }

  render() {
    return (
      <React.Fragment>
        <Header
          isFullFilmInfo={this.state.isFullFilmInfo}
          returnToSearchSection={this.returnToSearchSection}
          film={this.state.currentFilm}
          changeValue={this.changeValue}
          value={this.state.searchValue}
          changeSearchingBtnState={this.changeSearchingBtnState}
          changeSortingBtnState={this.changeSortingBtnState}
          classNameTitleBtn={this.state.isActiveTitleBtn ? 'btn btn-by-title active' : 'btn btn-by-title'}
          classNameGenreBtn={this.state.isActiveGenreBtn ? 'btn btn-by-genre active' : 'btn btn-by-genre'}
          classNameReleaseBtn={this.state.isActiveReleaseBtn ? 'btn by-release-btn active' : 'btn by-release-btn'}
          classNameRatingBtn={this.state.isActiveRatingBtn ? 'btn by-rating-btn active' : 'btn by-rating-btn'}
          searchFilm={this.searchFilm}
          result={this.state.films.length}
        />
        {this.state.films.length !== 0?
          <main className="main">
            {this.state.films.map(film => <FilmCard
              key={film.id}
              id={film.id}
              title={film.title}
              poster={film.poster_path}
              release={film.release_date}
              genres={film.genres}
              showFullFilmInfo={this.showFullFilmInfo}
            />)}
          </main>
          :
          <main className="main-no-result">no films found</main>
        }
        <Footer/>
      </React.Fragment>
    );
  }
}
