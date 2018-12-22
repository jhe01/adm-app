import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class EditContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.contact ? this.props.contact.name : "",
      value: this.props.contact ? this.props.contact.value : "",
      contact: this.props.contact ? this.props.contact : {},
      clubId: this.props.clubId ? this.props.clubId : "",
      isEdit: this.props.isEdit ? true : false,
      isAdd: this.props.isAdd ? true : false
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
    console.log("Test");
  };
  render() {
    const { name, value, isEdit, isAdd } = this.state;
    const editInput = (
      <div className="row">
        <div className="col s12">
          <button className="btn btn-small blue darken-4 action-btn ">
            SAVE
          </button>
        </div>
        <div className="input-field col s12">
          <input
            placeholder="Type ... ex: Landline, Email"
            name="name"
            type="text"
            value={name}
            onChange={this.handleOnInputChange}
          />
        </div>
        <div className="input-field col s12">
          <input
            placeholder="Value ... ex: 444 5555, jemail@gmail.com"
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
        {isEdit ? (
          <div>
            {name}
            <button
              href="#!"
              className="btn-flat secondary-content red-text text-darken-2"
            >
              <i className="material-icons">delete</i>
            </button>
            <button
              href="#!"
              className="btn-flat secondary-content blue-text text-darken-2"
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

export default connect()(EditContact);
