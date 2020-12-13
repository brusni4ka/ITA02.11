import React from "react";
import "./MovieSorter.scss";

const quantity: number = 7;

class MovieSorter extends React.Component {
    render() {
        return (
            <div className="srh-results">
                <div className="layout">
                    <div className="srh-container">
                        <p className="quantity">{quantity} movies found</p>
                        <div className="sort-by">
                            <p>Sort by</p>
                            <p>release date</p>
                            <p>rating</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MovieSorter;