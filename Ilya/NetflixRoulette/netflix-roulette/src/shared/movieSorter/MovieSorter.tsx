import React from "react";
import "./MovieSorter.scss";

interface IMovieSorterProps {
    sortedQuantity: number,
    onSortChange(sortBy: string): void,
    sortBy: string
}

export enum SortBy {
    Rating = "rating",
    Release = "release"
}


class MovieSorter extends React.Component<IMovieSorterProps>{

    handlerSortBy = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onSortChange(e.target.value);
    }

    render() {
        return (
            <div className="srh-results">
                <div className="layout">
                    <div className="srh-container">
                        <p className="quantity">{this.props.sortedQuantity} movies found</p>
                        <div className="sort-by">
                            <p>Sort by:</p>
                            <div className="sort-by-radio-btn">
                                <input type="radio" id="release-btn" name="sort-by" onChange={this.handlerSortBy} value={SortBy.Release} checked={this.props.sortBy === SortBy.Release} />
                                <label htmlFor="release-btn" >release date</label>
                            </div>
                            <div className="sort-by-radio-btn">
                                <input type="radio" id="rating-btn" name="sort-by" onChange={this.handlerSortBy} value={SortBy.Rating} checked={this.props.sortBy === SortBy.Rating} />
                                <label htmlFor="rating-btn" >rating</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MovieSorter;