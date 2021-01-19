import { connect, ConnectedProps } from 'react-redux';
import { RootState } from 'store';
import { requestMovies, resetMovies, requestMovieById, setCurrentPage } from "../../redux/moviesActions"

import HomePage from 'pages/home/HomePage';

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
}
const connector = connect(mapStateToProps, mapDispatchToProps);
export type HomePageConnectProps = ConnectedProps<typeof connector>;

export default connector(HomePage);