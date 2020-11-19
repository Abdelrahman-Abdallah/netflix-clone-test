import React, { useEffect, useState } from 'react';
import * as actionTypes from '../../store/actions'
import { Redirect, useParams } from 'react-router-dom';
import MoviesSort from '../../components/MovieSort/MoviesSort';
import { extractMoviesObject } from '../../utils/generesExtractor';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/shared/loaders/SpinLoader';
import "./Genres.scss";
import ItemNotFound from '../../components/ui/itemNotFound';
const Genres = ({ fetchMovies }: any) => {
    const movies = useSelector((state: any) => state.movies.movies)
    const loading = useSelector((state: any) => state.movies.loading)
    const genres = useSelector((state: any) => state.movies.genres)
    const dispatch = useDispatch();
    const { name } = useParams<any>();
    const [rendredMovies, setRenderedMovies] = useState<any[]>([]);
    useEffect(() => {
        if (movies == null) {
            dispatch(actionTypes.fetchMovies());
        }
        else {
            setRenderedMovies([...extractMoviesObject(name, movies)])
        }
    }, [name, movies])
    return <div className="genres">
        {movies == null ? <Loader /> : <div className="container">
            <div> {
                genres.indexOf(name) === -1 ? <ItemNotFound />
                    :
                    <MoviesSort title={name} path="/movie" renderMovies={rendredMovies} />}</div>
        </div>}
    </div>
}
export default Genres