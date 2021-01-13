import { HomePageConnectProps } from "pages/home";
import React from "react";
import "./GenreSorter.scss";

type GenreSorterProps = HomePageConnectProps;

class GenreSorter extends React.Component<GenreSorterProps>{
    render() {
        return (
            <div className="genre-sorter">
                <div className="layout">
                    <p>Sort by {this.props.movie.genres[0]} genre</p>
                </div>
            </div>
        );
    }
}

export default GenreSorter;