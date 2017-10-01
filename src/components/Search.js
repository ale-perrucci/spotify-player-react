import React, { Component } from 'react';
import { connect } from 'react-redux';
import {search} from '../modules/search';
import TextField from 'material-ui/TextField';
import { withRouter } from 'react-router';
import Artist from './common/Artist';
import Album from './common/Album';

import PlayIcon from 'material-ui/svg-icons/av/play-circle-outline';
import PauseIcon from 'material-ui/svg-icons/av/pause-circle-outline';



class Search extends Component {
  componentWillMount() {
    this.props.search(this.props.text);
  }

  handleChange = (event) => {
    this.props.history.push('/search/' + event.target.value)
  };

  search = text => {
    this.props.search(text);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.text !== nextProps.text)
      this.search(nextProps.text);
  }

  render() {
    return (
      <div>
        
          <h2>Search</h2>
          
          <TextField
              hintText="Type an artist"
              floatingLabelText="Search" 
              value={this.props.text}
              onChange={this.handleChange}
              style={{marginBottom:'2em'}}/>

          <h3>Artists</h3>
          <div className="container">
            {this.props.artists &&
                <div className="row">
                  {this.props.artists.map(a => <Artist key={a.id} artist={a}/>)}
                </div>
            }

          <h3>Albums</h3>
            {this.props.albums &&
                <div className="row">
                  {this.props.albums.map(a => <Album key={a.id} album={a}/>)}
                </div>
            }
          </div>
      </div>
    );
  }s
}

function mapStateToProps(state, ownProps) {
  return {
    artists: state.search.artists,
    albums: state.search.albums,
    text: ownProps.match.params.text || ''
  };
}

export default connect(mapStateToProps, {search})(withRouter(Search));
