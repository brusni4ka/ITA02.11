import React from "react";
import {Button} from "../shared/button/Button";
import './styles.scss';

interface SearchResultSectionProps {
  sortBy: string,
  result: number,

  onToggleSortBy(e: string): void,
}

export enum SortBy {
  release = "release_date",
  rating = "vote_average",
}

export const SortingSection = ({
                                 sortBy,
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
            title={'release date'}
            className={sortBy === SortBy.release ? 'btn by-release-btn active' : 'btn by-release-btn'}
            onClick={() => onToggleSortBy(SortBy.release)}
          />
          <Button
            title={'rating'}
            className={sortBy === SortBy.rating ? 'btn by-rating-btn active' : 'btn by-rating-btn'}
            onClick={() => onToggleSortBy(SortBy.rating)}
          />
        </div>
      </div>
    </div>
  );
};
