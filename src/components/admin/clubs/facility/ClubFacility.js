import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Input, Icon } from "react-materialize";
import { isMobile } from "react-device-detect";

import {
  updateClubFacility,
  deleteClubFacility
} from "../../../../actions/clubActions";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

class ClubFacility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      facility: this.props.facility,
      mouseEnter: false,
      mouseLeave: true,
      facilityEditData: this.props.facility
    };

    this.swAlert = withReactContent(Swal);
  }

  handleOnMouseEnter = () => {
    this.setState({ mouseEnter: true, mouseLeave: false });
  };

  handleOneMouseLeave = () => {
    this.setState({ mouseEnter: false, mouseLeave: true });
  };

  handleEditfacility = () => {
    this.setState({ isEdit: !this.state.isEdit });
    if (!this.state.isEdit) {
      this.setState({ facilityEditData: this.props.facility });
    }
  };

  handleOnChangeInput = e => {
    if (e.target.name === "is_allowed") {
      console.log(e.target.value);
      this.setState({
        facilityEditData: {
          ...this.state.facilityEditData,
          [e.target.name]: !this.state.facilityEditData.is_allowed
        }
      });
    } else {
      this.setState({
        facilityEditData: {
          ...this.state.facilityEditData,
          [e.target.name]: e.target.value
        }
      });
    }
  };

  handleSavefacility = () => {
    let prf = {};
    prf._id = this.state.facilityEditData._id;
    prf.name = this.state.facilityEditData.name;
    prf.clubid = this.props.club._id;
    prf.type = "facility";
    this.props.updateClubFacility(prf);
  };

  handleDeletefacility = type => {
    const deletefacility = {
      type: type,
      clubid: this.props.club._id,
      facilityid: this.props.facility._id
    };

    this.props.deleteClubFacility(deletefacility);
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.facility !== this.props.facility) {
      this.setState({
        isEdit: false,
        facility: this.props.facility,
        mouseEnter: false,
        mouseLeave: true,
        facilityEditData: this.props.facility
      });
    }
  }

  render() {
    const { facility, isEdit, mouseEnter } = this.state;
    const isEditfacility = (
      <div className="row">
        <Input
          s={12}
          placeholder="Name ..."
          defaultValue={facility.name}
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
        - {facility.name}{" "}
        {mouseEnter ? (
          <React.Fragment>
            <button
              className="btn blue darken-2 action-btn"
              onClick={this.handleEditfacility}
            >
              {isEdit ? "CANCEL" : "EDIT"}
            </button>
            {isEdit ? (
              <button
                className="btn blue darken-2 action-btn"
                onClick={this.handleSavefacility}
              >
                Save
              </button>
            ) : (
              <button
                className="btn red darken-2 action-btn"
                onClick={() => {
                  this.handleDeletefacility("facility");
                }}
              >
                <Icon>delete</Icon>
              </button>
            )}
          </React.Fragment>
        ) : (
          ""
        )}
        {isEdit ? isEditfacility : ""}
      </li>
    );

    const isMobileBrowser = (
      <li style={{ marginTop: "5px" }}>
        - {facility.name}{" "}
        <button
          className="btn blue darken-2 action-btn"
          onClick={this.handleEditfacility}
        >
          {isEdit ? "CANCEL" : "EDIT"}
        </button>
        {isEdit ? (
          <button
            className="btn blue darken-2 action-btn"
            onClick={this.handleSavefacility}
          >
            Save
          </button>
        ) : (
          <button
            className="btn red darken-2 action-btn"
            onClick={() => {
              this.handleDeletefacility("facility");
            }}
          >
            <Icon>delete</Icon>
          </button>
        )}
        {isEdit ? isEditfacility : ""}
      </li>
    );

    return (
      <React.Fragment>
        {isMobile ? isMobileBrowser : isDesktopBrowser}
      </React.Fragment>
    );
  }
}

ClubFacility.propTypes = {
  updateClubFacility: PropTypes.func.isRequired,
  deleteClubFacility: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  club: state.club.club
});

export default connect(
  mapStateToProps,
  {
    updateClubFacility,
    deleteClubFacility
  }
)(ClubFacility);
