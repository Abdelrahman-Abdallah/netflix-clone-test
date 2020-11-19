import React from 'react'
import { Link } from 'react-router-dom'
import './Movie.scss'
const Movie = ({ id, title, posterurl, description, year, path }: any) => {
    const movie = <div className="movie">
        <div className="movie__overlay">
        </div>
        <div className="movie__background">
            <img className="movie__background--img" src={posterurl} alt="" />
        </div>
        <div className="movie__info">
            <div className="movie__info--title">
                {title}{year}
            </div>
            <div className="movie__info--description">
                {description}
            </div>
        </div>
    </div>;
    const checkdestination = () => {
        return <Link to={path + "/" + id}>{movie}</Link>
    }
    return (
        <div>
            { checkdestination()}
        </div>
    )
}

export default Movie;
