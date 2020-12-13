import React from 'react';
import "./MoviePage.scss"
import Header from 'shared/header/Header';
import Footer from 'shared/footer/Footer';
import MovieList from 'shared/movieList/MovieList';
import GenreSorter from 'shared/genreSorter/GenreSorter';
import MovieDecscription from 'shared/movieDescription/MovieDescription';
import SearchBtn from 'shared/button/SearchBtn';




class MoviePage extends React.Component {

    render() {
        return (
            <div className="movie-page">
                <div className="wrapper">
                    <Header />
                    <div className="layout">
                        <div className="btn">
                            <SearchBtn />
                        </div>
                    </div>
                    <MovieDecscription />
                </div>
                <GenreSorter />
                <MovieList />
                <Footer />
            </div>
        );
    }
}

export default MoviePage;