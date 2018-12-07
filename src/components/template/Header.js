import React, { Component } from "react";
import propTypes from "prop-types";
import { Link } from "react-router-dom";
import { SideNav, SideNavItem } from "react-materialize";

class Header extends Component {
  render() {
    const { branding } = this.props;
    return (
      <div className="navbar-fixed">
        <nav
          id="header-cmp"
          style={{ marginBottom: "10px" }}
          className="blue darken-4"
        >
          <div className="nav-wrapper">
            <a
              href="#!"
              data-activates="nav-sidenav"
              className="button-collapse top-nav full hide-on-large-only"
            >
              <i className="material-icons">menu</i>
            </a>
            <label className="header-text white-text">{branding}</label>
          </div>
        </nav>
      </div>
    );
  }
}

Header.propTypes = {
  branding: propTypes.string.isRequired
};

export default Header;
