import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actionTypes from '../../store/actions/index';

import GenresList from '../../components/GenresList/GenresList';
import './home.scss';
import Loader from '../../components/shared/loaders/SpinLoader';

const Home = () => {
    const genres = useSelector((state: any) => state.movies.genres)
    const movies = useSelector((state: any) => state.movies.movies)
    const loading = useSelector((state: any) => state.movies.loading)
    const dispatch = useDispatch()
    useEffect(() => {
        if (!movies)
            dispatch(actionTypes.fetchMovies());
    }, [dispatch, movies])

    return (
        <div className="home">
            <div className="home__header">

            </div>

            <div className="home__genres">
                {loading ? <Loader /> :
                    <div className="container">
                        {
                            genres?.map((gen: any, index: any) =>
                                <div key={index}>
                                    <GenresList genres={gen} movies={movies} />
                                </div>)
                        }
                    </div>}
            </div>
        </div>
    )
}
export default React.memo(Home)





