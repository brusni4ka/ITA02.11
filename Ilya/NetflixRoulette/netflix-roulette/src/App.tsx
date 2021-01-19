import React from 'react';
import './App.scss';
import HomePage from 'pages/home/index';
import MoviePage from "./pages/moviePage/index";
import { BrowserRouter as Router, Route, Switch, RouteComponentProps } from "react-router-dom";
import { Provider } from 'react-redux';
import store from 'store';

class App extends React.Component<{}> {

  render() {
    return (
      <Provider store={store} >
        <div className="App">
          <Router>
            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path="/search" component={HomePage} />
              <Route path="/moviePage/:id" render={(props: RouteComponentProps<{ id: string }>) => <MoviePage {...props} />} />
            </Switch>
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
