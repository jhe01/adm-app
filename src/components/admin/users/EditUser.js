import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Row, Input } from "react-materialize";
import { getUser, updateUser } from "../../../actions/userActions";

import Sidenav from "../../template/Aside";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Header from "../../template/Header";

class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      clubid: "",
      roleid: "",
      email: "",
      contact: "",
      errors: {}
    };

    this.swAlert = withReactContent(Swal);
  }

  componentWillReceiveProps(nextProps, nextState) {
    const { name, club_id, role_id, email, contact } = nextProps.user;
    this.setState({
      name: name,
      clubid: club_id,
      roleid: role_id,
      email: email,
      contact: contact
    });
  }

  componentDidMount() {
    this.props.getUser(this.props.match.params.id);
  }

  onSubmit = e => {
    e.preventDefault();
    const { name, clubid, roleid, email, contact } = this.state;

    if (this.state.name === "") {
      this.setState({ errors: { name: "Name is required" } });
      return;
    }
    if (this.state.clubid === "") {
      this.setState({ errors: { clubid: "Club is required" } });
      return;
    }
    if (this.state.roleid === "") {
      this.setState({ errors: { roleid: "Role is required" } });
      return;
    }
    if (this.state.email === "") {
      this.setState({ errors: { email: "Email is required" } });
      return;
    }

    const updUser = {
      name,
      clubid,
      roleid,
      email,
      contact
    };
    updUser.userid = this.props.user._id;
    this.props.updateUser(updUser);

    this.setState({
      name: "",
      clubid: "",
      roleid: "",
      email: "",
      contact: "",
      errors: {}
    });

    this.swAlert.fire({
      title: "Success",
      type: "success",
      showConfirmButton: false,
      timer: 1300
    });
  };

  onChange = e => {
    if (!this.state.errors) {
      this.setState({ errors: { [e.target.name]: "" } });
    }

    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { clubs, roles } = this.props;
    const { name, clubid, roleid, email, contact, errors } = this.state;
    return (
      <React.Fragment>
        <Header branding={`Users - Edit "${name}"`} />
        <Sidenav active="add-user" />
        <form onSubmit={this.onSubmit}>
          <Row m={6} s={12}>
            <Input
              s={12}
              m={6}
              value={name}
              label="Name"
              labelClassName={name ? "active" : ""}
              type="text"
              name="name"
              id="name"
              validate={true}
              onChange={this.onChange}
              error={errors.name ? errors.name : ""}
            />
          </Row>
          <Row m={6} s={12}>
            <Input
              s={12}
              m={3}
              label="Club"
              type="select"
              name="clubid"
              id="clubid"
              onChange={this.onChange}
              error={errors.clubid ? errors.clubid : ""}
              value={clubid}
              validate={true}
            >
              <option value="">- SELECT -</option>
              {clubs.map(club => {
                return (
                  <option key={club._id} value={club._id}>
                    {club.name}
                  </option>
                );
              })}
            </Input>
            <Input
              s={12}
              m={3}
              label="Role"
              type="select"
              name="roleid"
              id="roleid"
              labelClassName={roleid ? "active" : ""}
              onChange={this.onChange}
              error={errors.roleid ? errors.roleid : ""}
              value={roleid}
              validate={true}
            >
              <option value="">- SELECT -</option>
              {roles.map(role => {
                return (
                  <option key={role._id} value={role._id}>
                    {role.name}
                  </option>
                );
              })}
            </Input>
          </Row>
          <Row m={6} s={12}>
            <Input
              s={12}
              m={3}
              label="Email"
              type="text"
              name="email"
              id="email"
              autoComplete="email"
              labelClassName={email ? "active" : ""}
              value={email}
              onChange={this.onChange}
              error={errors.email ? errors.email : ""}
              validate={true}
            />
            <Input
              s={12}
              m={3}
              label="Contact"
              type="text"
              name="contact"
              id="contact"
              labelClassName={contact ? "active" : ""}
              value={contact}
              onChange={this.onChange}
              error={errors.contact ? errors.contact : ""}
              validate={true}
            />
          </Row>
          <Row m={6} s={12}>
            <input type="submit" value="Save" className="btn btn-sm" />
          </Row>
        </form>
      </React.Fragment>
    );
  }
}

EditUser.propTypes = {
  clubs: PropTypes.array.isRequired,
  roles: PropTypes.array.isRequired,
  getUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  clubs: state.club.clubs,
  roles: state.role.roles,
  user: state.user.user
});

export default connect(
  mapStateToProps,
  { getUser, updateUser }
)(EditUser);
