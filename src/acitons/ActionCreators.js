import * as ActionType from './ActionTypes';

import * as jwtHelper from './JwtHelper';
import { useHistory } from 'react-router-dom';

import { config } from '../config';
import { actionTypes } from 'react-redux-form';
import history from '../history';

export const userPostFetch = (regForm) => {
    console.log(JSON.stringify({
      login: regForm.login,
      password: regForm.password,
      confirmPassword: regForm.confirmPassword,
      email: regForm.email,
    }));
    return dispatch => {
      return fetch(config.baseUrl + '/api/Account', {
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
        .then(response => response.json())
        .then(responseData => {
          if (responseData.successful) {
            console.log('Account created');
            history.push('/login');
          } else {
            var error = new Error('Error' + responseData.status + ': ' + responseData.statusText);
            error.response = responseData;
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
      return fetch(config.baseUrl + '/api/Login', {
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
            localStorage.setItem("token", data.token);
            localStorage.setItem("userId",data.userId);
            dispatch(loginUser(data));
            history.push('/browse');
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

export const profileInfoFetch = () => {
  return dispatch => {
    dispatch(profileLoading);
    return fetch(config.baseUrl + `/api/User/${localStorage.getItem('userId')}`, {
      method: "GET",
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      dispatch(updateProfile(data));
    })
    // redirect

  }
}

export const putProfileInfoFetch = (formData) => {
  return dispatch => {
    dispatch(profileLoading);
    return fetch(config.baseUrl + `/api/User/${localStorage.getItem('userId')}`, {
      method: "PUT",
      headers: {
        'accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: formData
    })
    .then(response => {
      console.log(response);
      //dispatch profileget
    })

  }
}

export const userTokenCheck = () => (dispatch) => {
  // const localToken = localStorage.getItem('token');
  // if (localToken) {
  //   console.log('Token is present');
  //   const response = jwtHelper.verifyToken(localToken);
  //   console.log(response);
  //   if (response.error) {
  //     console.log(response.message);
  //     console.log(response.error.message);
  //     localStorage.removeItem('token');
  //   } else {
  //     console.log('Token validated');
  //     return dispatch(setUser(response.user));
  //   }
  // } else {
  //   console.log('Token is not present');
  // }
} //rewrite
  
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

  var url = new URL(config.baseUrl  + '/api/Placard/all');

  var params = {page: pageNo};

  url.search = new URLSearchParams(params).toString();

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

export const placardInfoFetch = (cardId) => {
  return dispatch => {
    dispatch(placardLoading);
    console.log('Fetching placard ' + cardId);
    return fetch(config.baseUrl + `/api/Placard/${cardId}`, {
      method: "GET",
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      dispatch(updatePlacard(data));
    })

  }
}

export const deletePlacardFetch = (cardId) => {
  return dispatch => {
    dispatch(placardLoading);
    var url = new URL(config.baseUrl  + '/api/Placard');
    var params = {id: cardId};
    url.search = new URLSearchParams(params).toString();

    console.log('Deleting placard ' + cardId);
    return fetch(url, {
      method: "DELETE",
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    })
    .then(response => {
      console.log(response);
      dispatch(deletePlacard());
    }).then(() =>{
      dispatch(fetchPlacards(1))
    })

  }
}

export const postPlacardFetch = (formData) => {
  return dispatch => {
    dispatch(profileLoading);
    return fetch(config.baseUrl + `/api/Placard/${localStorage.getItem('userId')}`, {
      method: "POST", 
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: formData
    })
    .then(response => {
      console.log(response);
    })
    .then(() =>{
      dispatch(fetchPlacards(1))
    })

  }
}

export const postLikePlacard = (body) => {
  return dispatch => {
    return fetch(config.baseUrl + 'api/support',{
      method: "POST",
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: {
        cardId: body.cardId,
        userId: body.userId,
        liked: true,
      }
    })
  }
}

export const deleteLikePlacard = (body) => {
  return dispatch => {
    var url = new URL(config.baseUrl + 'api/support');
    var params = {userId: body.userId, cardId: body.cardId};
    url.search = new URLSearchParams(params).toString();

    return fetch(url,{
      method: "DELETE",
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    })
  }
}

export const authorInfoFetch = (userId) => {
  return dispatch => {
    dispatch(authorLoading);
    return fetch(config.baseUrl + `/api/User/${userId}`, {
      method: "GET",
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      dispatch(updateAuthor(data));
    })
    // redirect

  }
}

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

const profileLoading = () => ({
  type: ActionType.POFILE_LOADING,
})

const profilefailed = (errMess) => ({
  type: ActionType.PROFILE_FAILED,
  payload: errMess,
})

const updateProfile = (userProfile) => ({
  type: ActionType.UPDATE_PROFILE,
  payload: userProfile,
})

const placardLoading = () => ({
  type: ActionType.UPDATE_PLACARD,
})

const updatePlacard = (placard) => ({
  type: ActionType.UPDATE_PLACARD,
  payload: placard,
})

const cardFailed = () => ({
  type: ActionType.PLACARD_FAILED,
})

const deletePlacard = () => ({
  type: ActionType.DELETE_PLACARD,
})

const authorLoading = () => ({
  type: ActionType.AUTHOR_LOADING,
})

const updateAuthor = (author) => ({
  type: ActionType.UPDATE_AUTHOR,
  payload: author,
})