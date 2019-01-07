import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { deeteClubAlbumImage } from "../../../../actions/clubActions";

class ClubGalleryImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: this.props.image,
      album_id: this.props.albumId
    };

    this.swAlert = withReactContent(Swal);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.image !== prevProps.image) {
      this.setState({ image: this.props.image });
    }
  }

  onClickDeleteAlbumImage = () => {
    this.swAlert
      .fire({
        title: (
          <div>
            <h5>Are you sure?</h5>
            <p>Image will be deleted permanently!</p>
          </div>
        ),
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        confirmButtonClass: "blue darken-2"
      })
      .then(result => {
        if (result.value) {
          this.props.deeteClubAlbumImage(this.state.image, this.state.album_id);
        }
      });
  };
  render() {
    const { image } = this.state;
    return (
      <div className="card">
        <div className="card-image">
          <img
            src={`/api/upload/image/${image.filename}`}
            alt={image.originialname}
            className="responsive-img"
          />
        </div>
        <button
          className="btn-floating halfway-fab waves-effect waves-light red darken-2 action-btn-floating"
          onClick={this.onClickDeleteAlbumImage}
        >
          <i className="material-icons">delete</i>
        </button>
      </div>
    );
  }
}

ClubGalleryImage.propTypes = {
  deeteClubAlbumImage: PropTypes.func.isRequired
};

export default connect(
  null,
  { deeteClubAlbumImage }
)(ClubGalleryImage);
