import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Sidenav from "../../template/Aside";
import Header from "../../template/Header";
import { Row, Input, Col } from "react-materialize";
import { addClub } from "../../../actions/clubActions";

class AddClub extends Component {
  state = {
    name: "",
    description: "",
    errors: {}
  };
  componentDidMount() {}
  onSubmit = e => {
    e.preventDefault();
    const { name, description } = this.state;

    if (name === "") {
      this.setState({ errors: { name: "Club name is Required" } });
    }
    const newClub = {
      name,
      description
    };

    this.props.addClub(newClub);

    this.setState({
      name: "",
      description: "",
      errors: {}
    });

    this.props.history.push("/clubs");
  };
  onChange = e => this.setState({ [e.target.name]: e.target.value });
  render() {
    return (
      <React.Fragment>
        <Header branding="Golf Clubs - Add" />
        <Sidenav active="add-club" />
        <form onSubmit={this.onSubmit}>
          <Row>
            <Col s={6}>
              <Row>
                <Input
                  s={12}
                  m={12}
                  label="Name"
                  type="text"
                  name="name"
                  id="name"
                  onChange={this.onChange}
                />
              </Row>
            </Col>
          </Row>
          <Row>
            <Col s={6}>
              <Row>
                <Input
                  s={12}
                  m={12}
                  label="Description"
                  type="textarea"
                  name="description"
                  id="description"
                  onChange={this.onChange}
                />
              </Row>
            </Col>
          </Row>
          <Row>
            <Input type="submit" className="btn right-align" />
          </Row>
        </form>
      </React.Fragment>
    );
  }
}

AddClub.propTypes = {
  addClub: PropTypes.func.isRequired
};

export default connect(
  null,
  { addClub }
)(AddClub);
