import React, { Component } from "react";
import PropTypes from "prop-types";

import ClubPolicy from "./ClubPolicy";

class ClubPolicyList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      policies: this.props.policies
    };
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

export default ClubPolicyList;
