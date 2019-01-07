import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { isMobile } from "react-device-detect";

import { getEventTypes } from "../../../actions/eventTypesActions";
import { getEventCategory } from "../../../actions/eventCategoryActions";
import { getClubs } from "../../../actions/clubActions";
import { getEvents, getEventsByClub } from "../../../actions/eventActions";

import Header from "../../template/Header";
import Sidenav from "../../template/Aside";
import EventRow from "./EventRow";
import ViewActionButton from "../../util/ViewActionButton";
import EventListMobile from "./EventListMobile";

import { Input } from "react-materialize";

class EventList extends Component {
  state = {
    isFilter: false,
    keyword: "",
    filteredEvents: []
  };

  componentDidMount() {
    if (this.props.auth.user.role_id.name === "Global Admin") {
      this.props.getEvents(true);
    } else {
      this.props.getEventsByClub(this.props.auth.user.club_id._id);
      console.log("By Club");
    }
    this.props.getClubs();
    this.props.getEventCategory();
    this.props.getEventTypes();
  }

  searchFilterEvents = e => {
    if (e.target.value === "") {
      this.setState({
        isFilter: false,
        filteredEvents: []
      });
    } else {
      this.setState({
        isFilter: true,
        keyword: e.target.value,
        filteredEvents: this.props.events.filter(event => {
          return event.title
            .toLowerCase()
            .includes(e.target.value.toLowerCase());
        })
      });
    }
  };

  typesFilterEvents = e => {
    if (e.target.value === "0") {
      this.setState({
        isFilter: false,
        filteredEvents: []
      });
    } else {
      this.setState({
        isFilter: true,
        keyword: e.target.value,
        filteredEvents: this.props.events.filter(event => {
          return event.eventType._id === e.target.value;
        })
      });
    }
  };

  categoryFilterEvents = e => {
    if (e.target.value === "0") {
      this.setState({
        isFilter: false,
        filteredEvents: []
      });
    } else {
      this.setState({
        isFilter: true,
        keyword: e.target.value,
        filteredEvents: this.props.events.filter(event => {
          return event.eventCategory._id === e.target.value;
        })
      });
    }
  };

  listView = (isFilter, events, filteredEvents) => {
    let evnts = [];

    if (isFilter) evnts = filteredEvents;
    else evnts = events;

    return evnts;
  };

  render() {
    const { events, eventType, eventCategory } = this.props;
    const { isFilter, filteredEvents } = this.state;

    return (
      <React.Fragment>
        <Header branding="Events" />
        <Sidenav active="event-list" />
        <div className="row">
          <div style={{ marginTop: "10px" }}>
            <ViewActionButton active="list" />
            <div className="col s12 m2">
              {isMobile ? (
                <div className="fixed-action-btn">
                  <Link
                    to="/add-event"
                    className="btn-floating waves-effect waves-light blue darken-4"
                  >
                    <i className="material-icons">add</i>
                  </Link>
                </div>
              ) : (
                <Link
                  className="btn blue darken-2 header-action-btn left"
                  to="/add-event"
                >
                  NEW
                </Link>
              )}
            </div>
            <div className="col s6 m2 filter-input">
              <Input
                type="select"
                id="filterTypes"
                name="fitlerTypes"
                defaultValue="-1"
                onChange={this.typesFilterEvents}
              >
                <option value="-1" disabled>
                  Type
                </option>
                <option value="0">All</option>
                {eventType.map(event => {
                  return (
                    <option key={event._id} value={event._id}>
                      {event.name}
                    </option>
                  );
                })}
              </Input>
            </div>
            <div className="col s6 m2 filter-input">
              <Input
                type="select"
                id="filterCategory"
                name="filterCategory"
                defaultValue="-1"
                onChange={this.categoryFilterEvents}
              >
                <option value="-1" disabled>
                  Category
                </option>
                <option value="0">All</option>
                {eventCategory.map(category => {
                  return (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  );
                })}
              </Input>
            </div>
            <div className="col s12 m6 filter-input">
              <Input
                s={12}
                m={12}
                name="filterSearchTitle"
                id="filterSearchTitle"
                placeholder="Search Event ..."
                onChange={this.searchFilterEvents}
              />
            </div>
          </div>
          <div className="col s12">
            {isMobile ? (
              <EventListMobile
                events={this.listView(isFilter, events, filteredEvents)}
              />
            ) : (
              <EventRow
                events={this.listView(isFilter, events, filteredEvents)}
              />
            )}
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
  eventType: state.eventType.eventTypes,
  eventCategory: state.eventCategory.eventCategory,
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
