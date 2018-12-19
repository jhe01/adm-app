import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { isMobile } from "react-device-detect";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Header from "../../../template/Header";
import Sidenav from "../../../template/Aside";

import { getClubAlbum } from "../../../../actions/clubActions";

import ClubGalleryImage from "./ClubGalleryImage";

class ClubGalleryContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      album: {}
    };

    this.swAlert = withReactContent(Swal);
  }
  componentDidMount() {
    this.props.getClubAlbum(this.props.match.params.albumid);
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.album !== prevProps.album) {
      this.setState({ album: this.props.album });
    }
  }
  render() {
    const { album } = this.state;
    return (
      <React.Fragment>
        <Header branding={`Club Album`} />
        <Sidenav active="club-list" />
        <div className="row" style={{ marginTop: "10px" }}>
          <div className="col s12">
            <Link
              to={`/club/${this.props.match.params.id}`}
              className="btn btn-small grey lighten-5 black-text waves-effect"
            >
              Back
            </Link>
            <div className="card">
              <div className="card-content">
                <span className="card-title">{album.name}</span>
                <div className="row">
                  {album.images
                    ? album.images.map(image => (
                        <ClubGalleryImage image={image} />
                      ))
                    : ""}
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

ClubGalleryContainer.propTypes = {
  getClubAlbum: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  club: state.club.club,
  album: state.club.album
});

export default connect(
  mapStateToProps,
  { getClubAlbum }
)(ClubGalleryContainer);
