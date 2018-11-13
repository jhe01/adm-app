import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getUsers } from "../../../actions/userActions";
import { getClubs } from "../../../actions/clubActions";
import { getRoles } from "../../../actions/roleActions";

import Sidenav from "../../template/Aside";
import Header from "../../template/Header";
import { Icon, Input } from "react-materialize";

import UserRow from "./UserRow";

class UsersList extends Component {
  state = {
    isFilter: false,
    keyword: "",
    filteredUsers: []
  };

  componentDidMount() {
    this.props.getUsers();
    this.props.getClubs();
    this.props.getRoles();
    // this.props.setBrand("Golf Clubs");
  }

  onClickDelete = e => {
    e.preventDefault();
  };

  searchFilterUsers = e => {
    if (e.target.value === "") {
      this.setState({
        isFilter: false,
        keyword: "",
        filteredUsers: []
      });
    } else {
      this.setState({
        isFilter: true,
        keyword: e.target.value,
        filteredUsers: this.props.users.filter(user => {
          return user.name.toLowerCase().includes(e.target.value.toLowerCase());
        })
      });
    }
  };

  clubsFilterUsers = e => {
    if (e.target.value === "0") {
      this.setState({
        isFilter: false,
        keyword: "",
        filteredUsers: []
      });
    } else {
      this.setState({
        isFilter: true,
        keyword: e.target.value,
        filteredUsers: this.props.users.filter(user => {
          return user.club_id._id === e.target.value;
        })
      });
    }
  };

  render() {
    const { users, clubs } = this.props;
    const { isFilter, filteredUsers } = this.state;
    return (
      <React.Fragment>
        <Header branding="Users" />
        <Sidenav active="user-list" />
        <div className="row">
          <div className="col s3">
            <div style={{ marginTop: "10px" }}>
              <Link
                className="btn blue darken-2 header-action-btn left"
                to="/add-user"
              >
                Add User
                <Icon className="left">add</Icon>
              </Link>
            </div>
          </div>
          <div className="col s4" />
          <div className="col s2">
            <Input
              s={12}
              type="select"
              id="filterClubs"
              name="filterClubs"
              defaultValue="-1"
              onChange={this.clubsFilterUsers}
            >
              <option value="-1" disabled>
                Golf Clubs
              </option>
              <option value="0">All</option>
              {clubs.map(club => {
                return (
                  <option key={club._id} value={club._id}>
                    {club.name}
                  </option>
                );
              })}
            </Input>
          </div>
          <div className="col s3">
            <Input
              s={12}
              m={12}
              name="filterSearchName"
              id="filterSearchName"
              placeholder="Search User ..."
              onChange={this.searchFilterUsers}
            />
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
                {isFilter
                  ? filteredUsers.map(user => {
                      return <UserRow key={user._id} user={user} />;
                    })
                  : users.map(user => {
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
