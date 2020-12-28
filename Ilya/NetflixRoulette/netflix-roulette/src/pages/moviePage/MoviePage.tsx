import React from 'react';
import "./MoviePage.scss"
import Header from 'shared/header/Header';
import Footer from 'shared/footer/Footer';
import GenreSorter from 'shared/genreSorter/GenreSorter';
import MovieDecscription from 'shared/movieDescription/MovieDescription';
import MovieList from 'shared/movieList/MovieList';
import { Link } from "react-router-dom";
import { RouteComponentProps } from "react-router-dom";



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

interface IMoviePageOwnProps {
    movies: IMovie[],
    // id: string
}

type MoviePageProps = RouteComponentProps<{ id: string }> & IMoviePageOwnProps;

class MoviePage extends React.Component<MoviePageProps>{
    render() {
        console.log(this.props.match.params);
        return (
            <div className="movie-page">
                <div className="wrapper">
                    <Header />
                    <div className="layout">
                        <div className="btn">
                            <Link to="/"><button className="back-to-search-btn">Search</button></Link>
                        </div>
                    </div>
                    <MovieDecscription id={this.props.match.params.id} movies={this.props.movies} />
                </div>
                <GenreSorter />
                <MovieList movies={this.props.movies} />
                <Footer />
            </div>
        );
    }
}

export default MoviePage;