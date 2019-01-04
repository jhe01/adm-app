import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { updateGolfClub } from "../../../../actions/clubActions";

class EditClubName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      club: this.props.club,
      name: this.props.club.name,
      handleAfterSave: this.props.afterSave
    };
    console.log(this.props);
  }
  handleOnInputChange = e => {
    this.setState({ name: e.target.value });
  };
  handleOnClickSave = () => {
    const { name, handleAfterSave, club } = this.state;
    const data = { name, _id: club._id };
    this.props.updateGolfClub(data);
    handleAfterSave();
  };
  render() {
    const { name } = this.state;
    return (
      <div className="row">
        <div className="col s12">
          <button
            className="btn btn-small blue darken-4 action-btn "
            onClick={this.handleOnClickSave}
          >
            SAVE
          </button>
        </div>
        <div className="input-field col s12">
          <input
            placeholder="Club Name ..."
            name="name"
            type="text"
            onChange={this.handleOnInputChange}
            value={name}
          />
        </div>
      </div>
    );
  }
}

EditClubName.propTypes = {
  updateGolfClub: PropTypes.func.isRequired
};

export default connect(
  null,
  { updateGolfClub }
)(EditClubName);
