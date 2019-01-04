import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import PropTypes from "prop-types";
import { isMobile } from "react-device-detect";

import { logoutUser } from "../../actions/userActions";

import { SideNav, SideNavItem, Button } from "react-materialize";

class Aside extends Component {
  onLogout = e => {
    e.preventDefault();

    this.props.logoutUser();
  };

  render() {
    const { active, auth } = this.props;

    const gAdminLinks = (
      <React.Fragment>
        <li
          className={
            active === "event-list" ? "active no-padding" : "no-padding"
          }
        >
          <Link to={"/events"}>Events</Link>
        </li>
        <li
          className={
            active === "club-list" ? "active no-padding" : "no-padding"
          }
        >
          <Link to={"/clubs"}>Golf Clubs</Link>
        </li>
        <li
          className={
            active === "user-list" ? "active no-padding" : "no-padding"
          }
        >
          <Link to={"/users"}>Users</Link>
        </li>
      </React.Fragment>
    );

    const cAdminUserLinks = (
      <React.Fragment>
        <li
          className={
            active === "event-list" ? "active no-padding" : "no-padding"
          }
        >
          <Link to={"/events"}>List of Events</Link>
        </li>
      </React.Fragment>
    );

    return (
      <SideNav
        id="nav-sidenav"
        trigger={<Button className="hide" />}
        options={{ closeOnClick: true }}
        fixed={true}
      >
        <SideNavItem className="sidenav-header">
          {isMobile ? (
            <button className="btn-floating btn-flat btn-small waves-effect waves-light blue darken-4 right">
              <i className="material-icons">close</i>
            </button>
          ) : (
            ""
          )}
          <h4 className="left">
            Fil
            <span>Golf</span>
          </h4>
        </SideNavItem>
        <SideNavItem href="#!">{auth.user.club_id.name}</SideNavItem>
        <SideNavItem divider />

        <li>
          <Link
            to={"/calendar"}
            className={active === "calendar-of-events" ? "active" : ""}
          >
            Calendar of Events
          </Link>
        </li>
        {auth.user.role_id.name === "Global Admin"
          ? gAdminLinks
          : cAdminUserLinks}
        <SideNavItem href="#!" onClick={this.onLogout}>
          Logout
        </SideNavItem>
      </SideNav>
    );
  }
}

Aside.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Aside);
