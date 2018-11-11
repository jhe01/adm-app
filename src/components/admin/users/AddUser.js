import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Row, Input } from "react-materialize";
import { addUser } from "../../../actions/userActions";

import Sidenav from "../../template/Aside";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Header from "../../template/Header";

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      clubid: "",
      roleid: "",
      email: "",
      contact: "",
      password: "",
      password2: "",
      errors: {}
    };

    this.swAlert = withReactContent(Swal);
  }

  onSubmit = e => {
    e.preventDefault();
    const {
      name,
      clubid,
      roleid,
      email,
      contact,
      password,
      password2
    } = this.state;

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
    if (this.state.password === "") {
      this.setState({ errors: { password: "Password is required" } });
      return;
    }
    if (this.state.password2 === "") {
      this.setState({ errors: { password2: "Confirm Password is required" } });
      return;
    }
    if (this.state.password !== this.state.password2) {
      this.setState({ errors: { password2: "Password should be the same!" } });
      return;
    }

    const newUser = {
      name,
      clubid,
      roleid,
      email,
      contact,
      password,
      password2
    };

    this.props.addUser(newUser);

    this.setState({
      name: "",
      clubid: "",
      roleid: "",
      email: "",
      contact: "",
      password: "",
      password2: "",
      errors: {}
    });

    this.props.history.push("/users");
  };

  onChange = e => {
    if (this.state.errors) {
      this.setState({ errors: { [e.target.name]: "" } });
    }

    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { clubs, roles } = this.props;
    const { errors } = this.state;
    return (
      <React.Fragment>
        <Header branding="Users - Add" />
        <Sidenav active="add-user" />
        <form onSubmit={this.onSubmit}>
          <Row m={6} s={12}>
            <Input
              s={12}
              m={6}
              label="Name"
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
              validate={true}
              onChange={this.onChange}
              error={errors.clubid ? errors.clubid : ""}
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
              validate={true}
              onChange={this.onChange}
              error={errors.roleid ? errors.roleid : ""}
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
              validate={true}
              onChange={this.onChange}
              error={errors.email ? errors.email : ""}
            />
            <Input
              s={12}
              m={3}
              label="Contact"
              type="text"
              name="contact"
              id="contact"
              onChange={this.onChange}
              error={errors.contact ? errors.contact : ""}
            />
          </Row>
          <Row m={6} s={12}>
            <Input
              s={12}
              m={3}
              label="Password"
              type="password"
              name="password"
              id="password"
              autoComplete="new-password"
              validate={true}
              onChange={this.onChange}
              error={errors.password ? errors.password : ""}
            />
            <Input
              s={12}
              m={3}
              label="Confirm Password"
              type="password"
              name="password2"
              id="password2"
              autoComplete="new-password"
              validate={true}
              onChange={this.onChange}
              error={errors.password2 ? errors.password2 : ""}
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

AddUser.propTypes = {
  clubs: PropTypes.array.isRequired,
  roles: PropTypes.array.isRequired,
  addUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  clubs: state.club.clubs,
  roles: state.role.roles
});

export default connect(
  mapStateToProps,
  { addUser }
)(AddUser);
