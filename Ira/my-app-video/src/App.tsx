import React from 'react';
import {BrowserRouter as Router, Route, Switch, RouteComponentProps} from "react-router-dom";
import {ErrorBoundary} from "./components/layout/errorBoundary";
import {Home} from "./components/home";
import {FilmPage} from "./components/filmPage";
import {IFilm} from "./interfaces/IFilm";
import {BASE_URL, SEARCH, FILM} from './constants/pathNames';
import './general.scss';

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

interface IAppState {
  films: IFilm[],
  currentFilmId: number | string,
  currentFilm: IFilm,
}

class App extends React.Component<{}, IAppState> {
  state: IAppState = {
    films: [...films],
    currentFilmId: '',
    currentFilm: emptyObjectFilm,
  }

  showFullFilmInfo = (id: number) => (): void => {
    const film: IFilm[] = films.filter(film => film.id === id);

    this.setState({
      currentFilmId: id,
      currentFilm: film[0],
    })
  }

  render() {

    return (
      <>
        <Router>
          <ErrorBoundary>
            <Switch>
              <Route path={BASE_URL} exact
                     render={(props: RouteComponentProps) => <Home
                       result={this.state.films.length}
                       showFullFilmInfo={this.showFullFilmInfo}
                       films={this.state.films}
                       {...props}
                     />}/>
              <Route path={SEARCH}
                     render={(props: RouteComponentProps) => <Home
                       result={this.state.films.length}
                       showFullFilmInfo={this.showFullFilmInfo}
                       films={this.state.films}
                       {...props}
                     />}
              />

              <Route path={FILM}
                     render={(props: RouteComponentProps) => <FilmPage
                       films={this.state.films}
                       showFullFilmInfo={this.showFullFilmInfo}
                       {...props}
                     />}
              />
            </Switch>
          </ErrorBoundary>
        </Router>
      </>
    );
  };
}

export default App;
