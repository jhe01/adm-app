import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";

import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import { Icon } from "react-materialize";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import {
  changeStatusEvent,
  uploadBannerEvent
} from "../../../actions/eventActions";

class EventRow extends Component {
  constructor(props) {
    super(props);
    this.swAlert = withReactContent(Swal);
  }

  render() {
    const { event } = this.props;
    return (
      <tr onClick={this.onEvenClick}>
        <td>{event.title}</td>
        <td>{event.club ? event.club.name : ""}</td>
        <td>{event.eventType ? event.eventType.name : ""}</td>
        <td>{event.eventCategory ? event.eventCategory.name : ""}</td>
        <td>
          {event.oneDayOnly
            ? moment(event.dateOfEvent, "MM-DD-YYYY").format("DD MMMM, YYYY")
            : moment(event.from, "MM-DD-YYYY").format("DD MMMM, YYYY") +
              " - " +
              moment(event.to, "MM-DD-YYYY").format("DD MMMM, YYYY")}
        </td>
        <td className="grey-text text-lighten-1">
          {event.is_active ? "Enabled" : "Disabled"}
        </td>
        <td>
          <Link
            to={`/event/${event._id}`}
            className="btn blue darken-2 action-btn"
          >
            <Icon>visibility</Icon>
          </Link>
        </td>
      </tr>
    );
  }
}

EventRow.propTypes = {
  event: PropTypes.object.isRequired,
  changeStatusEvent: PropTypes.func.isRequired,
  uploadBannerEvent: PropTypes.func.isRequired
};

export default connect(
  null,
  { changeStatusEvent, uploadBannerEvent }
)(EventRow);
