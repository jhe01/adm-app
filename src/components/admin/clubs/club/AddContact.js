import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import { addClubContact } from "../../../../actions/clubActions";

class AddContact extends Component {
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
      contact_name: this.state.name,
      contact_value: this.state.value
    };

    this.props.addClubContact(args);
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
            placeholder="Type ... Ex: Landline, Email"
            name="name"
            type="text"
            onChange={this.handleOnInputChange}
          />
        </div>
        <div className="input-field col s12">
          <input
            placeholder="Value ... Ex: 444 5555, jemail@gmail.com"
            name="value"
            type="text"
            onChange={this.handleOnInputChange}
          />
        </div>
      </div>
    );
  }
}

AddContact.propTypes = {
  addClubContact: PropTypes.func.isRequired
};

export default connect(
  null,
  { addClubContact }
)(AddContact);
