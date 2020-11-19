import React from 'react'
import Movie from '../components/Movie/Movie';

const extractMovies = (genres: string, movies: any[]) => {
    return movies.map(movie => {

        return movie.data.genres.includes(genres) ? <Movie path="/movie" id={movie.id} title={movie.data.originalTitle} posterurl={movie.data.posterurl} description={movie.data.storyline} key={movie.id} watchlist="false" /> : null
    })
}
export const extractMoviesObject = (genres: string, movies: any[]) => {
    return movies.filter(movie => movie.data.genres.includes(genres));
}

export default extractMovies;