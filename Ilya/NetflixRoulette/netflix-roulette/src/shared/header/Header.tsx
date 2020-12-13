import React from 'react';
import './Header.scss';

class Header extends React.Component {

    // searchMovies = ({ value, searchBy }) => {
    //     fetch("https://reactjs-cdp.herokuapp.com/movies")
    //         .then(response => response.json())
    //         .then(receiveData => { this.setState({ movies: receiveData.data }) })
    // }

    render() {
        return (
            <header>
                <div className="layout">
                    <a className="logo" href="#">netflixroulette</a>
                    {/* <SearchMoovie onSubmit={this.searchMovies} /> */}

                </div>
            </header>
        );
    }
}

export default Header;