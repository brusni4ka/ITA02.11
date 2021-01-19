import React from 'react';
import queryString from "query-string";
import { RouteComponentProps } from "react-router-dom";

import "./HomePage.scss"
import Header from 'shared/header/Header';
import SearchMovie from "shared/searchMovie/SearchMovie";
import Footer from 'shared/footer/Footer';
import MovieList from 'shared/movieList/MovieList';
import Pagination from 'shared/pagination/Pagination';
import MovieSorter, { SortBy } from "shared/movieSorter/MovieSorter";
import { HomePageConnectProps } from '.';

type HomePageProps = RouteComponentProps & HomePageConnectProps;

class HomePage extends React.Component<HomePageProps> {

    componentDidMount() {
        this.props.requestMovies(this.props.location.search);
    }

    componentWillUnmount() {
        this.props.resetMovies();
    }

    componentDidUpdate(prevProps: Readonly<HomePageProps>) {

        if (this.props.history.action !== "PUSH" && this.props.location !== prevProps.location) {
            this.props.requestMovies(this.props.location.search);
        }
    }

    sortMovieByHandler = (sortBy: SortBy) => {
        const parsed = queryString.parse(this.props.location.search);
        const newSearchParams = queryString.stringify({ ...parsed, sortBy });
        this.props.history.push(`/search?${newSearchParams}`);

        this.props.requestMovies(newSearchParams);
    }

    submitSearchHandler = (search: string, searchBy: string) => {
        const parsed = queryString.parse(this.props.location.search);
        const newSearchParams = queryString.stringify({ ...parsed, search, searchBy });
        this.props.history.push(`/search?${newSearchParams}`);

        this.props.requestMovies(newSearchParams);
    }

    //Pagination Methods
    changePage = (e: React.MouseEvent<HTMLButtonElement>) => {
        let page;
        const elem: HTMLButtonElement = e.target as HTMLButtonElement;

        if (elem.value === "next" && this.props.currentPage < Math.ceil(this.props.total / this.props.limit)) {
            page = this.props.currentPage + 1;
            this.props.setCurrentPage(page);
            const parsed = queryString.parse(this.props.location.search);
            const newSearchParams = queryString.stringify({ ...parsed, page });
            this.props.history.push(`/search?${newSearchParams}`);

            this.props.requestMovies(newSearchParams);

        } else if (elem.value === "prev" && this.props.currentPage > 1) {
            page = this.props.currentPage - 1;
            this.props.setCurrentPage(page);
            const parsed = queryString.parse(this.props.location.search);
            const newSearchParams = queryString.stringify({ ...parsed, page });
            this.props.history.push(`/search?${newSearchParams}`);

            this.props.requestMovies(newSearchParams);
        }
    }

    moveToLimitPage = (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log(e);
        let page;
        const elem: HTMLButtonElement = e.target as HTMLButtonElement;

        page = (elem.value === "1") ? 1 : (Math.ceil(this.props.total / this.props.limit));

        this.props.setCurrentPage(page);
        const parsed = queryString.parse(this.props.location.search);
        const newSearchParams = queryString.stringify({ ...parsed, page });
        this.props.history.push(`/search?${newSearchParams}`);

        this.props.requestMovies(newSearchParams);
    }

    render() {
        let currentPage = this.props.currentPage;
        const parsed = queryString.parse(this.props.location.search);

        if ("page" in parsed) {
            currentPage = Number(parsed.page);
        }

        const sortBy: SortBy = queryString.parse(this.props.location.search).sortBy as SortBy || SortBy.Release;
        return (
            <div className="home-page">
                <div className="wrapper">
                    <Header />
                    <SearchMovie onSubmit={this.submitSearchHandler} />
                </div>
                <MovieSorter sortedQuantity={this.props.total} onSortChange={this.sortMovieByHandler} sortBy={sortBy} />
                {this.props.loading ? (
                    <div>Loading...</div>
                ) : (<MovieList movies={this.props.movies} total={this.props.total} />)}
                <Pagination total={this.props.total} limit={this.props.limit} currentPage={currentPage} onChangePage={this.changePage} onMoveToLimitPage={this.moveToLimitPage} />
                <Footer />
            </div>
        );
    }
}

export default HomePage;