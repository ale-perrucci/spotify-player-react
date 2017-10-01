import React from 'react';
import IconButton from 'material-ui/IconButton';
import {Link} from 'react-router-dom';

import PlayIcon from 'material-ui/svg-icons/av/play-circle-outline';
import PauseIcon from 'material-ui/svg-icons/av/pause-circle-outline';


const Album = ({ album, play }) => {
  const imgUrl = album.images[0] && album.images[0].url ? album.images[0].url : "https://lh3.googleusercontent.com/UrY7BAZ-XfXGpfkeWg0zCCeo-7ras4DCoRalC_WXXWTK9q5b0Iw7B0YQMsVxZaNB7DM=w300";
  const albumLink = '/album/' + album.id;
  const artistLink = '/artist/' + album.artists[0].id;

  return (
    <div className="col s6 m4 l3 xl2" style={{paddingBottom:'1em'}} >
      <a>
        <div style={{ ...styles.divImgStyle, backgroundImage: `url(${imgUrl}` }}>
          <IconButton className="hoverable" style={styles.buttonStyle} iconStyle={styles.iconStyle}><PlayIcon/></IconButton>
        </div>
      </a>
      <div style={styles.nameStyle}>
      <Link to={albumLink}><h6 style={{fontSize:'1.2em'}}>{album.name}</h6></Link>
      <Link to={artistLink}><p style={{margin:0}}>{album.artists[0].name}</p></Link>
      </div >
      
    </div>
  );
}


const styles = {
  divImgStyle: {
    paddingTop: '100%', 
    //backgroundImage: `url(${imgUrl}`, 
    backgroundPosition: 'center center', 
    backgroundSize: 'cover',
    position:'relative'
  },
  buttonStyle: {
    width:'100%', 
    height:'100%', 
    padding:0, 
    position:'absolute', 
    zIndex:5, 
    marginLeft:'-50%', 
    marginTop:'-100%',
    backgroundColor:'rgba(100,100,100,0.5)',
  },
  nameStyle: {
    marginBottom:'1em', 
    height: '5em',
  },
  iconStyle: {
    width:'50%', 
    height:'50%', 
    color:'#ffffff'
  }
};

export default Album;
