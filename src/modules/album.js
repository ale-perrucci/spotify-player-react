//Actions

const LOAD_INFO_REQUEST = 'album/LOAD_INFO_REQUEST';
const LOAD_INFO_SUCCESS = 'album/LOAD_INFO_SUCCESS';
const LOAD_INFO_FAILED = 'album/LOAD_INFO_FAILED';
const LOAD_TRACKS_REQUEST = 'album/LOAD_TRACKS_REQUEST';
const LOAD_TRACKS_SUCCESS = 'album/LOAD_TRACKS_SUCCESS';
const LOAD_TRACKS_FAILED = 'album/LOAD_TRACKS_FAILED';


//Reducer

const initialState = {loading:false, album:{}, errorMessage:''};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_INFO_REQUEST:
      return {...state, loading: true, errorMessage:''};
    case LOAD_INFO_SUCCESS:
      return {...state, loading: false, album: action.payload, errorMessage:''};
    case LOAD_INFO_FAILED:
      return {...state, loading: false, album: {}, errorMessage: action.payload};
    case LOAD_TRACKS_REQUEST:
      return {...state, loading: true, errorMessage:''};
    case LOAD_TRACKS_SUCCESS:
      return {...state, loading: false, tracks: action.payload.tracks};
    case LOAD_TRACKS_FAILED:
      return {...state, loading: false, errorMessage: action.payload};
    default:
      return state;
  }
}


//Action creators

export function loadInfoRequest(id) {
  return { type: LOAD_INFO_REQUEST, payload: id }
}

export function loadInfoSuccess(album) {
  return { type: LOAD_INFO_SUCCESS, payload: album }
}

export function loadInfoFailed(error) {
  return { type: LOAD_INFO_FAILED, payload: error }
}

export function loadTracksRequest(id) {
  return { type: LOAD_TRACKS_REQUEST, payload: id }
}

export function loadTracksSuccess(album) {
  return { type: LOAD_TRACKS_SUCCESS, payload: album }
}

export function loadTracksFailed(error) {
  return { type: LOAD_TRACKS_FAILED, payload: error }
}



export function loadInfo(albumId) {
  return function(dispatch) {
    dispatch(loadInfoRequest(albumId));
    fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }
    })
    .then(response => {
      if (response.status === 200)
      {
        response.json().then(album => dispatch(loadInfoSuccess(album)));
      }  
      else
        dispatch(loadInfoFailed(response.message));
    })
    .catch((error) => {
      dispatch(loadInfoFailed(error));
    });
  }
}

export function loadTracks(albumId) {
  return function(dispatch) {
    dispatch(loadTracksRequest(albumId));
    fetch(`https://api.spotify.com/v1/albums/${albumId}/tracks`, {
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }
    })
    .then(response => {
      if (response.status === 200)
      {
        response.json().then(tracks => dispatch(loadTracksSuccess(tracks)));
      }  
      else
        dispatch(loadTracksFailed(response.message));
    })
    .catch((error) => {
      dispatch(loadTracksFailed(error));
    });
  }
}
