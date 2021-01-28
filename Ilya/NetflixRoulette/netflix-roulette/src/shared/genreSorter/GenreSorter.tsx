import React from "react";
import "./GenreSorter.scss";

interface IGenreSorterProps {
    genre: string,
}

class GenreSorter extends React.Component<IGenreSorterProps>{
    render() {
        return (
            <div className="genre-sorter">
                <div className="layout">
                    <p>Sort by {this.props.genre} genre</p>
                </div>
            </div>
        );
    }
}

export default GenreSorter;