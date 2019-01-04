import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import { addClubSocialMedia } from "../../../../actions/clubActions";

class AddSocialMedia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      value: "",
      clubid: this.props.clubId,
      afterSave: this.props.afterSave
    };
  }
  handleOnClickSaveContact = () => {
    const args = {
      clubid: this.state.clubid,
      social_media_name: this.state.name,
      social_media_link: this.state.value
    };

    this.props.addClubSocialMedia(args);
    this.state.afterSave();
  };

  handleOnInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <div className="row">
        <div className="col s12">
          <button
            className="btn btn-small blue darken-4 action-btn "
            onClick={this.handleOnClickSaveContact}
          >
            SAVE
          </button>
        </div>
        <div className="input-field col s12">
          <input
            placeholder="Name ... Ex: Facebook, Twitter"
            name="name"
            type="text"
            onChange={this.handleOnInputChange}
          />
        </div>
        <div className="input-field col s12">
          <input
            placeholder="Value ... Ex: https://www.facebook.com/sample"
            name="value"
            type="text"
            onChange={this.handleOnInputChange}
          />
        </div>
      </div>
    );
  }
}

AddSocialMedia.propTypes = {
  addClubSocialMedia: PropTypes.func.isRequired
};

export default connect(
  null,
  { addClubSocialMedia }
)(AddSocialMedia);
