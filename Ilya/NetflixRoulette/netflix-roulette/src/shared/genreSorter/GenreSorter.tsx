import React from "react";
import "./GenreSorter.scss";

interface IGenreSorter {
    genre: string,
}

class GenreSorter extends React.Component<{}, IGenreSorter>{
    state = {
        genre: "Drama",
    }

    render() {
        return (
            <div className="genre-sorter">
                <div className="layout">
                    <p>Sort by {this.state.genre} genre</p>
                </div>
            </div>
        );
    }
}

export default GenreSorter;