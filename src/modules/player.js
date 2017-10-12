//Actions

const PLAY = "player/PLAY";
const PREVIOUS_TRACK = "player/PREVIOUS_TRACK";
const NEXT_TRACK = "player/NEXT_TRACK";
const ADD_TRACKS_QUEUE = "player/ADD_TRACKS_QUEUE";
const ADD_TRACKS_AND_PLAY = "player/ADD_TRACKS_AND_PLAY";
const REMOVE_TRACK_QUEUE = "player/REMOVE_TRACK_QUEUE";
const EMPTY_QUEUE = "player/EMPTY_QUEUE";
const LOAD_TOP_TRACKS_REQUEST = "player/LOAD_TOP_TRACKS_REQUEST";
const LOAD_TOP_TRACKS_FAILED = "player/LOAD_TOP_TRACKS_FAILED";

//Reducer

const initialState = { queue: [], currentTrack: 0 };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case PLAY:
      const index1 = state.queue.findIndex(x => x.id === action.payload);
      return { ...state, currentTrack: index1 };
    case PREVIOUS_TRACK:
      return {
        ...state,
        currentTrack:
          state.currentTrack > 0 ? state.currentTrack - 1 : state.currentTrack
      };
    case NEXT_TRACK:
      return {
        ...state,
        currentTrack:
          state.currentTrack < state.queue.length - 1
            ? state.currentTrack + 1
            : state.currentTrack
      };
    case ADD_TRACKS_QUEUE:
      return { ...state, queue: [...state.queue, ...action.payload] };
    case ADD_TRACKS_AND_PLAY:
      const index2 = action.payload.tracks.findIndex(
        x => x.id === action.payload.id
      );
      return {
        ...state,
        queue: [...action.payload.tracks],
        currentTrack: index2 >= 0 ? index2 : 0
      };
    case EMPTY_QUEUE:
      return initialState;
  }
  return state;
}

//Action creators

export function play(id) {
  return { type: PLAY };
}

export function prevTrack() {
  return { type: PREVIOUS_TRACK };
}

export function nextTrack() {
  return { type: NEXT_TRACK };
}

export function addTracksQueue(tracks) {
  return { type: ADD_TRACKS_QUEUE, payload: tracks };
}

export function addTracksAndPlay(tracks, id) {
  return { type: ADD_TRACKS_AND_PLAY, payload: { tracks, id } };
}

export function emptyQueue() {
  return { type: EMPTY_QUEUE };
}

export function loadTopTracksRequest(id) {
  return { type: LOAD_TOP_TRACKS_REQUEST, payload: id };
}

export function loadTopTracksFailed(error) {
  return { type: LOAD_TOP_TRACKS_FAILED, payload: error };
}

export function loadAndPlayTopTracks(artistId) {
  return function(dispatch) {
    dispatch(loadTopTracksRequest(artistId));
    fetch(
      `https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=IT`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token")
        }
      }
    )
      .then(response => {
        if (response.status === 200) {
          response
            .json()
            .then(tracks => dispatch(addTracksAndPlay(tracks.tracks, null)));
        } else dispatch(loadTopTracksFailed(response.message));
      })
      .catch(error => {
        dispatch(loadTopTracksFailed(error));
      });
  };
}

export function loadAndPlayAlbumTracks(albumId) {
  return function(dispatch) {
    dispatch(loadTopTracksRequest(albumId));
    fetch(`https://api.spotify.com/v1/albums/${albumId}/tracks`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token")
      }
    })
      .then(response => {
        if (response.status === 200) {
          response
            .json()
            .then(tracks => dispatch(addTracksAndPlay(tracks.items, null)));
        } else dispatch(loadTopTracksFailed(response.message));
      })
      .catch(error => {
        dispatch(loadTopTracksFailed(error));
      });
  };
}
