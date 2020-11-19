import React, { Component, useEffect, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/shared/loaders/SpinLoader'
import MoviesSort from '../../components/MovieSort/MoviesSort';
import ItemNotFound from '../../components/ui/itemNotFound';
import * as actionTypes from '../../store/actions';
import "./WatchList.scss"

const WatchList = ({ error, }: any) => {
    const watchListMovies = useSelector((state: any) => state.watchList.watchlistMovies)
    const auth = useSelector((state: any) => state.auth.authenticated);
    const watchlist = useSelector((state: any) => state.watchList.watchlist);
    const loading = useSelector((state: any) => state.watchList.loading);
    const dispatch = useDispatch();
    useEffect(() => {
        if (watchlist == null) {
            dispatch(actionTypes.fetchWatchList())
        }
    }, [watchlist, dispatch])
    const rendermovie = () => {

        if (watchlist == null && loading) return <Loader />;
        else if (watchlist == null && !loading) return <ItemNotFound />
        else if (watchlist) return <MoviesSort path="/watchlist" title="watch list" renderMovies={watchListMovies} />
    }
    return (
        <div className="watchlist container">
            {/* {(watchlist == null && loading) ? <Loader /> : <div>is seems that there is movies here</div>} */}
            {rendermovie()}
        </div>
    )
}




export default WatchList
