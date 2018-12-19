import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import ClubFacility from "./ClubFacility";

class ClubFacilityList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      facilities: this.props.facilities
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.club.facilities !== prevProps.club.facilities) {
      this.setState({ facilities: this.props.club.facilities });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.facilities !== nextProps.club.facilities;
  }

  render() {
    const { facilities } = this.state;

    return (
      <ul>
        {facilities
          ? facilities.map((facility, idx) => {
              return <ClubFacility facility={facility} key={idx} />;
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
)(ClubFacilityList);
