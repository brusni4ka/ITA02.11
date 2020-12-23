import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {Input} from "../input";
import {Button} from "../button/Button";
import './styles.scss';

const queryString = require('query-string');

interface ISearchFilmFormState {
  searchValue: string,
  searchBy: string,
}

interface IOwnProps {
  searchValueFromUrl: string,
  pathParams: { sortBy?: string, searchBy?: string },

  getFormState({searchValue, searchBy}: { searchValue: string, searchBy: string }): void,
}

type SearchFilmFormProps = IOwnProps & RouteComponentProps<{ search?: string, searchBy?: string }>;

class SearchFilmForm extends React.Component <SearchFilmFormProps, ISearchFilmFormState> {
  state: ISearchFilmFormState = {
    searchValue: '',
    searchBy: '',
  };

  componentDidMount() {
    const locationSearch = this.props.location.search;
    const params = queryString.parse(locationSearch);

    this.setState({
      searchValue: this.props.searchValueFromUrl || '',
      searchBy: params.searchBy || 'title',
    })
  }

  searchBy = (btnName: string) => (): void => {
    this.setState({
      searchBy: btnName,
      searchValue: '',
    });
  };

  changeValue = (value: string): void => {
    this.setState({
      searchValue: value,
    });
  };

  searchFilm = (event: React.FormEvent<HTMLElement>): void => {
    event.preventDefault();

    let sortBy: string = '';
    let searchBy: string = '';

    if (this.props.pathParams.sortBy) {
      sortBy = `&sortBy=${this.props.pathParams.sortBy}`;
    }

    if (this.props.pathParams.searchBy) {
      searchBy = `&searchBy=${this.props.pathParams.searchBy}`;
    }

    const pathname: string = `/search?search=${this.state.searchValue}${sortBy ? sortBy : ''}${searchBy ? searchBy : ''}`;

    this.props.history.push(pathname);

    this.props.getFormState({
      searchValue: this.state.searchValue,
      searchBy: this.state.searchBy,
    });
  };

  render() {
    console.log('state', this.state.searchBy)

    return (
      <form className="form" onSubmit={(event: React.FormEvent<HTMLElement>) => this.searchFilm(event)}>
        <label className="form-label" htmlFor="search">Find your movie</label>
        <Input
          value={this.state.searchValue}
          changeValue={this.changeValue}
        />
        <div className="btn-group">
          <div className="search-by-btn">
            <span className="search-by-label">Search by</span>
            <Button title="Title"
                    type="button"
                    className={this.state.searchBy === 'title' ? 'btn btn-by-title active' : 'btn btn-by-title'}
                    onClick={this.searchBy('title')}
            />
            <Button title="Genre"
                    className={this.state.searchBy === 'genre' ? 'btn btn-by-genre active' : 'btn btn-by-genre'}
                    onClick={this.searchBy('genre')}
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
}

export default withRouter(SearchFilmForm);
