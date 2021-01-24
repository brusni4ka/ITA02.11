import React from 'react';
import {BrowserRouter as Router, Route, Switch, RouteComponentProps} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./toolkitRedux";
import {ErrorBoundary} from "./components/layout/errorBoundary";
import Home from "./components/home";
import FilmPage from "./components/filmPage";
import {BASE_URL, SEARCH, FILM} from './constants/pathNames';
import './general.scss';

const App = () => {
  return (
    <Router>
      <Provider store={store}>
        <ErrorBoundary>
          <Switch>
            <Route path={BASE_URL} exact component={Home}/>
            <Route path={SEARCH}
                   component={Home}
            />
            <Route path={FILM}
                   render={(
                     props: RouteComponentProps<{ id: string }>
                   ) => <FilmPage
                     {...props}
                   />}
            />
          </Switch>
        </ErrorBoundary>
      </Provider>
    </Router>
  );
}

export default App;
