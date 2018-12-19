import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Icon, Button, Dropdown } from "react-materialize";
import { Link } from "react-router-dom";
import { isMobile } from "react-device-detect";

import {
  changeStatusGolfClub,
  updateGolfClub,
  addClubCourse
} from "../../../actions/clubActions";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

class ClubRow extends Component {
  constructor(props) {
    super(props);
    this.swAlert = withReactContent(Swal);
  }

  componentDidMount() {
    // this.props.getCourse(this.props.club._id);
    //console.log(this.props.club);
  }

  onClickDisable = () => {
    if (this.props.club.is_active) {
      this.swAlert
        .fire({
          title: (
            <div>
              <h5>Are you sure?</h5>
              <p style={{ fontSize: "1.3rem" }}>
                Golf Club "{this.props.club.name}" will be disabled!
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
            this.props.changeStatusGolfClub(this.props.club);
          }
        });
    } else {
      this.props.changeStatusGolfClub(this.props.club);
    }
  };

  onUpdate = () => {
    this.props.updateGolfClub(this.props.club);
  };

  render() {
    const { club } = this.props;
    return (
      <tr key={club._id}>
        <td>{club.name}</td>
        {isMobile ? (
          ""
        ) : (
          <td>{club.courses.map(course => course.name + ", ")}</td>
        )}
        <td className="grey-text text-lighten-1">
          {club.is_active ? "Enabled" : "Disabled"}
        </td>
        <td>
          {isMobile ? (
            <Dropdown
              trigger={
                <Button className="more-btn btn-flat waves-effect waves-teal right">
                  <i className="material-icons">more_vert</i>
                </Button>
              }
              options={{ constrainWidth: false }}
            >
              <li>
                <a href="#!" onClick={this.onClickDisable}>
                  {club.is_active ? "DISABLE" : "ENABLE"}
                </a>
              </li>
              <li>
                <Link to={`/edit-club/${club._id}`}>EDIT</Link>
              </li>
              <li>
                <Link to={`/club/${club._id}`}>VIEW</Link>
              </li>
            </Dropdown>
          ) : (
            <React.Fragment>
              <a
                href="#!"
                onClick={this.onClickDisable}
                className="btn red darken-2 action-btn"
              >
                <Icon>{club.is_active ? "clear" : "check"}</Icon>
              </a>
              <Link
                to={`/edit-club/${club._id}`}
                className="btn blue darken-2 action-btn"
              >
                <Icon>edit</Icon>
              </Link>
              <Link
                to={`/club/${club._id}`}
                className="btn blue-grey lighten-3 action-btn"
              >
                <Icon>more_horiz</Icon>
              </Link>
            </React.Fragment>
          )}
        </td>
      </tr>
    );
  }
}

ClubRow.propTypes = {
  club: PropTypes.object.isRequired,
  changeStatusGolfClub: PropTypes.func.isRequired,
  updateGolfClub: PropTypes.func.isRequired,
  addClubCourse: PropTypes.func.isRequired
};

export default connect(
  null,
  { changeStatusGolfClub, updateGolfClub, addClubCourse }
)(ClubRow);
