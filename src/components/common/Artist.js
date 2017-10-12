import React from "react";
import IconButton from "material-ui/IconButton";
import { Link } from "react-router-dom";

import PlayIcon from "material-ui/svg-icons/av/play-circle-outline";
import PauseIcon from "material-ui/svg-icons/av/pause-circle-outline";

const Artist = ({ artist, play }) => {
  const imgUrl =
    artist.images[0] && artist.images[0].url
      ? artist.images[0].url
      : "https://lh3.googleusercontent.com/UrY7BAZ-XfXGpfkeWg0zCCeo-7ras4DCoRalC_WXXWTK9q5b0Iw7B0YQMsVxZaNB7DM=w300";
  const artistLink = "/artist/" + artist.id;

  return (
    <div className="col s6 m4 l3 xl2" style={{ paddingBottom: "1em" }}>
      <a>
        <div
          style={{ ...styles.divImgStyle, backgroundImage: `url(${imgUrl}` }}
        >
          <IconButton
            className="hoverable"
            style={styles.buttonStyle}
            iconStyle={{ width: "50%", height: "50%", color: "#ffffff" }}
            onClick={play}
          >
            <PlayIcon />
          </IconButton>
        </div>
      </a>
      <Link to={artistLink}>
        <h6 style={styles.artistNameStyle}>{artist.name}</h6>
      </Link>
    </div>
  );
};

const styles = {
  divImgStyle: {
    paddingTop: "100%",
    //backgroundImage: `url(${imgUrl}`,
    borderRadius: "50%",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    position: "relative"
  },
  buttonStyle: {
    width: "100%",
    height: "100%",
    padding: 0,
    position: "absolute",
    zIndex: 5,
    marginLeft: "-50%",
    marginTop: "-100%",
    borderRadius: "50%",
    backgroundColor: "rgba(100,100,100,0.5)"
  },
  artistNameStyle: {
    marginBottom: "1em",
    height: "3em",
    fontSize: "1.2em"
  }
};

export default Artist;
