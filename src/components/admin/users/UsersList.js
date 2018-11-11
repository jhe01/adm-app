import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getUsers } from "../../../actions/userActions";
import { getClubs } from "../../../actions/clubActions";
import { getRoles } from "../../../actions/roleActions";

import Sidenav from "../../template/Aside";
import Header from "../../template/Header";
import { Icon } from "react-materialize";

import UserRow from "./UserRow";

class UsersList extends Component {
  componentDidMount() {
    this.props.getUsers();
    this.props.getClubs();
    this.props.getRoles();
    // this.props.setBrand("Golf Clubs");
  }

  onClickDelete = e => {
    e.preventDefault();
  };

  render() {
    const { users } = this.props;
    return (
      <React.Fragment>
        <Header branding="Users" />
        <Sidenav active="user-list" />
        <div className="row">
          <div style={{ marginTop: "10px" }}>
            <Link
              className="btn blue darken-2 header-action-btn left"
              to="/add-user"
            >
              Add User
              <Icon className="left">add</Icon>
            </Link>
          </div>
          <div className="col s12">
            <table className="highlight">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Golf Club</th>
                  <th>Role</th>
                  <th />
                  <th />
                </tr>
              </thead>
              <tbody>
                {users.map(user => {
                  return <UserRow key={user._id} user={user} />;
                })}
              </tbody>
            </table>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

UsersList.propTypes = {
  users: PropTypes.array.isRequired,
  getUsers: PropTypes.func.isRequired,
  getClubs: PropTypes.func.isRequired,
  getRoles: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  users: state.user.users,
  clubs: state.club.clubs,
  roles: state.role.roles
});

export default connect(
  mapStateToProps,
  { getUsers, getClubs, getRoles }
)(UsersList);
