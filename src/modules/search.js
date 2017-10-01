//Actions

const SEARCH = 'artists/SEARCH';
const SEARCH_SUCCESS = 'artists/SEARCH_SUCCESS';
const SEARCH_FAILED = 'artists/SEARCH_FAILED';


//Reducer

const initialState = {searching:false, artists:[], albums:[], errorMessage:''};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH:
      return {...state, searching: true, errorMessage:''};
    case SEARCH_SUCCESS:
      return {...state, searching: false, artists: action.payload.artists.items, albums: action.payload.albums.items, errorMessage:''};
    case SEARCH_FAILED:
      return {...state, searching: false, errorMessage: action.payload};
  }
  return state;
}


//Action creators

export function searchBegin(text) {
  return { type: SEARCH, payload: text }
}

export function searchSuccess(results) {
  return { type: SEARCH_SUCCESS, payload: results }
}

export function searchFailed(error) {
  return { type: SEARCH_FAILED, payload: error }
}

export function search(text) {
  return function(dispatch) {
    dispatch(searchBegin(text));
    fetch(`https://api.spotify.com/v1/search?q=${text}*&type=artist,album`, {
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }
    })
    .then(response => {
      if (response.status === 200)
      {
        response.json().then(response => dispatch(searchSuccess(response)));
      }  
      else
        dispatch(searchFailed(response.message));
    })
    .catch((error) => {
      dispatch(searchFailed(error));
    });
  }
}

