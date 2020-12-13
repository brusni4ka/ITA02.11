import React from 'react';
import "./HomePage.scss"
import Header from 'shared/header/Header';
import SearchMovie from "shared/searchMovie/SearchMovie";
import Footer from 'shared/footer/Footer';
import MovieList from 'shared/movieList/MovieList';
import MovieSorter from "shared/movieSorter/MovieSorter"




class HomePage extends React.Component {
    render() {
        return (
            <div className="home-page">
                <div className="wrapper">
                    <Header />
                    <SearchMovie />
                </div>
                <MovieSorter />
                <MovieList />
                <Footer />
            </div>
        );
    }
}

export default HomePage;