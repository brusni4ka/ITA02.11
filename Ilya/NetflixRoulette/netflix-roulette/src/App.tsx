import React from 'react';
import './App.scss';
import HomePage from "./pages/home/HomePage";
// import MoviePage from "./pages/moviePage/MoviePage";



interface IMovie {
  id: number,
  title: string,
  tagline: string,
  vote_average: number,
  vote_count: number,
  release_date: string,
  poster_path: string,
  overview: string,
  budget: number,
  revenue: number,
  runtime: number,
  genres: string[]
}

interface IAppState {
  movies: IMovie[];
  sortBy: 'rating' | 'release date';
  sortedQuantity: number
}


class App extends React.Component<{}, IAppState> {

  state: IAppState = {
    movies: [],
    sortBy: 'rating',
    sortedQuantity: 7
  };

  // componentDidMount() {
  //   fetch("https://reactjs-cdp.herokuapp.com/movies")
  //     .then(response => response.json())
  //     .then(receiveData => { this.setState({ movies: receiveData.data }) })
  // }


  render() {
    return (
      <div className="App">
        <HomePage />
        {/* <MoviePage /> */}
      </div>
    );
  }
}

export default App;
