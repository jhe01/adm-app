import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import PropTypes from "prop-types";

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
            ? moment(event.dateOfEvent)
            : moment(event.from),
          end: event.oneDayOnly ? "" : moment(event.to).add(1, "d")
        });
      });
      this.setState({ calendarEvents: evs, events: events });
      this.filterEvents(events, moment(), moment().format("MM-DD-YYYY"));
    }
  }

  componentDidMount() {
    this.props.getEvents(false);
  }

  dayClick = (date, jsEvent, view) => {
    const dateClicked = moment(date).format("MM-DD-YYYY");
    const { events } = this.props;
    console.log(date + " " + dateClicked);
    this.filterEvents(events, date, dateClicked);
  };

  filterEvents = (events, date, dateClicked) => {
    const s = events.filter(event => {
      return moment(date).isBetween(
        moment(event.oneDayOnly ? event.dateOfEvent : event.from).format(
          "MM-DD-YYYY"
        ),
        moment(event.oneDayOnly ? event.dateOfEvent : event.to)
          .add(1, "d")
          .format("MM-DD-YYYY")
      );
    });
    console.log("Test");
    this.setState({ selectedEvents: s, dateClicked: dateClicked });
  };

  render() {
    const { calendarEvents, dateClicked, selectedEvents } = this.state;
    return (
      <React.Fragment>
        <Header branding="Calendar of Events" />
        <div style={{ marginTop: "10px" }}>
          <Sidenav active="calendar-of-events" />
          <div id="calendar-cmp" className="row">
            <ViewActionButton active="calendar" />
            <div className="col s12 m12 l8">
              <Cal
                events={calendarEvents}
                dayClick={this.dayClick}
                goToDate={this.state.dateClicked}
              />
            </div>
            <div className="col s12 m12 l4">
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
  getEvents: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  events: state.event.events,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getEvents }
)(Calendar);
