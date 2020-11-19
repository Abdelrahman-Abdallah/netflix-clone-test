import React, { useEffect, useState } from 'react';
import imdb from '../../assets/imdb.svg';
import date from '../../assets/date.svg';
import extractMovies from '../../utils/generesExtractor'
import './MovieSkeleton.scss';
import { useLocation } from 'react-router-dom';

const MovieSkeleton = ({ movie, movies, addtowatchlist }: any) => {
    const location = useLocation();
    let temp = null;
    const [watchlist, setwatchlist] = useState(false);

    useEffect(() => {
        if (location.pathname.includes("watchlist")) {
            setwatchlist(true);
        }
    }, [location])
    if (movie) {
        temp = <div>
            <div className="skeleton">

                <div className="skeleton__container">
                    <div className="skeleton__poster" style={{ backgroundImage: `linear-gradient(to bottom left, #000000bd, #151313b5),url(${movie?.data.posterurl})` }}>

                        {/* <img src={movie?.data.posterurl} className="skeleton__poster--img" alt="Movie poster" /> */}
                        {watchlist === false ? <button className="skeleton__watchlist" onClick={addtowatchlist}>add to watch list</button> : null}
                    </div>
                    <div className="skeleton__info container">
                        <div className="skeleton__info--title">
                            <span className="skeleton__info--meta">title</span><span className="skeleton__info--metainfo">{movie.data.title}</span>
                        </div>
                        <div className="skeleton__info--description">
                            <span className="skeleton__info--meta">description</span>{movie.data.storyline}
                        </div>
                        <div className="skeleton__info--rating">
                            <img src={imdb} alt="imdb" />
                            {movie.data.imdbRating}
                        </div>
                        <div className="skeleton__info--description">
                            <img src={date} alt="imdb" />
                            <span className="skeleton__info--meta">{movie.data.year}</span>
                        </div>

                        <div className="skeleton__rating">
                            actors
                           <div>{movie.data.actors.map((actor: any, index: number) => <span key={index}>{actor}, </span>)}</div>
                        </div>
                    </div>
                </div>
                {watchlist === true ? <div className="container">
                    Related Movies
                    <div className="box">
                        {extractMovies(movie.data.genres[0], movies)}
                    </div> </div> : null}
            </div>
        </div>
    }
    return (
        <div>
            {temp}
        </div>
    )
}

export default MovieSkeleton
