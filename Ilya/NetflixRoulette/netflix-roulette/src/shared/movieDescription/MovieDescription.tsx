import React from "react";
import "./MovieDescription.scss";
import film from "../../images/film.jpg";

class MovieDecscription extends React.Component {
    render() {
        return (
            <div className="description-container">
                <div className="description-item">
                    <img src={film} alt="poster" />
                </div>
                <div className="description-item">
                    <h1>Pulp Fiction</h1>
                    <p>Oscar-winning Movies</p>
                    <div className="param-container">
                        <p className="release-year">1994</p>
                        <p className="duration">154 min</p>
                    </div>
                    <p className="summary">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        A sint nisi ducimus illum, fugit iusto esse obcaecati sapiente!
                        Tempore aliquid accusamus dolorem, delectus porro quibusdam placeat provident aspernatur.
                        Neque, maxime?Animi veniam necessitatibus debitis pariatur adipisci architecto aut, ea magnam est amet eius harum neque dolore reiciendis rem.
                        Praesentium ad asperiores maxime tenetur deserunt voluptates architecto repellat nihil eius et.
                    </p>
                </div>
            </div>
        );

    }
}

export default MovieDecscription;

