import React from "react";
import "./SearchMovie.scss";
import SearchBtn from "shared/button/SearchBtn"

interface ISearchMovie {
    value: string,
    searchBy: SearchBy
}

enum SearchBy {
    Genre = "genre",
    Title = "title"
}

class SearchMovie extends React.Component<{}, ISearchMovie>{
    state: ISearchMovie = {
        value: '',
        searchBy: SearchBy.Genre,
    };

    // handleSubmit = () => {
    //     this.props.onSubmit({
    //         value: this.state.value,
    //         searchBy: this.state.searchBy
    //     });
    // }

    render() {
        return (
            <div className="search-movie">
                <div className="layout">
                    <h1>find your movie</h1>
                    <form action="">
                        <input type="text" name="search" placeholder="Find your movie" onChange={(e) => { this.setState({ value: e.target.value }) }} />
                        <button type="submit"></button>
                    </form>
                    <div className="headers-btn">
                        <div className="btn-container">
                            <p>Search by</p>
                            <button className="typical-btn title-btn" type="button" onClick={() => { this.setState({ searchBy: SearchBy.Title }) }}>Title</button>
                            <button className="typical-btn" type="button">Genare</button>
                        </div>
                        <SearchBtn />
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchMovie;