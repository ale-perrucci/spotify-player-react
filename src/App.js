import React, { Component } from 'react';
import { Route } from 'react-router'
import { Switch, Link } from 'react-router-dom'
import { connect } from 'react-redux';
// import logo from './logo.svg';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';
import ListItem from 'material-ui/List/ListItem';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import Search from './components/Search';
import AlbumPage from './components/AlbumPage';
import ArtistPage from './components/ArtistPage';
import Player from './components/Player';
import Callback from './components/Callback';

import './App.css';
import './styles/materialize-grid.css';
import './styles/materialize-text.css'


const UserAvatar = (props) => {
  if (props.user == null)
    return null;

  const {user} = props;
  return (
    // <ListItem
    //   disabled={true}
    //   leftAvatar={
        <Avatar
          src={user.images[0].url}
          size={30}
          style={{margin:10}}
        />
    //   }
    // >
      
    // </ListItem>
    //* {user.display_name} */}
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {openMenu: false};
  }

  handleToggle = () => this.setState({openMenu: !this.state.openMenu});

  handleClose = () => this.setState({openMenu: false});

  render() {

    let user = null;
    if (this.props.user !== undefined)
      user = this.props.user;

    return (
      <div className="App" >
        <AppBar title="Spotify player" iconElementRight={<UserAvatar user={user}/> } onLeftIconButtonTouchTap={() => this.handleToggle()}/>

        <Drawer
          docked={false}
          open={this.state.openMenu}
          onRequestChange={(open) => this.setState({openMenu:open})} >
          <AppBar showMenuIconButton={false} iconElementRight={<IconButton><ArrowBack /></IconButton>} onRightIconButtonTouchTap={() => this.handleClose()}/>
          <MenuItem onTouchTap={this.handleClose}><Link to='/search'>Search</Link></MenuItem>
          {/* <MenuItem onTouchTap={this.handleClose}>Menu Item 2</MenuItem> */}
        </Drawer>

        <div style={{paddingBottom:'100px'}}>
          <Switch>
            <Route path="/callback" component={Callback}/>
            <Route path="/album/:id" component={AlbumPage}/>
            <Route path="/artist/:id" component={ArtistPage}/>
            <Route path="/search/:text" component={Search}/>
            <Route path="/" component={Search}/>
          </Switch>
        </div>

        <Player/>
      </div>
    );
  }
}


function mapStateToProps(state, ownProps) {
  return {
    user: state.auth.user
  };
}

// function mapDispatchToProps(dispatch) {
//   return {
//     actions: bindActionCreators(actions, dispatch)
//   };
// }

export default connect(mapStateToProps)(App);
