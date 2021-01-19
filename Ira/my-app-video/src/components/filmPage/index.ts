import {connect, ConnectedProps} from "react-redux";
import {IRootState} from "../../redux";
import {FilmPage} from "./FilmPage";
import {initMoviePage, fetchMovies, resetMovies} from "../../redux/movies/actions";


const mapStateToProps = (state: IRootState) => ({
  movies: state.moviesState.movies,
  currentFilm: state.moviesState.currentMovie,
});

const mapDispatchToProps = {
  initMoviePage: initMoviePage,
  fetchMovies: fetchMovies,
  resetMovies,

}

const connector = connect(mapStateToProps, mapDispatchToProps);

export type filmPageConnectProps = ConnectedProps<typeof connector>;

export default connector(FilmPage);