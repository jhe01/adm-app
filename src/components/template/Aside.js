import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import PropTypes from "prop-types";

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
        trigger={<Button>SIDE NAV DEMO</Button>}
        options={{ closeOnClick: false }}
        fixed={true}
      >
        <SideNavItem href="#!icon" className="sidenav-header">
          <h4 className="center-align">
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
