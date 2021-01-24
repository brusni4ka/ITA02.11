import "./SearchBtn.scss";

interface ISearchBtnProps {
    title: string,
}

function SearchBtn(props: ISearchBtnProps) {
    return (
        <div className="btn">
            <button className="search-btn" type="submit">{props.title}</button>
        </div>
    );
}

export default SearchBtn;