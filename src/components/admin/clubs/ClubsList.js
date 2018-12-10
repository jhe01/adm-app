import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { isMobile } from "react-device-detect";

import { getClubs } from "../../../actions/clubActions";

import Sidenav from "../../template/Aside";
import Header from "../../template/Header";

import ClubRow from "./ClubRow";
import { Icon } from "react-materialize";

class ClubsList extends Component {
  state = {
    delete_id: ""
  };
  componentDidMount() {
    this.props.getClubs();
  }

  onClickDelete = e => {
    e.preventDefault();
  };

  render() {
    const { clubs } = this.props;
    return (
      <React.Fragment>
        <Header branding="Golf Clubs" />
        <Sidenav active="club-list" />
        <div className="row">
          <div style={{ marginTop: "10px" }}>
            {!isMobile ? (
              <Link
                className="btn blue darken-2 header-action-btn left"
                to="/add-club"
              >
                Add Golf Club
                <Icon className="left">add</Icon>
              </Link>
            ) : (
              <div className="fixed-action-btn">
                <Link
                  to="/add-club"
                  className="btn-floating waves-effect waves-light blue darken-4"
                >
                  <i className="material-icons">add</i>
                </Link>
              </div>
            )}
          </div>
          <div className="col s12">
            <table className="highlight">
              <thead>
                <tr>
                  <th>Golf Club</th>
                  {isMobile ? "" : <th>Courses</th>}
                  <th />
                  <th />
                </tr>
              </thead>
              <tbody>
                {clubs.map(club => {
                  return <ClubRow key={club._id} club={club} />;
                })}
              </tbody>
            </table>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

ClubsList.propTypes = {
  clubs: PropTypes.array.isRequired,
  getClubs: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  clubs: state.club.clubs
});

export default connect(
  mapStateToProps,
  { getClubs }
)(ClubsList);
