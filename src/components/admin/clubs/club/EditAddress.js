import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { updateGolfClub } from "../../../../actions/clubActions";

class EditAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: this.props.club.address,
      club: this.props.club,
      clubid: this.props.club._id,
      handleAfterSave: this.props.afterSave
    };
  }

  handleOnAddressInputChange = e => {
    this.setState({ address: e.target.value });
  };

  handleClickSaveAddress = () => {
    const { clubid, address, handleAfterSave } = this.state;
    const data = { address, _id: clubid };
    this.props.updateGolfClub(data);
    handleAfterSave();
  };

  render() {
    const { address } = this.state;
    return (
      <div className="row">
        <div className="col s12">
          <button
            className="btn btn-small blue darken-4 action-btn "
            onClick={this.handleClickSaveAddress}
          >
            SAVE
          </button>
        </div>
        <div className="input-field col s12">
          <input
            placeholder="Address ..."
            name="address"
            type="text"
            onChange={this.handleOnAddressInputChange}
            value={address}
          />
        </div>
      </div>
    );
  }
}

EditAddress.propTypes = {
  updateGolfClub: PropTypes.func.isRequired
};

export default connect(
  null,
  { updateGolfClub }
)(EditAddress);
