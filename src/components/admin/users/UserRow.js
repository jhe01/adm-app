import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Icon } from "react-materialize";
import { Link } from "react-router-dom";
import { changeStatusUser } from "../../../actions/userActions";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

class UserRow extends Component {
  constructor(props) {
    super(props);
    this.swAlert = withReactContent(Swal);
    this.state = {
      changePasswordFormOpen: false
    };
  }

  componentDidMount() {
    // this.props.getCourse(this.props.club._id);
    //console.log(this.props.club);
  }

  // onClickDisable = () => {
  //   if (this.props.user.is_active) {
  //     this.swAlert
  //       .fire({
  //         title: (
  //           <div>
  //             <h5>Are you sure?</h5>
  //             <p style={{ fontSize: "1.3rem" }}>
  //               User "{this.props.user.name}" will be disabled!
  //             </p>
  //           </div>
  //         ),
  //         type: "warning",
  //         showCancelButton: true,
  //         confirmButtonText: "Yes",
  //         confirmButtonClass: "blue darken-2"
  //       })
  //       .then(result => {
  //         if (result.value) {
  //           this.props.changeStatusUser(this.props.user);
  //         }
  //       });
  //   } else {
  //     this.props.changeStatusUser(this.props.user);
  //   }
  // };

  render() {
    const { user } = this.props;
    return (
      <tr key={user._id}>
        <td>{user.name}</td>
        <td>{user.club_id.name}</td>
        <td>{user.role_id.name}</td>
        <td className="grey-text text-lighten-1">
          {user.is_active ? "Enabled" : "Disabled"}
        </td>
        <td>
          <button
            onClick={() => {
              this.props.onClickDisable(user);
            }}
            className="btn red darken-2 action-btn"
          >
            <Icon>{user.is_active ? "clear" : "check"}</Icon>
          </button>
          <Link
            to={`/change-pass/${user._id}`}
            className="btn teal darken-2 action-btn"
          >
            {" "}
            <Icon>lock_outline</Icon>{" "}
          </Link>
          <Link
            to={`/edit-user/${user._id}`}
            className="btn blue darken-2 action-btn"
          >
            <Icon>edit</Icon>
          </Link>
        </td>
      </tr>
    );
  }
}

UserRow.propTypes = {
  user: PropTypes.object.isRequired
};

export default connect(
  null,
  { changeStatusUser }
)(UserRow);
