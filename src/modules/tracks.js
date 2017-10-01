//Actions

const LOAD_POPULAR = 'tracks/LOAD_POPULAR';
const LOAD_POPULAR_SUCCESS = 'tracks/LOAD_POPULAR_SUCCESS';
const LOAD_POPULAR_FAILED = 'tracks/LOAD_POPULAR_FAILED';

//Reducer

const initialState = {loading:false, artist:{}, errorMessage:''};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD:
      return {...state, loading: true, errorMessage:''};
    case LOAD_SUCCESS:
      return {...state, loading: false, artist: action.payload, errorMessage:''};
    case LOAD_FAILED:
      return {...state, loading: false, artist: {}, errorMessage: action.payload};
  }
  return state;
}


//Action creators

export function loadArtist(id) {
  return { type: LOAD, payload: id }
}

export function loadSuccess(artist) {
  return { type: LOAD_SUCCESS, payload: artist }
}

export function loadFailed(error) {
  return { type: LOAD_FAILED, payload: error }
}


export function load(artistId) {
  return function(dispatch) {
    dispatch(loadArtist(artistId));
    fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }
    })
    .then(response => {
      if (response.status == 200)
      {
        response.json().then(artist => dispatch(loadSuccess(artist)));
      }  
      else
        dispatch(loadFailed(response.message));
    })
    .catch((error) => {
      dispatch(loadFailed(error));
    });
  }
}