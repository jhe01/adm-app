import React, { Component } from "react";
import FullCalendar from "fullcalendar-reactwrapper";
import moment from "moment";
import PropTypes from "prop-types";

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
        />
      </div>
    );
  }
}

Cal.prototypes = {
  events: PropTypes.array.isRequired
};

export default Cal;
