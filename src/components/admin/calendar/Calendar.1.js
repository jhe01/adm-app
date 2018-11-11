import React, { Component } from "react";
import FullCalendar from "fullcalendar-reactwrapper";
import moment from "moment";
import axios from "axios";

import CalendarEvents from "./CalendarEvents";
import Sidenav from "../../template/Aside";

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
    this.l = this.props.ds.record.getList("list_records/events");
    this.l.subscribe(this._subscribeList.bind(this));
  }
  async componentDidMount() {
    const list = await axios.get("/api/list/events");
    const events = await axios.get("/api/events");
    this.setState({ list: list.data, events: events.data });
    this._setEventsForCalendar();
  }

  _subscribeList(entries) {
    this.setState({ list: { __dsList: entries } });
  }

  _setEventsForCalendar() {
    const { list, events } = this.state;
    const date = moment();
    const dateNow = moment(date).format("YYYY-MM-DD");
    const e = [];
    list.__dsList.forEach((entry, idx) => {
      const evnt = events.filter(event => {
        return event.ds_key === entry;
      });
      e.push({
        title: evnt[0].title,
        start: moment(evnt[0].from, "DD MMM, YYYY").format("YYYY-MM-DD"),
        end: moment(
          moment(evnt[0].to, "DD MMM, YYYY").format("YYYY-MM-DD")
        ).add(1, "d")
      });
    });
    this.setState({ calendarEvents: e });
    this.filterEvent(events, date, dateNow);
  }

  dayClick = (date, jsEvent, view) => {
    const dateClicked = moment(date).format("YYYY-MM-DD");
    const { events } = this.state;
    this.filterEvent(events, date, dateClicked);
  };

  filterEvent = (events, date, dateClicked) => {
    const s = events.filter(event => {
      //console.log(event);
      return moment(date).isBetween(
        moment(event.from, "DD MMM, YYYY").format("YYYY-MM-DD"),
        moment(
          moment(event.to, "DD MMM, YYYY")
            .add(1, "d")
            .format("YYYY-MM-DD")
        )
      );
    });
    this.setState({ selectedEvents: s, dateClicked: dateClicked });
  };

  selectDate = (start, end) => {
    //console.log(start, end);
  };
  eventLimitClick = (cellInfo, jsEvent) => {
    console.log(cellInfo);
  };

  componentDidUpdate() {}

  render() {
    const { calendarEvents, dateClicked, selectedEvents } = this.state;
    return (
      <div>
        <Sidenav active="calendar-of-events" />
        <div id="calendar-cmp" className="row">
          <div className="col s12 m12 l8">
            <FullCalendar
              id="calendar"
              dayClick={this.dayClick}
              events={calendarEvents}
              eventColor="#0D47A1"
              fixedWeekCount={true}
              eventLimit={true}
              selectable={true}
              select={this.selectDate}
              eventLimitClick={this.eventLimitClick}
              defaultDate={
                dateClicked ? dateClicked : moment().format("YYYY-MM-DD")
              }
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
              <div className="col s12 m12">
                {selectedEvents.map(event => {
                  return (
                    <CalendarEvents
                      key={event.ds_key.split("/")[1]}
                      event={event}
                      ds={this.props.ds}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Calendar;
