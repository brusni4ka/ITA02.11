import React from "react";
import {Button} from "../shared/button/Button";
import './styles.scss';

interface SearchResultSectionProps {
  stateSortByBtn: string,
  result: number,

  onToggleSortBy(e: string): void,
}

enum sortBy {
  release = "release",
  rating = "rating",
}

export const SearchResultSection = ({
                                      stateSortByBtn,
                                      result,
                                      onToggleSortBy
                                    }: SearchResultSectionProps) => {

  return (
    <div className="search-result-section">
      <div className="content-search-result">
        <div className="result">
          <span>{result} films found</span>
        </div>
        <div className="sorting-section">
          <span className="sorting-label">Sort by</span>
          <Button
            title={`${sortBy.release} date`}
            className={stateSortByBtn === sortBy.release ? 'btn by-release-btn active' : 'btn by-release-btn'}
            onClick={() => onToggleSortBy(sortBy.release)}
          />
          <Button
            title={sortBy.rating}
            className={stateSortByBtn === sortBy.rating ? 'btn by-rating-btn active' : 'btn by-rating-btn'}
            onClick={() => onToggleSortBy(sortBy.rating)}
          />
        </div>
      </div>
    </div>
  );
}

