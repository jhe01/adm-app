import React, { Component } from "react";
import propTypes from "prop-types";
import { Link } from "react-router-dom";

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
            <Link to="/" className="brand-logo" style={{ fontSize: "1.3rem" }}>
              {branding}
            </Link>
            <ul id="nav-mobile" className="right hide-on-med-and-down" />
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
