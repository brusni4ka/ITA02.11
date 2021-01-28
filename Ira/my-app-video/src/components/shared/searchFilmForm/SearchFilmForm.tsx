import React, {useEffect, useState} from 'react';
import { useHistory, useLocation} from 'react-router-dom';
import {Input} from "../input";
import {Button} from "../button/Button";
import {queryString} from "../../../constants/queryString";
import './styles.scss';

interface ISearchFilmFormProps {
  onSearchSubmit({searchValue, searchBy}: { searchValue: string, searchBy: string }): void,
}

export enum SearchBy {
  title = "title",
  genre = "genres"
}

export const SearchFilmForm = ({onSearchSubmit}: ISearchFilmFormProps) => {
  const [searchValue, setSearchValue] = useState('');
  const [searchBy, setSearchBy] = useState(SearchBy.title);
  const history = useHistory();
  const location = useLocation<{search: string}>();

  useEffect(() => {
    if(history.action !== 'PUSH' ) {
      const params: { search: string, sortBy: string, searchBy: string } =
        queryString.parse(location.search) as
          { search: string, searchBy: string, sortBy: string };

      let searchByParam: SearchBy = SearchBy.genre;

      if (SearchBy.title === params.searchBy) {
        searchByParam = SearchBy.title
      }
      setSearchBy(searchByParam || SearchBy.title);
      setSearchValue(searchValue || params.search);
    }

    // eslint-disable-next-line
  }, [location]);

  const toggleSearchBy = (btnName: string) => (): void => {
    if (btnName === SearchBy.genre) {
      setSearchValue('');
      setSearchBy(SearchBy.genre);
    } else {
      setSearchValue('');
      setSearchBy(SearchBy.title);
    }
  };

  const changeValue = (value: string): void => {
    setSearchValue(value);
  };

  const searchFilm = (event: React.FormEvent<HTMLElement>): void => {
    event.preventDefault();

    onSearchSubmit({
      searchValue,
      searchBy,
    });
  };

  return (
    <form className="form" onSubmit={searchFilm}>
      <label className="form-label" htmlFor="search">Find your movie</label>
      <Input
        className="form-input"
        id="search"
        name="search"
        placeholder="search..."
        value={searchValue}
        changeValue={changeValue}
      />
      <div className="btn-group">
        <div className="search-by-btn">
          <span className="search-by-label">Search by</span>
          <Button title={SearchBy.title}
                  type="button"
                  className={searchBy === SearchBy.title ?
                    'btn btn-by-title active' :
                    'btn btn-by-title'}
                  onClick={toggleSearchBy(SearchBy.title)}
          />
          <Button title={"genre"}
                  className={searchBy === SearchBy.genre ?
                    'btn btn-by-genre active' :
                    'btn btn-by-genre'}
                  onClick={toggleSearchBy(SearchBy.genre)}
          />
        </div>
        <Button
          title="search"
          className="btn search-btn"
          type="submit"
        />
      </div>
    </form>
  );
};
