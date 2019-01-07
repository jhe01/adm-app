import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import ClubPolicy from "./ClubPolicy";

class ClubPolicyList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      policies: this.props.policies
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.club.policies !== prevProps.club.policies) {
      this.setState({ policies: this.props.club.policies });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.policies !== nextProps.club.policies;
  }

  render() {
    const { policies } = this.state;
    return (
      <ul>
        {policies
          ? policies.map((policy, idx) => {
              return <ClubPolicy policy={policy} key={idx} />;
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
)(ClubPolicyList);
