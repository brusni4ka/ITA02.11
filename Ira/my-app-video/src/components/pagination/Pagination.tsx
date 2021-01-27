import React from "react";
import {useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../toolkitRedux";
import {Button} from "../shared/button/Button";
import {queryString} from "../../constants/queryString";
import "./styles.scss";

interface IPaginationProps {
  onPage(btnId: number): void,
}

export const Pagination = ({onPage}: IPaginationProps) => {
  const location = useLocation();
  const totalMovies = useSelector((state: RootState) => state.store.totalMovies);
  const params = queryString.parse(location.search) as
    { search: string, searchBy: string, sortBy: string, page: number };

  const getNumberPage = (): number => {
    return Number(params.page) || 1;
  };

  const onNextPage = () => {
    const page = getNumberPage();
    onPage(page + 1);
  };

  const onPrevPage = () => {
    const page = getNumberPage();
    onPage(page - 1);
  };


  const totalPages: number = Math.ceil(totalMovies / 9);
  const page = Number(params.page) || 1;


  const getPaginationButtons = (): number[] => {
    const arrBtn: number[] = [];
    let renderPages: number = 5;

    if (totalPages < renderPages) {
      renderPages = totalPages;
    }

    if (page <= renderPages && totalPages !== 1) {

      for (let i = 1; i <= renderPages; i++) {
        arrBtn.push(i);
      }
    }

    if (page > renderPages) {
      for (let i = 1; i <= page; i++) {
        arrBtn.push(i);
      }
    }
    return arrBtn;
  };

  const buttons: number[] = getPaginationButtons();

  return (
    <div className='pagination'>
      <span className="total">Total pages: {totalPages}</span>
      {page !== 1 && <Button
        title="<"
        className="btn prev-page-btn"
        onClick={() => onPrevPage()}
      />}
      {buttons.map(number => <Button
          title={number.toString()}
          className={page === number ? "btn currentPageButton" : "btn pageButton"}
          onClick={() => onPage(number)}
          key={number}
        />
      )}
      {page !== totalPages && <Button
        title=">"
        className="btn next-page-btn"
        onClick={() => onNextPage()}
      />
      }
    </div>
  );
};
