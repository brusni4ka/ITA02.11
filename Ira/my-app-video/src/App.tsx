import React from 'react';
import {BrowserRouter as Router, Route, Switch, RouteComponentProps} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./redux";
import {ErrorBoundary} from "./components/layout/errorBoundary";
import Home from "./components/home";
import FilmPage from "./components/filmPage";
import {BASE_URL, SEARCH, FILM} from './constants/pathNames';
import './general.scss';

class App extends React.Component {
  render() {

    return (
      <Provider store={store}>
        <Router>
          <ErrorBoundary>
            <Switch>
              <Route path={BASE_URL} exact component={Home}/>
              <Route path={SEARCH}
                     component={Home}
              />
              <Route path={FILM}
                     component={(
                       props: RouteComponentProps<{ id: string }>
                     ) => <FilmPage
                       {...props}
                     />}
              />
            </Switch>
          </ErrorBoundary>
        </Router>
      </Provider>
    );
  };
}

export default App;
