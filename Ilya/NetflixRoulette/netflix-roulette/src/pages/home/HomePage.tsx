import React from 'react';
import queryString from "query-string";
import { RouteComponentProps } from "react-router-dom";

import "./HomePage.scss"
import Header from 'shared/header/Header';
import SearchMovie from "shared/searchMovie/SearchMovie";
import Footer from 'shared/footer/Footer';
import MovieList from 'shared/movieList/MovieList';
import MovieSorter, { SortBy } from "shared/movieSorter/MovieSorter";
import { IMovie } from 'shared/interfaces/IMovie';

interface IOwnProps {
    movies: IMovie[],
}

interface IHomePageState {
    sortBy: SortBy,
}

type HomePageProps = RouteComponentProps & IOwnProps;

class HomePage extends React.Component<HomePageProps, IHomePageState> {

    state = {
        sortBy: SortBy.Release,
    }

    componentDidUpdate(prevProps: Readonly<HomePageProps>) {

        if (this.props.history.action !== "PUSH" && this.props.location !== prevProps.location) {
            const { sortBy } = queryString.parse(this.props.location.search) as { sortBy: string };

            let data = { sortBy: SortBy.Release };

            if (sortBy === "rating") {
                data = { sortBy: SortBy.Rating };
            }
            this.setState(data);
        }

    }
    componentDidMount() {
        const parsed = queryString.parse(this.props.location.search);
        this.setState({ sortBy: parsed.sortBy as SortBy || SortBy.Release });
    }

    sortMovieByHandler = (sortBy: SortBy) => {
        this.setState({ sortBy: sortBy });
        const parsed = queryString.parse(this.props.location.search);
        const newSearchParams = queryString.stringify({ ...parsed, sortBy });
        this.props.history.push(`/search?${newSearchParams}`);
    }

    submitSearchHandler = (inputValue: string, searchBy: string) => {
        const parsed = queryString.parse(this.props.location.search);
        const newSearchParams = queryString.stringify({ ...parsed, searchBy, inputValue });
        this.props.history.push(`/search?${newSearchParams}`);
    }

    render() {

        return (
            <div className="home-page">
                <div className="wrapper">
                    <Header />
                    <SearchMovie onSubmit={this.submitSearchHandler} />
                </div>
                <MovieSorter sortedQuantity={this.props.movies.length} onSortChange={this.sortMovieByHandler} sortBy={this.state.sortBy} />
                <MovieList movies={this.props.movies} />
                <Footer />
            </div>
        );
    }
}

export default HomePage;