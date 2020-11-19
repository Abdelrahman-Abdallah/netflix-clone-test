import * as actionTypes from "./actionTypes";
import firebase, { fireStore } from "../../firebase";

export const extractmovies = (movies: any[], watchlistIds: any[]) => {
  return watchlistIds.map((id: any) => {
    for (let i = 0; i < movies.length; i++) {
      if (movies[i].id === id) {
        return movies[i];
      }
    }
  });
};

export const fetchWatchList = () => {
  //async code
  return async (dispatch: any, getState: any) => {
    const { movies } = getState();
    dispatch(fetchWatchListLoading());
    const uid = firebase.auth().currentUser?.uid;
    try {
      const watchlistarray = await fireStore
        .collection("watchlist")
        .doc(uid)
        .get();
      const moviesarray = extractmovies(
        movies.movies,
        watchlistarray.data()?.movies
      );
      dispatch(
        fetchWatchListSuccess(watchlistarray.data()?.movies, moviesarray)
      );
    } catch (err) {
      console.log(err);
      dispatch(fetchWatchListFail(err.message));
    }
  };
};
export const fetchWatchListSuccess = (watchlist: any, movies: any[]) => {
  return {
    type: actionTypes.FETCH_WATCHLIST_SUCESS,
    watchlist,
    movies,
  };
};
export const fetchWatchListFail = (error: any) => {
  return {
    type: actionTypes.FETCH_WATCHLIST_FAIL,
    error: error,
  };
};
export const fetchWatchListLoading = () => {
  return {
    type: actionTypes.FETCH_WATCHLIST_LOADING,
  };
};
export const addToWatchList = (movie: any) => {
  return (dispatch: any, getState: any) => {
    const { watchList, movies } = getState();
    dispatch(fetchWatchListLoading());
    const uid = firebase.auth().currentUser?.uid;
    const Allmovies = watchList.watchlist
      ? [...watchList.watchlist, movie.id]
      : [movie.id];
    fireStore
      .collection(`watchlist`)
      .doc(uid)
      .set({ movies: Allmovies }, { merge: true })
      .then(() => {
        const moviesarray = extractmovies(movies.movies, [...Allmovies]);
        dispatch(fetchWatchListSuccess([...Allmovies], [...moviesarray]));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
