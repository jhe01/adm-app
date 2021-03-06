import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { isMobile } from "react-device-detect";

import { getEventTypes } from "../../../actions/eventTypesActions";
import { getEventCategory } from "../../../actions/eventCategoryActions";
import { getClubs } from "../../../actions/clubActions";
import { getEvents } from "../../../actions/eventActions";

import CalendarEvents from "./CalendarEvents";
import Sidenav from "../../template/Aside";
import Header from "../../template/Header";
import Cal from "./Cal";
import ViewActionButton from "../../util/ViewActionButton";

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calendarEvents: [],
      events: [],
      list: [],
      dateClicked: "",
      selectedEvents: [],
      goToDate: ""
    };
  }

  componentWillReceiveProps(nextProps, nextState) {
    let evs = [];
    if (nextProps.events) {
      const { events } = nextProps;
      events.forEach(event => {
        evs.push({
          title: event.title,
          allDay: event.isWholeDay,
          start: event.oneDayOnly
            ? moment(event.dateOfEvent, "MM-DD-YYYY")
            : moment(event.from, "MM-DD-YYYY"),
          end: event.oneDayOnly
            ? ""
            : moment(event.to, "MM-DD-YYYY").add(1, "d")
        });
      });
      this.setState({ calendarEvents: evs, events: events });
      this.filterEvents(events, moment(), moment().format("MM-DD-YYYY"));
    }
  }

  componentDidMount() {
    this.props.getEvents(false);
    this.props.getClubs();
    this.props.getEventCategory();
    this.props.getEventTypes();
  }

  dayClick = (date, jsEvent, view) => {
    const dateClicked = moment(date, "x").format("MM-DD-YYYY");
    const { events } = this.props;
    this.filterEvents(events, date, dateClicked);
  };

  filterEvents = (events, date, dateClicked) => {
    const s = events.filter(event => {
      return moment(date, "MM-DD-YYYY").isBetween(
        moment(
          event.oneDayOnly ? event.dateOfEvent : event.from,
          "MM-DD-YYYY"
        ).format("MM-DD-YYYY"),
        moment(event.oneDayOnly ? event.dateOfEvent : event.to, "MM-DD-YYYY")
          .add(1, "d")
          .format("MM-DD-YYYY")
      );
    });

    this.setState({ selectedEvents: s, dateClicked: dateClicked });
  };

  render() {
    const { calendarEvents, dateClicked, selectedEvents } = this.state;
    return (
      <React.Fragment>
        <Header branding="Calendar of Events" />
        <div style={{ marginTop: "10px" }}>
          <Sidenav active="calendar-of-events" />
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
            ""
          )}
          <div id="calendar-cmp" className="row">
            <ViewActionButton active="calendar" />
            <div className="col s12 m12 l9">
              <Cal
                events={calendarEvents}
                dayClick={this.dayClick}
                goToDate={this.state.dateClicked}
              />
            </div>
            <div className="col s12 m12 l3">
              <div className="row">
                <div className="col s6 m6">
                  <h6>List of Events</h6>
                </div>
                <div className="col s6 m6">
                  <h6 className="right-align">
                    {dateClicked ? dateClicked : moment().format("YYYY-MM-DD")}
                  </h6>
                </div>
              </div>
              <div className="row">
                <div className="col s12 m12 calendar-panel-container">
                  {selectedEvents.length > 0 ? (
                    selectedEvents.map(event => {
                      return (
                        <CalendarEvents
                          key={event._id}
                          event={event}
                          noEvent={false}
                        />
                      );
                    })
                  ) : (
                    <CalendarEvents key={0} noEvent={true} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Calendar.propTypes = {
  events: PropTypes.array.isRequired,
  getEventTypes: PropTypes.func.isRequired,
  getClubs: PropTypes.func.isRequired,
  getEventCategory: PropTypes.func.isRequired,
  getEvents: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  events: state.event.events,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getEvents, getEventCategory, getEventTypes, getClubs }
)(Calendar);
