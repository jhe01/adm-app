import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Input, Icon } from "react-materialize";
import { isMobile } from "react-device-detect";

import {
  updateClubPolicy,
  deleteClubPolicy
} from "../../../../actions/clubActions";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

class ClubPolicy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      policy: this.props.policy,
      mouseEnter: false,
      mouseLeave: true,
      policyEditData: this.props.policy
    };

    this.swAlert = withReactContent(Swal);
  }

  handleOnMouseEnter = () => {
    this.setState({ mouseEnter: true, mouseLeave: false });
  };

  handleOneMouseLeave = () => {
    this.setState({ mouseEnter: false, mouseLeave: true });
  };

  handleEditPolicy = () => {
    this.setState({ isEdit: !this.state.isEdit });
    if (!this.state.isEdit) {
      this.setState({ policyEditData: this.props.policy });
    }
  };

  handleOnChangeInput = e => {
    if (e.target.name === "is_allowed") {
      console.log(e.target.value);
      this.setState({
        policyEditData: {
          ...this.state.policyEditData,
          [e.target.name]: !this.state.policyEditData.is_allowed
        }
      });
    } else {
      this.setState({
        policyEditData: {
          ...this.state.policyEditData,
          [e.target.name]: e.target.value
        }
      });
    }
  };

  handleSavePolicy = () => {
    let prf = {};
    prf._id = this.state.policyEditData._id;
    prf.name = this.state.policyEditData.name;
    prf.is_allowed = this.state.policyEditData.is_allowed;
    prf.clubid = this.props.club._id;
    prf.type = "policy";
    this.props.updateClubPolicy(prf);
  };

  handleDeletePolicy = type => {
    const deletePolicy = {
      type: type,
      clubid: this.props.club._id,
      policyid: this.props.policy._id
    };

    this.props.deleteClubPolicy(deletePolicy);
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.policy !== this.props.policy) {
      this.setState({
        isEdit: false,
        policy: this.props.policy,
        mouseEnter: false,
        mouseLeave: true,
        policyEditData: this.props.policy
      });
    }
  }

  render() {
    const { policy, isEdit, mouseEnter } = this.state;
    const isEditPolicy = (
      <div className="row">
        <div className="col s7">
          <Input
            placeholder="Name ..."
            defaultValue={policy.name}
            name="name"
            onChange={this.handleOnChangeInput}
          />
        </div>
        <div className="col s5">
          <div className="switch">
            <label>Is Allowed?</label>
            <br />
            <label>
              No
              <input
                type="checkbox"
                defaultChecked={policy.is_allowed}
                name="is_allowed"
                onChange={this.handleOnChangeInput}
              />
              <span className="lever" />
              Yes
            </label>
          </div>
        </div>
      </div>
    );

    const isDesktopBrowser = (
      <li
        onMouseEnter={this.handleOnMouseEnter}
        onMouseLeave={this.handleOneMouseLeave}
      >
        - {`${policy.name}: ${policy.is_allowed ? "YES" : "NO"}`}{" "}
        {mouseEnter ? (
          <React.Fragment>
            {isEdit ? (
              <React.Fragment>
                <button
                  className="btn red darken-2 action-btn"
                  onClick={this.handleEditPolicy}
                >
                  <i className="material-icons">close</i>
                </button>
                <button
                  className="btn blue darken-2 action-btn"
                  onClick={this.handleSavePolicy}
                >
                  Save
                </button>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <button
                  className="btn blue darken-2 action-btn"
                  onClick={this.handleEditPolicy}
                >
                  Edit
                </button>
                <button
                  className="btn red darken-2 action-btn"
                  onClick={() => {
                    this.handleDeletePolicy("policy");
                  }}
                >
                  <Icon>delete</Icon>
                </button>
              </React.Fragment>
            )}
          </React.Fragment>
        ) : (
          ""
        )}
        {isEdit ? isEditPolicy : ""}
      </li>
    );

    const isMobileBrowser = (
      <li style={{ marginTop: "5px" }}>
        - {`${policy.name}: ${policy.is_allowed ? "YES" : "NO"}`}{" "}
        <button
          className="btn blue darken-2 action-btn"
          onClick={this.handleEditPolicy}
        >
          {isEdit ? <i className="material-icons">close</i> : "EDIT"}
        </button>
        {isEdit ? (
          <button
            className="btn blue darken-2 action-btn"
            onClick={this.handleSavePolicy}
          >
            Save
          </button>
        ) : (
          <button
            className="btn red darken-2 action-btn"
            onClick={() => {
              this.handleDeletePolicy("policy");
            }}
          >
            <Icon>delete</Icon>
          </button>
        )}
        {isEdit ? isEditPolicy : ""}
      </li>
    );
    return (
      <React.Fragment>
        {isMobile ? isMobileBrowser : isDesktopBrowser}
      </React.Fragment>
    );
  }
}

ClubPolicy.propTypes = {
  updateClubPolicy: PropTypes.func.isRequired,
  deleteClubPolicy: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  club: state.club.club
});

export default connect(
  mapStateToProps,
  {
    updateClubPolicy,
    deleteClubPolicy
  }
)(ClubPolicy);
