import { connect, ConnectedProps } from 'react-redux';
import { RootState } from 'store';
import { requestMovies, resetMovies, requestMovieById, setCurrentPage } from "redux/moviesActions"

import MoviePage from 'pages/moviePage/MoviePage';

const mapStateToProps = (state: RootState) => {
    return {
        movies: state.homePage.movies,
        loading: state.homePage.loading,
        movie: state.homePage.movie,
        limit: state.homePage.limit,
        total: state.homePage.total,
        currentPage: state.homePage.currentPage,
    }
}

const mapDispatchToProps = {
    requestMovies,
    resetMovies,
    requestMovieById,
    setCurrentPage,
}
const connector = connect(mapStateToProps, mapDispatchToProps);
export type MoviePageConnectProps = ConnectedProps<typeof connector>;

export default connector(MoviePage);