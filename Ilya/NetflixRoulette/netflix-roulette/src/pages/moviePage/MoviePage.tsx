import React from 'react';
import { Link } from "react-router-dom";
import { RouteComponentProps } from "react-router-dom";

import "./MoviePage.scss"
import Header from 'shared/header/Header';
import Footer from 'shared/footer/Footer';
import GenreSorter from 'shared/genreSorter/GenreSorter';
import MovieDecscription from 'shared/movieDescription/MovieDescription';
import MovieList from 'shared/movieList/MovieList';
import { MoviePageConnectProps } from '.';

// interface IMoviePageOwnProps {
//     movies: IMovie[],
// }

type MoviePageProps = RouteComponentProps<{ id: string }> & MoviePageConnectProps;

class MoviePage extends React.Component<MoviePageProps>{

    componentDidMount() {
        this.props.requestMovieById(this.props.match.params.id);

    }
    componentWillUnmount() {
        this.props.resetMovies();
    }

    render() {
        return (
            (this.props.loading) ? (
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
                        <GenreSorter {...this.props} />
                        <MovieList {...this.props} />
                        <Footer />
                    </div>
                )


        );
    }
}

export default MoviePage;