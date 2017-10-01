import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadInfo, loadTracks } from '../modules/album';
import * as player from '../modules/player';
import Track from './common/Track';


class AlbumPage extends React.Component {

    componentWillMount()
    {
        this.props.loadInfo(this.props.albumId);
        this.props.loadTracks(this.props.albumId);
    }


    play = (id) => {
        //this.props.addTracksAndPlay(this.props.album.tracks.items, id)
    }

    addToQueue = (track) => {
        this.props.addTracksQueue([track])
    }

    render() {
        const {album, tracks} = this.props;
        
        if (!album.name)
            return null;

        const artist = album.artists[0];
        
        const imgUrl = album.images[0] && album.images[0].url ? album.images[0].url : '';

        let number = 1;

        return (
            <div className="container" style={{top:0, marginTop:0, paddingTop:0}}>
                {/* <header className="artist-header" style={{ ...styles.headerStyle, backgroundImage: `url(${imgUrl})`}}>
                    <h1 style={{fontWeight:700, marginTop:0, paddingTop:'50px'}}>{album.name}</h1>
                    {/* <p>{artist.followers.total} FOLLOWERS</p> */}
                

                 <section style={{display: 'flex', alignItems: 'center'}}>
                    <img src={imgUrl} style={styles.coverStyle} />

                    <div>
                        <h1 style={{textAlign:'left'}}>{album.name}</h1>
                        <h3 style={{textAlign:'left'}}>{artist.name}</h3>
                        <p>{album.release_date} - {album.tracks.total} tracks</p>
                    </div>
                 </section>

                <section>
                    <h3>Tracks</h3>
                    <div>
                        {album.tracks.items.map(t => <Track playing={t.id===this.props.idTrackPlaying} key={t.id} track={t} number={number++} play={() => this.play(t.id)} addToQueue={() => this.addToQueue(t)}/>)}
                    </div>
                </section>

            </div>
        );
    }
}

const styles = {
    headerStyle: {
        position: 'relative',
        //backgroundImage: `url(${imgUrl})`,
        alignItems: 'center',
        backgroundSize: 'cover',
        backgroundPosition: 'right 0px top 40%',
        height: '30vh',
    },
    coverStyle: {
        width: 200,
        height: 200,
        margin: 10
    }
}

function mapStateToProps(state, ownProps) {
    const albumId = ownProps.match.params.id;
    const {album} = state.album;
    const idTrackPlaying = state.player.queue.length > 0 ? state.player.queue[state.player.currentTrack].id : '';

    return {
        albumId,
        album,
        idTrackPlaying
    }
}

export default connect(mapStateToProps, {loadInfo, loadTracks, ...player})(AlbumPage);