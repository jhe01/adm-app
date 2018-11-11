import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser } from "../../actions/userActions";
import PropTypes from "prop-types";

import { Row, Input, Col, Card } from "react-materialize";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import "./login.css";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      const swAlert = withReactContent(Swal);

      swAlert.fire({
        title: "Success",
        type: "success",
        showConfirmButton: false,
        timer: 1300,
        onClose: () => {
          this.props.history.push("/calendar");
        }
      });
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password
    };

    // console.log(user);
    this.props.loginUser(user);
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });
  render() {
    const { errors } = this.state;
    return (
      <div className="login-container" style={{ paddingLeft: "-300px" }}>
        <Card>
          <h4>Sign in</h4>
          <form onSubmit={this.onSubmit}>
            <Row>
              <Input
                type="email"
                id="email"
                name="email"
                autoComplete="username email"
                label="Email"
                error={errors.email ? errors.email : ""}
                s={12}
                m={12}
                onChange={this.onChange}
                validate={true}
              />
              <Input
                type="password"
                id="password"
                name="password"
                autoComplete="current-password"
                label="Password"
                error={errors.password ? errors.password : ""}
                s={12}
                m={12}
                onChange={this.onChange}
                validate={true}
              />
              <Col m={12} s={12}>
                <input type="submit" className="btn right" value="Sign in" />
              </Col>
            </Row>
          </form>
        </Card>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
