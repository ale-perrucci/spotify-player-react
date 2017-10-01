import React from 'react';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreIcon from 'material-ui/svg-icons/navigation/more-horiz';
import PlayIcon from 'material-ui/svg-icons/av/play-arrow';
import PauseIcon from 'material-ui/svg-icons/av/pause';
import {Link} from 'react-router-dom';



const Track = ({ track, number, play, addToQueue, playing }) => {
  
    const formatDuration = (duration) => {
        const minutes = Math.floor(duration / 60000);
        const seconds = ((duration % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    return (
        <div className="row" style={{margin:0}}>
            <div className="col s1">
                <p style={{color: playing ? '#33cc66' : '#ffffff' }}>{number}.</p>
                <IconButton className="hoverable" style={styles.buttonStyle} iconStyle={{color:'#ffffff', width:'80%', height:'80%'}} onClick={play}><PlayIcon/></IconButton>
            </div>
            <div className="col s9">
                <p style={{textAlign: 'left', color: playing ? '#33cc66' : '#ffffff' }}>{track.name}</p>
            </div>
            <div className="col s1">
                <IconMenu 
                    iconButtonElement={<IconButton className="highlightable" iconStyle={{width:'80%', height:'80%'}}><MoreIcon /></IconButton>}
                    anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                >
                    <MenuItem primaryText="Add to queue" onClick={addToQueue} />
                    {track.artist && <MenuItem primaryText="Go to artist" linkButton containerElement={<Link to={`/artist/${track.artist.id}`} />}/>}
                    {track.album && <MenuItem primaryText="Go to album" linkButton containerElement={<Link to={`/album/${track.album.id}`} />}/>}
                </IconMenu>
            </div>
            <div className="col s1">
                <p style={{textAlign: 'right'}}>{formatDuration(track.duration_ms) }</p>
            </div>
        </div>
      
    );
  }

  const styles = {
    buttonStyle: {
        padding:0,
        position:'absolute', 
        zIndex:5, 
        marginLeft:'-24px', 
        marginTop:'-48px',
        backgroundColor:'#222'
    }
  }

  export default Track;