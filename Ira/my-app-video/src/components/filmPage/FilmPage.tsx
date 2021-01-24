import React, {useEffect} from 'react';
import {RouteComponentProps, useHistory, useParams} from "react-router-dom";
import {Header} from "../layout/header";
import {FullInfoFilmCard} from "../fullInfoFilmCard";
import {Footer} from "../layout/footer";
import {FilmList} from "../filmList";
import {Button} from "../shared/button/Button";
import Pagination from "../pagination";
import {initMoviePage, resetMovies, fetchMovies} from "../../toolkitRedux/toolkitSlice";
import {queryString} from "../../constants/queryString";
import {SortBy} from "../sortingSection/SortingSection";
import {SearchBy} from "../shared/searchFilmForm/SearchFilmForm";
import loader from '../../accets/Dual Ball-1s-200px.svg';
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "../../toolkitRedux";
import './styles.scss';

type FilmPageProps = RouteComponentProps<{ id: string }>;

export const FilmPage = ({location}: FilmPageProps) => {
  const dispatch = useDispatch();
  const {id} = useParams<{ id: string }>();
  const history = useHistory();
  const loading = useSelector(((state: RootState) => state.store.loading));
  const currentFilm = useSelector((state: RootState) => state.store.currentMovie);
  const movies = useSelector((state: RootState) => state.store.movies);

  useEffect(() => {
    initPage();

    return () => {
      resetMovies();
    }
  }, []);

  useEffect(() => {
    initPage();
  }, [location]);

  const getParams = (): { page: number } => {
    return queryString.parse(location.search) as
      { page: number };
  }
  const params = getParams();

  const initPage = (): void => {
    dispatch(initMoviePage({page: params.page, searchBy: SearchBy.genre, id: Number(id)}));
  }

  const onPage = (btnId: number) => {
    let genre: string = '';

    if (currentFilm) {
      genre = currentFilm.genres[0].toLocaleLowerCase();
    }

    const newParams: string = queryString.stringify({page: btnId});
    const payLoadParams: { search: string, searchBy: string, sortBy: string, page: number } = {
      search: genre, searchBy: SearchBy.genre, sortBy: SortBy.release, page: btnId || params.page
    };

    history.push(`/film/${Number(id)}?${newParams}`);
    dispatch(fetchMovies(payLoadParams));
  }

  return (
    <>
      <div className="header-container">
        <div className="header-content">
          <Header/>
          <Button
            title="search"
            className="btn btn-return-to-home"
            isLink
            to="/"
          />
        </div>
      </div>
      <div className="top-header-section">
        <div className="search-result-content">
          <FullInfoFilmCard film={currentFilm}/>
        </div>
      </div>
      {loading ? <img className="loader film-page-loader" src={loader} alt="loader"/> :
        <FilmList
          films={movies}
        />
      }
      <Pagination
        onPage={onPage}
      />
      <Footer/>
    </>
  );
}

// export class FilmPage extends React.Component<FilmPageProps> {
//   componentDidMount() {
//     this.initPage();
//   }
//
//   componentDidUpdate(prevProps: Readonly<FilmPageProps>) {
//     // eslint-disable-next-line no-mixed-operators
//     if (this.props.history.action !== 'PUSH' && this.props.location !== prevProps.location || this.props.location.pathname !== prevProps.location.pathname) {
//       this.initPage();
//     }
//   };
//
//   componentWillUnmount() {
//     this.props.resetMovies();
//   }
//
//   getParams = (): { search: string, searchBy: string, sortBy: string, page: number } => {
//     return queryString.parse(this.props.location.search) as
//       { search: string, searchBy: string, sortBy: string, page: number };
//   }
//
//   initPage = (): void => {
//     const id = this.props.match.params.id;
//     const params = this.getParams();
//
//     this.props.initMoviePage({page: params.page, searchBy: params.searchBy || SearchBy.genre, id: Number(id)});
//   }
//
//   onPage = (btnId: number) => {
//     const params = this.getParams();
//     let genre: string = '';
//
//     if (this.props.currentFilm) {
//       genre = this.props.currentFilm.genres[0].toLocaleLowerCase();
//     }
//
//     const newParams: string = queryString.stringify({searchBy: SearchBy.genre, page: btnId});
//     const payLoadParams: { search: string, searchBy: string, sortBy: string, page: number } = {
//       search: genre, searchBy: SearchBy.genre, sortBy: SortBy.release, page: btnId || params.page
//     };
//     const id = this.props.match.params.id;
//     this.props.history.push(`/film/${id}?${newParams}`);
//     this.props.fetchMovies(payLoadParams);
//   }
//
//   render() {
//     const {
//       movies,
//       currentFilm,
//     } = this.props;
//
//     return (
//       <>
//         <div className="header-container">
//           <div className="header-content">
//             <Header/>
//             <Button
//               title="search"
//               className="btn btn-return-to-home"
//               isLink
//               to="/"
//             />
//           </div>
//         </div>
//         <div className="top-header-section">
//           <div className="search-result-content">
//             <FullInfoFilmCard film={currentFilm}/>
//           </div>
//         </div>
//         <FilmList
//           films={movies}
//         />
//         <Pagination
//           onPage={this.onPage}
//         />
//         <Footer/>
//       </>
//     );
//   };
// }
