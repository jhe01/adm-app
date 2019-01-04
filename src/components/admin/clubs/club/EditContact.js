import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  updateClubContact,
  deleteClubContact
} from "../../../../actions/clubActions";

class EditContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contactid: this.props.contact ? this.props.contact._id : "",
      name: this.props.contact ? this.props.contact.contact_name : "",
      value: this.props.contact ? this.props.contact.contact_value : "",
      contact: this.props.contact ? this.props.contact : {},
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
      contactid: this.state.contactid,
      contact_name: this.state.name,
      contact_value: this.state.value
    };

    this.props.updateClubContact(args);
    this.setState({ isEdit: !this.state.isEdit });
  };

  handleOnClickEditButton = () => {
    this.setState({ isEdit: true });
  };
  handleOnClickDeleteButton = () => {
    const args = {
      clubid: this.state.clubId,
      contactid: this.state.contactid
    };
    this.props.deleteClubContact(args);
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
            placeholder="Type ... Ex: Landline, Email"
            name="name"
            type="text"
            value={name}
            onChange={this.handleOnInputChange}
          />
        </div>
        <div className="input-field col s12">
          <input
            placeholder="Value ... Ex: 444 5555, jemail@gmail.com"
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
            {`${name}: ${value}`}
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

EditContact.propTypes = {
  updateClubContact: PropTypes.func.isRequired,
  deleteClubContact: PropTypes.func.isRequired
};

export default connect(
  null,
  {
    updateClubContact,
    deleteClubContact
  }
)(EditContact);
