import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import moment from "moment";

import { getEvents } from "../../actions/eventActions";

import CalendarEvents from "../admin/calendar/CalendarEvents";
import Cal from "../admin/calendar/Cal";

class Home extends Component {
  render() {
    return (
      <div>
        <h1>Sample</h1>
      </div>
    );
  }
}

export default Home;
