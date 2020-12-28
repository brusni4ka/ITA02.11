import React from 'react';
import './App.scss';
import HomePage from "./pages/home/HomePage";
import MoviePage from "./pages/moviePage/MoviePage";
import { BrowserRouter as Router, Route, Switch, RouteComponentProps } from "react-router-dom";



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
  // sortedQuantity: number,
  //   sortBy: string,
  //   searchBy: string,
  //   searchValue: string,
  //   searchResult: IMovie[]
}

class App extends React.Component<{}, IAppState> {

  state: IAppState = {
    movies: [],
    //   sortBy: "rating",
    //   searchBy: "title",
    //   searchValue: "",
    //   searchResult: []
  };

  componentDidMount() {
    fetch("https://reactjs-cdp.herokuapp.com/movies")
      .then(response => response.json())
      .then(receiveData => { this.setState({ movies: receiveData.data }) })
  }




  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            {/* <Route path="/" exact component={HomePage} /> */}

            <Route path="/" exact render={(props: RouteComponentProps) => <HomePage movies={this.state.movies} {...props} />} />
            <Route path="/search" render={(props: RouteComponentProps) => <HomePage movies={this.state.movies} {...props} />} />
            <Route path="/moviePage/:id" render={(props: any) => <MoviePage movies={this.state.movies} {...props} />} />

          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
