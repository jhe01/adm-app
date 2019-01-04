import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { isMobile } from "react-device-detect";

import { getUsers, changeStatusUser } from "../../../actions/userActions";
import { getClubs } from "../../../actions/clubActions";
import { getRoles } from "../../../actions/roleActions";

import Sidenav from "../../template/Aside";
import Header from "../../template/Header";
import { Icon, Input } from "react-materialize";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import UserRow from "./UserRow";
import UsersListMobile from "./UsersListMobile";

class UsersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFilter: false,
      keyword: "",
      filteredUsers: []
    };
    this.swAlert = withReactContent(Swal);
  }

  componentDidMount() {
    this.props.getUsers();
    this.props.getClubs();
    this.props.getRoles();
    // this.props.setBrand("Golf Clubs");
  }

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

  onClickDisable = user => {
    if (user.is_active) {
      this.swAlert
        .fire({
          title: (
            <div>
              <h5>Are you sure?</h5>
              <p style={{ fontSize: "1.3rem" }}>
                User "{user.name}" will be disabled!
              </p>
            </div>
          ),
          type: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes",
          confirmButtonClass: "blue darken-2"
        })
        .then(result => {
          if (result.value) {
            this.props.changeStatusUser(user);
          }
        });
    } else {
      this.props.changeStatusUser(user);
    }
  };

  render() {
    const { users, clubs } = this.props;
    const { isFilter, filteredUsers } = this.state;
    return (
      <React.Fragment>
        <Header branding="Users" />
        <Sidenav active="user-list" />

        <div className="row" style={{ paddingBottom: "1.5rem" }}>
          <div className="col s3 m3">
            {isMobile ? (
              <div className="fixed-action-btn">
                <Link
                  to="/add-user"
                  className="btn-floating waves-effect waves-light blue darken-4"
                >
                  <i className="material-icons">add</i>
                </Link>
              </div>
            ) : (
              <div style={{ marginTop: "10px" }}>
                <Link
                  className="btn blue darken-2 header-action-btn left"
                  to="/add-user"
                >
                  NEW
                </Link>
              </div>
            )}
          </div>
          <div className="col s4 m4 hide-on-small-only" />
          <div className="col s12 m2">
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
          <div className="col s12 m3">
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
            {isMobile ? (
              <UsersListMobile
                users={isFilter ? filteredUsers : users}
                onClickDisable={this.onClickDisable}
              />
            ) : (
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
                        return (
                          <UserRow
                            key={user._id}
                            user={user}
                            onClickDisable={this.onClickDisable}
                          />
                        );
                      })
                    : users.map(user => {
                        return (
                          <UserRow
                            key={user._id}
                            user={user}
                            onClickDisable={this.onClickDisable}
                          />
                        );
                      })}
                </tbody>
              </table>
            )}
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
  getRoles: PropTypes.func.isRequired,
  changeStatusUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  users: state.user.users,
  clubs: state.club.clubs,
  roles: state.role.roles
});

export default connect(
  mapStateToProps,
  { getUsers, getClubs, getRoles, changeStatusUser }
)(UsersList);
