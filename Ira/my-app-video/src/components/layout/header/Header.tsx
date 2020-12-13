import React from 'react';
import {Logo} from '../../shared/logo/Logo';
import {Button} from "../../shared/button/Button";
import {FullInfoFilmCard} from "../../fullInfoFilmCard";
import {IHeaderProps} from "../../../interfaces/IHeaderProps";
import './styles.scss';

export const Header = ({
                         isFullFilmInfo,
                         returnToSearchSection,
                         film,
                         changeValue,
                         value,
                         changeSearchingBtnState,
                         changeSortingBtnState,
                         classNameTitleBtn,
                         classNameGenreBtn,
                         classNameReleaseBtn,
                         classNameRatingBtn,
                         searchFilm,
                         result,
                       }: IHeaderProps) => {
  return (
    <header className="header">
      <section className={isFullFilmInfo ?
        "top-header-section-with-film" :
        "top-header-section"}>
        <div className="opacity-background">
          <div className="header-content">
            <div className="logo-container">
              <Logo/>
            </div>
            {isFullFilmInfo
              ?
              <div className="film-info-content">
                <Button title="search" className="btn btn-return-to-search" onClick={returnToSearchSection}/>
                <FullInfoFilmCard film={film}/>
              </div>
              :
              <div className="search-content">
                <label className="form-label" htmlFor="search">Find your movie</label>
                <input
                  className="form-input"
                  type="text"
                  id="search"
                  name="search"
                  placeholder="search..."
                  value={value}
                  onChange={e => changeValue(e.currentTarget.value)}
                />
                <div className="btn-group">
                  <div className="search-by-btn">
                    <span className="search-by-label">Search by</span>
                    <Button title="Title"
                            className={classNameTitleBtn}
                            onClick={changeSearchingBtnState('titleBtn')}/>
                    <Button title="Genre"
                            className={classNameGenreBtn}
                            onClick={changeSearchingBtnState('genreBtn')}
                    />
                  </div>
                  <Button
                    title="Search"
                    className="btn search-btn"
                    onClick={searchFilm}
                  />
                </div>
              </div>
            }
          </div>
        </div>
      </section>
      <div className="search-result-section">
        <div className="search-result-content">
          <span className="result">{result} movies found</span>
          <div className="sorting-section">
            <span className="sorting-label">Sort by</span>
            <Button title="release date" className={classNameReleaseBtn} onClick={changeSortingBtnState('releaseBtn')} />
            <Button title="rating" className={classNameRatingBtn} onClick={changeSortingBtnState('ratingBtn')} />
          </div>
        </div>
      </div>
    </header>
  );
}
