import React from 'react';
import "./MovieList.scss";
import MovieCard from "shared/movieCard/MovieCard"
import { Link, RouteComponentProps } from "react-router-dom";
import { HomePageConnectProps } from 'pages/home';
import { IMovie } from 'shared/interfaces/IMovie';

type IMovieListProps = HomePageConnectProps & RouteComponentProps;

class MovieList extends React.Component<IMovieListProps> {

    render() {
        return (
            <main>
                <div className="films-list">
                    <div className="layout">
                        {this.props.total === 0 ? (
                            <div className="empty-search">
                                <p>No films Found</p>
                            </div>
                        ) : (< div className="films-container">
                            {this.props.movies.map((m: IMovie) => {
                                return (
                                    <Link to={`/moviePage/${m.id}`} key={m.id}><MovieCard key={m.id} film={m} {...this.props} /></Link>
                                )
                            })}
                        </div>)}
                    </div>
                </div>
            </main >
        );
    }
}

export default MovieList;