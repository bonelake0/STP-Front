import * as ActionType from './ActionTypes';

import * as jwtHelper from './JwtHelper';
import { useHistory } from 'react-router-dom';

export const userPostFetch = user => {
    return dispatch => {
      return fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({user})
      })
        .then(resp => resp.json())
        .then(data => {
          if (data.message) {
            // logic here
          } else {
            localStorage.setItem("token", data.jwt)
            dispatch(loginUser(data.user))
          }
        })
    }
}

// export const userLoginFetch = user => {
//     return dispatch => {
//       return fetch("http://localhost:3000/api/v1/login", {
//         method: "POST",
//         headers: {
//           'Content-Type': 'application/json',
//           Accept: 'application/json',
//         },
//         body: JSON.stringify({user})
//       })
//         .then(resp => resp.json())
//         .then(data => {
//           if (data.message) {
//            // logic here
//           } else {
//             localStorage.setItem("token", data.jwt)
//             dispatch(loginUser(data.user))
//           }
//         })
//     }
// }

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

export const userLoginFetch = user => (dispatch) => {

    if (jwtHelper.validateUserLogin(user)) {
      console.log('User validated');
      var data = jwtHelper.getToken(user);
      localStorage.setItem('token', data.token);
      return dispatch(setUser(data.user));
    } else {
      return dispatch(userFailed('User credentials denied'))
    }

} // temp until backend is present

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

const baseUrl = 'http://localhost:3000/';

export const fetchPlacards = (pageNo) => (dispatch) => {
  console.log('Now loading brower page: ' + pageNo)
  dispatch(placardsLoading(true));

  // return fetch(baseUrl + 'placards/' + pageNo)
  // .then(response => {
  //         if (response.ok) {
  //           return response;
  //         } else {
  //           var error = new Error('Error ' + response.status + ':' + response.statusText);
  //           error.response = response;
  //           throw error;
  //         }
  //       },
  //       error => {
  //         var errMess = new Error(error.message);
  //         throw errMess;
  //       })
  // .then(response => response.json())
  // .then(placards => dispatch(updatePlacards(placards)))
  // .catch(error => dispatch(placardsFailed(error.message)));
};

const placardsLoading = () => ({
  type: ActionType.PLACARDS_LAODING,
});

const placardsFailed = (errMess) => ({
  type: ActionType.PLACARDS_FAILED,
  payload: errMess
});

const updatePlacards = (placards) => ({
  type: ActionType.UPDATE_PLACARDS,
  payload: placards
});