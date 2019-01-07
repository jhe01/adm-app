import React, { Component } from "react";
import { connect } from "react-redux";

import ClubService from "./ClubService";

class ClubServicesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      services: this.props.services
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.club.services !== prevProps.club.services) {
      this.setState({ services: this.props.club.services });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.services !== nextProps.club.services;
  }

  render() {
    const { services } = this.state;

    return (
      <ul>
        {services
          ? services.map((service, idx) => {
              return <ClubService service={service} key={idx} />;
            })
          : ""}
      </ul>
    );
  }
}

const mapStateToProps = state => ({
  club: state.club.club
});

export default connect(
  mapStateToProps,
  {}
)(ClubServicesList);
