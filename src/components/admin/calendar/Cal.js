import React, { Component } from "react";
import FullCalendar from "fullcalendar-reactwrapper";
import moment from "moment";
import PropTypes from "prop-types";
import { isMobile } from "react-device-detect";

class Cal extends Component {
  constructor() {
    super();
    this.state = {
      events: []
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ events: this.props.events });
    }, 600);
  }

  render() {
    return (
      <div>
        <FullCalendar
          id="calendar"
          ref="refC"
          dayClick={this.props.dayClick}
          events={this.state.events}
          eventColor="#0D47A1"
          fixedWeekCount={false}
          eventLimit={true}
          selectable={true}
          //   select={this.selectDate}
          //   eventLimitClick={this.eventLimitClick}
          defaultDate={
            this.props.goToDate
              ? this.props.goToDate
              : moment().format("YYYY-MM-DD")
          }
          height={isMobile ? 900 : 800}
        />
      </div>
    );
  }
}

Cal.prototypes = {
  events: PropTypes.array.isRequired
};

export default Cal;
