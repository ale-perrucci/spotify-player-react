import React from 'react';

class Callback extends React.Component {
  constructor(props) {
    super(props);
    this.getHashParams = this.getHashParams.bind(this);
  }


  componentDidMount()
  {
    const params = this.getHashParams();
    localStorage.setItem('access_token', params.access_token)
    window.location.assign(`http://localhost:3000`);
  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  render() {
    return <div><p>Get access token</p></div>;
  }

}

export default Callback;