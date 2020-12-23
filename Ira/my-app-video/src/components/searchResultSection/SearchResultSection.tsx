import React from "react";
import {Button} from "../shared/button/Button";
import './styles.scss';

interface SearchResultSectionProps {
  stateSortByBtn: string,
  result: number,
  sortByParam: string,
  searchValue: string,
  searchBy: string,
  history: { push(e: string): void },

  sortBy(e: string): void,
}

export const SearchResultSection = ({
                                      stateSortByBtn,
                                      result,
                                      sortBy,
                                      sortByParam,
                                      history,
                                      searchValue,
                                      searchBy,
                                    }: SearchResultSectionProps) => {
  const className = sortByParam || stateSortByBtn;

  const makeUrlSortBy = (btnName: string) => (): void => {
    sortBy(btnName);
    history.push(`/search?search=${searchValue}&searchBy=${searchBy}&sortBy=${btnName}`);
  };

  return (
    <div className="search-result-section">
      <div className="content-search-result">
        <div className="result">
          <span>{result} films found</span>
        </div>
        <div className="sorting-section">
          <span className="sorting-label">Sort by</span>
          <Button
            title="release date"
            className={className === 'release' ? 'btn by-release-btn active' : 'btn by-release-btn'}
            onClick={makeUrlSortBy('release')}
          />
          <Button
            title="rating"
            className={className === 'rating' ? 'btn by-rating-btn active' : 'btn by-rating-btn'}
            onClick={makeUrlSortBy('rating')}
          />
        </div>
      </div>
    </div>
  );
}
