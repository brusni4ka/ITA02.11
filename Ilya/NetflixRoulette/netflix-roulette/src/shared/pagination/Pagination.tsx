import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { RootState } from 'store';
import "./Pagination.scss";
import queryString from "query-string";

interface IPaginationProps {
    onPage(page: number): void
}

function Pagination(props: IPaginationProps) {
    const location = useLocation();
    const total = useSelector((state: RootState) => state.store.total);
    const limit = useSelector((state: RootState) => state.store.limit);
    const lastPage = Math.ceil(total / limit);

    let currentPageFromUrl = 1;
    const parsed = queryString.parse(location.search);
    if ("page" in parsed) {
        currentPageFromUrl = Number(parsed.page);
    }

    const changePage = (e: React.MouseEvent<HTMLButtonElement>) => {
        let pageNumber;
        const elem: HTMLButtonElement = e.target as HTMLButtonElement;

        if (elem.value === "next" && currentPageFromUrl < Math.ceil(total / limit)) {
            pageNumber = currentPageFromUrl + 1;
            props.onPage(pageNumber);

        } else if (elem.value === "prev" && currentPageFromUrl > 1) {
            pageNumber = currentPageFromUrl - 1;
            props.onPage(pageNumber);
        }
    }

    const moveToLimitPage = (e: React.MouseEvent<HTMLButtonElement>) => {
        let pageNumber;
        const elem: HTMLButtonElement = e.target as HTMLButtonElement;

        pageNumber = (elem.value === "1") ? 1 : (Math.ceil(total / limit));
        props.onPage(pageNumber);
    }

    return (
        <div className="pagination">
            <div className="layout">
                <button disabled={currentPageFromUrl === 1} onClick={moveToLimitPage} value="1" type="button">First</button>
                <button disabled={currentPageFromUrl === 1} onClick={changePage} value="prev" type="button">Prev</button>
                <span className="current-page">{currentPageFromUrl}</span>
                <button disabled={currentPageFromUrl === lastPage} onClick={changePage} value="next" type="button">Next</button>
                <button disabled={currentPageFromUrl === lastPage} onClick={moveToLimitPage} value={lastPage} type="button">Last</button>
            </div>
        </div>
    );
}

export default Pagination;