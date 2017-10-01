import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from '../modules/auth';
import artist from '../modules/artist';
import album from '../modules/album';
import search from '../modules/search';
import player from '../modules/player';



export default combineReducers({
  routing: routerReducer,
  auth,
  artist,
  album,
  search,
  player
});