import React from "react";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {Button} from "../shared/button/Button";
import {queryString} from "../../constants/queryString";
import {PaginationConnectProps} from "./index";
import "./styles.scss";

type PaginationType = PaginationConnectProps & RouteComponentProps;

class Pagination extends React.Component<PaginationType> {

  onPage = (btnId: number) => {
    const params: { search: string, searchBy: string, sortBy: string, page: number } =
      queryString.parse(this.props.location.search) as
        { search: string, searchBy: string, sortBy: string, page: number };

    const newParams: string = queryString.stringify({...params, page: btnId});
    const payLoadParams: { search: string, searchBy: string, sortBy: string, page: number } = {
      search: params.search, searchBy: params.searchBy, sortBy: params.sortBy || 'release_date', page: btnId
    };

    this.props.history.push(`/search?${newParams}`);
    this.props.fetchMovies(payLoadParams);
  }

  onNextPage = () => {
    const params: { search: string, searchBy: string, sortBy: string, page: number } =
      queryString.parse(this.props.location.search) as
        { search: string, searchBy: string, sortBy: string, page: number };
    const page = Number(params.page) || 1;
    const newParams: string = queryString.stringify({...params, page: page + 1});
    const payLoadParams: { search: string, searchBy: string, sortBy: string, page: number } = {
      search: params.search, searchBy: params.searchBy, sortBy: params.sortBy || 'release_date', page: page + 1
    };

    this.props.history.push(`/search?${newParams}`);
    this.props.fetchMovies(payLoadParams);
  }

  onPrevPage = () => {
    const params: { search: string, searchBy: string, sortBy: string, page: number } =
      queryString.parse(this.props.location.search) as
        { search: string, searchBy: string, sortBy: string, page: number };
    const page = Number(params.page) || 1;
    const newParams: string = queryString.stringify({...params, page: page - 1});
    const payLoadParams: { search: string, searchBy: string, sortBy: string, page: number } = {
      search: params.search, searchBy: params.searchBy, sortBy: params.sortBy || 'release_date', page: page - 1
    };

    this.props.history.push(`/search?${newParams}`);
    this.props.fetchMovies(payLoadParams);
  }


  render() {
    const params: { search: string, searchBy: string, sortBy: string, page: number } =
      queryString.parse(this.props.location.search) as
        { search: string, searchBy: string, sortBy: string, page: number };
    const page = Number(params.page) || 1;
    const {totalMovies} = this.props;
    const totalPages: number = Math.ceil(totalMovies / 9);
    const arrBtn: number[] = [];

    if (totalPages === 1) {
      return null;
    }

    if (page <= 5 && totalPages !== 1) {
      for (let i = 1; i <= 5; i++) {
        arrBtn.push(i);
      }
    }

    if (page > 5) {
      for (let i = 1; i <= page; i++) {
        arrBtn.push(i);
      }
    }

    if (page === totalPages && page !== 1) {
      for (let i = 1; i <= totalPages; i++) {
        arrBtn.push(i);
      }
    }

    return (
      <div className='pagination'>
        <span className="total">Total pages: {totalPages}</span>
        {page !== 1 && <Button
          title="<"
          className="btn prev-page-btn"
          onClick={() => this.onPrevPage()}
        />}
        {arrBtn.map(number => <Button
            title={number.toString()}
            className={page === number ? "btn currentPageButton" : "btn pageButton"}
            onClick={() => this.onPage(number)}
            key={number}
          />
        )}
        {page !== totalPages && <Button
          title=">"
          className="btn next-page-btn"
          onClick={() => this.onNextPage()}
        />
        }
      </div>
    );
  }
}

export default withRouter(Pagination);
