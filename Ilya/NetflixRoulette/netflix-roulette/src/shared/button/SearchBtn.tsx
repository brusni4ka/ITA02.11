import "./SearchBtn.scss";

interface ISearchBtnProps {
    title: string,
    // onSubmit(): void
}

function SearchBtn({ title }: ISearchBtnProps) {
    return (
        <div className="btn">
            <button className="search-btn" type="submit">{title}</button>
        </div>
    );
}

export default SearchBtn;