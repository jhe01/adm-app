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

import { Icon, Input, Button, Dropdown, NavItem } from "react-materialize";

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

  render() {
    const { events, eventType, eventCategory } = this.props;
    const { isFilter, filteredEvents } = this.state;
    return (
      <React.Fragment>
        <Header branding="Events" />
        <Sidenav active="event-list" />
        <div className="row">
          <div style={{ marginTop: "10px" }}>
            <div className="col s12 m2">
              <Link
                className="btn blue darken-2 header-action-btn left"
                to="/add-event"
              >
                Add Event
                <Icon className="left">add</Icon>
              </Link>
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
            <table className="highlight hide-on-med-and-down">
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
                {isFilter
                  ? filteredEvents.map(event => {
                      return <EventRow key={event._id} event={event} />;
                    })
                  : events.map(event => {
                      return <EventRow key={event._id} event={event} />;
                    })}
              </tbody>
            </table>
            <h5 className="hide-on-med-and-up">Events</h5>
            <div className="hide-on-med-and-up">
              <div className="card card-events">
                <div className="card-content" style={{ padding: "5px 0 0 0" }}>
                  <div className="row">
                    <div className="col s3">
                      <img
                        style={{ width: "60px" }}
                        src="/api/upload/image/a442e89752224e9b59810939de36ac89.png"
                        alt="Nothing"
                      />
                    </div>
                    <div className="col s9">
                      <Dropdown
                        trigger={
                          <Button className="more-btn btn-flat waves-effect waves-teal right">
                            <i className="material-icons">more_vert</i>
                          </Button>
                        }
                        options={{ constrainWidth: false }}
                      >
                        <NavItem>Disable</NavItem>
                        <NavItem>Change Image</NavItem>
                        <NavItem>Edit</NavItem>
                      </Dropdown>
                      {/* <a
                        href="#!"
                        className="waves-effect waves-teal btn-flat right more-btn"
                      >
                        <i className="material-icons">more_vert</i>
                      </a> */}
                      <span>
                        <strong>
                          This is Sample Event for the upcoming Event
                        </strong>
                      </span>
                      <br />
                      <span>Tournament | Invitational</span>
                      <br />
                      <span>Nov 22 to Nov 25, 2018</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card card-events">
                <div
                  className="card-content"
                  style={{ padding: "5px 3px 0 3px" }}
                >
                  <div className="row">
                    <div className="col s3">
                      <img
                        style={{ width: "60px" }}
                        src="/api/upload/image/a442e89752224e9b59810939de36ac89.png"
                        alt="Nothing"
                      />
                    </div>
                    <div className="col s9">
                      <span>
                        <strong>This is Sample Event</strong>
                      </span>
                      <br />
                      <span>Tournament | Invitational</span>
                      <br />
                      <span>Nov 22 to Nov 25, 2018</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
