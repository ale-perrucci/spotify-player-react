//Actions

const LOAD_INFO_REQUEST = 'artist/LOAD_INFO_REQUEST';
const LOAD_INFO_SUCCESS = 'artist/LOAD_INFO_SUCCESS';
const LOAD_INFO_FAILED = 'artist/LOAD_INFO_FAILED';
//const SELECT = 'artist/SELECT';

const LOAD_TOP_TRACKS_REQUEST = 'artist/LOAD_TOP_TRACKS_REQUEST';
const LOAD_TOP_TRACKS_SUCCESS = 'artist/LOAD_TOP_TRACKS_SUCCESS';
const LOAD_TOP_TRACKS_FAILED = 'artist/LOAD_TOP_TRACKS_FAILED';

//Reducer

const initialState = {loading:false, info:{}, topTracks:[], albums:[], errorMessage:''};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_INFO_REQUEST:
      return {...state, loading: true, info:{}, topTracks:[], albums:[], errorMessage:''};
    case LOAD_INFO_SUCCESS:
      return {...state, loading: false, info: action.payload};
    case LOAD_INFO_FAILED:
      return {...state, loading: false, errorMessage: action.payload};
    // case SELECT:
    //   return {...state, info: Object.assign({}, action.payload)};
    case LOAD_TOP_TRACKS_REQUEST:
      return {...state, loading: true, errorMessage:''};
    case LOAD_TOP_TRACKS_SUCCESS:
      return {...state, loading: false, topTracks: action.payload.tracks};
    case LOAD_TOP_TRACKS_FAILED:
      return {...state, loading: false, errorMessage: action.payload};
    default:
      return state;
  }
}


//Action creators

export function loadInfoRequest(id) {
  return { type: LOAD_INFO_REQUEST, payload: id }
}

export function loadInfoSuccess(artist) {
  return { type: LOAD_INFO_SUCCESS, payload: artist }
}

export function loadInfoFailed(error) {
  return { type: LOAD_INFO_FAILED, payload: error }
}


// export function selectArtist(artist) {
//   return { type: SELECT, payload: artist }
// }


export function loadTopTracksRequest(id) {
  return { type: LOAD_TOP_TRACKS_REQUEST, payload: id }
}

export function loadTopTracksSuccess(tracks) {
  return { type: LOAD_TOP_TRACKS_SUCCESS, payload: tracks }
}

export function loadTopTracksFailed(error) {
  return { type: LOAD_TOP_TRACKS_FAILED, payload: error }
}


export function loadInfo(artistId) {
  return function(dispatch) {
    dispatch(loadInfoRequest(artistId));
    fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }
    })
    .then(response => {
      if (response.status === 200)
      {
        response.json().then(artist => dispatch(loadInfoSuccess(artist)));
      }  
      else
        dispatch(loadInfoFailed(response.message));
    })
    .catch((error) => {
      dispatch(loadInfoFailed(error));
    });
  }
}

// export function select(artist) {
//   return function(dispatch) {
//     dispatch(selectArtist(artist));
//   }
// }


export function loadTopTracks(artistId) {
  return function(dispatch) {
    dispatch(loadTopTracksRequest(artistId));
    fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=IT`, {
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }
    })
    .then(response => {
      if (response.status === 200)
      {
        response.json().then(tracks => dispatch(loadTopTracksSuccess(tracks)));
      }  
      else
        dispatch(loadTopTracksFailed(response.message));
    })
    .catch((error) => {
      dispatch(loadTopTracksFailed(error));
    });
  }
}