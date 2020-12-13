import React from "react";
import "./SearchBtn.scss";

interface ISearchBtn {
    value: string,
}

class SearchBtn extends React.Component<{}, ISearchBtn>{
    state: ISearchBtn = {
        value: '',
    };

    render() {
        return (
            <div className="btn">
                {/* <button className="typical-btn search-btn" type="submit" onClick={this.handleSubmit}>Search</button> */}
                <button className="typical-btn search-btn" type="submit">Search</button>
            </div>
        );
    }
}

export default SearchBtn;