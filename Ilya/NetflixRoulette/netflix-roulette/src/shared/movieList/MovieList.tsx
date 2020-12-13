import React from 'react';
import "./MovieList.scss";
import MovieCard from "shared/movieCard/MovieCard"



class MovieList extends React.Component {

    render() {
        return (
            <main>
                <div className="films-list">
                    <div className="layout">
                        <div className="films-container">
                            <MovieCard />
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default MovieList;