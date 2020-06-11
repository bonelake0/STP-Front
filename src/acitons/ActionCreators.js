import * as ActionType from './ActionTypes';

import * as jwtHelper from './JwtHelper';
import { useHistory } from 'react-router-dom';

import { сonfig } from '../config';

export const userPostFetch = (regForm) => {
    console.log(JSON.stringify({
      login: regForm.login,
      password: regForm.password,
      confirmPassword: regForm.confirmPassword,
      email: regForm.email,
    }));
    return dispatch => {
      return fetch(сonfig.baseUrl + '/api/Account', {
        method: "POST",
        headers: {
          'content-type': 'application/json',
          'accept': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          login: regForm.login,
          password: regForm.password,
          confirmPassword: regForm.confirmPassword,
          email: regForm.email,
        })
      })
        .then(response => {
          if (response.ok && response.successful) {
            console.log('Account created');
            // redierect
          } else {
            var error = new Error('Error' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
          }
        })
        .then(
          //redirect here?
        )
        .catch(error => {
          console.log('Registration failed', error.message);
          alert('Something went wrong...\nErorr: ' + error.message);
        })
    }
}

export const userLoginFetch = user => {
    return dispatch => {
      return fetch(сonfig.baseUrl + '/api/Login', {
        method: "POST",
        headers: {
          'content-type': 'application/json',
          'accept': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          login: user.username,
          password: user.password
        })
      })
      .then(response => response.json())
      .then(responseData => {
        if (responseData.successful) {
          return(responseData)
        } else {
          var error = new Error('Error' + ':' + responseData.status);
          error.response = responseData;
          throw error;
        }
      })
        .then(data => {
          if (data.successful) {
            localStorage.setItem("token", data.token)
            dispatch(loginUser(data))
          } else {
            dispatch(userFailed)
          }
        })
        .catch(error => {
          console.log('Registration failed', error);
          alert('Something went wrong...\nErorr: ' + error.message);
          dispatch(userFailed);
        })
    }
}

// export const getProfileFetch = () => {
//   return dispatch => {
//       const token = localStorage.token;
//       if (token) {
//         return fetch("http://localhost:3000/api/v1/profile", {
//             method: "GET",
//             headers: {
//             'Content-Type': 'application/json',
//             Accept: 'application/json',
//             'Authorization': `Bearer ${token}`
//             }
//       })
//         .then(resp => resp.json())
//         .then(data => {
//             if (data.message) {
//                 // error if token has expired
//                 localStorage.removeItem("token")
//             } else {
//                 dispatch(loginUser(data.user))
//             }
//         })
//       }
//   }
// }

// export const userLoginFetch = user => (dispatch) => {

//     if (jwtHelper.validateUserLogin(user)) {
//       console.log('User validated');
//       var data = jwtHelper.getToken(user);
//       localStorage.setItem('token', data.token);
//       return dispatch(setUser(data.user));
//     } else {
//       return dispatch(userFailed('User credentials denied'))
//     }

// } // temp until backend is present

export const getProfileFetch = () => (dispatch) => {
  const localToken = localStorage.getItem('token');
  if (localToken) {
    console.log('Token is present');
    const response = jwtHelper.verifyToken(localToken);
    console.log(response);
    if (response.error) {
      console.log(response.message);
      console.log(response.error.message);
      localStorage.removeItem('token');
    } else {
      console.log('Token validated');
      return dispatch(setUser(response.user));
    }
  } else {
    console.log('Token is not present');
  }
} // temp until backend is present
  
const loginUser = user => ({
    type: ActionType.LOGIN_USER,
    payload: user,
})

const setUser = user => ({
  type: ActionType.SET_USER,
  payload: user,
})

const userFailed = errMess => ({
  type: ActionType.USER_FAILED,
  payload: errMess,
})

export const fetchPlacards = (pageNo) => (dispatch) => {
  console.log('Now loading brower page: ' + pageNo)
  dispatch(placardsLoading(true));

  var url = new URL(сonfig.baseUrl  + '/api/Placard/all');

  var params = {page: pageNo};

  url.search = new URLSearchParams(params).toString();

  console.log(url);

  return fetch(url, {
    method: "GET",
    headers: {
      'content-type': 'application/json',
      'accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'page': pageNo,
    },
  })
  .then(response => response.json())
  .then(responseData => {
          console.log(responseData);
          return responseData;
        },
        error => {
          var errMess = new Error(error.message);
          throw errMess;
        })
  .then(placards => dispatch(updatePlacards(placards)))
  .catch(error => {
    console.log(error);
  });
};

const placardsLoading = () => ({
  type: ActionType.PLACARDS_LOADING,
});

const placardsFailed = (errMess) => ({
  type: ActionType.PLACARDS_FAILED,
  payload: errMess
});

const updatePlacards = (placards) => ({
  type: ActionType.UPDATE_PLACARDS,
  payload: placards
});