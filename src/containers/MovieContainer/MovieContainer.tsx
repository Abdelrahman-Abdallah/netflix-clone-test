import React, { useCallback, useEffect, useState } from 'react'
import './MovieContainer.scss';
import { useParams } from 'react-router-dom';
import * as actionTypes from '../../store/actions';

import MovieSkeleton from '../../components/MovieSkeleton/MovieSkeleton';
import { connect } from 'react-redux';
import Loader from '../../components/shared/loaders/SpinLoader';
import ItemNotFound from '../../components/ui/itemNotFound';
const MovieContainer = ({ fetchMovies, movies, genres, loading, watchListLoading, addtoWatchListfn }: any) => {
    const [localmovie, setLocalMovie] = useState<any>(null);
    const [found, setFound] = useState<any>(false)
    //for using add to watch list button

    const { id } = useParams<any>();
    const checkforMovie = useCallback(() => {
        let temp = movies.filter((movie: any) => movie.id === id);

        if (temp.length === 0) setFound(false);
        else {
            setFound(true);
            setLocalMovie(temp[0]);
        }
    }, [id, movies]);
    useEffect(() => {

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [id])
    useEffect(() => {

        if (movies == null) {
            fetchMovies();
        }
        else {
            checkforMovie();
        }
    }, [movies, id])

    const addtowatchlist = () => {
        addtoWatchListfn(localmovie)
    }
    return (
        <div className="movieContainer">
            <div className="moviehome">
                {watchListLoading ? <Loader /> : null}
                {movies != null ? <MovieSkeleton movies={movies} movie={localmovie} addtowatchlist={addtowatchlist} /> : <Loader />}
                {movies != null && found === false ? <div>
                    <ItemNotFound></ItemNotFound>
                </div> : null}
            </div>

        </div>
    )
}
const mapStateToProps = (state: any) => ({

    movies: state.movies.movies,
    loading: state.movies.loading,
    genres: state.movies.genres,
    watchListLoading: state.watchList.loading
})

const mapDispatchToProps = (disptach: any) => {
    return {
        fetchMovies: () => disptach(actionTypes.fetchMovies()),
        addtoWatchListfn: (movie: any) => disptach(actionTypes.addToWatchList(movie))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieContainer)