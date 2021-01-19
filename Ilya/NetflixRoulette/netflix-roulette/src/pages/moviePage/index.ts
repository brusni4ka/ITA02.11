import { connect, ConnectedProps } from 'react-redux';
import { RootState } from 'store';
import { requestMovies, resetMovies, requestMovieById, setCurrentPage, requestMovieDetailsData } from "redux/moviesActions"

import MoviePage from 'pages/moviePage/MoviePage';

const mapStateToProps = (state: RootState) => {
    return {
        movies: state.moviesStore.movies,
        loading: state.moviesStore.loading,
        movie: state.moviesStore.movie,
        limit: state.moviesStore.limit,
        total: state.moviesStore.total,
        currentPage: state.moviesStore.currentPage,
    }
}

const mapDispatchToProps = {
    requestMovies,
    resetMovies,
    requestMovieById,
    setCurrentPage,
    requestMovieDetailsData,
}
const connector = connect(mapStateToProps, mapDispatchToProps);
export type MoviePageConnectProps = ConnectedProps<typeof connector>;

export default connector(MoviePage);