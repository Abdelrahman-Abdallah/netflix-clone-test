import * as actionTypes from "../actions/actionTypes";
const initialState = {
  authenticated: false,
  error: null,
  loading: false,
  userId: null,
};
const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        authenticated: false,
        error: null,
        loading: false,
        userId: null,
      };
    case actionTypes.AUTH_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.AUTH_START_SUCCESS:
      return {
        ...state,
        authenticated: true,
        error: null,
        loading: false,
        userId: action.userId,
      };
    case actionTypes.AUTH_START_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
        authenticated: false,
      };
    case actionTypes.AUTH_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default authReducer;
