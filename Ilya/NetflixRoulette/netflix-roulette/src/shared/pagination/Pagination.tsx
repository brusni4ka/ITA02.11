import React from 'react';
import "./Pagination.scss";
import { RouteComponentProps } from "react-router-dom";
import { HomePageConnectProps } from 'pages/home';
import queryString from "query-string";

type IPaginationProps = HomePageConnectProps & RouteComponentProps;

class Pagination extends React.Component<IPaginationProps> {


    changePage = (e: any) => {
        e.preventDefault();
        let page;

        if (e.target.attributes.value.value === "next" && this.props.currentPage < Math.ceil(this.props.total / this.props.limit)) {
            page = this.props.currentPage + 1;
            this.props.setCurrentPage(page);
            const parsed = queryString.parse(this.props.location.search);
            const newSearchParams = queryString.stringify({ ...parsed, page });
            this.props.history.push(`/search?${newSearchParams}`);

            this.props.requestMovies(newSearchParams);

        } else if (e.target.attributes.value.value === "prev" && this.props.currentPage > 1) {
            page = this.props.currentPage - 1;
            this.props.setCurrentPage(page);
            const parsed = queryString.parse(this.props.location.search);
            const newSearchParams = queryString.stringify({ ...parsed, page });
            this.props.history.push(`/search?${newSearchParams}`);

            this.props.requestMovies(newSearchParams);
        }
    }
    moveToLimitPage = (e: any) => {
        e.preventDefault();
        let page;

        page = (e.target.attributes.value.value === "1") ? 1 : (Math.ceil(this.props.total / this.props.limit));

        this.props.setCurrentPage(page);
        const parsed = queryString.parse(this.props.location.search);
        const newSearchParams = queryString.stringify({ ...parsed, page });
        this.props.history.push(`/search?${newSearchParams}`);

        this.props.requestMovies(newSearchParams);
    }

    render() {
        const lastPage = Math.ceil(this.props.total / this.props.limit);
        let currentPage = 1;
        const parsed = queryString.parse(this.props.location.search);

        if ("page" in parsed) {
            currentPage = Number(parsed.page);
        }

        return (
            <div className="pagination">
                <div className="layout">
                    <button onClick={this.moveToLimitPage} value="1" type="button">First</button>
                    <button onClick={this.changePage} value="prev" type="button">Prev</button>
                    <span className="current-page">{currentPage}</span>
                    <button onClick={this.changePage} value="next" type="button">Next</button>
                    <button onClick={this.moveToLimitPage} value={lastPage} type="button">Last</button>
                </div>
            </div>
        );
    }
}

export default Pagination;