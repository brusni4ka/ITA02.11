import React from 'react';
import "./Pagination.scss";

interface IPaginationProps {
    total: number,
    limit: number,
    currentPage: number,
    onMoveToLimitPage(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void,
    onChangePage(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void
}

function Pagination(props: IPaginationProps) {
    const lastPage = Math.ceil(props.total / props.limit);
    return (
        <div className="pagination">
            <div className="layout">
                <button disabled={props.currentPage === 1} onClick={props.onMoveToLimitPage} value="1" type="button">First</button>
                <button disabled={props.currentPage === 1} onClick={props.onChangePage} value="prev" type="button">Prev</button>
                <span className="current-page">{props.currentPage}</span>
                <button disabled={props.currentPage === lastPage} onClick={props.onChangePage} value="next" type="button">Next</button>
                <button disabled={props.currentPage === lastPage} onClick={props.onMoveToLimitPage} value={lastPage} type="button">Last</button>
            </div>
        </div>
    );
}

export default Pagination;