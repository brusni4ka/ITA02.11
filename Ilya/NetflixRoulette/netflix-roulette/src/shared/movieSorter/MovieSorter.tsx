import React from "react";
import "./MovieSorter.scss";

interface IMovieSorterProps {
    sortedQuantity: number,
    onSortChange(sortBy: SortBy): void,
    sortBy: SortBy
}

export enum SortBy {
    Rating = "vote_average",
    Release = "release_date"
}


function MovieSorter(props: IMovieSorterProps) {

    const handlerSortBy = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.onSortChange(e.target.value as SortBy);
    }

    return (
        <div className="srh-results">
            <div className="layout">
                <div className="srh-container">
                    <p className="quantity">{props.sortedQuantity} movies found</p>
                    <div className="sort-by">
                        <p>Sort by:</p>
                        <div className="sort-by-radio-btn">
                            <input type="radio" id="release-btn" name="sort-by" onChange={handlerSortBy} value={SortBy.Release} checked={props.sortBy === SortBy.Release} />
                            <label htmlFor="release-btn" >release date</label>
                        </div>
                        <div className="sort-by-radio-btn">
                            <input type="radio" id="rating-btn" name="sort-by" onChange={handlerSortBy} value={SortBy.Rating} checked={props.sortBy === SortBy.Rating} />
                            <label htmlFor="rating-btn" >rating</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieSorter;