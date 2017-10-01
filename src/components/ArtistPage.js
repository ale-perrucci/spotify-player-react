import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadInfo, loadTopTracks } from '../modules/artist';
import * as player from '../modules/player';
import Track from './common/Track';


class ArtistPage extends React.Component {

    componentWillMount()
    {
        this.props.loadInfo(this.props.artistId);
        this.props.loadTopTracks(this.props.artistId);
    }

    play = (id) => {
        this.props.addTracksAndPlay(this.props.topTracks, id)
    }

    addToQueue = (track) => {
        this.props.addTracksQueue([track])
    }

    render() {
        const {artist, topTracks} = this.props;
        
        if (!artist.name)
            return null;

        const imgUrl = artist.images[0] && artist.images[0].url ? artist.images[0].url : '';

        let topTrackNumber = 1;

        return (
            <div style={{top:0, paddingTop:0}}>
                <header className="artist-header" style={{ ...styles.headerStyle, backgroundImage: `url(${imgUrl})`}}>
                    <h1 style={{fontWeight:700, marginTop:0, paddingTop:'50px'}}>{artist.name}</h1>
                    <p>{artist.followers.total} FOLLOWERS</p>
                </header>

                <section>
                    <h3>Top tracks</h3>
                    <div className="container">
                        {topTracks.map(t => 
                        <Track playing={t.id===this.props.idTrackPlaying} key={t.id} track={t} number={topTrackNumber++} 
                            play={() => this.play(t.id)} addToQueue={() => this.addToQueue(t)}
                        />)}
                    </div>
                </section>

                <section>
                    <h3>Albums</h3>
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
    }
}

function mapStateToProps(state, ownProps) {
    const artistId = ownProps.match.params.id;
    const {info, topTracks} = state.artist;
    const idTrackPlaying = state.player.queue.length > 0 ? state.player.queue[state.player.currentTrack].id : '';

    return {
        artistId,
        artist:info,
        topTracks,
        idTrackPlaying
    }
}

export default connect(mapStateToProps, { loadInfo, loadTopTracks, ...player })(ArtistPage);