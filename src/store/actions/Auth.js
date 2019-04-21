import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error:error
  };
};

export const authLogout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const checkTimeOut = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(authLogout());
    }, expirationTime * 1000);
  };
};

export const auth = (email,password,isSignup) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email:email,
      password:password,
      returnSecureTokan: true
    }
    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBXEGKE8rK2Epk4k-puJJ8WPy69XHvrxUI'
    if(!isSignup){
      url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBXEGKE8rK2Epk4k-puJJ8WPy69XHvrxUI'
    }
    axios.post(url, authData)
          .then(response => {
            console.log(response)
            dispatch(authSuccess(response.data.idToken, response.data.localId))
            dispatch(checkTimeOut(response.data.expiresIn))
          })
          .catch(err =>{
            dispatch(authFail(err.response.data.error))
          })
  }

}


