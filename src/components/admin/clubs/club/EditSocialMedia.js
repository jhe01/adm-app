import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  updateClubSocialMedia,
  deleteClubSocialMedia
} from "../../../../actions/clubActions";

class EditSocialMedia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      social_media_id: this.props.social_media
        ? this.props.social_media._id
        : "",
      name: this.props.social_media
        ? this.props.social_media.social_media_name
        : "",
      value: this.props.social_media
        ? this.props.social_media.social_media_link
        : "",
      social_media: this.props.social_media ? this.props.social_media : {},
      clubId: this.props.clubId ? this.props.clubId : "",
      isEdit: false
    };
  }
  handleOnInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.props.isAdd !== prevProps.isAdd) {
      this.setState({ isAdd: !this.state.isAdd });
    }
  }
  handleOnClickSaveContact = () => {
    const args = {
      clubid: this.state.clubId,
      social_media_id: this.state.social_media_id,
      social_media_name: this.state.name,
      social_media_link: this.state.value
    };

    this.props.updateClubSocialMedia(args);
    this.setState({ isEdit: !this.state.isEdit });
  };

  handleOnClickEditButton = () => {
    this.setState({ isEdit: true });
  };
  handleOnClickDeleteButton = () => {
    const args = {
      clubid: this.state.clubId,
      social_media_id: this.state.social_media_id
    };
    this.props.deleteClubSocialMedia(args);
  };
  handleOnClickCancelButton = () => {
    this.setState({ isEdit: !this.state.isEdit });
  };
  render() {
    const { name, value, isEdit } = this.state;
    const editInput = (
      <div className="row">
        <div className="col s12">
          <button
            className="btn btn-small blue darken-4 action-btn "
            onClick={this.handleOnClickSaveContact}
          >
            SAVE
          </button>
          <button
            className="btn btn-small red darken-4 action-btn "
            onClick={this.handleOnClickCancelButton}
          >
            <i className="material-icons">close</i>
          </button>
        </div>
        <div className="input-field col s12">
          <input
            placeholder="Name ... Ex: Facebook, Twitter"
            name="name"
            type="text"
            value={name}
            onChange={this.handleOnInputChange}
          />
        </div>
        <div className="input-field col s12">
          <input
            placeholder="Link ... Ex: https://www.facebook.com/sample"
            name="value"
            type="text"
            value={value}
            onChange={this.handleOnInputChange}
          />
        </div>
      </div>
    );
    const displayContact = (
      <li className="collection-item">
        {!isEdit ? (
          <div>
            {name}
            <button
              href="#!"
              className="btn-flat secondary-content red-text text-darken-2"
              onClick={this.handleOnClickDeleteButton}
            >
              <i className="material-icons">delete</i>
            </button>
            <button
              href="#!"
              className="btn-flat secondary-content blue-text text-darken-2"
              onClick={this.handleOnClickEditButton}
            >
              <i className="material-icons">edit</i>
            </button>
          </div>
        ) : (
          editInput
        )}
      </li>
    );
    return displayContact;
  }
}

EditSocialMedia.propTypes = {
  updateClubSocialMedia: PropTypes.func.isRequired,
  deleteClubSocialMedia: PropTypes.func.isRequired
};

export default connect(
  null,
  {
    updateClubSocialMedia,
    deleteClubSocialMedia
  }
)(EditSocialMedia);
