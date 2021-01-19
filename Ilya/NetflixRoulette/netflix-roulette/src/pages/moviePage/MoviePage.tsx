import React from 'react';
import { Link } from "react-router-dom";
import { RouteComponentProps } from "react-router-dom";
import queryString from "query-string";

import "./MoviePage.scss"
import Header from 'shared/header/Header';
import Footer from 'shared/footer/Footer';
import GenreSorter from 'shared/genreSorter/GenreSorter';
import MovieDecscription from 'shared/movieDescription/MovieDescription';
import MovieList from 'shared/movieList/MovieList';
import Pagination from 'shared/pagination/Pagination';
import { MoviePageConnectProps } from '.';
import { SearchBy } from 'shared/searchMovie/SearchMovie';

type MoviePageProps = RouteComponentProps<{ id: string }> & MoviePageConnectProps;

class MoviePage extends React.Component<MoviePageProps>{

    componentDidMount() {
        this.props.requestMovieDetailsData(this.props.match.params.id);
    }

    componentWillUnmount() {
        this.props.resetMovies();
    }

    //Pagination Methods
    changePage = (e: React.MouseEvent<HTMLButtonElement>) => {
        let page;
        let searchBy = SearchBy.Genre
        let search = this.props.movie.genres[0];

        const elem: HTMLButtonElement = e.target as HTMLButtonElement;

        if (elem.value === "next" && this.props.currentPage < Math.ceil(this.props.total / this.props.limit)) {
            page = this.props.currentPage + 1;
            this.props.setCurrentPage(page);
            const parsed = queryString.parse(this.props.location.search);
            const newSearchParams = queryString.stringify({ ...parsed, search, searchBy, page });
            this.props.history.push(`/moviePage/${this.props.movie.id}?page=${page}`);

            this.props.requestMovies(newSearchParams);

        } else if (elem.value === "prev" && this.props.currentPage > 1) {
            page = this.props.currentPage - 1;
            this.props.setCurrentPage(page);
            const parsed = queryString.parse(this.props.location.search);
            const newSearchParams = queryString.stringify({ ...parsed, search, searchBy, page });
            this.props.history.push(`/moviePage/${this.props.movie.id}?page=${page}`);

            this.props.requestMovies(newSearchParams);
        }
    }

    moveToLimitPage = (e: React.MouseEvent<HTMLButtonElement>) => {
        let page;
        let searchBy = SearchBy.Genre
        let search = this.props.movie.genres[0];
        const elem: HTMLButtonElement = e.target as HTMLButtonElement;

        page = (elem.value === "1") ? 1 : (Math.ceil(this.props.total / this.props.limit));

        this.props.setCurrentPage(page);
        const parsed = queryString.parse(this.props.location.search);
        const newSearchParams = queryString.stringify({ ...parsed, search, searchBy, page });
        this.props.history.push(`/moviePage/${this.props.movie.id}?page=${page}`);

        this.props.requestMovies(newSearchParams);
    }

    render() {
        return (
            (this.props.movie === null) ? (
                <div>Loading...</div>
            ) : (
                    <div className="movie-page">
                        <div className="wrapper">
                            <Header />
                            <div className="layout">
                                <div className="btn">
                                    <Link to="/"><button className="back-to-search-btn">Search</button></Link>
                                </div>
                            </div>
                            <MovieDecscription film={this.props.movie} />
                        </div>
                        <GenreSorter genre={this.props.movie.genres[0]} />
                        <MovieList movies={this.props.movies} total={this.props.total} />
                        <Pagination total={this.props.total} limit={this.props.limit} currentPage={this.props.currentPage} onChangePage={this.changePage} onMoveToLimitPage={this.moveToLimitPage} />
                        <Footer />
                    </div>
                )

        );
    }
}

export default MoviePage;