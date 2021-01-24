import React, {useEffect, useState} from 'react';
import { useHistory, useLocation} from 'react-router-dom';
import {Input} from "../input";
import {Button} from "../button/Button";
import {queryString} from "../../../constants/queryString";
import './styles.scss';

interface IOwnProps {
  onSearchSubmit({searchValue, searchBy}: { searchValue: string, searchBy: string }): void,
}

export enum SearchBy {
  title = "title",
  genre = "genres"
}

type SearchFilmFormProps = IOwnProps ;

const SearchFilmForm = ({onSearchSubmit}: SearchFilmFormProps) => {
  const [searchValue, setSearchValue] = useState('');
  const [searchBy, setSearchBy] = useState(SearchBy.title);
  const history = useHistory();
  const location = useLocation();

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
}

//type SearchFilmFormProps = IOwnProps & RouteComponentProps<{ search?: string, searchBy?: string }>;
// class SearchFilmForm extends React.Component <SearchFilmFormProps, ISearchFilmFormState> {
//   state: ISearchFilmFormState = {
//     searchValue: '',
//     searchBy: SearchBy.title,
//   };
//
//   componentDidMount() {
//     const params: { search: string, sortBy: string, searchBy: string } =
//       queryString.parse(this.props.location.search) as
//         { search: string, searchBy: string, sortBy: string };
//
//     this.setState({
//       searchValue: params.search || '',
//       searchBy: params.searchBy || SearchBy.title,
//     });
//   };
//
//   componentDidUpdate(prevProps: Readonly<SearchFilmFormProps>) {
//
//     if (this.props.history.action !== 'PUSH' && this.props.location !== prevProps.location) {
//       const params: { search: string, sortBy: string, searchBy: string } =
//         queryString.parse(this.props.location.search) as
//           { search: string, searchBy: string, sortBy: string };
//
//       this.setState({
//         searchValue: params.search || '',
//         searchBy: params.searchBy || SearchBy.title,
//       });
//     }
//   };
//
//   searchBy = (btnName: string) => (): void => {
//     this.setState({
//       searchBy: btnName,
//       searchValue: '',
//     });
//   };
//
//   changeValue = (value: string): void => {
//     this.setState({
//       searchValue: value,
//     });
//   };
//
//   searchFilm = (event: React.FormEvent<HTMLElement>): void => {
//     event.preventDefault();
//
//     this.props.onSearchSubmit({
//       searchValue: this.state.searchValue,
//       searchBy: this.state.searchBy,
//     });
//   };
//
//   render() {
//
//     return (
//       <form className="form" onSubmit={this.searchFilm}>
//         <label className="form-label" htmlFor="search">Find your movie</label>
//         <Input
//           className="form-input"
//           id="search"
//           name="search"
//           placeholder="search..."
//           value={this.state.searchValue}
//           changeValue={this.changeValue}
//         />
//         <div className="btn-group">
//           <div className="search-by-btn">
//             <span className="search-by-label">Search by</span>
//             <Button title={SearchBy.title}
//                     type="button"
//                     className={this.state.searchBy === SearchBy.title ?
//                       'btn btn-by-title active' :
//                       'btn btn-by-title'}
//                     onClick={this.searchBy(SearchBy.title)}
//             />
//             <Button title={"genre"}
//                     className={this.state.searchBy === SearchBy.genre ?
//                       'btn btn-by-genre active' :
//                       'btn btn-by-genre'}
//                     onClick={this.searchBy(SearchBy.genre)}
//             />
//           </div>
//           <Button
//             title="search"
//             className="btn search-btn"
//             type="submit"
//           />
//         </div>
//       </form>
//     );
//   };
// }

export default SearchFilmForm;
