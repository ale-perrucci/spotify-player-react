import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import * as player from '../modules/player';
//import {select} from '../modules/artist';

import Slider from 'material-ui/Slider';
import IconButton from 'material-ui/IconButton';
import PlayIcon from 'material-ui/svg-icons/av/play-arrow';
import PauseIcon from 'material-ui/svg-icons/av/pause';
import PrevIcon from 'material-ui/svg-icons/av/skip-previous';
import NextIcon from 'material-ui/svg-icons/av/skip-next';

import VolumeMuteIcon from 'material-ui/svg-icons/av/volume-mute';
import VolumeUpIcon from 'material-ui/svg-icons/av/volume-up';

import '../styles/player.css'


let audio;


class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        playing: false,
        currentTime: 0,
        volume: 1
    };

    
  }


  componentDidMount() {
    audio = document.getElementById('player');
  }

  componentWillReceiveProps(nextProps) {
    if (audio && nextProps.player.queue[nextProps.player.currentTrack]) {
      audio.play();
      this.setState({playing:true, currentTime:0});      
    }
  }

  render() {
    const {player} = this.props;
    const track = player.queue.length > 0 && player.queue[player.currentTrack];
    const imgUrl = track && track.album.images[0] && track.album.images[0].url ? track.album.images[0].url : "https://lh3.googleusercontent.com/UrY7BAZ-XfXGpfkeWg0zCCeo-7ras4DCoRalC_WXXWTK9q5b0Iw7B0YQMsVxZaNB7DM=w300";
    

    const play = () => {
      if (track)
      {
        audio.play();
        this.setState({playing:true});
      }

    }

    const pause = () => {
      audio.pause();
      this.setState({playing:false});
    }

    const prevTrack = () => {
      this.props.actions.prevTrack();
    }

    const nextTrack = () => {
      this.props.actions.nextTrack();
    }

    const setCurrentTime = (evt, value) => {
      this.setState({currentTime:value});
      audio.currentTime = value;
    }

    const currentTimeUpdate = (evt) => {
      this.setState({currentTime:audio.currentTime});
    }

    const setVolume = (evt, value) => {
      this.setState({volume:value});
      audio.volume = value;
    }

    const setVolumeValue = (value) => {
      this.setState({volume:value});
      audio.volume = value;
    }

    return (
      <div className="player-container">
        <div className="player-left">
          {track && <img style={{width: '80px', height:'80px', margin:'10px'}} src={imgUrl}/>}
          {track &&
            <div>
              <h5 style={{textAlign:'left'}}>{track.name}</h5>
              {track.artists.map(artist => <Link key={artist.id} to={'/artist/' + artist.id}><p>{artist.name}</p></Link>)}
            </div>
          }
        </div>
        <div className="player-center">
          <div className="buttons-container">
            <IconButton className="highlightable" style={styles.buttonStyle} iconStyle={styles.buttonIconStyle} onClick={prevTrack}><PrevIcon/></IconButton>
            {this.state.playing ?
              <IconButton className="highlightable" style={styles.buttonBigStyle} iconStyle={styles.buttonIconStyle} onClick={pause}><PauseIcon/></IconButton>
              : <IconButton className="highlightable" style={styles.buttonBigStyle} iconStyle={styles.buttonIconStyle} onClick={play}><PlayIcon/></IconButton>
            }
            <IconButton className="highlightable" style={styles.buttonStyle} iconStyle={styles.buttonIconStyle} onClick={nextTrack}><NextIcon/></IconButton>
          </div>
          <Slider sliderStyle={styles.trackSliderStyle} min={0} max={30} step={0.05} value={this.state.currentTime} onChange={setCurrentTime}/>
        </div>
        <div className="player-right">
          <IconButton className="highlightable" style={styles.volumeButtonStyle} iconStyle={styles.buttonIconStyle} onClick={()=>setVolumeValue(0)}><VolumeMuteIcon /></IconButton>
          <Slider style={{width:'50%', margin:'10px'}} sliderStyle={styles.volumeSliderStyle} min={0} max={1} step={0.05} value={this.state.volume} onChange={setVolume}/>
          <IconButton className="highlightable" style={styles.volumeButtonStyle} iconStyle={styles.buttonIconStyle} onClick={()=>setVolumeValue(1)}><VolumeUpIcon /></IconButton>
        </div>


        <audio id="player" autoPlay preload="auto" src={track.preview_url} onTimeUpdate={currentTimeUpdate} onEnded={nextTrack}/>
            
        
      </div>
    );
  }

}

const styles = {
  buttonStyle: {
    width:'45px', 
    height:'45px', 
    padding:0, 
  },
  buttonBigStyle: {
    width:'55px', 
    height:'55px', 
    padding:0, 
  },
  buttonIconStyle: {
    width:'80%', 
    height:'80%', 
    color:'#ffffff'
  },
  trackSliderStyle: {
    marginTop:'10px', 
    marginBottom:'10px'
  },
  volumeButtonStyle: {
    padding:0, 
    width:'32px', 
    height:'32px'
  },
  volumeSliderStyle: {
    marginTop:'0px',
    marginBottom:'0px'
  }
}

function mapStateToProps(state, ownProps) {
  return {
    player: state.player
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(player, dispatch),
    //select: bindActionCreators(select, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);
