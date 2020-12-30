import React from 'react';
import { Link } from "react-router-dom";
import { RouteComponentProps } from "react-router-dom";

import "./MoviePage.scss"
import Header from 'shared/header/Header';
import Footer from 'shared/footer/Footer';
import GenreSorter from 'shared/genreSorter/GenreSorter';
import MovieDecscription from 'shared/movieDescription/MovieDescription';
import MovieList from 'shared/movieList/MovieList';
import { IMovie } from 'shared/interfaces/IMovie';

interface IMoviePageOwnProps {
    movies: IMovie[],
}

type MoviePageProps = RouteComponentProps<{ id: string }> & IMoviePageOwnProps;

class MoviePage extends React.Component<MoviePageProps>{
    render() {
        const film = this.props.movies.filter((movie) => movie.id === Number(this.props.match.params.id));
        return (
            <div className="movie-page">
                <div className="wrapper">
                    <Header />
                    <div className="layout">
                        <div className="btn">
                            <Link to="/"><button className="back-to-search-btn">Search</button></Link>
                        </div>
                    </div>
                    <MovieDecscription film={film} />
                </div>
                <GenreSorter />
                <MovieList movies={this.props.movies} />
                <Footer />
            </div>
        );
    }
}

export default MoviePage;