import * as actionTypes from "../actions/actionTypes";
const initialState = {
  watchlist: null,
  loading: false,
  error: null,
  watchlistMovies: null,
};
const watchListReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.FETCH_WATCHLIST_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case actionTypes.FETCH_WATCHLIST_SUCESS: {
      return {
        ...state,
        loading: false,
        error: null,
        watchlist: action.watchlist,
        watchlistMovies: [...action.movies],
      };
    }
    case actionTypes.FETCH_WATCHLIST_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    default:
      return state;
  }
};
export default watchListReducer;
