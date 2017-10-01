import {CLIENT_ID, REDIRECT_URI} from '../constants/auth';

//Actions

const ME_SET = 'ME_SET';
const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';

const TRY_AUTH = 'TRY_AUTH';
const AUTH_SUCCESS = 'AUTH_SUCCESS';
const AUTH_FAILED = 'AUTH_FAILED';


//Reducer

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_ACCESS_TOKEN:
      return {...state, accessToken: action.token};
    case AUTH_SUCCESS:
      return {...state, user: action.payload};
  }
  return state;
}


//Action creators

export function setAccessToken(token) {
  return {
    type: SET_ACCESS_TOKEN,
    token
  }
}

export function tryAuth() {
  return function(dispatch) {
    fetch(`https://api.spotify.com/v1/me`, {
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }
    })
    .then(response => {
      if (response.status === 200)
      {
        response.json().then(user => dispatch({type: AUTH_SUCCESS, payload: user}));
      }  
      else if (response.status === 401)
        getAccessToken();
      else
        dispatch({type: AUTH_FAILED, payload: response.message});
    })
    .catch((error) => {
      dispatch({
        type: AUTH_FAILED,
        payload: error
      });
    });
  }
}

function getAccessToken()
{
  window.location.assign(`https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=user-read-private%20user-read-email&response_type=token&state=123`)
}




