import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Input, Icon } from "react-materialize";
import { isMobile } from "react-device-detect";

import {
  updateClubService,
  deleteClubService
} from "../../../../actions/clubActions";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

class ClubService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      service: this.props.service,
      mouseEnter: false,
      mouseLeave: true,
      serviceEditData: this.props.service
    };

    this.swAlert = withReactContent(Swal);
  }

  handleOnMouseEnter = () => {
    this.setState({ mouseEnter: true, mouseLeave: false });
  };

  handleOneMouseLeave = () => {
    this.setState({ mouseEnter: false, mouseLeave: true });
  };

  handleEditService = () => {
    this.setState({ isEdit: !this.state.isEdit });
    if (!this.state.isEdit) {
      this.setState({ serviceEditData: this.props.service });
    }
  };

  handleOnChangeInput = e => {
    if (e.target.name === "is_allowed") {
      console.log(e.target.value);
      this.setState({
        serviceEditData: {
          ...this.state.serviceEditData,
          [e.target.name]: !this.state.serviceEditData.is_allowed
        }
      });
    } else {
      this.setState({
        serviceEditData: {
          ...this.state.serviceEditData,
          [e.target.name]: e.target.value
        }
      });
    }
  };

  handleSaveService = () => {
    let prf = {};
    prf._id = this.state.serviceEditData._id;
    prf.name = this.state.serviceEditData.name;
    prf.clubid = this.props.club._id;
    prf.type = "service";
    this.props.updateClubService(prf);
  };

  handleDeleteService = type => {
    const deleteService = {
      type: type,
      clubid: this.props.club._id,
      serviceid: this.props.service._id
    };

    this.props.deleteClubService(deleteService);
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.service !== this.props.service) {
      this.setState({
        isEdit: false,
        service: this.props.service,
        mouseEnter: false,
        mouseLeave: true,
        serviceEditData: this.props.service
      });
    }
  }

  render() {
    const { service, isEdit, mouseEnter } = this.state;
    const isEditService = (
      <div className="row">
        <Input
          s={12}
          placeholder="Name ..."
          defaultValue={service.name}
          name="name"
          onChange={this.handleOnChangeInput}
        />
      </div>
    );

    const isDesktopBrowser = (
      <li
        onMouseEnter={this.handleOnMouseEnter}
        onMouseLeave={this.handleOneMouseLeave}
      >
        - {service.name}{" "}
        {mouseEnter ? (
          <React.Fragment>
            <button
              className="btn blue darken-2 action-btn"
              onClick={this.handleEditService}
            >
              {isEdit ? "CANCEL" : "EDIT"}
            </button>
            {isEdit ? (
              <button
                className="btn blue darken-2 action-btn"
                onClick={this.handleSaveService}
              >
                Save
              </button>
            ) : (
              <button
                className="btn red darken-2 action-btn"
                onClick={() => {
                  this.handleDeleteService("service");
                }}
              >
                <Icon>delete</Icon>
              </button>
            )}
          </React.Fragment>
        ) : (
          ""
        )}
        {isEdit ? isEditService : ""}
      </li>
    );

    const isMobileBrowser = (
      <li style={{ marginTop: "5px" }}>
        - {service.name}{" "}
        <button
          className="btn blue darken-2 action-btn"
          onClick={this.handleEditService}
        >
          {isEdit ? "CANCEL" : "EDIT"}
        </button>
        {isEdit ? (
          <button
            className="btn blue darken-2 action-btn"
            onClick={this.handleSaveService}
          >
            Save
          </button>
        ) : (
          <button
            className="btn red darken-2 action-btn"
            onClick={() => {
              this.handleDeleteService("service");
            }}
          >
            <Icon>delete</Icon>
          </button>
        )}
        {isEdit ? isEditService : ""}
      </li>
    );
    return (
      <React.Fragment>
        {isMobile ? isMobileBrowser : isDesktopBrowser}
      </React.Fragment>
    );
  }
}

ClubService.propTypes = {
  updateClubService: PropTypes.func.isRequired,
  deleteClubService: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  club: state.club.club
});

export default connect(
  mapStateToProps,
  {
    updateClubService,
    deleteClubService
  }
)(ClubService);
