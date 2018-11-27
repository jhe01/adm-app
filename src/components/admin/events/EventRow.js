import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";

import PropTypes from "prop-types";

import { Link, Redirect } from "react-router-dom";
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

  componentDidMount() {}

  onClickDisable = () => {
    if (this.props.event.is_active) {
      this.swAlert
        .fire({
          title: (
            <div>
              <h5>Are you sure?</h5>
              <p style={{ fontSize: "1.3rem" }}>
                Event "{this.props.event.title}" will be disabled!
              </p>
            </div>
          ),
          type: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes",
          confirmButtonClass: "blue darken-2"
        })
        .then(result => {
          if (result.value) {
            this.props.changeStatusEvent(this.props.event);
          }
        });
    } else {
      this.props.changeStatusEvent(this.props.event);
    }
  };

  onClickUploadImage = () => {
    this.swAlert
      .fire({
        title: "Select Image",
        input: "file",
        inputAttributes: {
          accept: "image/*",
          "aria-lable": "Upload Events Banner!"
        }
      })
      .then(result => {
        if (result.value) {
          const evnt = {};
          evnt.id = this.props.event._id;
          evnt.file = result.value;
          this.props.uploadBannerEvent(evnt);
        }
      });
  };

  onEventClick = () => {
    return <Redirect push to="/event" />;
  };

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
          {/* <a
            href="#!"
            onClick={this.onClickDisable}
            className="btn red darken-2 action-btn"
          >
            <Icon>{event.is_active ? "clear" : "check"}</Icon>
          </a>
          <a
            href="#!"
            onClick={this.onClickUploadImage}
            className="btn orange darken-4 action-btn"
          >
            <Icon>image</Icon>
          </a>

          <Link
            to={`/edit-event/${event._id}`}
            className="btn blue darken-2 action-btn"
          >
            <Icon>edit</Icon>
          </Link> */}
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
