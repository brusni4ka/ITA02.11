import { FilmCard } from './FilmCard';
import {connect, ConnectedProps} from "react-redux";
import {fetchMovieById} from "../../redux/movies/actions";

const mapDispatchToProps = {
  fetchMoviesById: fetchMovieById,
}

const connector = connect(null, mapDispatchToProps);

export type filmCardConnectProps = ConnectedProps<typeof connector>;

export default connector(FilmCard);
