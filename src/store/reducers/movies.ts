import * as actionTypes from "../actions/actionTypes";
const initialState: any = {
  movies: null,
  loading: false,
  error: null,
  genres: null,
};
const movieReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.FETCH_MOVIES_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case actionTypes.FETCH_MOVIES_SUCESS: {
      return {
        ...state,
        loading: false,
        error: null,
        movies: [...action.movies],
        genres: [...action.genres],
      };
    }
    case actionTypes.FETCH_MOVIES_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.error,
        movies: null,
        genres: null,
      };
    }
    default:
      return state;
  }
};
export default movieReducer;
