import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Row, Input, Button } from "react-materialize";
import { changePassword } from "../../../actions/userActions";
import Header from "../../template/Header";

import Sidenav from "../../template/Aside";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      password2: "",
      errors: {},
      togglePassword: false
    };
    this.swAlert = withReactContent(Swal);
  }

  onSubmit = e => {
    e.preventDefault();

    const { password, password2 } = this.state;

    if (this.state.password === "") {
      this.setState({ errors: { password: "New Password is Required" } });
      return;
    }

    if (this.state.password2 === "") {
      this.setState({
        errors: { password2: "New Confirm Password is Required" }
      });
      return;
    }

    if (this.state.password !== this.state.password2) {
      this.setState({ errors: { password2: "Password is not match!" } });
      return;
    }

    const newPass = {
      password,
      password2
    };

    newPass.userid = this.props.match.params.id;

    this.props.changePassword(newPass);

    this.setState({
      password: "",
      password2: "",
      errors: {},
      togglePassword: false
    });

    this.swAlert.fire({
      title: "Success",
      type: "success",
      showConfirmButton: false,
      timer: 1300,
      onClose: () => {
        this.props.history.push("/users");
      }
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onShowPassword = e => {
    e.preventDefault();
    this.setState({ togglePassword: !this.state.togglePassword });
  };

  render() {
    const { togglePassword, errors } = this.state;
    return (
      <React.Fragment>
        <Header branding="Users - Change password" />
        <Sidenav />
        <form onSubmit={this.onSubmit}>
          <Row>
            <Input
              m={3}
              s={12}
              name="password"
              label="New Password"
              type={togglePassword ? "text" : "password"}
              onChange={this.onChange}
              validate={true}
              error={errors.password ? errors.password : ""}
            />
          </Row>
          <Row>
            <Input
              m={3}
              s={12}
              type={togglePassword ? "text" : "password"}
              name="password2"
              onChange={this.onChange}
              label="New Confirm Password"
              validate={true}
              error={errors.password2 ? errors.password2 : ""}
            />
          </Row>
          <Row>
            <div className="col s12 m2">
              <Button onClick={this.onShowPassword}>Show Password</Button>
            </div>
            <div className="col s12 m1">
              <Button>Save</Button>
            </div>
          </Row>
        </form>
      </React.Fragment>
    );
  }
}

ChangePassword.propTypes = {
  changePassword: PropTypes.func.isRequired
};

export default connect(
  null,
  { changePassword }
)(ChangePassword);
