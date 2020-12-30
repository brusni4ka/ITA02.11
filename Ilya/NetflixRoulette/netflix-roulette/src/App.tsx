import React from 'react';
import './App.scss';
import HomePage from "./pages/home/HomePage";
import MoviePage from "./pages/moviePage/MoviePage";
import { IMovie } from 'shared/interfaces/IMovie';
import { BrowserRouter as Router, Route, Switch, RouteComponentProps } from "react-router-dom";

interface IAppState {
  movies: IMovie[];
}

class App extends React.Component<{}, IAppState> {

  state: IAppState = {
    movies: [],
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
            <Route path="/" exact render={(props: RouteComponentProps) => <HomePage movies={this.state.movies} {...props} />} />
            <Route path="/search" render={(props: RouteComponentProps) => <HomePage movies={this.state.movies} {...props} />} />
            <Route path="/moviePage/:id" render={(props: RouteComponentProps<{ id: string }>) => <MoviePage movies={this.state.movies} {...props} />} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
