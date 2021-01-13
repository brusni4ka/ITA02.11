import {connect, ConnectedProps} from "react-redux";
import {IRootState} from "../../redux";
import {fetchMovies, resetMovies} from "../../redux/movies/actions";

import {Home} from './Home';

const mapStateToProps = (state: IRootState) => ({
  movies: state.moviesState.movies,
  loading: state.moviesState.loading,
  currentFilm: state.moviesState.currentMovie,
});

const mapDispatchToProps = {
  fetchMovies,
  resetMovies,
}

const connector = connect(mapStateToProps, mapDispatchToProps);

export type movieConnectProps = ConnectedProps<typeof connector>;

export default connector(Home);
