import * as actionTypes from "./actionTypes";
import firebase from "../../firebase";
export const authstart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};
export const authSuccess = (userId: any) => {
  return {
    type: actionTypes.AUTH_START_SUCCESS,
    userId,
  };
};
export const authFail = (error: any) => {
  return {
    type: actionTypes.AUTH_START_FAIL,
    error: error,
  };
};
export const authLogout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};
export const auth = (email: string, password: string, newRegister: boolean) => {
  return async (dispatch: any) => {
    //get firebase code here
    dispatch(authLoading());
    if (newRegister) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((value) => {
          console.log(value);
          dispatch(authSuccess(value.user?.uid));
        })
        .catch((err) => dispatch(authFail(err.message)));
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((data) => {
          console.log(data.user?.uid);
          dispatch(authSuccess(data.user?.uid));
        })
        .catch((error) => {
          console.log(error);
          dispatch(authFail(error.message));
        });
    }
  };
};
export const authLoading = () => {
  return {
    type: actionTypes.AUTH_LOADING,
  };
};

export const checkauth = () => {
  return (dispatch: any) => {
    if (firebase.auth().currentUser) {
      dispatch(authSuccess(firebase.auth().currentUser?.uid));
    }
  };
};

export const logout = () => {
  return async (dispatch: any) => {
    try {
      await firebase.auth().signOut();
      dispatch(authLogout());
    } catch (e) {
      console.log(e);
    }
  };
};
