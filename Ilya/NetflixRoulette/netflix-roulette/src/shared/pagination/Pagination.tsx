import React from 'react';
import "./Pagination.scss";

interface IPaginationProps {
    total: number,
    limit: number,
    currentPage: number,
    onMoveToLimitPage(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void,
    onChangePage(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void
}

class Pagination extends React.Component<IPaginationProps> {

    render() {
        const lastPage = Math.ceil(this.props.total / this.props.limit);
        return (
            <div className="pagination">
                <div className="layout">
                    <button disabled={this.props.currentPage === 1} onClick={this.props.onMoveToLimitPage} value="1" type="button">First</button>
                    <button disabled={this.props.currentPage === 1} onClick={this.props.onChangePage} value="prev" type="button">Prev</button>
                    <span className="current-page">{this.props.currentPage}</span>
                    <button disabled={this.props.currentPage === lastPage} onClick={this.props.onChangePage} value="next" type="button">Next</button>
                    <button disabled={this.props.currentPage === lastPage} onClick={this.props.onMoveToLimitPage} value={lastPage} type="button">Last</button>
                </div>
            </div>
        );
    }
}

export default Pagination;