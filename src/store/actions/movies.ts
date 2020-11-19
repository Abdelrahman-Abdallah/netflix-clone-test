import * as actionTypes from "./actionTypes";
import { fireStore } from "../../firebase";

export const fetchMovies = () => {
  //async code
  return (dispatch: any) => {
    try {
      dispatch(fetchMoviesLoading());
      let movieList: any[] = [];
      const genresList: any[] = [];
      fireStore
        .collection("movies")
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            const data = doc.data();
            genresList.push(...data.genres);
            movieList.push({ id: doc.id, data: doc.data() });
          });
          const unique = [...new Set(genresList)];
          dispatch(fetchMoviesSuccess([...movieList], [...unique]));
        })
        .catch((err) => {
          console.log(err);
          dispatch(fetchMoviesFail(err));
        });
    } catch (err) {
      console.log(err);
      dispatch(fetchMoviesFail(err));
    }
  };
};
export const fetchMoviesSuccess = (movies: any, genres: any) => {
  return {
    type: actionTypes.FETCH_MOVIES_SUCESS,
    movies: movies,
    genres: genres,
  };
};
export const fetchMoviesFail = (error: any) => {
  return {
    type: actionTypes.FETCH_MOVIES_FAIL,
    error: error,
  };
};
export const fetchMoviesLoading = () => {
  return {
    type: actionTypes.FETCH_MOVIES_LOADING,
  };
};
