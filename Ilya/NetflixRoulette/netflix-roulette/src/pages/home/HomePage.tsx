import React from 'react';
import queryString from "query-string";
import { RouteComponentProps } from "react-router-dom";

import "./HomePage.scss"
import Header from 'shared/header/Header';
import SearchMovie from "shared/searchMovie/SearchMovie";
import Footer from 'shared/footer/Footer';
import MovieList from 'shared/movieList/MovieList';
import MovieSorter, { SortBy } from "shared/movieSorter/MovieSorter";

interface IMovie {
    id: number,
    title: string,
    tagline: string,
    vote_average: number,
    vote_count: number,
    release_date: string,
    poster_path: string,
    overview: string,
    budget: number,
    revenue: number,
    runtime: number,
    genres: string[]
}

interface IOwnProps {
    movies: IMovie[],
    // sortedQuantity: number,

    //     sortedQuantity: number,
    //     sortMovieBy(param: string): void,
    //     searchMovieBy(param1: string, param2: string): void,
    //     searchMovies(): void
    //     searchBy: string,
    //     sortBy: string,
}

interface IHomePageState {
    sortBy: SortBy,
}

type HomePageProps = RouteComponentProps & IOwnProps;


class HomePage extends React.Component<HomePageProps, IHomePageState> {

    state = {
        sortBy: SortBy.Release,
    }

    // componentDidUpdate() {
    //     if (this.props.history.action !== "PUSH") {
    //         const parsed = queryString.parse(this.props.history.location.search);
    //         console.log(parsed);
    //         // this.setState({ searchBy: parsed.searchBy as string, value: parsed.inputValue as string })
    //     }

    // }

    componentDidUpdate(prevProps: Readonly<HomePageProps>) {
        console.log(prevProps);
        console.log(this.props);

        if (this.props.history.action !== "PUSH" && this.props.location !== prevProps.location) {
            const parsed = queryString.parse(this.props.location.search) as { inputValue: string, searchBy: string, sortBy: string };
            const { inputValue, searchBy, sortBy } = parsed;
            console.log(parsed);
            let data = { sortBy: SortBy.Release };

            if (sortBy === "rating") {
                data = { sortBy: SortBy.Rating };
            }
            this.setState(data);
        }

    }

    sortMovieByHandler = (sortBy: SortBy) => {
        this.setState({ sortBy: sortBy });
        const parsed = queryString.parse(this.props.location.search);
        const newSearchParams = queryString.stringify({ ...parsed, sortBy });
        this.props.history.push(`/search?${newSearchParams}`);
    }

    submitSearchHandler = (inputValue: string, searchBy: string) => {
        this.props.history.push(`/search?searchBy=${searchBy}&inputValue=${inputValue}`);
    }

    render() {
        // console.log(this.props.location);
        // console.log(this.props.history);

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