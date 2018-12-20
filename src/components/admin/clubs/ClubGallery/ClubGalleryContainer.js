import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { isMobile } from "react-device-detect";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Header from "../../../template/Header";
import Sidenav from "../../../template/Aside";

import {
  getClubAlbum,
  uploadClubAlbumImage
} from "../../../../actions/clubActions";

import ClubGalleryImage from "./ClubGalleryImage";

class ClubGalleryContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      album: {},
      filesToUpload: []
    };

    this.swAlert = withReactContent(Swal);
  }
  componentDidMount() {
    this.props.getClubAlbum(this.props.match.params.albumid);
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.album !== this.props.album) {
      this.setState({
        ...this.state.album,
        album: this.props.album
      });
    }
  }
  onFileInputChange = e => {
    this.setState({ filesToUpload: e.target.files });
  };
  onClickAddAlbumImage = () => {
    this.swAlert
      .fire({
        title: "Select Image",
        html: (
          <input
            type="file"
            className="swal2-file"
            accept="image/*"
            onChange={this.onFileInputChange}
            multiple
          />
        )
      })
      .then(result => {
        if (result.value) {
          const upload = {};
          if (this.state.filesToUpload) {
            upload.id = this.state.album._id;
            upload.files = this.state.filesToUpload;
            this.props.uploadClubAlbumImage(upload);
          }
        }
      });
  };
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
            <button
              className="btn btn-small blue darken-2 waves-effect action-btn"
              style={{ marginLeft: "5px" }}
              onClick={this.onClickAddAlbumImage}
            >
              <i className="material-icons">file_upload</i>
            </button>
            <div className="card">
              <div className="card-content">
                <span className="card-title">{album.name}</span>
                <div className="row">
                  <div className="col s12 cards-container">
                    {album.images
                      ? album.images.map(image => (
                          <ClubGalleryImage image={image} albumId={album._id} />
                        ))
                      : ""}
                  </div>
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
  getClubAlbum: PropTypes.func.isRequired,
  uploadClubAlbumImage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  club: state.club.club,
  album: state.club.album
});

export default connect(
  mapStateToProps,
  { getClubAlbum, uploadClubAlbumImage }
)(ClubGalleryContainer);
