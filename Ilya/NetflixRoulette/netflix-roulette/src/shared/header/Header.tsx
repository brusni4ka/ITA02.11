import React from 'react';
import './Header.scss';

class Header extends React.Component {
    render() {
        return (
            <header>
                <div className="layout">
                    <a className="logo" href="/">netflixroulette</a>
                </div>
            </header>
        );
    }
}

export default Header;