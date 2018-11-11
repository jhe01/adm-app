import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import { getEventTypes } from "../../../actions/eventTypesActions";
import { getEventCategory } from "../../../actions/eventCategoryActions";
import { getClubs } from "../../../actions/clubActions";
import { getEvents, getEventsByClub } from "../../../actions/eventActions";

import Header from "../../template/Header";
import Sidenav from "../../template/Aside";
import EventRow from "./EventRow";

import { Icon } from "react-materialize";

class EventList extends Component {
  componentDidMount() {
    if (this.props.auth.user.role_id.name === "Global Admin") {
      this.props.getEvents();
    } else {
      this.props.getEventsByClub(this.props.auth.user.club_id._id);
    }
    this.props.getClubs();
    this.props.getEventCategory();
    this.props.getEventTypes();
  }

  render() {
    const { events } = this.props;
    return (
      <React.Fragment>
        <Header branding="Events" />
        <Sidenav active="event-list" />
        <div className="row">
          <div style={{ marginTop: "10px" }}>
            <Link
              className="btn blue darken-2 header-action-btn left"
              to="/add-event"
            >
              Add Event
              <Icon className="left">add</Icon>
            </Link>
          </div>
          <div className="col s12">
            <table className="highlight">
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Club</th>
                  <th>Type</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th />
                  <th />
                </tr>
              </thead>
              <tbody>
                {events.map(event => {
                  return <EventRow key={event._id} event={event} />;
                })}
              </tbody>
            </table>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

EventList.propTypes = {
  getEventTypes: PropTypes.func.isRequired,
  getClubs: PropTypes.func.isRequired,
  getEventCategory: PropTypes.func.isRequired,
  getEvents: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  getEventsByClub: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  events: state.event.events,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {
    getEventTypes,
    getClubs,
    getEventCategory,
    getEvents,
    getEventsByClub
  }
)(EventList);
